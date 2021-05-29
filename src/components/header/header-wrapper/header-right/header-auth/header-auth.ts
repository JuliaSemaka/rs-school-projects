import './header-auth.scss';
import { BaseComponent } from '../../../../base-component';

export class HeaderAuth extends BaseComponent {
  constructor() {
    super('button', ['button', 'text-button', 'button-white']);

    this.element.innerHTML = `register new player`;
  }
}
