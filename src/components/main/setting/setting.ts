import './setting.scss';
import { BaseComponent } from '../../base-component';
import { SettingBlock } from './setting-block/setting-block';

export class Setting extends BaseComponent {
  public readonly settingBlock: SettingBlock;

  public readonly settingBlockTwo: SettingBlock;

  private readonly arrayCards: string[];

  private readonly arrayType: string[];

  constructor() {
    super('div', ['setting']);
    this.arrayCards = ['Animals', 'Birds'];
    this.arrayType = ['4x4', '6x6', '8x8'];
    this.settingBlock = new SettingBlock('Game cards', this.arrayCards);
    this.settingBlockTwo = new SettingBlock('Difficulty', this.arrayType);

    this.element.appendChild(this.settingBlock.element);
    this.element.appendChild(this.settingBlockTwo.element);
  }
}
