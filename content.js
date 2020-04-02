chrome.storage.sync.get("udemy_dark_mode", function(result) {
  if (result.udemy_dark_mode) {
    console.log(result.udemy_dark_mode);
    chrome.storage.sync.get(["colors"], function(data) {
      let colors = data.colors;
      console.log(colors);
      colors.forEach(el => {
        document.documentElement.style.setProperty(el.name, el.color);
      });
      document.body.classList.add("dark_mode_on");
    });
  }
});
