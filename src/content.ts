import { Color } from './utils';

chrome.storage.local.get('udemy_dark_mode', function (result) {
  if (result.udemy_dark_mode) {
    document.body.classList.remove('dark_mode_off');
    chrome.storage.sync.get(['colors'], (data) => {
      const colors: Color[] = data.colors;
      colors.forEach((el: { name: string; color: string }) => {
        document.documentElement.style.setProperty(el.name, el.color);
      });
      document.body.classList.add('dark_mode_on');
      const logo = document.querySelector(
        '.header--flex-middle--2QeVR.header--logo--rd7-H img',
      );

      if (logo && (<HTMLImageElement>logo).src) {
        (<HTMLImageElement>logo).src =
          'https://www.udemy.com/staticx/udemy/images/v6/logo-coral-light.svg';
      }
    });
  } else {
    document.body.classList.remove('dark_mode_on');
    document.body.classList.add('dark_mode_off');
    const logo = document.querySelector(
      '.header--flex-middle--2QeVR.header--logo--rd7-H img',
    );
    if (logo && (<HTMLImageElement>logo).src) {
      (<HTMLImageElement>logo).src =
        'https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg';
    }
  }
});
