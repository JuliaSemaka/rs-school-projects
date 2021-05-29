import './card.scss';
import { BaseComponent } from '../../../../base-component';

const FLIP_CLASS = 'main-card__container_flipped';
const CARD_ERROR = 'main__card_error';
const CARD_SUCCESS = 'main__card_success';

export class Card extends BaseComponent {
  isFlipped = false;

  constructor(readonly image: string) {
    super('div', ['main-card__container']);

    this.element.innerHTML = `<div class="main-card">
      <div class="main-card__front" style="background-image: url('./images/${image}')"></div>
      <div class="main-card__back"></div>
    </div>`;
  }

  flipToBack(): Promise<void> {
    this.isFlipped = true;
    return this.flip(true);
  }

  flipToFront(): Promise<void> {
    this.isFlipped = false;
    return this.flip();
  }

  private flip(isFront = false): Promise<void> {
    return new Promise((resolve) => {
      this.element.classList.toggle(FLIP_CLASS, isFront);
      this.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }

  showError(): void {
    this.element.classList.add(CARD_ERROR);
  }

  showSuccess(): void {
    this.element.classList.add(CARD_SUCCESS);
  }
}
