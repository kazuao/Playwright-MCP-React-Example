import { test, expect } from '@playwright/test';

test.describe('バリデーションテスト', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  })


  test('ユーザーID・パスワード未入力でログインできない', async ({ page }) => {
    await page.getByRole('button', { name: 'ログイン' }).click();

    await expect(page.getByTestId('error-message')).toContainText('IDを入力してください');
    await expect(page.getByTestId('error-message')).toContainText('パスワードを入力してください');
  });

  test('メールアドレスが不正な形式のとき', async ({ page }) => {
    await page.fill('[data-testid="email-input"]', 'example.com');
    await page.getByRole('button', { name: '送信' }).click();

    await expect(page.getByTestId('error-message')).toContainText('有効なメールアドレスを入力してください');
  });

  test('電話番号に数字以外が含まれているとき', async ({ page }) => {
    await page.fill('[data-testid="tel-input"]', '03-1234-567A');
    await page.getByRole('button', { name: '送信' }).click();

    await expect(page.getByTestId('error-message')).toContainText('有効な電話番号を入力してください');
  });

  test('パスワードが短すぎるとき', async ({ page }) => {
    await page.fill('[data-testid="password-input"]', '12');
    await page.getByRole('button', { name: '送信' }).click();

    await expect(page.getByTestId('error-message')).toContainText('パスワードは6文字以上で入力してください');
  });
});
