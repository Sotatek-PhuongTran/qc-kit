# Project Context

## 1. Project Identity

- Project name:
- Project ID:
- Product/System name: 
- Release Version: 
- Project type: New build / Enhancement / Migration / Integration / Maintenance
- Domain:
- Product Platform Type: [Copy the matching value(s) from the table below. This field is MANDATORY because it drives test case design — different platforms have different test coverage rubrics. If the project ships on multiple platforms, list all values separated by commas.]

  | Value            | When to use                                                                                                                |
  |------------------|----------------------------------------------------------------------------------------------------------------------------|
  | `web-responsive` | Web app with responsive layout (covers desktop + tablet + mobile viewport widths from a single codebase).                  |
  | `web-static`     | Web app NOT responsive — desktop-first only (typical for internal back-office tools, admin panels, ERP screens).           |
  | `mobile-native`  | Native mobile app (Swift / Kotlin / React Native / Flutter / Xamarin) distributed via App Store / Play Store / enterprise. |
  | `mobile-hybrid`  | Mobile app rendered inside a WebView wrapped by a native shell (Cordova / Capacitor / Ionic / wrapped PWA).                |
  | `desktop-native` | Desktop app installed on Windows / macOS / Linux (Electron / .NET / WPF / WinUI / Qt / native Cocoa).                      |

## 2. Business Goal

Briefly describe why this project/release exists.

- Business goal:
- Problem/pain point:
- Success criteria:

## 3. Scope Summary
Briefly describe what will be tested (in scope) and what will not be tested (out of scope), including any assumptions or dependencies.

### In Scope

- 

### Out of Scope

- 

### Assumptions

- 

### Dependencies

- 

## 4. Users and Roles

| Role / Actor | Description | Key Permissions | Key Workflows |
|---|---|---|---|
|  |  |  |  |

## 5. System Overview

Briefly describe the system architecture and the number of sites, modules, and screens.
The detailed feature/UC list is maintained in the qc-dashboard file.

### Sites

| Full name | Abbreviation |
|---|---|
|  |  |

### QC Dashboard

- Path: <link to qc-dashboard.md resolved from path-registry>

## 6. Requirement Sources

| Source | Location | Notes |
|---|---|---|
| PRD/BRD/User stories |  |  |
| Wireframe/Figma |  |  |
| API spec |  |  |
| Business rules |  |  |
| Change log |  |  |

## 7. Quality Context

- Critical business flows:
- High-risk areas:
- NFR notes: Performance / Security / Compatibility / Accessibility / Logging
- Known constraints:

## 8. Environment Context

- Platform Coverage
> Purpose: Defines the browsers, operating systems, devices, and screen sizes that must be considered during testing.
- Test environments: DEV/QA/STG/PROD

## 9. QC Process Notes

- Test  levels:
- Entry criteria:
- Exit criteria:
- Defect workflow:
- Reporting expectations:

## 10. Open Questions

| ID | Question | Impact | Owner | Status |
|---|---|---|---|---|
| Q-001 |  |  |  | Open |
