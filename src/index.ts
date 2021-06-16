import { render } from './pages/app';
import { listenApp } from './pages/listenApp';
import { initStore } from './store/store';
import './styles.scss';

async function startApp(): Promise<void> {
  await initStore();
  render();
  listenApp();
}

startApp();
