chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "bookmark_illust",
    title: "イラスト・マンガのブックマークを開く",
    contexts: ["page_action"],
  });

  chrome.contextMenus.create({
    id: "bookmark_novel",
    title: "小説のブックマークを開く",
    contexts: ["page_action"],
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  let url: string;
  switch (info.menuItemId) {
    case "bookmark_illust":
      url = "https://www.pixiv.net/bookmark.php";
      break;
    case "bookmark_novel":
      url = "https://www.pixiv.net/novel/bookmark.php";
      break;
    default:
      return; // NOOP
  }
  chrome.tabs.create({ url });
});
