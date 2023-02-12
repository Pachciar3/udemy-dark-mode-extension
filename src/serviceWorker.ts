import { Color } from './utils';

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.disable();
  const defaultsColors: Color[] = [
    { value: '#121212', name: '--primary-bg-color' },
    { value: '#2a2a2a', name: '--secondary-bg-color' },
    { value: '#4e4949', name: '--light-bg-color' },
    { value: '#736868', name: '--very-light-bg-color' },
    { value: '#29303b', name: '--udemy-darkblue-bg-color' },
    { value: '#dcc2c2', name: '--primary-font-color' },
    { value: '#ffffff', name: '--secondary-font-color' },
    { value: '#ffff00', name: '--success-font-color' },
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
