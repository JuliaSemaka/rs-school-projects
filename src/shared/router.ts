import { RoutesModel } from '../models/routes-model';

export class Router {
  private routes: RoutesModel[] = [];

  public root = '/';

  add(path: string, name: string): Router {
    this.routes.push({ path, name });
    return this;
  }

  remove(path: string): Router {
    for (let i = 0; i < this.routes.length; i += 1) {
      if (this.routes[i].path === path) {
        this.routes.slice(i, 1);
        return this;
      }
    }
    return this;
  }

  flush(): Router {
    this.routes = [];
    return this;
  }

  getRoute(): string {
    this.setRoute();
    return this.root;
  }

  setRoute(): void {
    this.root = window.location.hash.toString().replace(/#/, '');
  }
}
