---
trigger: always_on
---

##Common
- SKIP all other knowledge, histories that not stored in this project.
- If there is any ambiguity in the user's prompt, DO NOT attempt to guess; HAVE TO ask the user for clarification to obtain complete information.

## Language & Communication
- Communication language: Vietnamese is the default language for all exchanges, reports, and explanations.
- All outputs of any "skill" MUST be determined by the source input language according to the following logic:
    - IF Input Language is Vietnamese THEN Output Language is Vietnamese.
    - IF Input Language is Any other language THEN Output Language is English.
- All skill.md files MUST be written in English.
- All labels/messages MUST be kept in their original language (e.g., Korean, Japanese, Chinese, etc.) and annotated with the English translation in parentheses, except when they are written in Vietnamese.
- All requirement documents, input materials, and output deliverables are in Vietnamese. MUST read and understand them accurately, write in grammatically correct Vietnamese, and preserve the clarity, naturalness, and integrity of the Vietnamese language.

## File & Naming Standards

- All output files MUST follow the naming convention defined in `rules/naming-convention.md`.
- NEVER overwrite a file. Create a new version instead (`v1`, `v2`, etc.).
- All files MUST include a header with: document title, date created, author/agent name, and version.
- Read the path-registry.md to find the path of the Input/Output files.

## Output Quality Standards

- Every output MUST be **evidence-based** — cite sources, reference specific sections of requirements.
- NEVER fabricate data, make up statistics, or assume requirements that are not documented.
- When uncertain, MUST explicitly state the uncertainty and ask the user for clarification.

## Agent Boundaries

- Agent MUST focus **strictly** on its own responsibilities.
- Agent must NEVER perform tasks assigned to another agent's role.

## Error Handling

- If an agent encounters an error or ambiguity, it MUST stop and report to the user.
- Do not make assumptions to "fill gaps" in requirements or documents.
- The Agent MUST log all issues, conflicts, or missing information in the output report.

## Security & Privacy
- Data Security: NEVER share sensitive data (PII, passwords, proprietary code) with public models.
- NEVER store passwords or sensitive credentials in any output file.

## Agent Work Log

- Whenever a skill is executed, the agent MUST append a log row to the `agent-work-log` file (look up the `logical-name` in `path-registry.md` for the actual path).