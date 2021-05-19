import './main.scss';
import { BaseComponent } from '../base-component';
import { MainWrapper } from './main-wrapper/main-wrapper';

export class Main extends BaseComponent {
  private readonly mainWrapper: MainWrapper;

  constructor() {
    super('main', ['main']);
    this.mainWrapper = new MainWrapper();

    this.element.appendChild(this.mainWrapper.element);
  }
}
