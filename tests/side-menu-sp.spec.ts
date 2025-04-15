import { test, expect, devices } from '@playwright/test';
import { login } from './helpers/login';

test.use({
  ...devices["iPhone 15 Pro"],
})

test("スマホ画面でサイドメニューが開く", async ({ page }) => {
  await page.goto("http://localhost:5173");

  // ログイン
  await page.getByPlaceholder('ユーザーID').fill('aaaa');
  await page.getByPlaceholder('パスワード').fill('1234');
  await page.getByRole('button', { name: 'ログイン' }).click();

  await page.getByTestId("menu-toggle-button").click()

  // サイドメニュー内の仮テキストが表示されていることを確認
  await expect(page.locator('text=メニュー項目1')).toBeVisible();
  await expect(page.locator('text=メニュー項目2')).toBeVisible();
})

test('SPでメニューを開いて閉じると非表示になる', async ({ page }) => {
  await login(page);

  // メニューボタンを押す（≡）
  await page.getByTestId('menu-toggle-button').click();

  // メニュー項目が見える（開いてる状態）
  await expect(page.getByTestId('side-menu')).toBeVisible();
  await expect(page.locator('text=メニュー項目1')).toBeVisible();

  // 「閉じる」ボタンを押す
  await page.getByTestId('menu-close').click();

// サイドメニューが非表示状態（translate-x-fullクラス）になっていることを確認
  await expect(page.getByTestId('side-menu')).toHaveClass(/-translate-x-full/);

});
