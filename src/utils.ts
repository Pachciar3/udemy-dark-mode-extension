export interface Color {
  name: string;
  color: string;
}

export const hide = (el: HTMLElement, box: HTMLElement) => {
  (<Element>el.parentNode).classList.remove('is-active');
  el.setAttribute('aria-expanded', 'false');
  box.style.height = '0px';
};

export const show = (
  el: HTMLElement,
  box: HTMLElement,
  scrollHeight: number,
) => {
  (<Element>el.parentNode).classList.add('is-active');
  el.setAttribute('aria-expanded', 'true');
  box.style.height = `${scrollHeight}px`;
};

export const hideAllOptions = (searchName: string) => {
  document
    .querySelectorAll('.is-active [data-' + searchName + ']')
    .forEach((el: HTMLElement) => {
      const box = document.getElementById(
        el.getAttribute('data-' + searchName),
      );
      hide(el, box);
    });
};
