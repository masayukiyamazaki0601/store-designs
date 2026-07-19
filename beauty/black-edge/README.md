# BLACK EDGE — Men's Hair Salon Template

## 概要

メンズ美容室向けダークテーマWEBサイトテンプレート。
Blacksmith Roastery（カフェテンプレート）のデザインシステムを美容室向けに最適化。

## デザイン仕様

| 項目 | 内容 |
|------|------|
| **テイスト** | Black Edge（黒基調・無骨・スタイリッシュ） |
| **ターゲット** | メンズ美容室・バーバー・スタイリッシュ系サロン |
| **カラーパレット** | 黒(#0a0908) / 真鍮(#C5A55A) / クリーム(#ece4d6) |
| **フォント** | Oswald（見出し） + Noto Sans JP（本文） + JetBrains Mono（アクセント） |
| **特徴** | カスタムカーソル / ノイズテクスチャ / パララックス / スクロールリビール |

## セクション構成（12セクション）

| # | セクション | 内容 |
|:-:|-----------|------|
| 01 | CONCEPT | サロンのこだわり・理念＋実績数値 |
| 02 | MENU & PRICE | 施術メニュー一覧＋料金（8メニュー） |
| 03 | WORKS | ギャラリー（6点） |
| 04 | TEAM | スタッフ紹介（3名） |
| 05 | VOICE | お客様の声（4件） |
| 06 | ACCESS | 住所＋Googleマップ＋営業時間 |
| 07 | FAQ | よくある質問（アコーディオン） |
| 08 | INSTAGRAM | Instagramフィード連携 |
| 09 | RESERVE | RESERVA予約iframe埋め込み |
| 10 | CONTACT | お問い合わせフォーム |

## カスタマイズ手順

### 1. 画像差し替え
`images/` フォルダ内の画像を実際のサロン写真に差し替えてください。

| ファイル | 推奨サイズ | 用途 |
|---------|:---------:|------|
| hero.jpg | 1920×1080以上 | ファーストビュー背景 |
| concept.jpg | 800×1000 | コンセプトセクション画像 |
| gallery-1~6.jpg | 800×1000 | 施術事例ギャラリー |
| staff-1~3.jpg | 400×400 | スタッフ写真 |

### 2. サロン情報の変更
HTML内の以下のプレースホルダーを実際の情報に書き換えてください。

- **サロン名**: `BLACK EDGE` → 実際のサロン名
- **住所**: `東京都渋谷区○○ 1-2-3` → 実際の住所
- **電話番号**: `03-0000-0000` → 実際の電話番号
- **メールアドレス**: `info@blackedge-hair.com` → 実際のメールアドレス
- **営業時間**: `10:00 - 20:00` → 実際の営業時間
- **定休日**: `月曜` → 実際の定休日
- **駅からのアクセス**: `○○駅 徒歩3分` → 実際のアクセス

### 3. Googleマップ埋め込み
```html
<iframe src="https://www.google.com/maps/embed?pb=あなたのGoogleマップID" ...></iframe>
```

**取得手順:**
1. Googleマップで店舗名を検索
2. 「共有」→「地図を埋め込む」をクリック
3. 表示されたiframeコードをコピーして `map-box` 内にペースト

### 4. RESERVA予約フォーム連携
```html
<iframe src="https://reserva.be/あなたのサロンID/reserve" ...></iframe>
```

**設定手順:**
1. RESERVA管理画面にログイン
2. 「埋め込み」→「予約フォーム」のタグをコピー
3. `reserva-frame` 内のiframe `src` を置き換え

### 5. Instagram連携
- `#instagram` セクション内の `@blackedge_hair` を実際のアカウント名に変更
- `href="https://www.instagram.com/blackedge_hair/"` のURLを実際のプロフィールURLに変更
- 画像URLを実際のInstagram投稿画像に差し替え

### 6. カスタムカーソルの無効化（必要な場合）
表計算やフォーム入力時にカーソルが邪魔な場合は、CSSの該当部分を削除してください。
```css
.cursor, .cursor-dot { display: none; }
body { cursor: auto; }
```

## ファイル構成

```
beauty/black-edge/
├── index.html          # メインページ（1ページLP形式）
├── images/             # 画像フォルダ
│   ├── hero.jpg
│   ├── concept.jpg
│   ├── gallery-1~6.jpg
│   └── staff-1~3.jpg
└── README.md           # このファイル
```

## 技術スタック

- HTML5
- CSS3（Flexbox / Grid / カスタムプロパティ）
- Vanilla JavaScript（IntersectionObserver / パララックス / カスタムカーソル）
- Google Maps iframe
- RESERVA埋め込み

## 価格プラン

| プラン | 内容 | 価格 |
|:-----:|------|:----:|
| 💎 S | テンプレート＋画像差し替え＋RESERVA連携 | ¥150,000 |
| 💎💎 M | S＋スタッフ紹介・口コミ・FAQ追加 | ¥350,000 |
| 💎💎💎 L | M＋アニメーション・ブログ・月額保守込み | ¥600,000 |

---

© 2026 BLACK EDGE — Men's Hair Salon Template