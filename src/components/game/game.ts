import { BaseComponent } from '../base-component';
import { Card } from '../main/card/card';
import { MainCards } from '../main/main-cards/main-cards';

export class Game extends BaseComponent {
  private readonly mainCards: MainCards;

  constructor() {
    super();
    this.mainCards = new MainCards();
    this.element.appendChild(this.mainCards.element);
  }

  newGame(images: string[]) : void {
    this.mainCards.clear();

    const cards = images
      .concat(images)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);

    this.mainCards.addCards(cards);
  }
}
