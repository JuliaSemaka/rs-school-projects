import './avatar.scss';
import { BaseComponent } from '../../../../../../../base-component';
import { InputFile } from './input-file/input-file';

export class Avatar extends BaseComponent {
  private inputFile: InputFile;

  constructor() {
    super('div', ['form__avatar']);
    this.inputFile = new InputFile();

    this.element.appendChild(this.inputFile.element);

    this.inputFile.element.addEventListener('change', () => {
      if (this.inputFile.element === null) throw Error();
      const file = ((this.inputFile.element as HTMLInputElement).files as FileList)[0];
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.setAttribute('src', (reader.result as string));
        img.classList.add('image-avatar');
        this.element.innerHTML = '';
        this.element.append(img);
      };
      reader.readAsDataURL(file);
    });
  }
}
