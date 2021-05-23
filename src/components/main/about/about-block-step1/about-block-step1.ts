import './about-block-step1.scss';
import { BaseComponent } from '../../../base-component';
import Register from '../../../../assets/image/register.png';

export class AboutBlockStep1 extends BaseComponent {
  // private readonly aboutBlock: AboutBlock;

  constructor() {
    super('div', ['about-block-step1']);
    // this.aboutBlock = new AboutBlock();

    this.element.innerHTML =
    `<div class="about-block-steps__block">
      <div class="about-block-steps__number"><span class="text text-number">1</span></div>
      <p class="about-block-steps__text text text-name">Register new player in game</p>
    </div>
    <div class="about-block-steps__image">
      <img class="" src="${Register}" alt="register">
    </div>`;
  }

}
