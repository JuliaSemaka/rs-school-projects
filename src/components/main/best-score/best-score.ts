import './best-score.scss';
import { BaseComponent } from '../../base-component';
import { BestTable } from './best-table/best-table';
import { IndexedDb } from '../../../shared/indexeddb';

export class BestScore extends BaseComponent {
  constructor() {
    super('div', ['best-score']);

    this.element.innerHTML = '<p class="best-score__title text text-title">Best players</p>';
    this.getScore();
  }

  async getScore() : Promise<void> {
    const users = await IndexedDb.getData('users');
    const scores = await IndexedDb.getData('score');
    const user = (users as []).shift();

    const arrScore = (scores as []).map((item) => Object.values(item)).sort().reverse().slice(0, 10);
    arrScore.forEach((item) => {
      const bestTable = new BestTable(user, item);
      this.element.appendChild(bestTable.element);
    });
  }
}
