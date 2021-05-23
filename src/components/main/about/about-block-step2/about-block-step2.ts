import './about-block-step2.scss';
import { BaseComponent } from '../../../base-component';
import Setting from '../../../../assets/image/setting.png';

export class AboutBlockStep2 extends BaseComponent {
  // private readonly aboutBlock: AboutBlock;

  constructor() {
    super('div', ['about-block-step2']);

    this.element.innerHTML =
    `<div class="about-block-steps__block">
      <div class="about-block-steps__number"><span class="text text-number">2</span></div>
      <p class="about-block-steps__text text text-name">Configure your game settings</p>
    </div>
    <div class="about-block-steps__image">
      <img class="" src="${Setting}" alt="setting">
    </div>`;
  }

}
