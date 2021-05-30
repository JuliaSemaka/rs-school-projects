import './modal-header.scss';
import { BaseComponent } from '../../../../../../base-component';

export class ModalHeader extends BaseComponent {
  constructor() {
    super('div', ['popup-header']);

    this.element.innerHTML = '<p class="text text-title">Registr new Player</p>';
  }
}
