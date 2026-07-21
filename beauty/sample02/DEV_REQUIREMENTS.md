# 美容室ZOROYA（sample02）機能追加 要件定義書

## 概要

既存の `index.html`（712行・1ファイル完結型 美容室LP）に以下の機能を追加し、テンプレートの販売単価を¥180,000→¥280,000〜¥500,000に引き上げる。

### 対象ファイル

| ファイル | 説明 |
|---------|------|
| `store-designs/beauty/sample02/index.html` | 美容室ZOROYA LP（712行 1ファイル完結） |
| `store-designs/beauty/sample02/src/` | 画像フォルダ（fv.jpg, case-1~3.jpg, style-1~3.jpg, voice-1~3.jpg, profile.jpg, logo.png） |

### 技術スタック（現状）

| 項目 | 内容 |
|------|------|
| HTML | 単一ファイル（712行） |
| CSS | 内部スタイルシート（CSS変数・Grid・Flexbox） |
| JS | Vanilla JS + CDNのGSAP 3.12.5 / ScrollTrigger |
| フォント | Space Grotesk（英）＋Zen Kaku Gothic（日本語ゴシック）＋Shippori Mincho（日本語明朝） |
| 画像 | すべて`src/`フォルダ以下。プレースホルダ画像あり |

---

## 追加機能一覧（優先度順）

| 優先度 | 機能 | 想定工数 | 価格UP幅 |
|:-----:|------|:-------:|:--------:|
| 🔴 P0 | before/after比較スライダー | 2時間 | +¥50,000 |
| 🔴 P0 | LINE固定QRバナー | 30分 | +¥30,000 |
| 🔴 P0 | Googleマップ埋め込み＋営業時間セクション | 1時間 | +¥30,000 |
| 🟡 P1 | RESERVA予約iframe埋め込み | 30分 | +¥50,000 |
| 🟡 P1 | お客様の声カルーセル（動画対応） | 3時間 | +¥100,000 |
| 🟡 P1 | 施術例ギャラリーカテゴリフィルター | 2時間 | +¥50,000 |
| 🟢 P2 | SEO構造化データ（JSON-LD）追加 | 1時間 | +¥50,000 |
| 🟢 P2 | ブログ記事詳細ページ（CMS連携） | 4時間 | +¥150,000 |
| 🟢 P2 | カスタム404ページ | 1時間 | +¥30,000 |

---

## P0：最優先（この3つで+¥110,000）

### 1. before/after比較スライダー

**目的：** 施術前後の変化を直感的に伝え、「このサロンなら自分の悩みが解決できる」と確信させる

**実装仕様：**

```
セクション位置：既存の「cintro（intro）」と「zgal（gallery）」の間に新規挿入
セクションID：beforeafter
```

**UI仕様：**

```
+------------------------------------------------------------+
| [eyebrow] BEFORE / AFTER                                    |
|                                                            |
|     ┌─────────────────────────────┐                         |
|     │                             │                         |
|     │    BEFORE     │   AFTER     │                         |
|     │   (画像A)     │  (画像B)    │                         |
|     │               │             │                         |
|     │    ◀━━━━━●━━━━━▶           │  ← スライダーつまみ    |
|     │                             │                         |
|     └─────────────────────────────┘                         |
|                                                            |
| 症例1  症例2  症例3  ← 切り替えタブ（横並び）               |
+------------------------------------------------------------+
```

**技術仕様：**
- 画像2枚を左右に重ね、比較用のクリップ領域を`<input type="range">`（またはマウスドラッグ）で制御
- ベース画像（AFTER）をそのまま表示、BEFORE画像を左からclipで切り抜き
- スライダーつまみは白線＋中央の丸（直径28px・白・影付き）
- 複数症例の切り替えはJS配列で管理。クリックで画像切り替え＋スライダー位置リセット

