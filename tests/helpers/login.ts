import { Page, expect } from '@playwright/test';

export async function login(page: Page) {
  await page.goto('http://localhost:5173');

  await page.getByPlaceholder('ユーザーID').fill('aaaa');
  await page.getByPlaceholder('パスワード').fill('1234');
  await page.getByRole('button', { name: 'ログイン' }).click();

  // ログイン成功の目印を待つ（送信ボタンの存在）
  await expect(page.getByRole('button', { name: '送信' })).toBeVisible();
}
