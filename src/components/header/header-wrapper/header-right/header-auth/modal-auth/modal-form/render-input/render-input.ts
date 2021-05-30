import './render-input.scss';
import { BaseComponent } from '../../../../../../../base-component';

export class RenderInput extends BaseComponent {
  constructor(value: string, type: string) {
    super('input', ['form-input']);
    this.element.setAttribute('type', type);
    this.element.setAttribute('autocomplete', 'disabled');
    this.element.setAttribute('value', value);
    this.element.setAttribute('maxlength', '30');
  }
}
