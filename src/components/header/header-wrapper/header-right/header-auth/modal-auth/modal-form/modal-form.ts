import './modal-form.scss';
import { BaseComponent } from '../../../../../../base-component';
import { FirstName } from './first-name/first-name';
import { LastName } from './last-name/last-name';
import { ButtonAdd } from './button-add/button-add';
import { ButtonCancel } from './button-cancel/button-cancel';
import { Email } from './email/email';
import { Avatar } from './avatar/avatar';

export class ModalForm extends BaseComponent {
  private readonly firstName: FirstName;

  private readonly lastName: LastName;

  private readonly email: Email;

  private readonly avatar: Avatar;

  public readonly buttonCancel: ButtonCancel;

  private readonly buttonAdd: ButtonAdd;

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

    this.firstName.renderInput.element.addEventListener('change', () => this.isValid(this.firstName));
    this.lastName.renderInput.element.addEventListener('change', () => this.isValid(this.lastName));
    this.email.renderInput.element.addEventListener('change', () => this.isValid(this.email));
  }

  isValid(elem : FirstName | LastName | Email) {
    elem.value = (elem.renderInput.element as HTMLInputElement).value;
    let isCorrect = true;
    //   this.validation = {
    //     'empty' : false,
    //     'onlyDigit' : false,
    //     'errorSymbols' : ['~', '!', '@', '#', '$', '%', '*', '(',')', '_', '—', '+', '=', '|', ':', ';', '\"', '\'', '\`', '<', '>', ',', '.', '?', '/', '^']
    // };
    for (const key in elem.validation) {
      if (key === 'empty') {
        if (elem.value.trim() === '') {
          isCorrect = false;
        }
      } else if (key === 'onlyDigit') {
        if (typeof elem.value.trim() === 'number') {
          isCorrect = false;
        }
      } else if (key === 'errorSymbols') {
        // let re = elem.validation
        // if (!re.test(String(elem.value.trim()).toLowerCase())) {
        //   isCorrect = false;
        // }
      } else if (key === 'email') {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(elem.value.trim()).toLowerCase())) {
          isCorrect = false;
        }
      }
    }
    elem.element.appendChild(elem.checked.element);
  }
}
