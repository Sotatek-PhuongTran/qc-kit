# Global Rules

## Common
- SKIP all other knowledge, histories that not stored in this project.

## Language & Communication
- Communication language: Vietnamese is the default language for all chat exchanges and explanations.
- Output-file language follows the two-group law in `rules/qc-writting-rules.md` (§ Ngôn ngữ output): internal review documents (audited reports, api-audited, question backlogs, triage, plans, summaries) are ALWAYS Vietnamese; official project deliverables (test scenarios, test cases, test scripts, bug reports, execution reports) follow the project language (Vietnamese or English only, per `project-context-master` §3.0).
- All skill.md files MUST be written in English.
- All outputs MUST be written in a way that Junior QC readers can easily understand the content.
- All output file MUST follow the writting rules definded in `rules/qc-writting-rules.md`

## File & Naming Standards

- All output files MUST follow the naming convention defined in `rules/naming-convention.md`.
- NEVER overwrite a file. Create a new version instead (`v1`, `v2`, etc.).
- All files MUST include a header with: document title, date created, author/agent name, and version.
- Read the path-registry.md to find the path of the Input/Output files.

## Output Quality Standards

- Every output MUST be **evidence-based** — cite sources, reference specific sections of requirements.
- NEVER fabricate data, make up statistics, or assume requirements that are not documented.
- When uncertain, MUST explicitly state the uncertainty and ask the user for clarification.

## Think Before Coding
Don't assume. Don't hide confusion. Surface tradeoffs.

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## Simplicity First
Minimum code that solves the problem. Nothing speculative.

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.
- Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## Security & Privacy
- Data Security: NEVER share sensitive data (PII, passwords, proprietary code) with public models.
- NEVER store passwords or sensitive credentials in any output file.

## Agent Work Log

- Every skill (EXCEPTION: `qc-start` — read-only concierge, writes nothing incl. worklog) MUST log to its device's JSONL file under `worklog-per-device` (resolve path via `path-registry.md`). If the folder / README / JSONL file does not exist yet, BOOTSTRAP them: create the folder and copy the README from the kit template `.claude/skills/qc-get-work-log/templates/agent-work-log.local-README.template.md`, then create the JSONL. Schema and lifecycle: see that README (`docs/qc-lead/agent-work-log.local/README.md`). Do NOT write directly to the master `agent-work-log` — that is owned exclusively by `qc-get-work-log`.