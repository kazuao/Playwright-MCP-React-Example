import { test, expect } from '@playwright/test';
import { login } from './helpers/login';

test("チャット画面でのメッセージ送信", async ({ page }) => {
  await login(page);

  // メッセージ入力
  await page.getByPlaceholder("メッセージを入力...").fill("こんにちは")

  // 送信ボタンをクリック
  await page.getByRole("button", { name: "送信" }).click()

  // 自分のメッセージ
  // await expect(page.locator("text=こんにちは")).toBeVisible() // 複数一致を許さない形式
  await expect(page.getByTestId("user-message")).toHaveText("こんにちは")

  // レスポンスメッセージ
  // await expect(page.getByText("こんにちはですね！")).toBeVisible()
  await expect(page.getByTestId("bot-message")).toHaveText("こんにちは ですね！")
})
