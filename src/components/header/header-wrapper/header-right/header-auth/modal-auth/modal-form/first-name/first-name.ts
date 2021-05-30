import './first-name.scss';
import { BaseComponent } from '../../../../../../../base-component';
import { RenderInput } from '../render-input/render-input';
import { Checked } from '../checked/checked';

export class FirstName extends BaseComponent {
  public renderInput: RenderInput;

  public readonly validation: { onlyDigit: boolean; errorSymbols: string[] };

  public checked: Checked;

  public valid: boolean;

  constructor() {
    super('div', ['form__input', 'form__first-name']);

    this.renderInput = new RenderInput('', 'text');
    this.checked = new Checked();
    this.validation = {
      onlyDigit: false,
      errorSymbols: ['~', '!', '@', '#', '$', '%', '*', '(', ')', '_', '—', '+', '=', '|',
        ':', ';', '"', '\'', '`', '<', '>', ',', '.', '?', '/', '^'],
    };
    this.valid = false;

    this.element.innerHTML = '<p class="text text-gray">First Name</p>';
    this.element.appendChild(this.renderInput.element);
  }
}
