import { Color } from './utils';
import { imageClassNames, logoInvertedUrl, logoUrl } from './constants';

chrome.storage.local.get('udemy_dark_mode', function (result) {
  if (result.udemy_dark_mode) {
    document.body.classList.remove('dark_mode_off');
    chrome.storage.sync.get(['colors'], (data) => {
      const colors: Color[] = data.colors;
      colors.forEach((el: Color) => {
        document.documentElement.style.setProperty(el.name, el.value);
      });
      document.body.classList.add('dark_mode_on');
      const logo = document.querySelector(imageClassNames);

      if (logo && (<HTMLImageElement>logo).src) {
        (<HTMLImageElement>logo).src = logoInvertedUrl;
      }
    });
  } else {
    document.body.classList.remove('dark_mode_on');
    document.body.classList.add('dark_mode_off');
    const logo = document.querySelector(imageClassNames);

    if (logo && (<HTMLImageElement>logo).src) {
      (<HTMLImageElement>logo).src = logoUrl;
    }
  }
});
