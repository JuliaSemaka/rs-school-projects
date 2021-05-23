import { RoutesModel } from '../models/routes-model';
import { MainWrapper } from '../components/main/main-wrapper/main-wrapper';

export class Router {
  private routes: RoutesModel[] = [];
  private root:string = '/';

  constructor() {
    this.listen();
  }

  add(path: string, name: string): Router {
    this.routes.push({ path, name });
    return this;
  };

  remove(path: string): Router {
    for (let i = 0; i < this.routes.length; i += 1) {
      if (this.routes[i].path === path) {
        this.routes.slice(i, 1);
        return this;
      }
    }
    return this;
  };

  flush(): Router {
    this.routes = [];
    return this;
  };

  clearSlashes(path: string): string {
    return path
    .toString()
    .replace(/#/, '');
  }

  getRoute(): string {
    this.setRoute();
    return this.root;
  };

  setRoute(): void {
    this.root = this.clearSlashes(window.location.hash);
  }

  listen(): void {
    setInterval(() => this.interval(), 500);
  };

  interval(): boolean {
    if (this.root === this.getRoute()) return false;
console.log(this.root);

    this.root = this.getRoute();
    return true;
  };

}
