import './main-cards.scss';
import { BaseComponent } from '../../../base-component';
import { Card } from './card/card';

const SHOW_TIME = 5;
export class MainCards extends BaseComponent {
  public cards: Card[] = [];

  public finishGame = false;

  public timerId: NodeJS.Timeout | undefined;

  constructor() {
    super('div', ['main-cards']);
  }

  clear(): void {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards: Card[]): void {
    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));

    setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
      this.startTimer();
    }, SHOW_TIME * 1000);
  }

  startTimer() : void {
    const timer = document.querySelector('.main-timer__text');
    let timeValue = 0;

    const drawTimer = () => {
      timeValue += 1000;
      const d = new Date(timeValue);
      const strTimer = `0${d.getMinutes()}:${d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds()}`;
      if (!timer) throw Error('Element not found');
      timer.innerHTML = strTimer;
      timer.classList.add('text');
      timer.classList.add('main-timer__text');
    };
    this.timerId = setInterval(() => {
      drawTimer();
    }, 1000);
  }
}
