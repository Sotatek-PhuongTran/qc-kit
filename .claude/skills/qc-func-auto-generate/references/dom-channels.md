# DOM Channel Resolution (tool-agnostic)

This skill is NOT bound to a single tool. At the start of a mode, pick an **available and convenient DOM-access channel** in the order below; record the chosen channel in `progress.md`.

## Resolution order

1. **Connected automation/Playwright MCP** — if the session has a browser-automation/Playwright MCP, use it (fast, DOM-aware, runs JS). Detect by checking whether `*playwright*` / browser-automation tools are available.
2. **Claude in Chrome** — if the user is on Chrome with the Claude in Chrome extension (`mcp__Claude_in_Chrome__*`): navigate to the URL, log in with the test account, read the DOM / accessibility tree to extract `role`/`label`/`text`/`testid`. **Best fit for a web app behind login (JS-rendered SPA).**
3. **Headless Playwright in the sandbox** — only if the URL is **reachable** from the run environment (not an internal staging behind a network boundary, not the user's localhost). Install/run Playwright via Node in the sandbox. Limitation: no access to the user's existing logged-in session.
4. **User runs a snippet, pastes the result** — final fallback: generate a short Playwright/JS snippet for the user to run locally and paste back the DOM / candidate locators; the agent derives the locator.

> Internal web app behind login (e.g. an Org Portal staging) → channel 2 (Claude in Chrome) is usually the right choice; channel 3 usually cannot reach it.

## If no channel is available

Do NOT fail silently. **Suggest and guide the user to install** a channel suited to the URL, then wait:

- Web behind login / SPA → recommend installing the **Claude in Chrome extension** (https://code.claude.com/docs/en/chrome) and opening the page in Chrome.
- Dedicated automation infra → recommend enabling the **Playwright MCP**.
- Static URL reachable from the sandbox → recommend allowing Playwright to be installed in the run environment.

After the user installs a channel, resume from the channel-resolution phase.

## Safety

- Crawl only **non-production** environments (verified in SKILL.md before opening the page).
- Under plain computer-use, browsers are at the "read" tier (visible but not clickable) → to interact/log in you must use the Claude in Chrome MCP.
- Never use a production account or credential.
