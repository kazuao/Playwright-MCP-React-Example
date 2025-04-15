import { test, expect } from '@playwright/test';

// test("ログイン画面のログイン", async ({ page }) => {
//   await page.goto("http://localhost:5173")

//   // await page.screenshot({ path: 'screenshots/login.png', fullPage: true });

//   // ユーザーID入力
//   await page.getByPlaceholder('ユーザーID').fill('aaaa');

//   // パスワード入力
//   await page.getByPlaceholder('パスワード').fill('1234');

//   // ログインボタン押下
//   await page.getByRole('button', { name: 'ログイン' }).click();

//   // 明示的にスクリーンショットを保存
//   // await page.screenshot({ path: 'screenshots/after-login.png', fullPage: true });

//   // チャット画面が表示されていることを確認（"送信" ボタンが見える）
//   await expect(page.getByRole('button', { name: '送信' })).toBeVisible();
// })

test('ログイン画面のビジュアルが変わっていない', async ({ page }) => {
  await page.goto('http://localhost:5173');

    // ここでビジュアルスナップショット比較
  await expect(page).toHaveScreenshot('true-login.png', { fullPage: true });

  await page.getByPlaceholder('ユーザーID').fill('aaaa');
  await page.getByPlaceholder('パスワード').fill('1234');
  await page.getByRole('button', { name: 'ログイン' }).click();

  // ここでビジュアルスナップショット比較
  await expect(page).toHaveScreenshot('true-chat.png', { fullPage: true });
});
