import {
  ID_OPTION_JUMP,
  createJumpOptionMenu,
  handleJumpOptionClicked,
} from "./autoJump";

chrome.runtime.onInstalled.addListener(async () => {
  await chrome.contextMenus.removeAll();

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
  createJumpOptionMenu(optionsId);
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
      handleJumpOptionClicked(!!info.checked);
      break;
    default:
      return; // NOOP
  }
});
