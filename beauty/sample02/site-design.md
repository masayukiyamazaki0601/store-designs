# Site Design Canon

## Strategy

### Persona

名前は「ミナ」、29歳、都内勤務。服やメイクは好きだが、髪だけが無難なままで垢抜けきれないと感じている。Instagramで透明感カラーやハイライトを保存している一方で、「自分に似合わなかったらどうしよう」「ブリーチで傷みすぎないかな」と迷っている。

### Before -> After

なりたい雰囲気を言葉にしきれない不安から、骨格・髪質・退色後まで設計された透明感カラーで、伸びてもきれいに見える自分らしい印象へ変わる。

### Differentiated Position

美容室ZOROYAは、派手に変えるだけではなく、骨格・髪質・色落ちまで見て「似合う透明感」を設計するデザインカラー特化型の美容室。

### First View Copy Options

1. 似合う透明感まで、設計する。
2. 伸びてもきれいな、私らしいデザインカラー。
3. なりたい雰囲気を、似合う髪色へ。

Selected: `似合う透明感まで、設計する。`

### Empathy Sentence

「変えたいけれど、失敗したくない」その気持ちごと相談できる美容室です。

### CTA Labels

- LINEで相談・予約する
- デザインカラーの作例を見る
- メニューと料金を見る

### Objections And Answers

- 似合わなかったらどうしよう：カウンセリングで骨格、肌なじみ、服の雰囲気、職場での見え方まで確認し、無理なく似合う幅を提案する。
- ブリーチの傷みが心配：髪の履歴とダメージを見て、必要な明るさ、薬剤、ケア工程を調整する。無理な施術はすすめない。
- 高い物販を押し売りされないか不安：ホームケアは必要な場合だけ理由を添えて提案する。購入前提の接客にしない。

## 11-Section Plan

1. Header: ロゴ、主要ナビ、LINE予約CTA。黒白基調で細く静かな印象。
2. First View: 45%コピー、55%ビジュアル。大きな余白とモーヴのアクセントで「似合う透明感」を訴求。
3. Customer Worries: 迷いを3つに整理。失敗、傷み、押し売り不安。
4. Promise Of Change: 「雰囲気」から似合わせ設計へ変換する考え方を説明。
5. Proof Of Expertise: カラー研鑽、作例多数、指名リピートをバッジで表示。
6. Voices And Results: ケース写真3つと短い結果コメント。
7. Price And Services: デザインカラーを主役に、カット、パーマ、髪質改善も並べる。
8. Steps To Apply: LINE予約から来店までの3ステップ。
9. Objections And Answers: FAQ形式で不安を解消。
10. Instagram Section: 作例確認の導線。実写真差し替え前提。
11. Final CTA And Footer: LINE予約、サブ予約導線、住所・営業時間・SNS。

## Design Direction

- Target impression: モード、洗練、静かな自信
- Avoided impression: 派手すぎる、甘すぎる、量販店的
- Main color: `#1A1A1A`
- Sub color: `#FFFFFF`
- Accent color: `#A66A78`
- Background color: `#F7F4F2`
- Heading text: `#1A1A1A`
- Body text: `#333333`
- Note text: `#77706E`
- Font direction: 和文は読みやすいゴシック、英字は細めのサンセリフ。見出しは余白で見せ、字間は広げすぎない。
- Hero layout: 左コピー、右に横長ビジュアル。余白の中に細線フレームと色面を重ねる。
- Visual direction: 実写真に置き換えやすい、透明感カラー・ハイライト・髪の動きが伝わる静かなビジュアル。

## Selected A-E Visual Type

Type B: 高級・洗練系。

Reason: ユーザー希望の「モード・洗練・余白広め」に最も合い、デザインカラーの高単価感と相談しやすさの両方を出しやすい。使用語彙は「静謐な余白」「引き算の美学」「精緻な細線」。

## Image Asset List

Standard assets:

- `src/logo.png`: 横長ロゴ
- `src/fv.jpg`: ファーストビュー
- `src/profile.jpg`: スタイリストプロフィール
- `src/badge-1.png`: カラー研鑽
- `src/badge-2.png`: Instagram作例多数
- `src/badge-3.png`: 指名リピート
- `src/case-1.jpg`: 透明感ハイライト
- `src/case-2.jpg`: ブリーチカラー
- `src/case-3.jpg`: 白髪を活かす明るめカラー
- `src/voice-1.jpg`: お客様イメージ
- `src/voice-2.jpg`: お客様イメージ
- `src/voice-3.jpg`: お客様イメージ

