import './main-wrapper.scss';
import { BaseComponent } from '../../base-component';
import { Game } from '../game/game';
import { Router } from '../../../shared/router';
import { BestScore } from '../best-score/best-score';
import { Setting } from '../setting/setting';
import { About } from '../about/about';

export class MainWrapper extends BaseComponent {
  private readonly route: Router;

  constructor() {
    super('div', ['main-wrapper']);
    this.route = new Router();

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
    game.start();
  }

  runAbout() : void {
    const about = new About();
    this.element.appendChild(about.element);
  }

  runSetting() : void {
    const setting = new Setting();
    this.element.appendChild(setting.element);
  }

  runBestScore() : void {
    const bestScore = new BestScore();
    this.element.appendChild(bestScore.element);
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
