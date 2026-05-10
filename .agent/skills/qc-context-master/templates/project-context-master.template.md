# project-context-master.md template

Use this template to create `project-context-master.md`. Keep sections that are useful for the project and mark unknown content as `TBD`, `Assumption`, or `Open question` instead of inventing facts.

---

# Project Context Master: [Project name]

**Status:** Draft - needs user review  
**Generated date:** [YYYY-MM-DD]  
**Prepared by:** QC Context Master Agent  
**Reviewed by:** [Name / TBD]  
**Approved source of truth:** [Document or system / TBD]

## 0. How other agents should use this file

Read this file before reading feature-specific requirements. Use it as the project orientation and reading guide, not as the final source of truth until it is reviewed and approved by the user.

When information conflicts, apply this order unless the project says otherwise:

1. Latest approved source-of-truth requirement document.
2. Latest approved change request or release note.
3. Latest mapping workbook / document mapping.
4. This `project-context-master.md`.
5. Agent assumptions, which must be explicitly marked and confirmed.

Do not use this file to replace detailed requirement, wireframe, API, or test design documents. Use it to understand context, terminology, scope, common rules, and where to read next.

## 1. Source inventory

| Source ID | Document / artifact | Type | Version / date | Status | Path / link | Related readiness ID | Notes |
|---|---|---|---|---|---|---|---|
| SRC-001 | [Name] | [BRD/PRD/Wireframe/API/etc.] | [Version/date] | [Draft/Approved/Outdated/TBD] | [Path/link] | [AD-xxx] | [Notes] |

## 2. Context readiness summary

| Readiness group | Status | Confidence | Key available information | Main gaps / questions |
|---|---|---:|---|---|
| System context | [Ready/Partially ready/Not ready/Conflict/N/A] | [% or Low/Medium/High] | [Summary] | [Gaps] |
| Requirement source & mapping | [Status] | [Confidence] | [Summary] | [Gaps] |
| Functional behavior & common rules | [Status] | [Confidence] | [Summary] | [Gaps] |
| Data, permission & state | [Status] | [Confidence] | [Summary] | [Gaps] |
| Integration, NFR & environment | [Status] | [Confidence] | [Summary] | [Gaps] |
| Test readiness & control | [Status] | [Confidence] | [Summary] | [Gaps] |

## 3. Business context

### 3.1 Project goal

