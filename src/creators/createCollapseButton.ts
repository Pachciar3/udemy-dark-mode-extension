import { hide, hideAllOptions, show, Color } from '../utils';
import arrowIcon from '../templates/arrowIcon.template.html';

const searchName = 'slidetoggle';

export default function createCollapseButton(
  index: number,
  color: Color,
  form: HTMLFormElement,
) {
  const collapseButton = document.createElement('button');

  const collapseButtonClassName =
    index % 2 ? 'option__btn option__btn--even' : 'option__btn';
  collapseButton.className = collapseButtonClassName;
  collapseButton.dataset[searchName] = `box${index}`;
  collapseButton.setAttribute('aria-controls', `box${index}`);
  collapseButton.setAttribute('aria-expanded', 'false');
  collapseButton.innerHTML = color.name + arrowIcon;

  collapseButton.addEventListener('click', function () {
    if ((<Element>collapseButton.parentNode).classList.contains('is-active')) {
      hide(collapseButton, form);
    } else {
      hideAllOptions(searchName);
      show(collapseButton, form);
    }
  });
  return collapseButton;
}