**データ構造：**
```javascript
const beforeAfterData = [
  {
    id: 'case-1',
    before: 'src/before-1.jpg',
    after: 'src/after-1.jpg',
    label: 'ハイライトカラー'
  },
  {
    id: 'case-2',
    before: 'src/before-2.jpg',
    after: 'src/after-2.jpg',
    label: 'ブリーチカラー'
  },
  {
    id: 'case-3',
    before: 'src/before-3.jpg',
    after: 'src/after-3.jpg',
    label: '髪質改善'
  }
];
```

**画像要件：**
- before/after画像は各640×640px以上・同アスペクト比
- 新規に `src/before-1~3.jpg` `src/after-1~3.jpg` を作成

**HTML構造例：**
```html
<section class="cbeforeafter" id="beforeafter">
  <div class="wrap">
    <span class="eyebrow">Before / After</span>
    <h2 style="font-family:'Shippori Mincho',serif;font-weight:700;font-size:clamp(28px,4vw,46px);margin:12px 0 40px;">施術で、ここまで<span class="mk">変わる</span>。</h2>
    <div class="cba__comparison" id="cbaComparison">
      <div class="cba__imgwrap">
        <div class="cba__after"><img src="src/after-1.jpg" alt="施術後" id="cbaAfter"></div>
        <div class="cba__before" id="cbaBeforeLayer"><img src="src/before-1.jpg" alt="施術前"></div>
        <div class="cba__handle" id="cbaHandle">
          <div class="cba__line"></div>
          <div class="cba__knob"></div>
        </div>
        <input type="range" class="cba__range" id="cbaRange" min="0" max="100" value="50" aria-label="比較スライダー">
      </div>
    </div>
    <div class="cba__tabs" id="cbaTabs">
      <button class="cba__tab is-active" data-idx="0">ハイライト</button>
      <button class="cba__tab" data-idx="1">ブリーチ</button>
      <button class="cba__tab" data-idx="2">髪質改善</button>
    </div>
  </div>
</section>
```

**JSロジック：**
```javascript
(function(){
  var range = document.getElementById('cbaRange');
  var before = document.getElementById('cbaBeforeLayer');
  var handle = document.getElementById('cbaHandle');
  var wrap = document.querySelector('.cba__imgwrap');
  if (!range || !before || !handle) return;
  
  function update(pos) {
    before.style.clipPath = 'inset(0 ' + (100 - pos) + '% 0 0)';
    handle.style.left = pos + '%';
  }
  
  range.addEventListener('input', function(){ update(+this.value); });
  update(50);
  
  // タブ切り替え
  var tabs = document.querySelectorAll('.cba__tab');
  tabs.forEach(function(t, i){
    t.addEventListener('click', function(){
      tabs.forEach(function(x){ x.classList.remove('is-active'); });
      this.classList.add('is-active');
      document.getElementById('cbaBefore').src = 'src/before-' + (i+1) + '.jpg';
      document.getElementById('cbaAfter').src = 'src/after-' + (i+1) + '.jpg';
      range.value = 50;
      update(50);
    });
  });
})();
```

---

### 2. LINE固定QRバナー

**目的：** 「LINEで相談・予約する」導線を常時表示し、予約CV率を上げる

**実装仕様：**

```
表示位置：画面下部 固定（position: fixed）
高さ：60px（スマホ） / 70px（PC）
z-index: 100（ヘッダーより上）
背景色：グラデーション（#00B900 → #00D900）← LINEブランドカラー
```

**HTML構造（body直下、閉じタグ直前）：**
```html
<a class="line-banner" href="https://lin.ee/サロンID" target="_blank" rel="noopener">
  <span class="line-icon">💬</span>
  <span class="line-text">
    <strong>LINEで相談・予約する</strong>
    <small>画像を送るだけでもOK / 24時間受付</small>
  </span>
  <span class="line-arrow">→</span>
</a>
```

