chrome.storage.local.get("udemy_dark_mode", function (result) {
  if (result.udemy_dark_mode) {
    document.body.classList.remove("dark_mode_off");
    chrome.storage.sync.get(["colors"], function (data) {
      let colors = data.colors;
      colors.forEach((el) => {
        document.documentElement.style.setProperty(el.name, el.color);
      });
      document.body.classList.add("dark_mode_on");
      const logo = document.querySelector('[data-purpose="udemy-brand-logo"]');
      if (logo !== null) {
        logo.src =
          "https://www.udemy.com/staticx/udemy/images/v6/logo-coral-light.svg";
      }
    });
  } else {
    document.body.classList.remove("dark_mode_on");
    document.body.classList.add("dark_mode_off");
    const logo = document.querySelector('[data-purpose="udemy-brand-logo"]');
    if (logo !== null) {
      logo.src = "https://www.udemy.com/staticx/udemy/images/v6/logo-coral.svg";
    }
  }
});
