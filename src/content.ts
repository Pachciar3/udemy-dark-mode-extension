import { Color } from './utils';

chrome.storage.local.get('udemy_dark_mode', function (result) {
  if (result.udemy_dark_mode) {
    document.body.classList.remove('dark_mode_off');
    chrome.storage.sync.get(['colors'], (data) => {
      const colors: Color[] = data.colors;
      colors.forEach((el: Color) => {
        document.documentElement.style.setProperty(el.name, el.value);
      });
      document.body.classList.add('dark_mode_on');
      const logo = document.querySelector(
        'img[src*="/staticx/udemy/images/v7/logo-udemy.svg"]',
      );
      const logo2 = document.querySelector(
        'img[src*="/staticx/udemy/images/v7/logo-udemy-inverted.svg"]',
      );

      if (logo) {
        (<HTMLImageElement>logo).src =
          'https://www.udemy.com/staticx/udemy/images/v7/logo-udemy-inverted.svg';
      }
      if (logo2) {
        (<HTMLImageElement>logo2).src =
          'https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg';
      }
    });
  } else {
    document.body.classList.remove('dark_mode_on');
    document.body.classList.add('dark_mode_off');
    const logo = document.querySelector(
      'img[src*="/staticx/udemy/images/v7/logo-udemy"]',
    );

    if (logo && (<HTMLImageElement>logo).src) {
      (<HTMLImageElement>logo).src =
        'https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg';
    }
  }
});
