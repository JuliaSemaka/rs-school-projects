import './main-wrapper.scss';
import { BaseComponent } from '../../base-component';
import { MainTimer } from '../main-timer/main-timer';
import { Game } from '../../game/game';
import { ImageCategoryModel } from '../../../models/image-category-model';

export class MainWrapper extends BaseComponent {
  private readonly mainTimer: MainTimer;
  private readonly game: Game;

  constructor() {
    super('div', ['main-wrapper']);
    this.mainTimer = new MainTimer();
    this.game = new Game();

    this.element.appendChild(this.mainTimer.element);
    this.element.appendChild(this.game.element);
    this.start();
  }

  async start() {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const cat = categories[0];
    const images = cat.images.map((name) => `${cat.category}/${name}`);
    this.game.newGame(images);
  }
}
