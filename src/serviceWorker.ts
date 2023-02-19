import { Color } from './utils';

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.disable();
  const defaultsColors: Color[] = [
    { value: '#121212', name: '--primary-bg-color' },
    { value: '#1c1d1f', name: '--secondary-bg-color' },
    { value: '#2a2a2a', name: '--tertiary-bg-color' },
    { value: '#3a3a3a', name: '--quarternary-bg-color' },

    { value: '#dcc2c2', name: '--primary-font-color' },
    { value: '#000000', name: '--secondary-font-color' },
    { value: '#ffffff', name: '--tertiary-font-color' },
    { value: '#a59898', name: '--hover-font-color' },

    { value: '#777777', name: '--primary-border-color' },
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
