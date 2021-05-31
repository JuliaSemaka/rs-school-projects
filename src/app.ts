import { Header } from './components/header/header';
import { Main } from './components/main/main';
import { Router } from './shared/router';

export class App {
  private readonly route: Router;

  public readonly header: Header;

  public readonly main: Main;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header();
    this.main = new Main();
    this.route = new Router();

    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.main.element);

    this.addEvents();
  }

  addEvents() : void {
    this.header.headerWrapper.headerRight.headerStartGame.element.addEventListener('click', () => {
      this.route.setRoute('/game');
    });
  }
}
