import './header-avatar.scss';
import { BaseComponent } from '../../../../base-component';

export class HeaderAvatar extends BaseComponent {
  constructor(image: string) {
    super('div', ['header-avatar']);

    const img = new Image();
    img.setAttribute('src', image);
    this.element.append(img);
  }
}
