// microCMS（ヘッドレスCMS）連携
// 使用手順:
// 1. microCMSでAPI作成（ニュース、メニュー）
// 2. このファイルの SERVICE_DOMAIN, API_KEY を書き換え

const MICROCMS = {
  SERVICE_DOMAIN: "your-service-domain", // microCMSのサービスドメイン
  API_KEY: "your-api-key",              // APIキー
};

// お知らせを取得して表示
async function fetchNews() {
  const newsContainer = document.querySelector(".js-microcms-news");
  if (!newsContainer) return;

  try {
    const res = await fetch(
      "https://" + MICROCMS.SERVICE_DOMAIN + ".microcms.io/api/v1/news",
      { headers: { "X-MICROCMS-API-KEY": MICROCMS.API_KEY } }
    );
    const data = await res.json();
    if (data.contents && data.contents.length > 0) {
      const article = data.contents[0];
      newsContainer.innerHTML =
        '<div class="b-common__news__wrap">' +
        '<h3 class="b-common__news__title"><span class="wrap">' +
        '<span class="tag">News</span>' +
        '<span class="title">' + article.title + "</span>" +
        '<span class="date">' + new Date(article.publishedAt).toLocaleDateString("ja-JP") + "</span>" +
        "</span></h3>" +
        '<p class="b-common__news__content"><span>' + article.content + "</span></p>" +
        "</div>";
    }
  } catch (e) {
    console.log("microCMS news fetch error:", e);
  }
}

// メニューを取得して表示
async function fetchMenus() {
  const menuContainer = document.querySelector(".js-microcms-menu");
  if (!menuContainer) return;

  try {
    const res = await fetch(
      "https://" + MICROCMS.SERVICE_DOMAIN + ".microcms.io/api/v1/menus",
      { headers: { "X-MICROCMS-API-KEY": MICROCMS.API_KEY } }
    );
    const data = await res.json();
    if (data.contents) {
      menuContainer.innerHTML = "";
      data.contents.forEach(function(menu) {
        menuContainer.innerHTML +=
          '<div class="b-menu__menu__list__child"><div class="b-menu__menu__list__child__wrap">' +
          '<div class="b-menu__menu__list__child__head"><span class="b-menu__menu__list__name">' +
          menu.name + "</span></div>" +
          '<div class="b-menu__menu__list__child__body"><span class="b-menu__menu__list__price">' +
          "\" + menu.price + "〜</span></div></div></div>";
      });
    }
  } catch (e) {
    console.log("microCMS menu fetch error:", e);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  fetchNews();
  fetchMenus();
});
