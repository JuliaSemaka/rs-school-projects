export class BaseLink {
  readonly element: HTMLElement;

  constructor(private readonly link: string, private readonly caption: string) {
    this.element = document.createElement('a');
    this.element.setAttribute('href', link);
    this.element.classList.add('header-menu__item');

    this.element.innerHTML = `<div class="header-menu__item-icon"></div>
    <p class="text text-white header-menu__item-text">${caption}</p>`;
  }
}
