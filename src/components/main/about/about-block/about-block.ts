import './about-block.scss';
import { BaseComponent } from '../../../base-component';
import { AboutBlockSteps } from './about-block-steps/about-block-steps';

export class AboutBlock extends BaseComponent {
  private readonly aboutBlockSteps: AboutBlockSteps;

  constructor() {
    super('div', ['about-block']);
    this.aboutBlockSteps = new AboutBlockSteps();

    this.element.appendChild(this.aboutBlockSteps.element);
  }
}
