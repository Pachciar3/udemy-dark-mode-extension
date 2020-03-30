let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function (data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});
changeColor.onclick = function (element) {
  // let color = element.target.value;
  // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //   chrome.tabs.executeScript(
  //     tabs[0].id,
  //     { code: 'document.documentElement.style.setProperty("--main-bg-color", "' + color + '");document.body.classList.add("dark_mode_on");' });
  //   chrome.tabs.insertCSS({ file: "style.css" });
  // });
}