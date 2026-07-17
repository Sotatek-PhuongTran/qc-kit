import { defineConfig } from '@playwright/test';
import fs from 'node:fs';

// UNIFIED runner config — scaffolded once by WHICHEVER generate skill runs first
// (qc-func-auto-generate or qc-api-auto-generate). Every project entry is filtered by
// directory existence, so a UI-only or API-only project registers only what it has.
// URLs & accounts: single source = project-config (§3/§4) — qc-auto-run resolves the target env,
// confirms it, then injects BASE_URL_<PORTAL> + API_BASE_URL. Specs use relative routes only.
// .env holds ONLY external-service secrets + optional API_TOKEN_<ROLEKEY> (user-filled; ROLEKEY = Key trong bảng ## Accounts của data md).

if (fs.existsSync('.env')) {
  for (const line of fs.readFileSync('.env', 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

// One entry per UI portal — extend when a new portal gets specs.
const portals = [
  { name: 'org',   dir: './tests/org',   url: process.env.BASE_URL_ORG },
  { name: 'admin', dir: './tests/admin', url: process.env.BASE_URL_ADMIN },
].filter(p => fs.existsSync(p.dir));

// [qc-api] extra dirs — owned by qc-api-auto-generate; do not edit by hand.
// API specs need no browser baseURL (services build their own request context on
// API_BASE_URL via helpers/api/auth.ts). MIX specs set their portal baseURL per-spec
// via test.use + portalUrl(), so no url is bound here either.
const apiDirs = [
  { name: 'api', dir: './tests/api' },
  { name: 'mix', dir: './tests/mix' },
].filter(d => fs.existsSync(d.dir));
// [/qc-api]

for (const p of portals) {
  if (p.url && /prod/i.test(p.url)) throw new Error(`BASE_URL_${p.name.toUpperCase()} looks like production — refusing.`);
}
if (process.env.API_BASE_URL && /prod/i.test(process.env.API_BASE_URL)) {
  throw new Error('API_BASE_URL looks like production — refusing.');
}

export default defineConfig({
  testDir: './tests',
  reporter: [
    ['list'],
    ['json',  { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
  ],
  use: { trace: 'on-first-retry', screenshot: 'only-on-failure' },
  projects: [
    ...portals.map(p => ({ name: p.name, testDir: p.dir, use: { baseURL: p.url } })),
    ...apiDirs.map(d => ({ name: d.name, testDir: d.dir })),
  ],
});
