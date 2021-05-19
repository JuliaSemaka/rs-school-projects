import './card.scss';
import { BaseComponent } from '../../base-component';

const FLIP_CLASS = 'main__container_flipped';

export class Card extends BaseComponent {
  constructor(readonly image: string) {
    super('div', ['main-card__container']);

    this.element.innerHTML = `<div class="main-card">
      <div class="main-card__front" style="background-image: url('./images/${image}')"></div>
      <div class="main-card__back"></div>
    </div>`;
  }

  flipToBack(): void {
    this.element.classList.add(FLIP_CLASS);
  }

  flipToFront(): void {
    this.element.classList.remove(FLIP_CLASS);
  }
}
