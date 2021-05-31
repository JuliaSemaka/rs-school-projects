import { BaseComponent } from '../../../../base-component';

export class HeaderStartGame extends BaseComponent {
  constructor() {
    super('button', ['button', 'text-button', 'button-white']);

    this.element.innerHTML = 'Start game';
  }
}
