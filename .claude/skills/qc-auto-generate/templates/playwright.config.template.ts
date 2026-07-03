import { defineConfig } from '@playwright/test';
import fs from 'node:fs';

// Scaffolded once. Reporters emit a machine-readable result file keyed by test title (TC ID),
// so qc-auto-run can map pass/fail back to each test case.
//
// URLs & accounts: single source = project-config (§3/§4). qc-auto-run resolves the target
// environment per run (named by the user), confirms it, then injects BASE_URL_<PORTAL> vars
// which are mapped onto per-portal projects below. Specs use relative routes only.
// .env holds ONLY external-service secrets (user-filled); loaded here for helpers (e.g. email.ts).

if (fs.existsSync('.env')) {
  for (const line of fs.readFileSync('.env', 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

// One entry per portal — extend when a new portal gets specs. Only existing testDirs are registered.
const portals = [
  { name: 'org',   dir: './tests/org',   url: process.env.BASE_URL_ORG },
  { name: 'admin', dir: './tests/admin', url: process.env.BASE_URL_ADMIN },
].filter(p => fs.existsSync(p.dir));

for (const p of portals) {
  if (p.url && /prod/i.test(p.url)) throw new Error(`BASE_URL_${p.name.toUpperCase()} looks like production — refusing.`);
}

export default defineConfig({
  testDir: './tests',
  reporter: [
    ['list'],
    ['json',  { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
  ],
  use: { trace: 'on-first-retry', screenshot: 'only-on-failure' },
  projects: portals.map(p => ({ name: p.name, testDir: p.dir, use: { baseURL: p.url } })),
});
