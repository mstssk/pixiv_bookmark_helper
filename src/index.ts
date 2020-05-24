(function () {
  const parent = document.querySelector(".recommend-tag");
  if (!parent) {
    return;
  }
  const h1 = parent.querySelector("h1");
  if (!h1) {
    return;
  }
  const button = document.createElement("a");
  button.href = "javascript:void(0)";
  button.style.marginLeft = "1ex";
  button.textContent = "一括登録";
  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    parent
      .querySelectorAll<HTMLSpanElement>("span.tag")
      .forEach((e) => e.click());
  });
  h1.appendChild(button);
})();
