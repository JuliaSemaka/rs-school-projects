import './email.scss';
import { BaseComponent } from '../../../../../../../base-component';
import { RenderInput } from '../render-input/render-input';
import { Checked } from '../checked/checked';

export class Email extends BaseComponent {
  public renderInput: RenderInput;

  public readonly validation: { email: boolean; errorSymbols: string[] };

  public start: boolean;

  public checked: Checked;

  public valid: boolean;

  constructor() {
    super('div', ['form__input', 'form__email']);
    this.start = false;

    this.renderInput = new RenderInput('', 'email');
    this.checked = new Checked();
    this.validation = {
      email: true,
      errorSymbols: [],
    };
    this.valid = false;

    this.element.innerHTML = '<p class="text text-gray">E-mail</p>';
    this.element.appendChild(this.renderInput.element);
  }
}
