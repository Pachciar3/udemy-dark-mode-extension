import { imageClassNames, logoUrl } from './constants';

const changeColor = document.getElementById('changeColor') as HTMLInputElement;

document.getElementById('options-page').addEventListener('click', () => {
  chrome.tabs.create({ url: '/options.html' });
});

chrome.storage.local.get('udemy_dark_mode', function (data) {
  changeColor.checked = data.udemy_dark_mode;
});

document.querySelectorAll('a').forEach((item) => {
  const link = item.getAttribute('href');
  item.addEventListener('click', () => {
    chrome.tabs.create({ url: link });
  });
});

changeColor.onclick = function () {
  chrome.storage.local.get('udemy_dark_mode', function (result) {
    if (result.udemy_dark_mode === false) {
      chrome.storage.local.set({ udemy_dark_mode: true }, () => {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          async function (tabs) {
            await chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              files: ['content.js'],
            });
          },
        );
      });
    } else {
      chrome.storage.local.set({ udemy_dark_mode: false }, () => {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          async function (tabs) {
            await chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              func: ({ imageClassNames, logoUrl }) => {
                document.body.classList.remove('dark_mode_on');
                document.body.classList.add('dark_mode_off');
                const logo: HTMLImageElement | undefined =
                  document.querySelector(imageClassNames);
                if (logo && logo.src) {
                  logo.src = logoUrl;
                }
              },
              args: [{ imageClassNames, logoUrl }],
            });
          },
        );
      });
    }
  });
};
