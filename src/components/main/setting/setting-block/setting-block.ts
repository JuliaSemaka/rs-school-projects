import './setting-block.scss';
import { BaseComponent } from '../../../base-component';
import { Selector } from './selector/selector';

export class SettingBlock extends BaseComponent {
  public readonly selector: Selector;

  constructor(title: string, array: string[]) {
    super('div', ['setting-block']);
    this.selector = new Selector(array);

    this.element.innerHTML = `<h3 class='text text-title select-title'>${title}</h3>`;
    this.element.appendChild(this.selector.element);
  }
}