[Summarize the project's objective and expected outcome.]

**Sources:** [SRC-xxx]

### 3.2 Problem / pain point

[Summarize the customer/user pain point the system solves.]

**Sources:** [SRC-xxx]

### 3.3 Success criteria / KPI

| Success criterion | Measurement | Target | Source | Notes |
|---|---|---|---|---|
| [Criterion] | [Metric] | [Target/TBD] | [SRC-xxx] | [Notes] |

## 4. Users, actors, and stakeholders

| Actor / stakeholder | Type | Role in system/process | Key permissions / responsibility | Related modules | Source |
|---|---|---|---|---|---|
| [Actor] | [End user/Admin/Ops/External system/etc.] | [Role] | [Responsibility] | [Module] | [SRC-xxx] |

## 5. Scope and release context

### 5.1 In scope

| Scope item | Module / feature | Priority | Release / phase | Source | Notes |
|---|---|---|---|---|---|
| [Item] | [Module/feature] | [Priority] | [Release] | [SRC-xxx] | [Notes] |

### 5.2 Out of scope / deferred

| Item | Reason | Deferred to | Source | Notes |
|---|---|---|---|---|
| [Item] | [Reason] | [Release/TBD] | [SRC-xxx] | [Notes] |

### 5.3 Assumptions, dependencies, and constraints

| Type | Description | Impact on QC | Owner | Status | Source |
|---|---|---|---|---|---|
| [Assumption/Dependency/Constraint] | [Description] | [Impact] | [Owner/TBD] | [Open/Confirmed/Closed] | [SRC-xxx] |

## 6. System landscape and structure

### 6.1 System / portal overview

| Portal / site / app | Purpose | User groups | Main modules | Notes | Source |
|---|---|---|---|---|---|
| [Portal] | [Purpose] | [User groups] | [Modules] | [Notes] | [SRC-xxx] |

### 6.2 Module -> screen -> feature -> use case map

| Portal | Module | Screen | Feature | Actor / role | Use Case ID | Use case name | Use case status | Wireframe ID | Wireframe status | Test case status | Source / notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [Portal] | [Module] | [Screen] | [Feature] | [Role] | [UC-xxx] | [Name] | [Ready/TBD] | [WF-xxx] | [Ready/TBD] | [Not exist/Existed/Executed/TBD] | [Notes] |

## 7. Main E2E flows / business processes

| Flow ID | Flow name | Trigger | Main actor(s) | Start state | End state / output | Modules involved | Data handoff | Source |
|---|---|---|---|---|---|---|---|---|
| FLOW-001 | [Name] | [Trigger] | [Actor] | [Start] | [End/output] | [Modules] | [Data] | [SRC-xxx] |

### 7.1 Flow notes

[Describe important happy paths, handoffs, and high-risk process points.]

## 8. Requirement source of truth and change control

| Requirement source | What it controls | Latest version / date | Owner | How to use it | Source |
|---|---|---|---|---|---|
| [Source] | [BRD/AC/API/WF/etc.] | [Version/date] | [Owner] | [Usage rule] | [SRC-xxx] |

### 8.1 Changelog / recent changes

| Change ID | Date | Summary | Impacted module/use case | Impact level | Source | Notes |
|---|---|---|---|---|---|---|
| CHG-001 | [Date] | [Summary] | [Module/UC] | [High/Medium/Low] | [SRC-xxx] | [Notes] |

## 9. Glossary and domain dictionary

| Term / object / field / status | Meaning | Synonyms / abbreviations | Where used | Source |
|---|---|---|---|---|
| [Term] | [Meaning] | [Synonyms] | [Module/flow] | [SRC-xxx] |

## 10. Common functional rules

### 10.1 Validation and input rules

| Rule ID | Applies to | Rule | Error / message | Source | Notes |
|---|---|---|---|---|---|
| RULE-001 | [Field/screen/common] | [Rule] | [Message/TBD] | [SRC-xxx] | [Notes] |

### 10.2 Common UI behavior

| Behavior | Applies to | Expected behavior | Source | Notes |
|---|---|---|---|---|
| Search/filter/sort/pagination | [Screens/modules] | [Behavior] | [SRC-xxx] | [Notes] |
| Empty/loading/no result states | [Screens/modules] | [Behavior] | [SRC-xxx] | [Notes] |
| Success/error/warning/confirm messages | [Screens/modules] | [Behavior] | [SRC-xxx] | [Notes] |

### 10.3 Authentication, authorization, and session

| Rule | Expected behavior | Impacted roles/modules | Source | Notes |
|---|---|---|---|---|
| [Rule] | [Behavior] | [Roles/modules] | [SRC-xxx] | [Notes] |

## 11. Data, state, and permissions

### 11.1 Entity / object model

| Entity / object | Description | Key fields | Relationships | Lifecycle / retention | Source |
|---|---|---|---|---|---|
| [Entity] | [Description] | [Fields] | [Relationships] | [Lifecycle] | [SRC-xxx] |

### 11.2 Status transition

| Object | Current status | Action | Actor / role | Condition | Next status | Side effects | Source |
|---|---|---|---|---|---|---|---|
| [Object] | [Status] | [Action] | [Role] | [Condition] | [Next status] | [Effect] | [SRC-xxx] |

### 11.3 Permission, editability, and visibility

| Role | Module / feature | Action | Allowed? | Field editability / visibility | Data visibility rule | Source |
|---|---|---|---|---|---|---|
| [Role] | [Module/feature] | [Action] | [Yes/No/Conditional] | [Editable/Readonly/Hidden] | [Own/team/org/all/etc.] | [SRC-xxx] |

### 11.4 Concurrency / conflict behavior

| Scenario | Expected behavior | Message / recovery | Source | Notes |
|---|---|---|---|---|
| Multiple users update same record | [Behavior] | [Message/recovery] | [SRC-xxx] | [Notes] |

## 12. Integrations, APIs, jobs, reports, and notifications

| Item ID | Type | Name | Trigger | Input / output | Sync mode | Timeout/retry/fallback | Owner/system | Test readiness | Source |
|---|---|---|---|---|---|---|---|---|---|
| INT-001 | [API/Integration/Job/Report/Import/Export/Notification/Audit] | [Name] | [Trigger] | [I/O] | [Sync/Async/Batch] | [Rule] | [Owner] | [Ready/Partial/Not ready] | [SRC-xxx] |

## 13. Non-functional requirements and environment

### 13.1 NFR summary

| NFR type | Requirement / target | Scope | Pass/fail criteria | Source | Notes |
|---|---|---|---|---|---|
| Performance | [Response time/CCU/etc.] | [Scope] | [Criteria] | [SRC-xxx] | [Notes] |
| Security | [Requirement] | [Scope] | [Criteria] | [SRC-xxx] | [Notes] |
| Compatibility | [Browser/OS/device] | [Scope] | [Criteria] | [SRC-xxx] | [Notes] |

### 13.2 Test environment and configuration

| Environment | URL / access method | Build / version | Config / feature flag | Integration mode | Status | Source |
|---|---|---|---|---|---|---|
| [Env] | [URL/process] | [Build] | [Config] | [Sandbox/Mock/Real/TBD] | [Ready/Not ready] | [SRC-xxx] |

## 14. Test readiness controls

### 14.1 Test data and accounts

| Data/account need | Scenario covered | Role/status/data condition | Source / owner | Status | Notes |
|---|---|---|---|---|---|
| [Need] | [Scenario] | [Condition] | [Owner/source] | [Ready/Partial/Missing] | [Notes] |

### 14.2 Risk, priority, and regression guidance

| Area | Priority / risk | Reason | Suggested QC focus | Regression note | Source |
|---|---|---|---|---|---|
| [Module/feature/flow] | [High/Medium/Low] | [Reason] | [QC focus] | [Regression scope] | [SRC-xxx] |

### 14.3 Defect workflow and evidence rules

| Rule | Description | Applies to | Source | Notes |
|---|---|---|---|---|
| [Rule] | [Description] | [Scope] | [SRC-xxx] | [Notes] |

## 15. Reading guide for other agents

| Agent task | Read this context section first | Then read these source documents | Required checks before output | Notes |
|---|---|---|---|---|
| Test plan generation | Sections 1-8, 12-14 | [Source docs] | Confirm scope, risk, environment, test data | [Notes] |
| Use case test case design | Sections 6, 9-12, 14 | Use case detail, wireframe, API/data/permission docs | Confirm preconditions, main/alt/exception flows, expected results | [Notes] |
| API test design | Sections 8, 11-12, 13 | API/integration specs, data mapping | Confirm auth, schema, error, timeout/retry | [Notes] |
| UI test design | Sections 6, 9-10, 11 | Wireframes, UI rules, message catalog | Confirm validations, UI states, permissions | [Notes] |
| NFR test planning | Sections 12-14 | NFR, environment, monitoring/logging docs | Confirm measurable pass/fail criteria | [Notes] |
| Change impact analysis | Sections 6, 8, 11-12, 14 | Changelog, previous context/test plan/test cases | Compare old vs new and update re-test/regression scope | [Notes] |

## 16. Open questions and decisions needed

| ID | Question / decision needed | Impact if unresolved | Owner | Priority | Due date | Status | Source |
|---|---|---|---|---|---|---|---|
| OQ-001 | [Question] | [Impact] | [Owner/TBD] | [High/Medium/Low] | [Date/TBD] | [Open] | [SRC-xxx] |

## 17. Assumptions made by the agent

| ID | Assumption | Why made | Impact if wrong | Needs confirmation from | Status |
|---|---|---|---|---|---|
| ASM-001 | [Assumption] | [Reason] | [Impact] | [Owner/TBD] | [Open/Confirmed/Rejected] |

## 18. Review checklist for the user

- [ ] Business goal and pain point are correct.
- [ ] Actors, stakeholders, and responsibilities are correct.
- [ ] Scope and out-of-scope are correct for the target release.
- [ ] System/module/screen/feature/use case mapping is correct.
- [ ] Main E2E flows are correct.
- [ ] Source of truth and change control rules are correct.
- [ ] Common validation/UI/message/auth rules are correct.
- [ ] Data, status, permission, and visibility rules are correct.
- [ ] Integrations, jobs, reports, notifications, and NFR are correct.
- [ ] Environment, test data, accounts, and regression guidance are correct.
- [ ] Open questions and assumptions are acceptable or assigned.
