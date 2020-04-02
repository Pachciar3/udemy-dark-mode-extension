let page = document.getElementById("buttonDiv");
chrome.storage.sync.get(["colors"], result => {
  let defaultColors = result.colors;
  let temporaryColors = defaultColors.filter(() => true);
  const searchName = "slidetoggle";
  const constructOptions = colors => {
    //Functions for collapsing
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
    //Handle tmp colors
    const handletemporaryColors = (index, value, option, type) => {
      const tmpinputsID = inputsID.filter(id => id !== type);
      temporaryColors[index] = {
        name: defaultColors[index].name,
        color: value
      };

      tmpinputsID.forEach(el => {
        if (el === "color-text") {
          option.querySelector("#" + el).value = value.slice(1, 7);
        } else {
          option.querySelector("#" + el).value = value;
        }
      });
    };

    //Constants
    const arrowIcon =
      '<svg class="question-answer__arrow-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path></svg>';
    const inputsID = ["color-text", "color-picker"];

    colors.forEach((color, index) => {
      //Initialization main elements
      const option = document.createElement("div");
      const button = document.createElement("button");
      const form = document.createElement("form");

      //Attributes for option
      option.className = "option";
      const buttonClassName =
        index % 2 ? "option__btn option__btn--even" : "option__btn";

      //Attributes for button
      button.className = buttonClassName;
      button.dataset.slidetoggle = `box${index}`;
      button.setAttribute("aria-controls", `box${index}`);
      button.setAttribute("aria-expanded", false);
      button.innerHTML = color.name + arrowIcon;
      button.addEventListener("click", function() {
        const scrollHeight = form.scrollHeight;
        if (button.parentNode.classList.contains("is-active")) {
          hide(button, form);
        } else {
          hideAll();
          show(button, form, scrollHeight);
        }
      });

      //Attributes for form
      form.className = "option__collapse";
      form.id = `box${index}`;
      form.addEventListener("submit", e => {
        e.preventDefault();
        const reg = new RegExp("[#]{1}[0-9a-fA-F]{6}");
        const infoBox = form.querySelector(".option__info");
        infoBox.innerHTML = "";
        if (reg.test(temporaryColors[index].color)) {
          const newcolors = [...defaultColors];
          console.log(defaultColors[index], temporaryColors[index]);
          newcolors[index] = temporaryColors[index];
          chrome.storage.sync.set({ colors: newcolors }, () => {
            infoBox.className = "option__info option__info--success";
            infoBox.innerHTML = "Saved!";
          });
        } else {
          infoBox.className = "option__info option__info--danger";
          infoBox.innerHTML =
            'Error. The format is "rrggbb" where rr, gg, bb are two-digit hexadecimal numbers!';
        }
      });

      form.innerHTML += `
      <div class="option__con">
        <div class="option__con-left">
          <fieldset class="field">
            <label class="field__label" for="color-text"
              >Write color in hexadecimal
            </label>
            <div class="field__con">
              <span class="field__prefix">#</span>
              <input
                type="text"
                class="field__input"
                id="${inputsID[0]}"
                maxlength="6"
                value="${color.color.slice(1, 7)}"
              />
            </div>
          </fieldset>
        </div>
        <div class="option__con-separator">or</div>
        <div class="option__con-right">
          <fieldset class="field">
            <label class="field__label" for="color-picker"
              >Pick color</label
            >
            <div class="field__con">
              <input
                class="field__input"
                id="${inputsID[1]}"
                name="Color Picker"
                type="color"
                value="${color.color}"
              />
            </div>
          </fieldset>
        </div>
      </div>
      <div class="option__btn-con">
        <button class="btn">Save</button
        ><span class="option__info"></span>
      </div>
  `;

      //Append to DOM
      option.appendChild(button);
      option.appendChild(form);
      page.appendChild(option);
      const colorText = option.querySelector("#" + inputsID[0]);
      colorText.addEventListener("input", e => {
        handletemporaryColors(index, "#" + e.target.value, option, inputsID[0]);
      });
      const colorPicker = option.querySelector("#" + inputsID[1]);
      colorPicker.addEventListener("input", e => {
        handletemporaryColors(index, e.target.value, option, inputsID[1]);
      });
    });
  };
  constructOptions(defaultColors);
});
