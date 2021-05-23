import './about-block-step3.scss';
import { BaseComponent } from '../../../base-component';
import Cards from '../../../../assets/image/cards.png';

export class AboutBlockStep3 extends BaseComponent {
  // private readonly aboutBlock: AboutBlock;

  constructor() {
    super('div', ['about-block-step3']);

    this.element.innerHTML =
    `<div class="about-block-steps__block">
      <div class="about-block-steps__number"><span class="text text-number">3</span></div>
      <p class="about-block-steps__text text text-name">Start you new game! Remember card positions and match it before times up.</p>
    </div>
    <div class="about-block-steps__image">
      <img class="" src="${Cards}" alt="cards">
    </div>`;
  }

}
