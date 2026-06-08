# Common Technical Guideline for Test Case Design

## Purpose

This guideline defines the common technical checklist for designing test cases across all product platform types.

Use this file as the baseline checklist for every screen, feature, workflow, or user story before applying platform-specific add-ons such as Web, Mobile, or Desktop.

## How to use

For each screen or feature:

1. Identify the product platform type.
2. Apply all 6 common phases in this file.
3. Add the relevant platform-specific guideline:
   - `web-technical.md`
   - `mobile-technical.md`
   - `desktop-technical.md`
4. Add business rules, role/permission matrix, data matrix, browser/device/OS matrix as needed.
5. Convert the checklist into concrete test cases with clear preconditions, steps, and expected results.

## Recommended test case fields

| Field | Description |
|---|---|
| Test Case ID | Unique ID, follow Rule 2 — Content Logic - `testcase-instruction-rules` |
| Platform Type | `web-static`, `web-responsive`, `mobile-native`, `mobile-hybrid`, `desktop-native` |
| Phase | Phase 1 to Phase 6 |
| Feature / Screen | Screen, module, or workflow under test |
| Test Objective | What the test case validates |
| Preconditions | Describe required User role/state, system/page state, test data/environment requirement |
| Test Data | Inputs, files, accounts, API mocks, boundary values |
| Steps | Clear execution steps |
| Expected Result | Observable and measurable expected behavior |
| Matrix | Browser, device, OS, breakpoint, permission, network condition |
| Priority | P0 / P1 / P2 |
| Test Type | Functional, UI, Integration, Security, Performance, Accessibility |
| Notes | Assumptions, constraints, out-of-scope items |

---

# 6-Phase Common Test Design Framework

## Phase 1: Initialization and Static States

Validate the screen or app state before the main user interaction starts.

### Empty state

Cover cases where no data is available.

- Empty grid, list, card, chart, table, report, or dashboard.
- Placeholder text or illustration is displayed correctly.
- Message is friendly and localized, for example `No Data`, `Không có dữ liệu`, or `Chưa có dữ liệu`.
- Primary CTA is displayed if the user is allowed to create data.
- CTA is hidden or disabled if the user has no permission.
- Layout does not collapse when there is no data.

### Populated state

Cover the default state when data exists.

- Default sort is correct.
- Default filter is correct.
- Default page size or item count is correct.
- Default selected tab, menu, segment, or category is correct.
- Default column order, visibility, and width are correct if applicable.
- Badge, count, status, and summary values are accurate.
- Component enabled/disabled state matches data and permission.

### Loading state

Cover loading and pending states.

- Skeleton, shimmer, spinner, overlay, or progress indicator is displayed.
- User does not see a blank screen or white-screen flash.
- Long-running jobs show progress if the design requires it.
- User cannot trigger duplicate actions while the request is pending.
- Loading state is cleared after success, failure, or cancellation.

### Error state

Cover recoverable and unrecoverable errors.

- 4xx error.
- 5xx error.
- Network timeout.
- Offline state.
- Permission or access denied.
- Malformed or partial server response.
- Error message is user-friendly and localized.
- Retry CTA is available when recovery is possible.
- The user is not navigated away unexpectedly on transient errors.
- Existing data is not lost unless explicitly expected.

### Permission-denied state

Apply when a feature depends on permission or access rights.

- User lacks business permission.
- User lacks OS permission.
- Permission is denied for the first time.
- Permission is permanently denied.
- Permission is revoked while the app is running.
- The system shows an explanation and a recovery action, such as `Open Settings`, `Request Access`, or `Contact Admin`.

---

## Phase 2: Component States and Basic Interactions

Validate individual UI components without focusing on the core business outcome yet.

### Navigation and reset controls

- Close icon `X` closes the popup, modal, drawer, or panel.
- Cancel button exits without saving.
- Reset filter restores default filters.
- Back action returns to the previous state as specified.
- Dismiss actions do not accidentally submit data.

### Buttons

- Enabled state.
- Disabled state.
- Pressed or active state.
- Loading state after click or tap.
- Debounce prevents repeated submission.
- Button label matches the action.
- Button visibility follows role and permission.

### Text input and form fields

