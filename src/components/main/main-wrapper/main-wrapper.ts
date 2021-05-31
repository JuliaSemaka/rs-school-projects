import './main-wrapper.scss';
import { BaseComponent } from '../../base-component';
import { Game } from '../game/game';
import { Router } from '../../../shared/router';
import { BestScore } from '../best-score/best-score';
import { Setting } from '../setting/setting';
import { About } from '../about/about';

export class MainWrapper extends BaseComponent {
  private readonly route: Router;

  private readonly about: About;

  private readonly setting: Setting;

  private readonly bestScore: BestScore;

  constructor() {
    super('div', ['main-wrapper']);
    this.route = new Router();
    this.about = new About();
    this.setting = new Setting();
    this.bestScore = new BestScore();

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
    const game = new Game();
    this.element.appendChild(game.element);
    const difficult = (this.setting.settingBlockTwo.selector.element as HTMLInputElement).value;
    const gameCards = (this.setting.settingBlock.selector.element as HTMLInputElement).value;

    game.start(difficult, gameCards);
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
