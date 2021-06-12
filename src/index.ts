import { render } from './pages/app';
import { listenApp } from './pages/listenApp';
import { initStore } from './store/store';
// import store from './store/store';
import './styles.scss';

// await
async function startApp(): Promise<void> {
  await initStore();
  await render();
  listenApp();
}

startApp();
// console.log(store);
