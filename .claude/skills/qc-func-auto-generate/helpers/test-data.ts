// test-data.ts — runtime test-data loader (D2), shared by BOTH automation branches:
// UI specs: loadTestData(UC)          -> <UC>_testdata.json
// API/MIX specs: loadTestData(UC, { api: true }) -> <UC>_api_testdata.json (payload values may be objects).
// Reads the compiled JSON fixture (built from the data md by scripts/build-test-data.mjs)
// and reads credentials at runtime from project-config §4 by role.
// Passwords live ONLY in project-config — never in the fixture/spec/data-md.
//
// Configure paths via env (with sensible defaults — canonical cwd is the RUNNER ROOT docs/qc/automation/runner/):
//   TESTDATA_DIR     — folder holding <UC-ID>_testdata.json   (default: ../data — the automation root's data/)
//   PROJECT_CONFIG   — path to project-config.md              (default: ../../../qc-lead/project-config.md — docs/qc-lead/)

import fs from 'node:fs';
import path from 'node:path';

const TESTDATA_DIR = process.env.TESTDATA_DIR ?? '../data';            // runner root -> docs/qc/automation/data/
const PROJECT_CONFIG = process.env.PROJECT_CONFIG ?? '../../../qc-lead/project-config.md'; // runner root -> docs/qc-lead/

type Fixture = {
  uc: string;
  environment: string;
  config: Record<string, string>;
  accounts: Record<string, { role: string }>;
  variables: Record<string, Record<string, unknown>>;  // API payload fragments compile to objects
  preconditions: Record<string, { state: string; channel: string; tcs: string[]; check: string; confirmed: string }>;
};

// Parse the body rows (cells) of a markdown table under "## <heading>".
function tableUnder(md: string, heading: string): string[][] {
  const re = new RegExp(`##\\s+${heading}[^\\n]*\\n([\\s\\S]*?)(?:\\n##\\s|$)`);
  const block = md.match(re);
  if (!block) return [];
  return block[1]
    .split('\n').map(l => l.trim()).filter(l => l.startsWith('|'))
    .slice(2)
    .map(r => r.split('|').slice(1, -1).map(c => c.trim()));
}

export function loadTestData(ucId: string, opts?: { api?: boolean }) {
  const suffix = opts?.api ? '_api_testdata' : '_testdata';
  const fixturePath = path.join(TESTDATA_DIR, `${ucId}${suffix}.json`);
  if (!fs.existsSync(fixturePath)) {
    throw new Error(`Missing ${ucId}${suffix}.json — run: node scripts/build-test-data.mjs ${ucId}${opts?.api ? ' --api' : ''}`);
  }
  const fx: Fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
  const cfg = fs.readFileSync(PROJECT_CONFIG, 'utf8');

  return {
    /** Shared non-secret config values (e.g. test inbox). */
    config(key: string): string {
      const v = fx.config?.[key];
      if (v === undefined) throw new Error(`Missing config "${key}" in fixture (add it under ## Config).`);
      return v;
    },

    /** Per-test-case input variables (API payload fragments come back as objects). */
    vars(tcId: string): Record<string, any> {
      return fx.variables[tcId] ?? {};
    },

    /** Credentials for an account key — resolved from project-config §4 by role at runtime. */
    account(key: string): { username: string; password: string } {
      const entry = fx.accounts[key];
      if (!entry) throw new Error(`Unknown account key "${key}" in fixture.`);
      // project-config §4 row: | Account Type | Username/Email | Role Description | Password |
      const rows = tableUnder(cfg, 'Accounts & Credentials Structure')
        .concat(tableUnder(cfg, '4. Accounts & Credentials Structure'));
      const row = rows.find(r => r.some(c => c.includes(entry.role)));
      if (!row) throw new Error(`Role "${entry.role}" not found in project-config §4. Fill it in.`);
      const username = (row[1] ?? '').replace(/`/g, '').trim();
      const password = (row[3] ?? '').replace(/`/g, '').trim();
      if (!username || !password) throw new Error(`Account for role "${entry.role}" is missing username/password in project-config §4.`);
      return { username, password };
    },

    /** Base URL for the fixture's Environment — resolved from project-config §3; refuses PROD. */
    baseURL(): string {
      if (/prod/i.test(fx.environment)) throw new Error('Refusing to run against a production environment.');
      const rows = tableUnder(cfg, 'Environments').concat(tableUnder(cfg, '3. Environments'));
      const want = fx.environment.toLowerCase();
      const row = rows.find(r => (r[0] ?? '').toLowerCase().replace(/[*]/g, '').includes(want.split('/')[0]));
      const url = (row?.[1] ?? '').replace(/`/g, '').trim();
      if (!url) throw new Error(`No URL for environment "${fx.environment}" in project-config §3. Fill it in.`);
      if (/prod/i.test(url)) throw new Error('Resolved URL looks like production — refusing.');
      return url.replace(/\/$/, '');
    },

    preconditions: fx.preconditions,
  };
}
