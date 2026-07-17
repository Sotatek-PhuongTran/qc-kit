#!/usr/bin/env node
// build-test-data.mjs — compile + validate a test-data markdown into a JSON fixture (D2).
// Usage: node scripts/build-test-data.mjs <UC-ID> [--dir <data-dir>] [--api]
//   --api : build the API branch's data file (<UC-ID>_api_testdata.md -> _api_testdata.json).
//           Backtick-quoted JSON values in ## Variables are parsed and validated
//           (contract: .claude/config/api-shared/api-testdata-contract.md).
// Source of truth = the markdown; this JSON is a build output (do NOT hand-edit).
// Fails loudly (non-zero exit) on schema violations.
// v3 (2026-07-04): ONE living data file per UC (<UC-ID>_testdata.md); Preconditions = 6-column schema only
//   (Key | Required state | Seed channel | TCs | Check | Confirmed — read by qc-auto-run pre-flight); legacy formats no longer accepted.
// v4 (2026-07-10): --api flag (API branch data file + JSON payload parsing); backtick values stripped for both branches.

import fs from 'node:fs';
import path from 'node:path';

const ucId = process.argv[2];
if (!ucId) { console.error('Usage: node build-test-data.mjs <UC-ID> [--dir <data-dir>]'); process.exit(2); }
const dirIdx = process.argv.indexOf('--dir');
const dataDir = dirIdx > -1 ? process.argv[dirIdx + 1] : '../data';  // default: ../data — canonical cwd is the runner root (docs/qc/automation/runner/)
const isApi = process.argv.includes('--api');
const suffix = isApi ? '_api_testdata' : '_testdata';

// locate the test-data md: ONE living file per UC — <UC-ID>_testdata.md (no date/version).
const mdPath = path.join(dataDir, `${ucId}${suffix}.md`);
if (!fs.existsSync(mdPath)) { console.error(`No test-data md found: ${mdPath} (one living file per UC — run ${isApi ? 'qc-api-auto-generate' : 'the generate skill'} first)`); process.exit(2); }
const md = fs.readFileSync(mdPath, 'utf8');

const errors = [];
const fail = (m) => errors.push(m);

