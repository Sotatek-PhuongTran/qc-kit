// source: recurring step sequence in <UC-ID> test cases / audited §6 workflow (generated <YYYY-MM-DD>)  ← incremental stamp
import { Page } from '@playwright/test';
import { ForgotPasswordPage } from '../pages/forgot-password.page';

// One function per reusable business flow (login, request reset...). Body = the recurring steps, expressed via page-object methods.
export async function requestPasswordResetLink(page: Page, { email }: { email: string }) {
  const forgot = new ForgotPasswordPage(page);
  await forgot.requestReset(email);
}
