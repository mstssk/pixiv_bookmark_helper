setTimeout(async () => {
  const anchor = document.querySelector("a");
  if (anchor && anchor.href === anchor.textContent.trim()) {
    const root = anchor.closest("div")!;
    const countdownElement = document.createElement("span");
    root.appendChild(countdownElement);

    await countdown(countdownElement);

    anchor.click();
  }
}, 1000);

async function countdown(view: HTMLSpanElement) {
  let remainingSeconds = 5;
  for (; remainingSeconds >= 0; remainingSeconds--) {
    view.textContent = ` ${remainingSeconds}秒後に移動します`;
    if (remainingSeconds > 0) {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
}
