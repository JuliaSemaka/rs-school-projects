import './header-menu.scss';
import { BaseComponent } from '../../base-component';
import { BaseLink } from './base-link';

export class HeaderMenu extends BaseComponent {
  private readonly aboutGame: BaseLink;

  private readonly bestScore: BaseLink;

  private readonly gameSettings: BaseLink;

  constructor() {
    super('div', ['header-menu']);
    this.aboutGame = new BaseLink('/#/', 'About Game');
    this.bestScore = new BaseLink('/#/best-score', 'Best Score');
    this.gameSettings = new BaseLink('/#/setting', 'Game Settings');

    this.element.appendChild(this.aboutGame.element);
    this.element.appendChild(this.bestScore.element);
    this.element.appendChild(this.gameSettings.element);
  }
}