// --- frontmatter ---
const fm = md.match(/^---\n([\s\S]*?)\n---/);
const front = {};
if (!fm) fail('Missing frontmatter (--- ... ---).');
else fm[1].split('\n').forEach(l => { const m = l.match(/^([\w-]+):\s*(.*)$/); if (m) front[m[1]] = m[2].replace(/\s+#.*$/, '').trim(); });
if (!front.UC) fail('Frontmatter: missing UC.');
if (!front.Environment) fail('Frontmatter: missing Environment.');
if (/prod/i.test(front.Environment || '')) fail('Environment must not be production.');

// --- parse a markdown table under a "## <name>" heading into rows of cells ---
function tableUnder(heading) {
  const re = new RegExp(`##\\s+${heading}[^\\n]*\\n([\\s\\S]*?)(?:\\n##\\s|$)`);
  const block = md.match(re);
  if (!block) return null;
  const rows = block[1].split('\n').map(l => l.trim()).filter(l => l.startsWith('|'));
  // drop header + separator
  const body = rows.slice(2);
  return body.map(r => r.split('|').slice(1, -1).map(c => c.trim()));
}

// --- Accounts ---
const accounts = {};
const accRows = tableUnder('Accounts');
if (!accRows) fail('Missing "## Accounts" table.');
else for (const [key, role] of accRows) {
  if (!key || key === '—') continue;
  if (accounts[key]) fail(`Duplicate account key: ${key}`);
  if (!role || role === '—') fail(`Account "${key}" has empty role.`);
  accounts[key] = { role };
}

// --- Variables (per TC) ---
const variables = {};
const varRows = tableUnder('Variables');
if (!varRows) fail('Missing "## Variables" table.');
else for (const [tc, name, value] of varRows) {
  if (!tc) continue;
  if (!name || name === '—') { variables[tc] ||= {}; continue; } // TC with no input
  variables[tc] ||= {};
  if (name in variables[tc]) fail(`Duplicate variable (${tc}, ${name}).`);
  if (value === undefined || value === '' || value === '—') { fail(`Variable (${tc}, ${name}) has no value — fill it in the data md.`); continue; }
  let v = value;
  const bt = v.match(/^`([\s\S]*)`(?:\s*\(.*\))?$/);   // strip backticks (+ optional trailing "(note)")
  if (bt) v = bt[1];
  if (/^[\[{]/.test(v)) {                                  // JSON payload fragment (API branch contract)
    try { v = JSON.parse(v); }
    catch (e) { fail(`Variable (${tc}, ${name}): value looks like JSON but does not parse — ${e.message}`); continue; }
  }
  variables[tc][name] = v;
}

// --- Config (shared non-secret values, e.g. test inbox) ---
const config = {};
const cfgRows = tableUnder('Config');
if (cfgRows) for (const [key, value] of cfgRows) {
  if (!key || key === '—') continue;
  if (config[key]) fail(`Duplicate config key: ${key}`);
  if (value === undefined || value === '' || value === '—') fail(`Config "${key}" has no value.`);
  config[key] = value;
}

// --- Preconditions (data-state) ---
// Columns (exactly 6): Key | Required state | Seed channel | TCs | Check (pre-flight) | Confirmed
const preconditions = {};
const CHANNEL_RE = /^(ui:.+|api:.+|db:.+|manual)$/;
const preRows = tableUnder('Preconditions');
if (preRows) for (const cells of preRows) {
  const key = cells[0];
  if (!key || key === '—') continue;
  if (preconditions[key]) { fail(`Duplicate precondition key: ${key}`); continue; }
  if (cells.length < 6) { fail(`Precondition "${key}": expected 6 columns (Key | Required state | Seed channel | TCs | Check | Confirmed) — got ${cells.length}.`); continue; }
  const [, state, channel, tcsCell, checkCell, confirmedCell] = cells;
  if (!state || state === '—') fail(`Precondition "${key}": empty "Required state".`);
  if (!CHANNEL_RE.test(channel || '')) fail(`Precondition "${key}": "Seed channel" must be ui:<ref> | api:<ref> | db:<ref> | manual (got "${channel || ''}").`);
  const tcs = (tcsCell || '').split(/[,\s]+/).filter(Boolean);
  if (!tcs.length || tcs.some(t => !/^TC_\w+/.test(t))) fail(`Precondition "${key}": "TCs" must be a non-empty list of TC_* ids (got "${tcsCell || ''}").`);
  const check = (checkCell && checkCell !== '—') ? checkCell : 'none';
  let confirmed = (confirmedCell && confirmedCell !== '—') ? confirmedCell : '';
  if (confirmed && !/^yes\b/i.test(confirmed)) {
    console.warn(`⚠ Precondition "${key}": Confirmed must start with "yes — <YYYY-MM-DD> — <name>" — value "${confirmed}" is treated as NOT confirmed.`);
    confirmed = '';
  }
  if (channel === 'manual' && check === 'none' && !confirmed) {
    console.warn(`⚠ Precondition "${key}" is manual with no pre-flight check and not confirmed — qc-auto-run will ask before running its TCs (${tcs.join(', ')}).`);
  }
  preconditions[key] = { state, channel, tcs, check, confirmed };
}

if (errors.length) {
  console.error(`✗ Validation failed for ${path.basename(mdPath)}:`);
  errors.forEach(e => console.error('  - ' + e));
  process.exit(1);
}

const out = { uc: front.UC, environment: front.Environment, config, accounts, variables, preconditions };
const jsonPath = path.join(dataDir, `${ucId}${suffix}.json`);
fs.writeFileSync(jsonPath, JSON.stringify(out, null, 2) + '\n', 'utf8');
const manualCount = Object.values(preconditions).filter(p => p.channel === 'manual').length;
console.log(`✓ ${path.basename(jsonPath)} — ${Object.keys(variables).length} TC, ${Object.keys(accounts).length} account(s), ${Object.keys(preconditions).length} precondition(s)${manualCount ? ` (${manualCount} manual — gated by qc-auto-run pre-flight)` : ''}.`);
