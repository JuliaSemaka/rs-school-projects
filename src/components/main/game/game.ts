import './game.scss';
import { BaseComponent } from '../../base-component';
import { Card } from './main-cards/card/card';
import { MainCards } from './main-cards/main-cards';
import { delay } from '../../../shared/delay';
import { MainTimer } from './main-timer/main-timer';
import { ImageCategoryModel } from '../../../models/image-category-model';

const FLIP_DELAY = 1000;
export class Game extends BaseComponent {
  private readonly mainTimer: MainTimer;

  private readonly mainCards: MainCards;

  private activeCard?: Card;

  private isAnimation = false;

  constructor() {
    super('div', ['main-game']);
    this.mainTimer = new MainTimer();
    this.mainCards = new MainCards();
    this.element.appendChild(this.mainTimer.element);
    this.element.appendChild(this.mainCards.element);
  }

  async start(difficult : string, gameCards : string) : Promise<void> {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    let cat : string[] = [];
    let categ = '';
    categories.forEach((item) => {
      if (item.category === gameCards) {
        cat = item.images;
        categ = item.category;
      }
    });
    const dif = difficult.slice(0, 1);
    const numberCards = (+dif) ** 2 / 2;
    cat = cat.slice(0, numberCards);

    const images = cat.map((name) => `${categ}/${name}`);
    this.newGame(images, +dif);
  }

  newGame(images: string[], dif : number) : void {
    this.cleanGame();

    const cards = images
      .concat(images)
      .map((url) => new Card(url, dif))
      .sort(() => Math.random() - 0.5);

    cards.forEach((card) => card.element.addEventListener('click', () => this.cardHandler(card)));

    this.mainCards.addCards(cards);
  }

  cleanGame() : void {
    this.mainCards.clear();
  }

  private async cardHandler(card: Card) {
    if (this.isAnimation) return;
    if (!card.flipToBack) return;
    this.isAnimation = true;
    await card.flipToFront();
    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }

    if (this.activeCard.image !== card.image) {
      await Promise.all([this.activeCard.showError(), card.showError()]);
      await delay(FLIP_DELAY);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
    } else {
      await Promise.all([this.activeCard.showSuccess(), card.showSuccess()]);
    }

    this.activeCard = undefined;
    this.isAnimation = false;
  }
}
