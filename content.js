chrome.storage.sync.get('color', function (data) {
  let color = data.color;
  console.log(color);
  document.documentElement.style.setProperty("--main-bg-color", color);
  document.body.classList.add('dark_mode_on');
});