import './selector.scss';
import { BaseComponent } from '../../../../base-component';

export class Selector extends BaseComponent {
  constructor(array: string[]) {
    super('select', ['text', 'select-style']);

    this.fillOptions(array);
  }

  fillOptions(array: string[]) : void {
    let str = '';
    array.forEach((item) => {
      str += `<option value="${item}">${item}</option>`;
    });
    this.element.innerHTML = str;
  }
}
