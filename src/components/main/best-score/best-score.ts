import './best-score.scss';
import { BaseComponent } from '../../base-component';
import { BestTable } from '../best-table/best-table';

export class BestScore extends BaseComponent {
private readonly bestTable: BestTable;

  constructor() {
    super('div', ['best-score']);
    this.bestTable = new BestTable();

    this.element.innerHTML = `<p class="best-score__title text text-title">Best players</p>`;
    this.element.appendChild(this.bestTable.element);
  }
}
