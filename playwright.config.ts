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


  use: {
    baseURL: 'http://localhost:5173', // 開発サーバーのURL
    headless: true, // 非表示モード（falseでブラウザ表示）
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0,
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure', // 失敗時のみスクショ
    video: 'retain-on-failure',     // 失敗時のみ動画る
  },

  // パスの変更
  // スナップショット（スクリーンショット）保存先を変更
  snapshotPathTemplate: 'tests/screenshots/{testFilePath}/{arg}{ext}',
  // ✅ test-results の保存先を変更
  outputDir: 'tests/test-results',

  // ✅ HTMLレポートの出力、レポート出力先を変更
  reporter: [['html', { outputFolder: 'tests/playwright-report', open: 'never' }]],

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
