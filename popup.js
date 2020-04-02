let changeColor = document.getElementById("changeColor");

document.getElementById("options-page").addEventListener("click", () => {
  chrome.tabs.create({ url: "/options.html" });
});

chrome.storage.sync.get("udemy_dark_mode", function(data) {
  changeColor.checked = data.udemy_dark_mode;
  console.log(data);
});

document.querySelectorAll("a").forEach(item => {
  const link = item.getAttribute("href");
  item.addEventListener("click", () => {
    chrome.tabs.create({ url: link });
  });
});

changeColor.onclick = function() {
  chrome.storage.sync.get("udemy_dark_mode", function(result) {
    if (result.udemy_dark_mode === false) {
      chrome.storage.sync.set({ udemy_dark_mode: true }, () => {
        chrome.tabs.query({ active: true, currentWindow: true }, function(
          tabs
        ) {
          chrome.tabs.executeScript(tabs[0].id, {
            file: "content.js"
          });
        });
      });
    } else {
      chrome.storage.sync.set({ udemy_dark_mode: false }, () => {
        chrome.tabs.query({ active: true, currentWindow: true }, function(
          tabs
        ) {
          chrome.tabs.executeScript(tabs[0].id, {
            code: "document.body.classList.remove('dark_mode_on');"
          });
        });
      });
    }
  });
};