- Default value.
- Placeholder.
- Read-only state.
- Disabled state.
- Focus state.
- Clear action if available.
- Copy, paste, select-all if allowed.
- Max length behavior.
- Auto-formatting behavior if applicable.

### Dropdown, combobox, and multi-select

- Component opens correctly.
- Correct option list is displayed.
- Search-as-you-type works if supported.
- Long option list handles scrolling or virtualization.
- Single select and multi-select behavior is correct.
- Clear selection works if available.
- Disabled options cannot be selected.
- Selected value is displayed correctly after save, refresh, or reopen.

### Checkbox, radio, toggle

- Default state is correct.
- Checked and unchecked behavior is correct.
- Radio group allows only one selected value.
- Toggle state persists after save or navigation if required.
- Indeterminate state is handled if applicable.

### Date, time, and date-time picker

- Manual input works if supported.
- Picker selection works.
- Cancel does not change the value.
- Date format is correct.
- Min and max date are enforced.
- Invalid date is rejected.
- Timezone handling is correct if relevant.

### Modal, popup, drawer, bottom sheet, dialog

- Opens from the correct trigger.
- Displays correct title, content, and actions.
- Close, Cancel, Save, Confirm actions behave correctly.
- Dismiss by outside click/tap, Esc, swipe-down, or OS back follows spec.
- Backdrop, overlay, and focus trap behave correctly.
- Nested modal behavior is defined and works correctly.

### Keyboard interaction

- Tab order is logical and complete.
- Focus indicator is visible.
- Enter submits only where expected.
- Esc closes modal or cancels only where expected.
- Arrow keys work for lists, menus, trees, grids, or dropdowns if supported.
- Keyboard-only users can complete the workflow.

---

## Phase 3: Core Functional Testing

Validate the business logic and functional outcome of each feature.

### Happy path

- Standard successful workflow with valid input.
- Save, create, update, delete, submit, approve, reject, search, export, import, or process works as expected.
- Success message, toast, navigation, or list refresh appears correctly.

### Required validation

- Leave each mandatory field empty.
- Leave all mandatory fields empty.
- Clear prefilled mandatory values.
- Required message is displayed near the correct field.
- Submit is blocked when required data is missing.

### Format validation

Apply to fields such as:

- Email.
- Phone number.
- Date.
- Time.
- URL.
- Tax code.
- ID number.
- Postal code.
- File name.
- File extension.
- Custom business format.

### Range and length validation

- Minimum value.
- Maximum value.
- Less than minimum.
- Greater than maximum.
- Minimum length.
- Maximum length.
- Special handling for decimal, negative number, zero, and large number.

### Boundary Value Analysis

For every field with a defined boundary, include at least:

- Min - 1.
- Min.
- Min + 1 if relevant.
- Max - 1 if relevant.
- Max.
- Max + 1.

### Cross-field validation

Examples:

- End date must be greater than or equal to start date.
- Discount cannot exceed total amount.
- Confirm password must match password.
- Selected role must be compatible with selected department.
- Status transition must match the current workflow state.

### Decision table and business rule combinations

Use when behavior depends on multiple conditions.

Examples:

- Role x status x action.
- Customer type x product type x approval level.
- Payment method x currency x country.
- Permission x data ownership x workflow state.

### Exception and error handling

- Server validation error.
- Duplicate data.
- Conflict or optimistic locking error.
- API timeout.
- API returns 4xx or 5xx.
- API returns malformed or partial data.
- External dependency fails.
- User cancels a required external step.

### Duplicate action prevention

- Double click.
- Double tap.
- Press Enter multiple times.
- Refresh during submission.
- Back and resubmit.
- Retry after timeout.

Expected behavior must prevent duplicate records, duplicate payments, duplicate requests, or inconsistent workflow state.

### Bulk operation

Apply if the feature supports multiple records.

- Select one item.
- Select multiple items.
- Select all on current page.
- Select all across pages if supported.
- Bulk approve, reject, delete, export, assign, import, or process.
- Partial success is displayed clearly.
- Failed records include reason and recovery option.

---

## Phase 4: Functional Integration

Validate how functions work together across components, screens, or systems.

### In-screen integration

