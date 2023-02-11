import { Color, Result, show } from './utils';
import { createForm, createOption, createCollapseButton } from './creators';

const optionsDiv: HTMLElement = document.getElementById('optionsDiv');
const colorRegExp = new RegExp('[#]{1}[0-9a-fA-F]{6}');
const inputsID: [string, string] = ['color-text', 'color-picker'];

const handleTemporaryColorsInputs = (
  index: number,
  value: string,
  option: HTMLDivElement,
  type: string,
  colors: Color[],
) => {
  const tmpInputsID = inputsID.filter((id) => id !== type);
  colors[index] = {
    name: colors[index].name,
    color: value,
  };

  tmpInputsID.forEach((elName: string) => {
    if (elName === inputsID[0]) {
      (<HTMLOptionElement>option.querySelector('#' + elName)).value =
        value.slice(1, 7);
    } else {
      const optionElement: HTMLOptionElement = option.querySelector(
        '#' + elName,
      );
      if (colorRegExp.test(value)) {
        optionElement.value = value;
      } else {
        optionElement.value = '#000000';
      }
    }
  });
};

const constructOptions = (colors: Color[], openedOptionName?: string) => {
  optionsDiv.innerHTML = '';

  colors.forEach((color: Color, index: number) => {
    //Initialization main elements
    const form = createForm(index, color, colors, colorRegExp, inputsID);
    const option = createOption();
    const collapseButton = createCollapseButton(index, color, form);
    if (color.name === openedOptionName) {
      const infoBox = form.querySelector('.option__info');
      infoBox.className = 'option__info option__info--success';
      infoBox.textContent = 'Saved!';
    }
    //Append to DOM
    option.appendChild(collapseButton);
    option.appendChild(form);
    optionsDiv.appendChild(option);
    openedOptionName === color.name && show(collapseButton, form, true);
    const colorText = option.querySelector('#' + inputsID[0]);
    colorText.addEventListener('input', (e: InputEvent) => {
      handleTemporaryColorsInputs(
        index,
        '#' + (<HTMLInputElement>e.target).value,
        option,
        inputsID[0],
        colors,
      );
    });
    const colorPicker = option.querySelector('#' + inputsID[1]);
    colorPicker.addEventListener('input', (e: InputEvent) => {
      handleTemporaryColorsInputs(
        index,
        (<HTMLInputElement>e.target).value,
        option,
        inputsID[1],
        colors,
      );
    });
  });
};

chrome.storage.sync.get(['colors'], (result: Result) => {
  const colors: Color[] = result.colors;

  constructOptions(colors);
});

chrome.storage.onChanged.addListener((changes) => {
  const colors: undefined | { newValue?: Color[]; oldValue?: Color[] } =
    changes.colors;
  const difference = colors.newValue?.filter(
    (x) => !colors?.oldValue?.filter((y) => y.color === x.color)[0],
  )[0].name;
  colors?.newValue && constructOptions(colors?.newValue, difference);
});
