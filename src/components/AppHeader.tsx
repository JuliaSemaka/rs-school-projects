import React from 'react';
import { NavLink, useParams, useRouteMatch } from 'react-router-dom';
import { useActions } from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { EPageAdmin } from '../store/reducers/authReducer.module';
import LeftMenu from './LeftMenu';

const AppHeader: React.FC = () => {
  const {isModePlay, isShowLeftMenu } = useTypedSelector(state => state.cards);
  const {pageAdmin} = useTypedSelector(state => state.auth);
  const { isAdminPage } = useTypedSelector(state => state.auth);
  const {changeMode, showMenu, hideMenu} = useActions();
  const match = useRouteMatch();
  // const category = useParams();
  console.log(match);

  const hideLeftMenu = (): void => {
    if (isShowLeftMenu) {
      hideMenu();
    }
  }

  const classesBurger: string[] = ['header-burger'];
  if (isShowLeftMenu) {
    classesBurger.push('active');
  }
  if (isAdminPage) {
    return (
      <div className="header-admin">
        <ul>
          <li className="text text-title text-white">
            <NavLink to='/admin' className={pageAdmin === EPageAdmin.ADMIN_PAGE ? 'choose' : ''}>Categories</NavLink>
          </li>
          <li className="text text-title text-white">
            <div className={pageAdmin === EPageAdmin.ADMIN_WORDS_PAGE ? 'choose' : ''}>Words</div>
          </li>
        </ul>
        <button className="header-logout button button-transparent text-title">Log out</button>
      </div>
    );
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