**CSS：**
```css
.line-banner {
  position: fixed; bottom: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: center; gap: 12px;
  padding: 12px 16px;
  background: linear-gradient(135deg, #00B900, #00D900);
  color: #fff !important;
  font-family: "Zen Kaku Gothic", sans-serif;
  text-decoration: none;
  box-shadow: 0 -4px 20px rgba(0,185,0,.35);
  transition: transform .3s ease;
}
.line-banner:hover { transform: translateY(-2px); }
.line-icon { font-size: 24px; }
.line-text { text-align: center; }
.line-text strong { font-size: 15px; display: block; }
.line-text small { font-size: 11px; opacity: .8; display: block; margin-top: 2px; }
.line-arrow { font-size: 18px; }
@media (min-width: 768px) {
  .line-banner { padding: 14px 24px; gap: 16px; }
}
body { padding-bottom: 60px; }
@media (min-width: 768px) { body { padding-bottom: 70px; } }
```

**注意点：**
- bodyに `padding-bottom` を追加し、バナーでコンテンツが隠れないようにする
- `href` は実際のLINE IDに差し替え可能なプレースホルダにしておく
- `position: fixed` のため、既存のフッターより後にHTML記述する

---

### 3. Googleマップ埋め込み＋営業時間セクション

**目的：** 現状フッターにしかない住所情報を独立セクション化し、来店のハードルを下げる

**実装仕様：**

```
セクション位置：既存の「cfaq（FAQ）」と「finalcta（CTA）」の間に新規挿入
セクションID：access
```

**HTML構造：**
```html
<section class="caccess" id="access">
  <div class="wrap">
    <span class="eyebrow">Access</span>
    <div class="caccess__grid">
      <div class="caccess__info">
        <h2 style="font-family:'Shippori Mincho',serif;font-weight:700;font-size:clamp(28px,4vw,46px);margin:12px 0 24px;">アクセス</h2>
        <table class="caccess__table">
          <tr><th>住所</th><td>東京都渋谷区○○ 1-2-3 ○○ビル2F</td></tr>
          <tr><th>TEL</th><td><a href="tel:03-0000-0000" style="color:var(--accent);text-decoration:none;font-weight:700;">03-0000-0000</a></td></tr>
          <tr><th>営業時間</th><td>10:00 – 20:00（最終受付 19:00）</td></tr>
          <tr><th>定休日</th><td>火曜日（祝日の場合は翌平日）</td></tr>
          <tr><th>アクセス</th><td>○○駅 徒歩5分 / △△駅 徒歩8分</td></tr>
        </table>
        <a class="btn primary" href="#contact" style="margin-top:24px;">LINEで予約する</a>
      </div>
      <div class="caccess__map">
        <div class="map-wrap" style="border-radius:12px;overflow:hidden;box-shadow:0 20px 50px -30px rgba(0,0,0,.4);">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!..." 
            width="100%" height="400" style="border:0;" 
            allowfullscreen="" loading="lazy">
          </iframe>
        </div>
      </div>
    </div>
  </div>
</section>
```

**CSS：**
```css
.caccess { padding: 120px 0; background: var(--paper); }
.caccess__grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 48px; align-items: center; margin-top: 24px; }
.caccess__table { width: 100%; border-collapse: collapse; }
.caccess__table th, .caccess__table td { padding: 16px 8px; border-bottom: 1px solid var(--line); text-align: left; font-size: 15px; }
.caccess__table th { width: 100px; font-weight: 700; color: var(--accent-deep); font-family: "Space Grotesk", monospace; font-size: 12px; letter-spacing: .1em; }
.caccess__table td { color: var(--body); }
.map-wrap iframe { filter: grayscale(0.3) invert(0.92); } /* ダークテーマ対応 */
@media (max-width: 768px) {
  .caccess__grid { grid-template-columns: 1fr; gap: 32px; }
  .caccess__map iframe { height: 280px; }
}
```

