let changeColor = document.getElementById("changeColor");

document.getElementById("options-page").addEventListener("click", () => {
  chrome.tabs.create({ url: "/options.html" });
});

chrome.storage.local.get("udemy_dark_mode", function (data) {
  changeColor.checked = data.udemy_dark_mode;
});

document.querySelectorAll("a").forEach((item) => {
  const link = item.getAttribute("href");
  item.addEventListener("click", () => {
    chrome.tabs.create({ url: link });
  });
});

changeColor.onclick = function () {
  chrome.storage.local.get("udemy_dark_mode", function (result) {
    if (result.udemy_dark_mode === false) {
      chrome.storage.local.set({ udemy_dark_mode: true }, () => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (
          tabs
        ) {
          chrome.tabs.executeScript(tabs[0].id, {
            file: "content.js",
          });
        });
      });
    } else {
      chrome.storage.local.set({ udemy_dark_mode: false }, () => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (
          tabs
        ) {
          chrome.tabs.executeScript(tabs[0].id, {
            code:
              "document.body.classList.remove('dark_mode_on');document.body.classList.add('dark_mode_off'); document.querySelector(`[data-purpose='udemy-brand-logo']`).src ='https://www.udemy.com/staticx/udemy/images/v6/logo-coral.svg';",
          });
        });
      });
    }
  });
};
