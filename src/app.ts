import { Header } from './components/header/header';
import { Main } from './components/main/main';

export class App {
  public readonly header: Header;

  public readonly main: Main;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header();
    this.main = new Main();

    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.main.element);
  }
}
