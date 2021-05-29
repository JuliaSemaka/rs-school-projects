import './styles.scss';
import { App } from './app';

export const APP = new App(document.body);

window.onload = () => APP;
