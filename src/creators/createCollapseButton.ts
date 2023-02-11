import { hide, hideAllOptions, show, Color } from '../utils';

const arrowIcon =
  '<svg class="question-answer__arrow-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path></svg>';
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
