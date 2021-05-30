import './button-add.scss';
import { BaseComponent } from '../../../../../../../base-component';

export class ButtonAdd extends BaseComponent {
  constructor() {
    super('input', ['button', 'button-blue', 'text-button', 'form__button-add']);
    this.element.setAttribute('type', 'submit');

    this.element.innerHTML = 'Add user';
  }
}