**注意点：**
- iframeの`src`はGoogleマップ埋め込みコードのプレースホルダにしておく
- `filter: grayscale(0.3) invert(0.92)` でダークテーマ対応（既存sample02の配色に合わせる）
- 電話番号はタップ発信に対応するため `tel:` リンクにする

---

## P1：次優先（実装推奨）

### 4. RESERVA予約iframe埋め込み

**目的：** 外部サイトへ離脱せずに予約完了できるようにする

**実装仕様：**
- 既存の `finalcta` セクションの手前に新規セクション追加
- セクションID：`reserve`
- 高さ600pxのRESERVA iframeを中央配置
- 対応していない場合のフォールバック文言を表示

```html
<section class="creserve" id="reserve" style="padding:100px 0;background:var(--paper);">
  <div class="wrap" style="text-align:center;">
    <span class="eyebrow">Reservation</span>
    <h2 style="font-family:'Shippori Mincho',serif;font-weight:700;font-size:clamp(28px,4vw,46px);margin:12px 0 40px;">ご予約はこちらから</h2>
    <div class="reserve-frame" style="max-width:800px;margin:0 auto;border-radius:12px;overflow:hidden;box-shadow:0 20px 60px -30px rgba(0,0,0,.3);">
      <iframe src="https://reserva.be/サロンID/reserve" width="100%" height="600" style="border:none;" loading="lazy"></iframe>
    </div>
    <p style="margin-top:24px;color:var(--muted);font-size:14px;">予約システム「RESERVA」を使用しています。初めての方も簡単に予約いただけます。</p>
  </div>
</section>
```

### 5. お客様の声カルーセル（動画対応）

**目的：** 静止画の口コミを動画にすることで信頼性を大幅向上

**実装仕様：**
- 既存の `cvoice` セクションをリプレース
- Swiper.js（CDN）を使用したカルーセル表示
- 縦9:16の動画を前提とした縦長カード
- 自動再生（muted）+ タップで拡大再生
- 動画がない場合は静止画+引用テキストで代替表示

```html
<!-- Swiper.js CDN -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js" defer></script>
```

**データ構造：**
```javascript
const voiceData = [
  {
    type: 'video', // 'video' or 'image'
    src: 'src/voice-movie-1.mp4',
    poster: 'src/voice-1.jpg',
    name: '30代 事務職の方',
    quote: '暗くても、重く見えない色に。'
  },
  // ...
];
```

### 6. 施術例ギャラリーカテゴリフィルター

**目的：** 既存のギャラリーにタブフィルターを追加し、ユーザーが目的の施術例を探しやすくする

**実装仕様：**
- 既存の `zgal` セクション内のグリッド上部にフィルタータブを追加
- カテゴリ：`すべて` / `カット` / `カラー` / `パーマ` / `トリートメント`
- 各ギャラリー画像に `data-category` 属性を追加
- クリックで `display:none` / `display:block` を切り替え（アニメーション任意）

---

## P2：プレミアム機能（単価UPに効く）

### 7. SEO構造化データ（JSON-LD）

**目的：** Google検索結果でのクリック率向上

