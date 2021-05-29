import './header-menu.scss';
import { BaseComponent } from '../../../base-component';
import { BaseLink } from './base-link';
import { Router } from '../../../../shared/router';

export class HeaderMenu extends BaseComponent {
  private readonly aboutGame: BaseLink;

  private readonly bestScore: BaseLink;

  private readonly gameSettings: BaseLink;

  private readonly router: Router;

  constructor() {
    super('div', ['header-menu']);
    this.router = new Router();
    this.aboutGame = new BaseLink('/#/', 'About Game');
    this.bestScore = new BaseLink('/#/best-score', 'Best Score');
    this.gameSettings = new BaseLink('/#/setting', 'Game Settings');

    this.element.appendChild(this.aboutGame.element);
    this.element.appendChild(this.bestScore.element);
    this.element.appendChild(this.gameSettings.element);
    this.addRoute();
  }

  addRoute(): void {
    this.router
      .add('/', 'about')
      .add('/game', 'game')
      .add('/setting', 'setting')
      .add('/best-score', 'best-score');

    this.element.addEventListener('click', () => this.router.setRoute());
  }
}
