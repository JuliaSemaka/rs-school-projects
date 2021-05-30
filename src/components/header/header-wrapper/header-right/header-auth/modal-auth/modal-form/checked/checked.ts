import './checked.scss';
import { BaseComponent } from '../../../../../../../base-component';
import checkedСircle from '../../../../../../../../assets/checkedСircle.svg';
import checked from '../../../../../../../../assets/checked.svg';

export class Checked extends BaseComponent {
  constructor() {
    super('div', ['form__checked']);

    this.element.innerHTML = `
      <img src="${checkedСircle}" alt="checkedСircle" class="form__checked_image">
      <img src="${checked}" alt="checked" class="form__checked_image">
    `;
  }
}
