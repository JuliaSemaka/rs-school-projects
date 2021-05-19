import './header.scss';
import { BaseComponent } from '../base-component';
import { HeaderLogo } from './header-logo/header-logo';
import { HeaderMenu } from './header-menu/header-menu';
import { HeaderAuth } from './header-auth/header-auth';

export class Header extends BaseComponent {
  private readonly headerLogo: HeaderLogo;

  private readonly headerMenu: HeaderMenu;

  private readonly headerAuth: HeaderAuth;

  constructor() {
    super('header', ['header']);
    this.headerLogo = new HeaderLogo();
    this.headerMenu = new HeaderMenu();
    this.headerAuth = new HeaderAuth();

    this.element.appendChild(this.headerLogo.element);
    this.element.appendChild(this.headerMenu.element);
    this.element.appendChild(this.headerAuth.element);
  }
}
