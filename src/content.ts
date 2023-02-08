chrome.storage.local.get('udemy_dark_mode', function (result) {
  if (result.udemy_dark_mode) {
    document.body.classList.remove('dark_mode_off');
    chrome.storage.sync.get(['colors'], function (data) {
      const colors = data.colors;
      colors.forEach((el: { name: string; color: string }) => {
        document.documentElement.style.setProperty(el.name, el.color);
      });
      document.body.classList.add('dark_mode_on');
      const logo: HTMLImageElement = document.querySelector(
        '[data-purpose="udemy-brand-logo"]',
      );
      if (logo && logo.src) {
        logo.src =
          'https://www.udemy.com/staticx/udemy/images/v6/logo-coral-light.svg';
      }
    });
  } else {
    document.body.classList.remove('dark_mode_on');
    document.body.classList.add('dark_mode_off');
    const logo: HTMLImageElement = document.querySelector(
      '[data-purpose="udemy-brand-logo"]',
    );
    if (logo && logo.src) {
      logo.src = 'https://www.udemy.com/staticx/udemy/images/v6/logo-coral.svg';
    }
  }
});
