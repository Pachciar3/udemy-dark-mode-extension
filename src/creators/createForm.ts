import { Color } from '../utils';

export default function createForm(
  index: number,
  color: Color,
  colors: Color[],
  colorRegExp: RegExp,
  inputsID: [string, string],
) {
  const form = document.createElement('form');
  form.className = 'option__collapse';
  form.id = `box${index}`;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const infoBox = form.querySelector('.option__info');
    if (infoBox) {
      infoBox.innerHTML = '';
      if (colorRegExp.test(colors[index].color)) {
        const newColors = [...colors];
        newColors[index] = colors[index];
        chrome.storage.sync.set({ colors: newColors }, () => {
          infoBox.className = 'option__info option__info--success';
          infoBox.textContent = 'Saved!';
        });
      } else {
        infoBox.className = 'option__info option__info--danger';
        infoBox.textContent =
          'Error. The format is "rrggbb" where rr, gg, bb are two-digit hexadecimal numbers!';
      }
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
  return form;
}
