// Instagram Feed (最終投稿を表示)
// 注意: Instagram Basic Display API廃止のため、
// 代替として静的フィードまたはサーバーサイド取得を推奨
// ここではInstagramプロフィールリンクとして実装

document.addEventListener("DOMContentLoaded", function() {
  // Instagram埋め込み用の領域があればリンク表示
  const instaContainers = document.querySelectorAll(".js-instagram-feed");
  instaContainers.forEach(function(el) {
    el.innerHTML =
      '<a href="https://instagram.com/nanea_hair" target="_blank" style="display:inline-flex;align-items:center;gap:0.5rem;padding:1rem 2rem;border:1px solid var(--Border);color:var(--Text);text-decoration:none;">' +
      '<span style="font-size:1.2rem;">📷</span>' +
      '<span>Instagram @nanea_hair をフォロー</span>' +
      "</a>";
  });
});
