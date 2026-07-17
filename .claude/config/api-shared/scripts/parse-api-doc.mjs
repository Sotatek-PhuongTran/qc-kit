#!/usr/bin/env node
/**
 * parse-api-doc.mjs — QC Kit shared tool (API extension).
 *
 * Parses a Swagger 2.0 / OpenAPI 3.x / Postman Collection v2 JSON file and emits:
 *   1. A TRIMMED endpoint table (markdown) — the ONLY thing agents read.
 *      Agents must NEVER read the raw API doc (it can be tens of thousands of lines).
 *   2. (--schemas) Dereferenced JSON Schemas for response validation → --schemas-dir.
 *
 * This script is KIT-LEVEL (lives in .claude/config/api-shared/scripts/). Its OUTPUTS are
 * PROJECT data and must land under docs/ per path-registry logical names:
 *   endpoint table → `api-doc-digest` (docs/qc/uc-read/<UC-ID>/<UC-ID>_endpoints-digest.md — same folder as the UC audit) — pass that folder as --out-dir
 *   schemas        → `api-schemas`   (docs/qc/automation/runner/schemas/ — automation step only) — pass that folder as --schemas-dir
 * Both are regenerable build outputs: never hand-edit, never version.
 *
 * Usage:
 *   node parse-api-doc.mjs <input.json> [--filter kw1,kw2] [--uc UC-101] [--out-dir <dir>] [--schemas] [--schemas-dir <dir>]
 *
 *   --filter       case-insensitive keywords matched against path, tags, operationId, summary.
 *                  Endpoints not matching are EXCLUDED from the table but still counted in the
 *                  header (total vs matched) — no silent truncation.
 *   --uc           label written into the output header + output file name.
 *   --out-dir      output directory for the digest md (default: cwd). The digest md ALWAYS lands here.
 *   --schemas      also write dereferenced JSON Schemas used by the matched endpoints.
 *   --schemas-dir  output directory for the schema JSON files (default: the --out-dir value).
 *
 * YAML input is NOT supported (no deps policy) — convert first:
 *   npx js-yaml api.yaml > api.json
 */

import fs from 'node:fs';
import path from 'node:path';

