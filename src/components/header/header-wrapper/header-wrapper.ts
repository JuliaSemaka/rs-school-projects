import './header-wrapper.scss';
import { BaseComponent } from '../../base-component';
import { HeaderLogo } from './header-logo/header-logo';
import { HeaderMenu } from './header-menu/header-menu';
import { HeaderRight } from './header-right/header-right';

export class HeaderWrapper extends BaseComponent {
  private readonly headerLogo: HeaderLogo;

  private readonly headerMenu: HeaderMenu;

  public readonly headerRight: HeaderRight;

  constructor() {
    super('div', ['header-wrapper']);
    this.headerLogo = new HeaderLogo();
    this.headerMenu = new HeaderMenu();
    this.headerRight = new HeaderRight();

    this.element.appendChild(this.headerLogo.element);
    this.element.appendChild(this.headerMenu.element);
    this.element.appendChild(this.headerRight.element);
  }
}