**実装仕様：**
- `</head>` 直前に以下を追加
- サロン名・住所・電話番号・営業時間・料金情報を含める

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HairSalon",
  "name": "美容室ZOROYA",
  "image": "https://zoroya.example.com/src/fv.jpg",
  "url": "https://zoroya.example.com",
  "telephone": "03-0000-0000",
  "priceRange": "¥3,000〜¥20,000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "東京都渋谷区○○ 1-2-3",
    "addressLocality": "渋谷区",
    "addressRegion": "東京都",
    "postalCode": "150-0000",
    "addressCountry": "JP"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "10:00",
      "closes": "20:00"
    }
  ],
  "makesOffer": [
    {"@type":"Offer","name":"ハイライト","price":"6,600","priceCurrency":"JPY"},
    {"@type":"Offer","name":"ブリーチカラー","price":"13,200","priceCurrency":"JPY"},
    {"@type":"Offer","name":"カット","price":"7,700","priceCurrency":"JPY"}
  ]
}
</script>
```

### 8. ブログ記事詳細ページ

**目的：** SEO効果＋「更新してる感」で信頼UP

**実装仕様：**
- 新規ファイル `blog.html` を作成（index.htmlから分離）
- 既存のNEWSセクションの各行からリンク
- 静的HTMLで3記事分のサンプルを用意
- 記事テンプレートはindex.htmlのヘッダー・フッターを継承

### 9. カスタム404ページ

**目的：** 迷子ユーザーの離脱防止＋サロンの遊び心アピール

**実装仕様：**
- 新規ファイル `404.html` を作成
- スタイリストイラスト風SVG＋ユーモアあるメッセージ
- 「トップに戻る」「LINEで相談する」の2つの導線ボタン

---

## 実装順序（推奨ワークフロー）

```
Day 1: P0の3機能（before/after + LINE固定QR + Googleマップ）
         → この時点で¥180,000→¥280,000 の見積もり可能に

Day 2: P1の3機能（RESERVA + 動画口コミ + フィルター）
         → ¥280,000→¥400,000 の見積もり可能に

Day 3: P2の3機能（構造化データ + ブログ + 404）
         → ¥400,000→¥500,000 の見積もり可能に
```

---

## 注意事項・制約

1. **既存コードの破壊禁止**
   - 既存のセクション（cintro / brandband / cfeat / zgal / cvoice / cprice / cmsg / cnews / cfaq / finalcta / footer）は削除しない
   - 新機能は「追加」のみ。既存のclass名・id名と衝突しないこと

2. **画像プレースホルダ**
   - 新規追加する画像は `src/` フォルダに配置
   - 実画像がない場合は `placeholder.com` や `picsum.photos` のダミー画像で仮置き

3. **CDN読み込み**
   - Swiper.jsを追加する場合は既存のGSAP読み込みの近くに配置
   - `defer` 属性をつけてレンダリングブロックを防ぐ

4. **レスポンシブ対応**
   - すべての新機能は768px / 960px ブレークポイントでレイアウト崩れがないこと
   - タップ操作（モバイル）とマウス操作（PC）の両方で動作確認

5. **GSAP ScrollTriggerとの共存**
   - 新機能の要素も既存のGSAPリビールアニメーションの対象に含めること
   - `revealOnce` 関数を流用しても良いが、id重複に注意

---

## 納品物

| ファイル | 説明 |
|---------|------|
| `index.html` | 全機能を統合した完成ファイル |
| `blog.html` | ブログ記事詳細ページ（P2実装時のみ） |
| `404.html` | カスタム404ページ（P2実装時のみ） |
| `src/*.jpg` / `src/*.mp4` | 追加画像・動画ファイル |
| `README.md` | 変更履歴＋カスタマイズ手順書の更新 |

---

## 価格シミュレーション（完成時）

| プラン | 実装機能 | 販売価格 |
|:-----:|---------|:--------:|
| **S** | 現状のZOROYA（デュオトーン＋全セクション） | ¥180,000 |
| **S+** | S＋P0の3機能（before/after＋LINE固定QR＋マップ） | **¥280,000** |
| **M** | S+＋P1の3機能（RESERVA＋動画口コミ＋フィルター） | **¥400,000** |
| **L** | M＋P2の3機能（構造化データ＋ブログ＋404） | **¥500,000** |
| **L+保守** | L＋月1回更新＋サーバー管理 | ¥500,000 + ¥8,000/月 |

---

## 改訂履歴

| 日付 | バージョン | 変更内容 |
|:---:|:--------:|---------|
| 2026-07-20 | v1.0 | 初版作成 |

---
*本ドキュメントは美容室向けWEBテンプレート事業の一環として作成されました。*