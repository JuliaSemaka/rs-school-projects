import './email.scss';
import { BaseComponent } from '../../../../../../../base-component';
import { RenderInput } from '../render-input/render-input';
import { Checked } from '../checked/checked';

export class Email extends BaseComponent {
  public renderInput: RenderInput;

  public readonly validation: Object;

  public value: string;

  public start: boolean;

  public checked: Checked;

  constructor() {
    super('div', ['form__input', 'form__email']);
    this.value = '';
    this.start = false;

    this.renderInput = new RenderInput(this.value, 'email');
    this.checked = new Checked();
    this.validation = {
      empty: false,
      email: true,
    };

    this.element.innerHTML = '<p class="text text-gray">E-mail</p>';
    this.element.appendChild(this.renderInput.element);
  }
}
