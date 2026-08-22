# Portfolio Site — Next.js

## ディレクトリ構成（App Router）

```
portfolio-site/
├── app/
│   ├── layout.tsx          ← ← ← layout.tsx をここに配置
│   ├── page.tsx            ← ← ← page.tsx をここに配置
│   └── globals.css         ← ← ← globals.css をここに配置
├── components/
│   ├── LoadingScreen.tsx   ← ← ← LoadingScreen.tsx をここに配置
│   └── ScrollBackground.tsx← ← ← ScrollBackground.tsx をここに配置
├── next.config.js
├── package.json
└── tsconfig.json
```

## セットアップ手順

```bash
# 1. Next.jsプロジェクトを作成（既存プロジェクトにいれる場合はスキップ）
npx create-next-app@latest portfolio-site --typescript --no-tailwind --no-eslint --src-dir=false --app --import-alias="@/*"

# 2. ファイルを上記のディレクトリ構成に配置

# 3. 開発サーバー起動
cd portfolio-site
npm run dev
# → http://localhost:3000
```

## VanillaJS 版

Next.js に依存しないコピーを `vanilla/` に用意しています。`vanilla/index.html` をブラウザで直接開くか、プロジェクトのルートで次のコマンドを実行してください。

```bash
npx serve vanilla
# → http://localhost:3000
```

`vanilla/` の構成は `index.html`・`styles.css`・`svg.css`・`script.js` です。ローディング画面、スクロール連動の昼夜テーマ、天体・天秤 SVG 背景、ナビゲーション、カードのホバー表示を VanillaJS で再現しています。

## Cloudflare Pages へのデプロイ

このサイトは静的書き出しに対応しているため、Cloudflare Pages の Git 連携でデプロイできます。

### ローカルで確認

```bash
npm install
npm run build
npx serve out
# → http://localhost:3000
```

### Cloudflare Pages の設定

Cloudflare Dashboard の **Workers & Pages** → **Create application** → **Pages** → **Connect to Git** から、このリポジトリを選択し、次の値を設定します。

| 項目 | 値 |
|---|---|
| Framework preset | `Next.js (Static HTML Export)` |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node.js version | `20` |

保存すると、Git push のたびに自動デプロイされます。独自ドメインは Pages プロジェクトの **Custom domains** から追加できます。

### Git を使わない場合

```bash
npm install
npm run build
npx wrangler pages deploy out --project-name <project-name>
```

Wrangler の初回実行時は Cloudflare へのログインとプロジェクト作成を求められます。

## 実装済み機能

| 機能 | 実装 |
|---|---|
| ローディング画面 円環タイムバー | `LoadingScreen.tsx` — 3層同心円環 + 進行arc |
| スクロール連動昼夜トランジション | `page.tsx` scrollRatio → `rgb()` 補間 |
| 天体・天秤・円環グラフィック | `ScrollBackground.tsx` — SVG固定背景 |
| 大理石テクスチャオーバーレイ | `page.tsx` + `LoadingScreen.tsx` — SVG feTurbulence |
| レスポンシブレイアウト | `globals.css` media queries |
| Playfair Display セリフ体 | `layout.tsx` Next.js Font最適化 |

## カラーシステム

```
Day   #F5F0E8 (クリーム) / #1A1610 (インク)
Night #0D0C0A (深黒)     / #EDE8DE (クリームテキスト)
Gold  #C9A84C (アクセント) — スクロール深度と共に濃く
```

## 次のステップ

- [ ] `Works` の詳細ページ追加 (`app/works/[slug]/page.tsx`)
- [ ] `Development Process` 各ページの詳細記述
- [ ] アナリティクスデータの実数値に差し替え
- [ ] GitHub / LinkedIn の href 設定
- [ ] OG画像の生成 (`app/opengraph-image.tsx`)
- [ ] Vercel デプロイ設定
