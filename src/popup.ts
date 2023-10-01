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
              func: () => {
                document.body.classList.remove('dark_mode_on');
                document.body.classList.add('dark_mode_off');
                const desktopLogo: HTMLImageElement | undefined =
                  document.querySelector(
                    `.desktop-header-module--flex-middle--1e7c8.desktop-header-module--logo--2Qf0r img`,
                  );
                const mobileLogo: HTMLImageElement | undefined =
                  document.querySelector(
                    `.mobile-header-module--row--17mcf.mobile-header-module--middle--3Y6kK img`,
                  );
                if (desktopLogo && desktopLogo.src) {
                  desktopLogo.src =
                    'https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg';
                } else if (mobileLogo && mobileLogo.src) {
                  mobileLogo.src =
                    'https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg';
                }
              },
            });
          },
        );
      });
    }
  });
};
