import './modal-auth.scss';
import { BaseComponent } from '../../../../../base-component';
import { ModalHeader } from './modal-header/modal-header';
import { ModalForm } from './modal-form/modal-form';
import { IndexedDb } from '../../../../../../shared/indexeddb';

export class ModalAuth extends BaseComponent {
  private readonly modalHeader: ModalHeader;

  private readonly indexedDb: IndexedDb;

  public readonly modalForm: ModalForm;

  constructor() {
    super('div', ['popup', 'hidden']);
    this.modalHeader = new ModalHeader();
    this.modalForm = new ModalForm();
    this.indexedDb = new IndexedDb();

    this.element.appendChild(this.modalHeader.element);
    this.element.appendChild(this.modalForm.element);
  }

  addUser() : void {
    const user = {
      firstName: (this.modalForm.firstName.renderInput.element as HTMLInputElement).value,
      lastName: (this.modalForm.lastName.renderInput.element as HTMLInputElement).value,
      email: (this.modalForm.email.renderInput.element as HTMLInputElement).value,
      image: document.querySelector('.image-avatar')?.getAttribute('src'),
    };

    IndexedDb.addData(user, 'users');
    this.clearData();
  }

  clearData() : void {
    (this.modalForm.firstName.renderInput.element as HTMLInputElement).value = '';
    (this.modalForm.lastName.renderInput.element as HTMLInputElement).value = '';
    (this.modalForm.email.renderInput.element as HTMLInputElement).value = '';
    this.modalForm.firstName.checked.element.remove();
    this.modalForm.lastName.checked.element.remove();
    this.modalForm.email.checked.element.remove();
    this.modalForm.firstName.valid = false;
    this.modalForm.lastName.valid = false;
    this.modalForm.email.valid = false;
    this.modalForm.buttonAdd.element.setAttribute('disabled', 'true');
    this.modalForm.firstName.element.classList.remove('form__input_error');
    this.modalForm.lastName.element.classList.remove('form__input_error');
    this.modalForm.email.element.classList.remove('form__input_error');
  }
}
