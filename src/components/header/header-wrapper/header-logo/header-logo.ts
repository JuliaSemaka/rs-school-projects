import './header-logo.scss';
import { BaseComponent } from '../../../base-component';

export class HeaderLogo extends BaseComponent {
  constructor() {
    super('div', ['header-logo']);

    this.element.innerHTML = `
    <a href="/#/">
      <div class="header-logo__text">
        <p class="text text-white text-logo">match</p>
      </div>
      <div class="header-logo__text backgraund-white">
        <p class="text text-blue text-logo">match</p>
      </div>
    </a>
    `;
  }
}
