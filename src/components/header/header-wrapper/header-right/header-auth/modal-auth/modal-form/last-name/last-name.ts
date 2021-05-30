import './last-name.scss';
import { BaseComponent } from '../../../../../../../base-component';
import { RenderInput } from '../render-input/render-input';
import { Checked } from '../checked/checked';

export class LastName extends BaseComponent {
  public renderInput: RenderInput;

  public readonly validation: { onlyDigit: boolean; errorSymbols: string[] };

  public start: boolean;

  public checked: Checked;

  public valid: boolean;

  constructor() {
    super('div', ['form__input', 'form__last-name']);
    this.start = false;

    this.renderInput = new RenderInput('', 'text');
    this.checked = new Checked();
    this.validation = {
      onlyDigit: false,
      errorSymbols: ['~', '!', '@', '#', '$', '%', '*', '(', ')', '_', '—', '+', '=',
        '|', ':', ';', '"', '\'', '`', '<', '>', ',', '.', '?', '/', '^'],
    };
    this.valid = false;

    this.element.innerHTML = '<p class="text text-gray">Last Name</p>';
    this.element.appendChild(this.renderInput.element);
  }
}
