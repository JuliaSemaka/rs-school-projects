import React from 'react';
import { useActions } from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypedSelector';
import LeftMenu from './LeftMenu';

const AppHeader: React.FC = () => {
  const {isModePlay, isShowLeftMenu } = useTypedSelector(state => state.cards);
  const {changeMode, showMenu, hideMenu} = useActions();

  const hideLeftMenu = (): void => {
    if (isShowLeftMenu) {
      hideMenu();
    }
  }

  const classesBurger: string[] = ['header-burger'];
  if (isShowLeftMenu) {
    classesBurger.push('active');
  }

  return (
    <header className="header" onClick={hideLeftMenu}>
      <div className="header-container">
        <div className={classesBurger.join(' ')} id="header-burger" onClick={showMenu}>
          <span className="header-burger__span"></span>
        </div>
        <LeftMenu />
        <label className="switch">
          <input type="checkbox"
          checked={isModePlay}
          onChange={changeMode}
          />
          <span className="switch-slider" data-on="Train" data-off="Play"></span>
          <span className="switch-handle"></span>
        </label>
      </div>
    </header>
  );
}

export default AppHeader;
