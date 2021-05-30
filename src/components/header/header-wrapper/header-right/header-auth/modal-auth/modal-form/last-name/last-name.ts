import './last-name.scss';
import { BaseComponent } from '../../../../../../../base-component';
import { RenderInput } from '../render-input/render-input';
import { Checked } from '../checked/checked';

export class LastName extends BaseComponent {
  public renderInput: RenderInput;

  public readonly validation: Object;

  public value: string;

  public start: boolean;

  public checked: Checked;

  constructor() {
    super('div', ['form__input', 'form__last-name']);
    this.value = '';
    this.start = false;

    this.renderInput = new RenderInput(this.value, 'text');
    this.checked = new Checked();
    this.validation = {
      empty: false,
      onlyDigit: false,
      errorSymbols: ['~', '!', '@', '#', '$', '%', '*', '(', ')', '_', '—', '+', '=', '|', ':', ';', '\"', '\'', '\`', '<', '>', ',', '.', '?', '/', '^'],
    };

    this.element.innerHTML = '<p class="text text-gray">Last Name</p>';
    this.element.appendChild(this.renderInput.element);
  }
}
