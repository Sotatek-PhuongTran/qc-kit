// base-page.ts — shared base for all page objects (scaffolded into the project once).
import { Page } from '@playwright/test';

export abstract class BasePage {
  constructor(public readonly page: Page) {}
  /** Navigate to a route relative to the configured base URL. */
  async goto(route: string) { await this.page.goto(route); }
}
