import './best-item.scss';
import { BaseComponent } from '../../../../base-component';

export class BestItem extends BaseComponent {
  constructor(user: { firstName: string; lastName: string; email: string } | undefined, score: number | unknown[]) {
    super('div', ['best-score__item']);
    if (!user) throw Error();
    const arrUser = Object.values(user);

    this.element.innerHTML = `
    <div class="best-score__item-data">
      <div class="best-score__item-image"></div>
      <div class="best-score__item-contact">
        <p class="best-score__item-name text-name text">${arrUser[0]} ${arrUser[1]}</p>
        <p class="best-score__item-email text">${arrUser[2]}</p>
      </div>
    </div>
    <div class="best-score__item-score">
      <p class="text-score text">Score:  <span class="best-score__item-score-num text-blue">${score}</span></p>
    </div>
    `;
    // this.element.appendChild(this.mainTimer.element);
  }
}
