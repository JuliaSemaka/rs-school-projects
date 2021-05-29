import './about-block-steps.scss';
import { BaseComponent } from '../../../../base-component';
import { AboutBlockStep1 } from './about-block-step1/about-block-step1';
import { AboutBlockStep2 } from './about-block-step2/about-block-step2';
import { AboutBlockStep3 } from './about-block-step3/about-block-step3';

export class AboutBlockSteps extends BaseComponent {
  private readonly aboutBlockStep1: AboutBlockStep1;

  private readonly aboutBlockStep2: AboutBlockStep2;

  private readonly aboutBlockStep3: AboutBlockStep3;

  constructor() {
    super('div', ['about-block-steps']);
    this.aboutBlockStep1 = new AboutBlockStep1();
    this.aboutBlockStep2 = new AboutBlockStep2();
    this.aboutBlockStep3 = new AboutBlockStep3();

    this.element.appendChild(this.aboutBlockStep1.element);
    this.element.appendChild(this.aboutBlockStep2.element);
    this.element.appendChild(this.aboutBlockStep3.element);
  }
}
