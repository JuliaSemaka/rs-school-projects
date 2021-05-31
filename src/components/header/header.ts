import './header.scss';
import { BaseComponent } from '../base-component';
import { HeaderWrapper } from './header-wrapper/header-wrapper';

export class Header extends BaseComponent {
  public readonly headerWrapper: HeaderWrapper;

  constructor() {
    super('header', ['header']);
    this.headerWrapper = new HeaderWrapper();

    this.element.appendChild(this.headerWrapper.element);
  }
}
