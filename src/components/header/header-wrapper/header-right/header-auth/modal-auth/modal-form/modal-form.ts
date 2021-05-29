import './modal-form.scss';
import { BaseComponent } from '../../../../../../base-component';

export class ModalForm extends BaseComponent {

  constructor() {
    super('div', ['popup-form']);

    this.element.innerHTML = `<p class="text text-title">Registr new Player</p>`;

  }
}
