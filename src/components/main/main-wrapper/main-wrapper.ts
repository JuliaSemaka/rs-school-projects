import './main-wrapper.scss';
import { BaseComponent } from '../../base-component';
import { MainTimer } from '../main-timer/main-timer';
import { MainCards } from '../main-cards/main-cards';

export class MainWrapper extends BaseComponent {
  private readonly mainTimer: MainTimer;

  private readonly mainCards: MainCards;

  constructor() {
    super('div', ['main-wrapper']);
    this.mainTimer = new MainTimer();
    this.mainCards = new MainCards();

    this.element.appendChild(this.mainTimer.element);
    this.element.appendChild(this.mainCards.element);
  }
}
