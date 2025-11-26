import { ID_OPTION_JUMP } from "./constants";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "bookmark_illust",
    title: "イラスト・マンガのブックマークを開く",
    contexts: ["action"],
  });

  chrome.contextMenus.create({
    id: "bookmark_novel",
    title: "小説のブックマークを開く",
    contexts: ["action"],
  });

  const optionsId = chrome.contextMenus.create({
    id: "options",
    title: "オプション",
    contexts: ["action"],
  });
  chrome.storage.local.get(ID_OPTION_JUMP).then((items) => {
    const checked = items[ID_OPTION_JUMP] ?? false;
    chrome.contextMenus.create({
      parentId: optionsId,
      id: ID_OPTION_JUMP,
      title: "別サイトへのリンクを自動でジャンプする",
      contexts: ["action"],
      type: "checkbox",
      checked,
    });
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  switch (info.menuItemId) {
    case "bookmark_illust":
      chrome.tabs.create({ url: "https://www.pixiv.net/bookmark.php" });
      break;
    case "bookmark_novel":
      chrome.tabs.create({ url: "https://www.pixiv.net/novel/bookmark.php" });
      break;
    case ID_OPTION_JUMP:
      chrome.storage.local.set({ [ID_OPTION_JUMP]: info.checked });
      chrome.contextMenus.update(ID_OPTION_JUMP, { checked: info.checked });
      break;
    default:
      return; // NOOP
  }
});
