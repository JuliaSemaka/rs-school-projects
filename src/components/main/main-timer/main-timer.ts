import './main-timer.scss';
import { BaseComponent } from '../../base-component';

export class MainTimer extends BaseComponent {
  constructor() {
    super('div', ['main-timer']);

    this.element.innerHTML = '<p class="text main-timer__text">00:01</p>';
  }
}