- Search + filter.
- Search + sort.
- Filter + pagination.
- Sort + pagination.
- Search + filter + sort + pagination.
- Create/update/delete refreshes list, count, summary, and badges.
- Master-detail panel updates when a row or card is selected.
- Form submission redirects or stays on page according to spec.

### Cross-screen integration

- Back navigation preserves search, filter, pagination, and scroll position if required.
- Direct link opens the correct record or screen.
- Related screens receive updated data after changes.
- Previous screen does not show stale data after update.
- Unsaved changes warning appears when navigating away.

### Multi-session or multi-window integration

- Same record opened in two tabs, windows, devices, or app instances.
- Concurrent edit is detected.
- Conflict strategy is clear: last-write-wins, merge, or warning.
- User sees a meaningful message when data has changed elsewhere.

### Auth and session integration

- Token expiry during a workflow.
- Silent token refresh.
- Forced logout after idle timeout.
- User is redirected to login when session is invalid.
- User returns to the intended destination after re-authentication if supported.

### Notification and routing integration

Apply if the platform supports notification or deep link.

- Notification opens the correct screen.
- Deep link opens the correct screen and state.
- Direct URL or route works on cold start and warm start if relevant.
- Permission and authentication are checked before routing.

---

## Phase 5: Non-Functional Testing

Validate quality attributes that affect security, reliability, performance, and usability.

### Security

- Sensitive data is masked.
- Password fields are not displayed in plain text by default.
- Input is sanitized against XSS and injection attacks.
- State-changing actions are protected against CSRF where applicable.
- Role-based access controls hide or disable restricted actions.
- Restricted APIs cannot be called through UI manipulation.
- Sensitive data is not stored in insecure storage.
- Sensitive data is not exposed in logs, error messages, URL, local storage, clipboard, or screenshots.

### Performance

Define measurable targets per project.

- Initial render time.
- Time to interactive.
- Search response time.
- Save/submit response time.
- Grid/list rendering time.
- Export/import processing time.
- Memory consumption.
- CPU usage.
- Long-session stability.

### Network resilience

- Offline before opening the feature.
- Offline during submission.
- Slow network.
- Timeout.
- Reconnect after offline.
- Retry behavior.
- Request cancellation.
- Duplicate prevention after retry.

### UX and loading behavior

- Spinner or skeleton appears during API calls.
- Button loading state appears during submission.
- User cannot submit duplicate requests.
- Optimistic UI reverts on failure if used.
- Success, warning, and error messages are visible and understandable.
- Empty, loading, and error states are visually distinct.

### Data persistence

- Form draft preservation if required.
- User preferences persist correctly.
- Filter and sort state persist correctly if required.
- Logout clears sensitive local data.
- Refresh or relaunch behavior follows spec.

### Auditability and logging

Apply if the system handles sensitive or regulated actions.

- Sensitive action creates audit log.
- Log includes actor, action, timestamp, target object, and result.
- Log does not include PII or secrets.
- Error log is useful for diagnosis.

---

## Phase 6: GUI, Visual, Localization, and Accessibility

Validate design-to-code quality and accessibility.

### Design alignment

Compare with Figma, mockup, or design specification.

- Position.
- Size.
- Color.
- Font family.
- Font size.
- Font weight.
- Line height.
- Spacing.
- Border radius.
- Icon.
- Shadow.
- Empty-state illustration.

### Visual state coverage

- Default.
- Hover if applicable.
- Focus.
- Pressed.
- Selected.
- Disabled.
- Loading.
- Error.
- Success.

### Localization

- Vietnamese diacritics render correctly.
- Long Vietnamese labels do not truncate critical information.
- Long-string languages do not break layout if multi-language support exists.
- Date, time, number, currency, and address formats are correct.
- Error messages are translated consistently.

### Accessibility basics

- Color contrast meets WCAG AA for text where applicable.
- Form fields have labels.
- Images have alt text if meaningful.
- Interactive controls are reachable by keyboard or platform assistive technology.
- Focus order is logical.
- Focus indicator is visible.
- Error messages are associated with the correct fields.
- Screen reader labels are meaningful.
- Motion is reduced if user setting requires it.

---

# Output principle

A good test suite should not simply list UI objects. It should combine:

```text
Common 6 phases
+ Platform-specific risks
+ Business rules
+ Data matrix
+ Environment matrix
+ Clear expected results
```

