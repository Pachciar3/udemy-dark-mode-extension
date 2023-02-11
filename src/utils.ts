export interface Color {
  name: string;
  color: string;
}

export interface Result {
  colors: Color[];
  udemy_dark_mode: boolean;
}

export const hide = (button: HTMLElement, content: HTMLElement) => {
  (<Element>button.parentNode).classList.remove('is-active');
  content.style.transitionDuration = '';
  button.setAttribute('aria-expanded', 'false');
  content.style.height = '0px';
};

export const show = (
  button: HTMLElement,
  content: HTMLElement,
  noAnimate?: boolean,
) => {
  (<Element>button.parentNode).classList.add('is-active');
  button.setAttribute('aria-expanded', 'true');
  if (noAnimate) content.style.transitionDuration = '0s';
  content.style.height = `${content.scrollHeight}px`;
};

export const hideAllOptions = (searchName: string) => {
  document
    .querySelectorAll('.is-active [data-' + searchName + ']')
    .forEach((el: HTMLElement) => {
      const content = document.getElementById(
        el.getAttribute('data-' + searchName),
      );
      hide(el, content);
    });
};
