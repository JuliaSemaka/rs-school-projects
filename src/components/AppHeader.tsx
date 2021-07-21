import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useActions } from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { EPageAdmin } from '../store/reducers/authReducer.module';
import { ADMIN } from './component.module';
import LeftMenu from './LeftMenu';

const AppHeader: React.FC = () => {
  const {isModePlay, isShowLeftMenu } = useTypedSelector(state => state.cards);
  const {pageAdmin, isAdminPage, isAuthorize} = useTypedSelector(state => state.auth);
  const {changeMode, showMenu, hideMenu, changeAdminPage, leaveAdminPage, changeMainPage, setAuthorize, setFetchAuth } = useActions();
  const {pathname} = useLocation();

  useEffect(() => {
    if (pathname.includes(ADMIN) && isAuthorize) {
      changeAdminPage();
    }
  }, []);

  const hideLeftMenu = (): void => {
    if (isShowLeftMenu) {
      hideMenu();
    }
  }

  function leaveAdmin(): void {
    leaveAdminPage();
    changeMainPage();
    setAuthorize(false);
    setFetchAuth(false);
    sessionStorage.setItem('isAuthAdmin', '');
  }

  const classesBurger: string[] = ['header-burger'];
  if (isShowLeftMenu) {
    classesBurger.push('active');
  }

  return (
    <>
    {
      isAdminPage
        ? <div className="header-admin">
            <ul>
              <li className="text text-title text-white">
                <NavLink to='/admin' className={pageAdmin === EPageAdmin.ADMIN_PAGE ? 'choose' : ''} onClick={changeAdminPage}>Categories</NavLink>
              </li>
              <li className="text text-title text-white">
                <div className={pageAdmin === EPageAdmin.ADMIN_WORDS_PAGE ? 'choose' : ''}>Words</div>
              </li>
            </ul>
            <NavLink to="/" className="header-logout button button-transparent text-title" onClick={leaveAdmin}>Log out</NavLink>
          </div>
        : <header className="header" onClick={hideLeftMenu}>
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
      }
    </>
  );
}

export default AppHeader;
