import './header-right.scss';
import { BaseComponent } from '../../../base-component';
import { HeaderAuth } from './header-auth/header-auth';
import { Cover } from './cover/cover';
import { ModalAuth } from './header-auth/modal-auth/modal-auth';

export class HeaderRight extends BaseComponent {
  private readonly headerAuth: HeaderAuth;

  private readonly cover: Cover;

  private readonly modalAuth: ModalAuth;

  constructor() {
    super('div', ['header-right']);
    this.headerAuth = new HeaderAuth();
    this.modalAuth = new ModalAuth();
    this.cover = new Cover();

    this.showAuth();
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
