import { BaseComponent } from '../base-component';
import { Card } from '../main/card/card';
import { MainCards } from '../main/main-cards/main-cards';
import { delay } from "../../shared/delay"

const FLIP_DELAY = 1000;
export class Game extends BaseComponent {
  private readonly mainCards: MainCards;
  private activeCard?: Card;
  private isAnimation = false;

  constructor() {
    super();
    this.mainCards = new MainCards();
    this.element.appendChild(this.mainCards.element);
  }

  newGame(images: string[]) : void {
    console.log('newGame');

    this.mainCards.clear();

    const cards = images
      .concat(images)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);

      cards.forEach((card) => card.element.addEventListener('click', () => this.cardHandler(card)))

    this.mainCards.addCards(cards);
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
      await Promise.all([this.activeCard.showSuccess(), card.showSuccess()])
    }

    this.activeCard = undefined;
    this.isAnimation = false;
    return;
  }
}

