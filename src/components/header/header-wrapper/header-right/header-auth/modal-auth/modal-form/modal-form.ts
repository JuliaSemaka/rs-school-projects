import './modal-form.scss';
import { BaseComponent } from '../../../../../../base-component';
import { FirstName } from './first-name/first-name';
import { LastName } from './last-name/last-name';
import { ButtonAdd } from './button-add/button-add';
import { ButtonCancel } from './button-cancel/button-cancel';
import { Email } from './email/email';
import { Avatar } from './avatar/avatar';

export class ModalForm extends BaseComponent {
  public readonly firstName: FirstName;

  public readonly lastName: LastName;

  public readonly email: Email;

  public readonly avatar: Avatar;

  public readonly buttonCancel: ButtonCancel;

  public readonly buttonAdd: ButtonAdd;

  constructor() {
    super('div', ['popup-form']);

    this.firstName = new FirstName();
    this.lastName = new LastName();
    this.email = new Email();
    this.avatar = new Avatar();
    this.buttonAdd = new ButtonAdd();
    this.buttonCancel = new ButtonCancel();

    this.element.appendChild(this.firstName.element);
    this.element.appendChild(this.lastName.element);
    this.element.appendChild(this.email.element);
    this.element.appendChild(this.avatar.element);
    this.element.appendChild(this.buttonAdd.element);
    this.element.appendChild(this.buttonCancel.element);

    this.firstName.renderInput.element.addEventListener('input', () => this.isValid(this.firstName));
    this.lastName.renderInput.element.addEventListener('input', () => this.isValid(this.lastName));
    this.email.renderInput.element.addEventListener('input', () => this.isValid(this.email));
  }

  isValid(elem : FirstName | LastName | Email) : void {
    const { value } = elem.renderInput.element as HTMLInputElement;
    let isCorrect = true;
    isCorrect = Object.keys(elem.validation).every((key) => {
      if (key === 'onlyDigit') {
        if (!Number.isNaN(Number(value.trim()))) {
          return false;
        }
        return true;
      } if (key === 'errorSymbols') {
        if (Object.keys(elem.validation[key]).length !== 0) {
          return elem.validation[key].every((item) => !value.trim().includes(item));
        }
        return true;
      } if (key === 'email') {
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!reg.test(String(value.trim()).toLowerCase())) {
          return false;
        }
        return true;
      }
      return true;
    });

    if (value.trim() === '') {
      isCorrect = false;
    }

    if (isCorrect && !elem.valid) {
      elem.valid = true;
      elem.element.appendChild(elem.checked.element);
      elem.element.classList.remove('form__input_error');
    } else if (!isCorrect) {
      elem.valid = false;
      elem.checked.element.remove();
      elem.element.classList.add('form__input_error');
    }

    if (this.firstName.valid && this.lastName.valid && this.email.valid) {
      this.buttonAdd.element.removeAttribute('disabled');
    }
  }
}
