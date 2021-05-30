import './button-cancel.scss';
import { BaseComponent } from '../../../../../../../base-component';

export class ButtonCancel extends BaseComponent {
  constructor() {
    super('button', ['button', 'button-white', 'text-button', 'form__button-cancel']);

    this.element.innerHTML = 'cancel';
  }
}
