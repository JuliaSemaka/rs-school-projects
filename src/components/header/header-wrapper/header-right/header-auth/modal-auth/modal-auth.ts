import './modal-auth.scss';
import { BaseComponent } from '../../../../../base-component';
import { ModalHeader } from './modal-header/modal-header';
import { ModalForm } from './modal-form/modal-form';

export class ModalAuth extends BaseComponent {
  private readonly modalHeader: ModalHeader;

  public readonly modalForm: ModalForm;

  constructor() {
    super('div', ['popup', 'hidden']);
    this.modalHeader = new ModalHeader();
    this.modalForm = new ModalForm();

    this.element.appendChild(this.modalHeader.element);
    this.element.appendChild(this.modalForm.element);
  }
}
