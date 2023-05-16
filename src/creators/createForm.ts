import { Color } from '../utils';

import FormHTML from '../templates/form.template.html';

const colorRegExp = new RegExp('#[0-9a-fA-F]{6}');

export default function createForm(
  index: number,
  color: Color,
  colors: Color[],
) {
  const inputText = `color-text-${index}`;
  const inputPicker = `color-picker-${index}`;

  const form = document.createElement('form');
  form.className = 'option__collapse';
  form.id = `box${index}`;
  form.innerHTML = FormHTML.replaceAll('FieldInput', inputText).replaceAll(
    'FieldPicker',
    inputPicker,
  );

  const fieldInput = form.children[0]
    .getElementsByTagName('input')
    .namedItem(inputText);
  const fieldPicker = form.children[0]
    .getElementsByTagName('input')
    .namedItem(inputPicker);
  fieldInput.value = color.value.slice(1, 7);
  fieldPicker.value = color.value;

  fieldInput.addEventListener('input', (e: InputEvent) => {
    const value = (<HTMLInputElement>e.target).value;
    if (colorRegExp.test(`#${value}`)) {
      fieldPicker.value = `#${value}`;
    } else {
      fieldPicker.value = '#000000';
    }
  });

  fieldPicker.addEventListener('input', (e: InputEvent) => {
    const value = (<HTMLInputElement>e.target).value;
    fieldInput.value = value.slice(1, 7);
  });

  form.addEventListener('submit', (e: SubmitEvent) => {
    e.preventDefault();
    const infoBox = form.querySelector('.option__info');
    if (infoBox && `#${fieldInput.value}` !== colors[index].value) {
      infoBox.innerHTML = '';
      if (colorRegExp.test(`#${fieldInput.value}`)) {
        const newColors = [...colors];
        newColors[index].value = `#${fieldInput.value}`;
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

  return form;
}
