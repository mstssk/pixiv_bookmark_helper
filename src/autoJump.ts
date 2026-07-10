export const ID_OPTION_JUMP = "options_jump";

const JUMP_SCRIPT_ID = ID_OPTION_JUMP;
const JUMP_MATCHES = ["https://www.pixiv.net/jump.php*"];

async function isRegistered(): Promise<boolean> {
  const scripts = await chrome.scripting.getRegisteredContentScripts({
    ids: [JUMP_SCRIPT_ID],
  });
  return scripts.length > 0;
}

async function register(): Promise<void> {
  if (await isRegistered()) {
    return;
  }
  await chrome.scripting.registerContentScripts([
    {
      id: JUMP_SCRIPT_ID,
      matches: JUMP_MATCHES,
      js: ["jump.js"],
    },
  ]);
}

async function unregister(): Promise<void> {
  if (!(await isRegistered())) {
    return;
  }
  await chrome.scripting.unregisterContentScripts({ ids: [JUMP_SCRIPT_ID] });
}

export async function createJumpOptionMenu(
  parentId: string | number,
): Promise<void> {
  const checked = await isRegistered();
  chrome.contextMenus.create({
    parentId,
    id: ID_OPTION_JUMP,
    title: "別サイトへのリンクを自動でジャンプする",
    contexts: ["action"],
    type: "checkbox",
    checked,
  });
}

export async function handleJumpOptionClicked(checked: boolean): Promise<void> {
  if (checked) {
    await register();
  } else {
    await unregister();
  }
  chrome.contextMenus.update(ID_OPTION_JUMP, { checked });
}
