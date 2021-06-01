import { BaseComponent } from '../../../../../../../../base-component';

export class InputFile extends BaseComponent {
  constructor() {
    super('input', ['form__avatar_input']);
    this.element.setAttribute('type', 'file');
  }
}
