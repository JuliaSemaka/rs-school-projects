import './header-auth.scss';
import { BaseComponent } from '../../base-component';

export class HeaderAuth extends BaseComponent {
  constructor() {
    super('div', ['header-auth']);

    this.element.innerHTML = '<button class="button text-button button-white">register new player</button>';
  }
}
