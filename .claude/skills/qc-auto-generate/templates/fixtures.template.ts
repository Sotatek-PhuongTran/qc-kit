// portals/<portal>/fixtures.ts — portal-level fixtures (optional). Extend Playwright's test here when
// a portal needs shared setup (e.g. an authenticated browser context). For simple pages, specs use
// loadTestData().baseURL() directly and can skip this.
import { test as base, expect } from '@playwright/test';
export const test = base;           // extend with portal fixtures as needed
export { expect };
