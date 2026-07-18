# 美容室ZOROYA ホームページ公開手順

このフォルダは、そのまま公開用に使える静的ホームページ一式です。

## 入っているもの

- `index.html`：ホームページ本体
- `src/`：画像フォルダ
- `site-design.md`：デザインと構成の設計書
- `hp-builder-input.md`：最初にいただいた情報のメモ
- `zoroya-site.zip`：Netlify Dropなどにアップロードする公開用ZIP

## Netlify Dropで公開する

1. ブラウザで Netlify Drop を開きます。
2. `zoroya-site.zip` を画面にドラッグします。
3. 数十秒待つと仮の公開URLが発行されます。
4. 表示を確認して、住所・予約URL・Instagram URLを本番用に差し替えます。

## 画像を差し替える

`src` フォルダ内の同じ名前の画像を上書きすると、ページ内の画像も変わります。

- `fv.jpg`：一番上の大きな写真
- `case-1.jpg`〜`case-3.jpg`：施術事例
- `voice-1.jpg`〜`voice-3.jpg`：お客様の声
- `profile.jpg`：スタッフ写真
- `logo.png`：ロゴ

写真は横長または正方形でも表示が崩れにくいように作っています。

## 予約ボタンをつなぐ

`index.html` の中にある `href="#"` を、実際のURLに差し替えます。

- LINE予約：LINE公式アカウントの友だち追加URL
- ホットペッパー等：予約ページURL
- Instagram：プロフィールURL

## WordPressへ移すタイミング

ブログ、キャンペーン、スタッフ別ページ、施術事例を自分たちで頻繁に更新したくなったら、WordPress化を検討してください。

## Codexで続けて直すとよいところ

- 正式住所、電話番号、予約URLの反映
- 実際のInstagram作例写真への差し替え
- メニュー料金の詳細化
- お客様の声の実文への差し替え
- スマホ表示の微調整

## SEOについて

地域名で本格的に検索上位を狙う場合や、AI検索で見つかりやすくしたい場合は、別途キーワード設計、構造化データ、競合調査、更新計画が必要です。

## WordPress固定ページ対応

このフォルダは `ZOROYA:HEADER` / `ZOROYA:MAIN` / `ZOROYA:FOOTER` の目印を入れた状態です。
`index.html` はトップページ、`service.html`、`about.html`、`faq.html`、`contact.html`、`privacy.html` は固定ページとして移行できます。

お問い合わせページには `ZOROYA:CONTACTFORM` の差し込み枠があります。WordPress移行後は、Fluent Formsなどのフォームショートコードに置き換えてください。

ブログ下書きは `blog/` に入っています。WordPressへ移行したあと、内容を確認してから公開してください。

