import { Color, Result, show } from './utils';
import { createForm, createOption, createCollapseButton } from './creators';

const optionsDiv: HTMLElement = document.getElementById('optionsDiv');

const constructOptions = (colors: Color[], openedOptionName?: string) => {
  optionsDiv.innerHTML = '';
  colors.forEach((color: Color, index: number) => {
    //Initialization main elements
    const form = createForm(index, color, colors);
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
  });
};

chrome.storage.sync.get(['colors'], (result: Result) => {
  constructOptions(result.colors as Color[]);
});

chrome.storage.onChanged.addListener((changes) => {
  const colors: undefined | { newValue?: Color[]; oldValue?: Color[] } =
    changes.colors;
  const difference = colors.newValue?.filter(
    (x) => !colors?.oldValue?.filter((y) => y.value === x.value)[0],
  )[0].name;
  colors?.newValue && constructOptions(colors?.newValue, difference);
});