Type B decoration assets:

- `src/deco-line-frame-1.png`
- `src/deco-line-frame-2.png`
- `src/deco-thin-rule.png`
- `src/deco-mono-rect.png`
- `src/deco-shadow-soft.png`
- `src/icon-serif-1.png`
- `src/icon-serif-2.png`
- `src/icon-serif-3.png`

## Implementation Notes

- HTML本文とCTAは画像に焼き込まない。
- 写真が入る箇所はすべて同名ファイル差し替えで更新できる。
- LINE、予約サイト、InstagramのURLは仮の `#` にしておき、公開前に差し替える。
- ヒーローはフルブリード、内側は約1360pxに制限する。
- モバイルでは1カラムにし、CTAを押しやすくする。

## 採用カタログ型ID（多様化移植 2026-06-07）

各セクションを「参照して再実装」方式で、サイト既存の `:root` トークン（--ink / --accent / --accent-deep / --bg2 / --paper / --muted ほか）にマッピングして移植。テンプレ固有 :root・生hexは不採用。1ページ1 :root、GSAP/ScrollTrigger/Fonts はページ1回読込。スクロール演出は全要素 once:true。

| サイトセクション | 採用型ID | 備考 |
|---|---|---|
| hero（FV） | **fv-02 Wipe**（fv-31 から差し替え） | FVガードレール発動。下記参照 |
| header | **header-03**（旧 header-02） | ミニマルバー＋フルスクリーンメニュー。`.zhd__*`／id一意（zhdToggle/zhdMenu）、Esc・リンク・背景で閉じる、body.is-locked |
| intro | **intro-08**（旧 intro-02） | 左フルブリード写真×右 詩的明朝。既存の痛み4点リスト＋closerを保持し点灯演出継続 |
| brandband | **維持**（作り替えなし） | sample02固有の繋ぎバンド。craft型割当なしのため不変更 |
| concept（features型） | **features-07**（旧 features-01） | 左大画像＋大ワード「DESIGN」／右 番号付きフィーチャー3点。クリップ開き |
| zgal（gallery） | **維持**（作り替えなし） | gallery型割当なしのため不変更（`.zgal` のまま） |
| voice | **voice-02**（旧 voice-06） | 大ポートレート＋大引用。お客様の声3名分に展開、各itemごとScrollTrigger（消失回避） |
| menu（pricing型） | **pricing-05** | 看板3カード（価格カウントアップ）＋メニュー一覧＋Note。既存の看板プライス意図を3カードに再構成 |
| message | **message-03**（旧 message-01） | 見開き・特大ドロップキャップ＋ポートレートクリップ＋署名ドロー |
| news（投稿一覧） | **blog-07**（plan の 02→07） | 縦書き「NEWS」固定＋スクロールリスト |
| faq | **faq-03**（旧 faq-02） | 左sticky×番号アコーディオン（+→×）。button化・aria-expanded |
| finalcta | **cta-07**（旧 cta-01） | 特大「相談」見出し＋方眼3カード（LINE/予約/問い合わせ） |
| footer | **footer-04**（旧 footer-02） | 特大ロゴタイポ「美容室ZOROYA」。NAP・ナビ保持 |

### FVガードレール発動メモ

plan の指定は **fv-31 Ticker**（中・CSS、向き先＝実績・ニュース・金融）。美容室は fv-selection.md のカテゴリ「情緒・暮らし（上限強度＝中、写真主役・上品な動き）」に該当し、Ticker のニュース／金融トーンは業種不適。`fv-selection.md` §0 ガードレールに従い近傍へ差し替え。
採用＝**fv-02 Wipe**（弱・CSS、モノクロ明朝の引き算＝美容室・エステ向けの明記タイプ）。「言われた色のまま→似合うへ翻訳しなおす」という似合わせ設計の物語を、カーソルで現れる斜めワイプ（before の白面→似合う色面）に重ねた。h1 はクロール可能な base 面に1つだけ置き、color 面の見出しは `aria-hidden` の装飾 div。
