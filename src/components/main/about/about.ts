import './about.scss';
import { BaseComponent } from '../../base-component';
import { AboutBlock } from './about-block/about-block';

export class About extends BaseComponent {
  private readonly aboutBlock: AboutBlock;

  constructor() {
    super('div', ['about']);
    this.aboutBlock = new AboutBlock();

    this.element.innerHTML = `<p class="about__title text text-title">How to play?</p>`;
    this.element.appendChild(this.aboutBlock.element);
  }

}
