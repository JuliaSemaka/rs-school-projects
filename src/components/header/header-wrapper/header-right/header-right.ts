import './header-right.scss';
import { BaseComponent } from '../../../base-component';
import { HeaderAuth } from './header-auth/header-auth';
import { Cover } from './cover/cover';
import { ModalAuth } from './header-auth/modal-auth/modal-auth';
import { IndexedDb } from '../../../../shared/indexeddb';
import { HeaderStartGame } from './header-start-game/header-start-game';
import { HeaderAvatar } from './header-avatar/header-avatar';

export class HeaderRight extends BaseComponent {
  public readonly headerAuth: HeaderAuth;

  public readonly headerStartGame: HeaderStartGame;

  private readonly indexedDb: IndexedDb;

  private readonly cover: Cover;

  private readonly modalAuth: ModalAuth;

  constructor() {
    super('div', ['header-right']);
    this.headerAuth = new HeaderAuth();
    this.headerStartGame = new HeaderStartGame();
    this.modalAuth = new ModalAuth();
    this.cover = new Cover();
    this.indexedDb = new IndexedDb();

    this.fillHeaderRight();
  }

  async fillHeaderRight() : Promise<void> {
    this.element.innerHTML = '';
    const userAuth = await IndexedDb.getData('users');
    if ((userAuth as []).length === 0) {
      this.showAuth();
    } else {
      this.element.appendChild(this.headerStartGame.element);
      const user = (userAuth as []).shift();
      if (!user) throw Error();
      const arrUser = Object.values(user);

      const headerAvatar = new HeaderAvatar(<string>arrUser[3]);
      this.element.appendChild(headerAvatar.element);
    }
  }

  showAuth() : void {
    this.element.appendChild(this.headerAuth.element);
    this.element.appendChild(this.cover.element);
    this.element.appendChild(this.modalAuth.element);

    this.addEvents();
  }

  addEvents() : void {
    this.headerAuth.element.addEventListener('click', () => this.togglePopup());
    this.cover.element.addEventListener('click', () => this.togglePopup());
    this.modalAuth.modalForm.buttonAdd.element.addEventListener('click', () => {
      this.togglePopup();
      this.modalAuth.addUser();
      this.fillHeaderRight();
    });

    this.modalAuth.modalForm.buttonCancel.element.addEventListener('click', () => {
      this.togglePopup();
      this.modalAuth.clearData();
    });
  }

  togglePopup() : void {
    this.modalAuth.element.classList.toggle('hidden');
    this.cover.element.classList.toggle('hidden');
    document.body.classList.toggle('lock');
  }
}
