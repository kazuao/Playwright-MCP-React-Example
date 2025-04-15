import { test, expect } from '@playwright/test';
import { login } from './helpers/login';

test('PC画面ではサイドメニューが常に表示されている', async ({ page }) => {
  await login(page);

  // ✅ ハンバーガーメニュー（≡）は表示されていない（md以上では非表示）
  await expect(page.getByTestId('menu-toggle')).toHaveCount(0);

  // ✅ サイドメニューが常に表示されている
  await expect(page.getByTestId('side-menu')).toBeVisible();

  // ✅ メニューの項目が見えていること
  await expect(page.locator('text=メニュー項目1')).toBeVisible();
});
