//SCRIPT IN BACKGROUND
chrome.runtime.onInstalled.addListener(function () {
  const defaultsColors = [
    { color: "#121212", name: "--primary-bg-color" },
    { color: "#2a2a2a", name: "--secondary-bg-color" },
    { color: "#4e4949", name: "--light-grey-bg-color" },
    { color: "#dcc2c2", name: "--primary-font-color" },
    { color: "#ffffff", name: "--secondary-font-color" },
  ];
  chrome.storage.sync.set({ colors: defaultsColors }, function () {
    console.log("The colors are set.");
  });
  chrome.storage.local.set({ udemy_dark_mode: true }, () => {
    console.log("Udemy dark mode is true.");
  });
  chrome.storage.sync.set({ color: "#3aa757" }, function () {
    console.log("The color is green.");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "www.udemy.com" },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});
