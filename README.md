npm install -D @playwright/test

npx playwright install
npx playwright init

playwright.config.js
```js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // テストファイルのディレクトリ
  timeout: 30 * 1000, // 各テストのタイムアウト（30秒）
  expect: {
    timeout: 5000, // expect のタイムアウト
  },
  fullyParallel: true, // テストを並列実行
  retries: 0, // 失敗時のリトライ回数
  workers: undefined, // CPUコア数で自動決定

  reporter: [['html', { open: 'never' }]], // HTMLレポートの出力

  use: {
    baseURL: 'http://localhost:5173', // 開発サーバーのURL
    headless: true, // 非表示モード（falseでブラウザ表示）
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0,
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure', // 失敗時のみスクショ
    video: 'retain-on-failure',     // 失敗時のみ動画る
  },

  // スナップショット（スクリーンショット）保存先を変更
  snapshotPathTemplate: 'tests/screenshots/{testFilePath}/{arg}{ext}',

  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 16'] }, // SP対応確認
    },
  ],
});

```

ts.config.js, vite.config.tsに絶対パスの追記

ts.config.js
```js
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "types": ["node"]
  }
```


npm run dev
npx playwright show-report
npx playwright test --ui

### ビジュアル回帰テスト（Visual Regression Testing）

npx playwright test
screenshotsに保存される

差分があった場合
テストは 失敗

差分画像が test-results/ に生成される：

差分を更新（意図的な変更時）
```bash
npx playwright test --update-snapshots
```

### Playwright関連をひとまとめに

```js
// パスの変更
// スナップショット（スクリーンショット）保存先を変更
snapshotPathTemplate: 'tests/screenshots/{testFilePath}/{arg}{ext}',
// ✅ test-results の保存先を変更
outputDir: 'tests/test-results',

// ✅ HTMLレポートの出力、レポート出力先を変更
reporter: [['html', { outputFolder: 'tests/playwright-report', open: 'never' }]],
```

```json
"scripts": {
  "test:report": "npx playwright show-report tests/playwright-report"
}
```