// ---------- args ----------
const args = process.argv.slice(2);
if (args.length === 0 || args[0].startsWith('--')) usageDie('Missing <input.json>.');
const inputPath = args[0];
const opt = { filter: [], uc: '', outDir: '.', schemasDir: '', schemas: false };
for (let i = 1; i < args.length; i++) {
  const a = args[i];
  if (a === '--filter') opt.filter = String(args[++i] || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
  else if (a === '--uc') opt.uc = String(args[++i] || '').trim();
  else if (a === '--out-dir') opt.outDir = String(args[++i] || '.');
  else if (a === '--schemas-dir') opt.schemasDir = String(args[++i] || '');
  else if (a === '--schemas') opt.schemas = true;
  else usageDie(`Unknown option: ${a}`);
}

function usageDie(msg) {
  console.error(`ERROR: ${msg}\nUsage: node parse-api-doc.mjs <input.json> [--filter kw1,kw2] [--uc UC-101] [--out-dir <dir>] [--schemas] [--schemas-dir <dir>]`);
  process.exit(1);
}

// ---------- load ----------
let raw;
try { raw = fs.readFileSync(inputPath, 'utf8'); }
catch (e) { usageDie(`Cannot read ${inputPath}: ${e.message}`); }

let doc;
try { doc = JSON.parse(raw); }
catch {
  const head = raw.slice(0, 200);
  if (/^\s*(openapi|swagger|info)\s*:/m.test(head)) {
    usageDie('Input looks like YAML. Convert it first: npx js-yaml <file>.yaml > <file>.json');
  }
  usageDie('Input is not valid JSON.');
}

// ---------- detect type ----------
const isOas3 = typeof doc.openapi === 'string';
const isOas2 = doc.swagger === '2.0';
const isPostman = !!(doc.info && (doc.info.schema || '').includes('collection') && Array.isArray(doc.item));
if (!isOas3 && !isOas2 && !isPostman) {
  usageDie('Unrecognized format. Supported: OpenAPI 3.x, Swagger 2.0, Postman Collection v2 (JSON).');
}
const docType = isOas3 ? `OpenAPI ${doc.openapi}` : isOas2 ? 'Swagger 2.0' : 'Postman Collection v2';

// ---------- helpers ----------
const HTTP = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'];
const refName = (ref) => String(ref).split('/').pop();

function resolveRef(ref) {
  const parts = String(ref).replace(/^#\//, '').split('/');
  let cur = doc;
  for (const p of parts) { cur = cur?.[p]; if (cur === undefined) return undefined; }
  return cur;
}

/** Shallow-deref a schema (depth-capped, cycle-guarded) for output files. */
function deref(schema, depth = 0, seen = new Set()) {
  if (!schema || typeof schema !== 'object' || depth > 6) return schema;
  if (schema.$ref) {
    if (seen.has(schema.$ref)) return { $comment: `cycle: ${refName(schema.$ref)}` };
    const next = new Set(seen); next.add(schema.$ref);
    return deref(resolveRef(schema.$ref) ?? {}, depth + 1, next);
  }
  const out = Array.isArray(schema) ? [] : {};
  for (const [k, v] of Object.entries(schema)) out[k] = (v && typeof v === 'object') ? deref(v, depth + 1, seen) : v;
  return out;
}

/** Top-level body fields "name*:type" (required marked with *). */
function bodyFields(schema) {
  const s = schema?.$ref ? resolveRef(schema.$ref) : schema;
  if (!s) return '';
  if (s.type === 'array') return `array<${bodyFields(s.items) || s.items?.type || '?'}>`;
  const req = new Set(s.required || []);
  const props = s.properties || {};
  const parts = Object.entries(props).map(([name, p]) => {
    const t = p.$ref ? refName(p.$ref) : (p.type || (p.properties ? 'object' : '?'));
    return `${name}${req.has(name) ? '*' : ''}:${t}`;
  });
  return parts.join(', ');
}

function schemaLabel(schema) {
  if (!schema) return '';
  if (schema.$ref) return refName(schema.$ref);
  if (schema.type === 'array') return `array<${schemaLabel(schema.items) || schema.items?.type || '?'}>`;
  return schema.type || (schema.properties ? 'object' : '');
}

function collectRefs(node, acc = new Set(), depth = 0) {
  if (!node || typeof node !== 'object' || depth > 8) return acc;
  if (node.$ref) acc.add(node.$ref);
  for (const v of Object.values(node)) if (v && typeof v === 'object') collectRefs(v, acc, depth + 1);
  return acc;
}

// ---------- extract endpoints ----------
const endpoints = []; // {method, path, summary, tags, auth, params, body, responses, _schemaRefs}

if (isOas3 || isOas2) {
  const globalSec = (doc.security || []).flatMap(s => Object.keys(s));
  for (const [p, item] of Object.entries(doc.paths || {})) {
    const pathParams = item.parameters || [];
    for (const m of HTTP) {
      const op = item[m];
      if (!op) continue;
      const allParams = [...pathParams, ...(op.parameters || [])].map(prm => prm.$ref ? resolveRef(prm.$ref) : prm).filter(Boolean);
      const params = allParams.filter(prm => prm.in !== 'body')
        .map(prm => `${prm.name}${prm.required ? '*' : ''}(${prm.in})`).join(', ');
      let body = '';
      if (isOas3 && op.requestBody) {
        const rb = op.requestBody.$ref ? resolveRef(op.requestBody.$ref) : op.requestBody;
        const media = rb?.content?.['application/json'] || Object.values(rb?.content || {})[0];
        body = bodyFields(media?.schema);
      } else if (isOas2) {
        const bp = allParams.find(prm => prm.in === 'body');
        if (bp) body = bodyFields(bp.schema);
      }
      const responses = Object.entries(op.responses || {}).map(([code, r0]) => {
        const r = r0?.$ref ? resolveRef(r0.$ref) : r0;
        const sch = isOas3 ? (r?.content?.['application/json']?.schema || Object.values(r?.content || {})[0]?.schema) : r?.schema;
        const label = schemaLabel(sch);
        return label ? `${code}:${label}` : code;
      }).join(', ');
      const sec = (op.security ? op.security.flatMap(s => Object.keys(s)) : globalSec);
      const auth = op.security?.length === 0 ? 'none' : (sec.length ? sec.join(',') : 'none');
      const refs = collectRefs({ b: isOas3 ? op.requestBody : allParams.find(x => x.in === 'body'), r: op.responses });
      endpoints.push({ method: m.toUpperCase(), path: p, summary: op.summary || op.description?.slice(0, 80) || '', tags: (op.tags || []).join(','), auth, params, body, responses, operationId: op.operationId || '', _schemaRefs: refs });
    }
  }
} else {
  // Postman Collection v2 — walk item tree
  const walk = (items, folder) => {
    for (const it of items || []) {
      if (Array.isArray(it.item)) { walk(it.item, folder ? `${folder}/${it.name}` : it.name); continue; }
      const req = it.request; if (!req) continue;
      const method = (typeof req === 'string' ? 'GET' : req.method || 'GET').toUpperCase();
      let urlPath = '';
      const u = typeof req === 'string' ? req : req.url;
      if (typeof u === 'string') urlPath = u.replace(/^https?:\/\/[^/]+/i, '');
      else if (u) urlPath = '/' + (u.path || []).join('/');
      let body = '';
      if (req.body?.mode === 'raw' && req.body.raw) {
        try { body = Object.keys(JSON.parse(req.body.raw)).join(', '); }
        catch { body = '(raw body)'; }
      } else if (req.body?.mode) body = `(${req.body.mode})`;
      const params = (u?.query || []).map(q => `${q.key}(query)`).join(', ');
      const auth = req.auth?.type || (doc.auth?.type ?? 'none');
      endpoints.push({ method, path: urlPath, summary: it.name || '', tags: folder || '', auth, params, body, responses: (it.response || []).map(r => r.code).filter(Boolean).join(', '), operationId: '', _schemaRefs: new Set() });
    }
  };
  walk(doc.item, '');
}

// ---------- filter ----------
const matches = (e) => opt.filter.length === 0 || opt.filter.some(kw =>
  e.path.toLowerCase().includes(kw) || e.tags.toLowerCase().includes(kw) ||
  e.operationId.toLowerCase().includes(kw) || e.summary.toLowerCase().includes(kw));
const selected = endpoints.filter(matches);

// ---------- emit markdown ----------
fs.mkdirSync(opt.outDir, { recursive: true });
const label = opt.uc || (opt.filter.length ? opt.filter.join('-') : 'all');
// File name per path-registry `api-doc-digest`: <UC-ID>_endpoints-digest.md
const outName = opt.uc
  ? `${opt.uc.replace(/[^\w.-]+/g, '_')}_endpoints-digest.md`
  : `endpoints-digest_${label.replace(/[^\w.-]+/g, '_')}.md`;
const outMd = path.join(opt.outDir, outName);
const esc = (s) => String(s || '').replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');

const lines = [];
lines.push(`# Endpoint table (trimmed) — ${label}`);
lines.push('');
lines.push(`> Source: \`${path.basename(inputPath)}\` (${docType}) | Generated: ${new Date().toISOString().slice(0, 10)} | Filter: ${opt.filter.join(', ') || '(none)'} | Matched: **${selected.length}/${endpoints.length}** endpoints${selected.length < endpoints.length ? ' — các endpoint còn lại KHÔNG hiển thị (đổi --filter để xem)' : ''}`);
lines.push('');
lines.push('| Method | Path | Summary / Tag | Auth | Params | Body fields (`*`=required) | Responses |');
lines.push('|---|---|---|---|---|---|---|');
for (const e of selected) {
  const sum = [e.summary, e.tags && `[${e.tags}]`].filter(Boolean).join(' ');
  lines.push(`| ${e.method} | \`${esc(e.path)}\` | ${esc(sum)} | ${esc(e.auth)} | ${esc(e.params) || '—'} | ${esc(e.body) || '—'} | ${esc(e.responses) || '—'} |`);
}
lines.push('');
fs.writeFileSync(outMd, lines.join('\n'), 'utf8');

// ---------- emit schemas ----------
// Digest md ALWAYS goes to --out-dir; schema JSON goes to --schemas-dir (default: the --out-dir value).
let schemaCount = 0;
const schemasDir = opt.schemasDir || opt.outDir;
if (opt.schemas && (isOas3 || isOas2)) {
  const dir = schemasDir;
  fs.mkdirSync(dir, { recursive: true });
  const wanted = new Set();
  for (const e of selected) for (const r of e._schemaRefs) wanted.add(r);
  for (const ref of wanted) {
    const resolved = resolveRef(ref);
    if (!resolved) continue;
    const name = refName(ref).replace(/[^\w.-]+/g, '_');
    fs.writeFileSync(path.join(dir, `${name}.json`), JSON.stringify(deref(resolved), null, 2), 'utf8');
    schemaCount++;
  }
}

console.log(`OK — ${docType}`);
console.log(`Endpoints: ${selected.length}/${endpoints.length} matched → ${outMd}`);
if (opt.schemas) console.log(`Schemas: ${schemaCount} → ${schemasDir}${isPostman ? ' (Postman has no schemas — skipped)' : ''}`);
