import './main-wrapper.scss';
import { BaseComponent } from '../../base-component';
import { Game } from '../game/game';
import { ImageCategoryModel } from '../../../models/image-category-model';
import { Router } from '../../../shared/router';
import { BestScore } from '../best-score/best-score';
import { Setting } from '../setting/setting';
import { About } from '../about/about';

export class MainWrapper extends BaseComponent {
  private readonly bestScore: BestScore;

  private readonly setting: Setting;

  private readonly about: About;

  private readonly game: Game;

  private readonly route: Router;

  constructor() {
    super('div', ['main-wrapper']);
    this.bestScore = new BestScore();
    this.setting = new Setting();
    this.about = new About();
    this.route = new Router();
    this.game = new Game();

    this.listen();
    this.showPage();
  }

  showPage() : void {
    this.element.innerHTML = '';
    switch (this.route.getRoute()) {
      case '/game':
        this.runGame();
        break;
      case '/setting':
        this.runSetting();
        break;
      case '/best-score':
        this.runBestScore();
        break;
      default:
        this.runAbout();
        break;
    }
  }

  runGame() : void {
    this.element.appendChild(this.game.element);
    this.start();
  }

  runAbout() : void {
    this.element.appendChild(this.about.element);
  }

  runSetting() : void {
    this.element.appendChild(this.setting.element);
  }

  runBestScore() : void {
    this.element.appendChild(this.bestScore.element);
  }

  async start() : Promise<void> {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const cat = categories[0];
    const images = cat.images.map((name) => `${cat.category}/${name}`);
    this.game.newGame(images);
  }

  listen(): void {
    setInterval(() => this.interval(), 500);
  }

  interval(): boolean {
    if (this.route.root === this.route.getRoute()) {
      return false;
    }

    this.showPage();
    this.route.root = this.route.getRoute();
    return true;
  }
}
