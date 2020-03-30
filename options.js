let page = document.getElementById("buttonDiv");
const kButtonColors = [
  {
    name: "--primary-bg-color",
    color: "#151515"
  },
  {
    name: "--secondary-bg-color",
    color: "#2a2a2a"
  },
  {
    name: "--primary-font-color",
    color: "#dcc2c2"
  }
];
function constructOptions(kButtonColors) {
  for (let item of kButtonColors) {
    let button = document.createElement("button");
    button.style.backgroundColor = item;
    button.addEventListener("click", function() {
      chrome.storage.sync.set({ color: item }, function() {
        console.log("color is " + item);
      });
    });
    page.appendChild(button);
  }
}
constructOptions(kButtonColors);

const sildeToggleFaq = searchName => {
  const hide = (el, box) => {
    el.parentNode.classList.remove("is-active");
    el.setAttribute("aria-expanded", false);
    box.style.height = "0px";
  };

  const show = (el, box, scrollHeight) => {
    el.parentNode.classList.add("is-active");
    el.setAttribute("aria-expanded", true);
    box.style.height = `${scrollHeight}px`;
  };
  const hideAll = () => {
    document
      .querySelectorAll(".is-active [data-" + searchName + "]")
      .forEach(el => {
        const box = document.getElementById(
          el.getAttribute("data-" + searchName)
        );
        hide(el, box);
      });
  };

  document.querySelectorAll("[data-" + searchName + "]").forEach(el => {
    const id = el.getAttribute("data-" + searchName);
    el.addEventListener("click", () => {
      const box = document.getElementById(id);
      const scrollHeight = box.scrollHeight;
      if (el.parentNode.classList.contains("is-active")) {
        hide(el, box);
      } else {
        hideAll();
        show(el, box, scrollHeight);
      }
    });
  });
};

sildeToggleFaq("slidetoggle");
