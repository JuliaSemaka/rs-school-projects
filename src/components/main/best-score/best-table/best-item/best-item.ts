import './best-item.scss';
import { BaseComponent } from '../../../../base-component';

export class BestItem extends BaseComponent {
  constructor() {
    super('div', ['best-score__item']);

    this.element.innerHTML = `
    <div class="best-score__item-data">
      <div class="best-score__item-image"></div>
      <div class="best-score__item-contact">
        <p class="best-score__item-name text-name text">Nicci Troiani</p>
        <p class="best-score__item-email text">nicci@gmail.com</p>
      </div>
    </div>
    <div class="best-score__item-score">
      <p class="text-score text">Score:  <span class="best-score__item-score-num text-blue">456</span></p>
    </div>
    `;
    // this.element.appendChild(this.mainTimer.element);
  }
}
