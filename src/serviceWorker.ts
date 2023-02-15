//SCRIPT IN BACKGROUND
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.disable();
  const defaultsColors = [
    { color: '#121212', name: '--primary-bg-color' },
    { color: '#1c1d1f', name: '--secondary-bg-color' },
    { color: '#2a2a2a', name: '--tertiary-bg-color' },
    { color: '#4e4949', name: '--light-bg-color' },
    { color: '#736868', name: '--very-light-bg-color' },
    { color: '#29303b', name: '--udemy-darkblue-bg-color' },

    { color: '#dcc2c2', name: '--primary-font-color' },
    { color: '#000000', name: '--secondary-font-color' },
    { color: '#ffffff', name: '--tertiary-font-color' },
    { color: '#ffff00', name: '--success-font-color' },

    { color: '#777777', name: '--primary-border-color' },
  ];
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    const rules = [
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostSuffix: 'udemy.com' },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowAction()],
      },
    ];
    chrome.declarativeContent.onPageChanged.addRules(rules);
  });
  chrome.storage.sync.set({ colors: defaultsColors }, () => {
    console.info('The colors are set.');
  });
  chrome.storage.local.set({ udemy_dark_mode: true }, () => {
    console.info('Udemy dark mode is set to true.');
  });
});
