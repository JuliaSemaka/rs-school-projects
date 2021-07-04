import React from 'react';
import { NavLink } from 'react-router-dom';
import { useActions } from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { typePage } from '../store/reducers/cardReducer.module';

const LeftMenu: React.FC = () => {
  const {categoryCards, isShowLeftMenu, indexCategory, page} = useTypedSelector(state => state.cards);
  const {changeMainPage,chooseCategory, changeStatisticsPage} = useActions();

  let classesMenu: string[] = ['menu'];
  let classesLink: string[] = ["menu-list__link", "text", "text-button", "text-white"];
  let classesLinkActive: string[] = classesLink.concat(["chouse"]);
  if (isShowLeftMenu) {
    classesMenu.push('active');
  }

  return (
    <nav className={ classesMenu.join(' ') }>
        <ul className="menu-list">
          <li className="menu-list__item">
            <NavLink to="/" className={page === typePage.MAIN_PAGE ? classesLinkActive.join(' ') : classesLink.join(' ')} onClick={changeMainPage}>Main Page</NavLink>
          </li>
          {categoryCards.map((name, i) => {
            return (<li className="menu-list__item" key={i}>
            <NavLink to="/category" className={indexCategory === i ? classesLinkActive.join(' ') : classesLink.join(' ')} onClick={chooseCategory.bind(null, i)}>{name}</NavLink>
          </li>)
          })}
          <li className="menu-list__item">
            <NavLink to="/statistics" className={page === typePage.STATISTICS_PAGE ? classesLinkActive.join(' ') : classesLink.join(' ')} onClick={changeStatisticsPage}>Statistics Page</NavLink>
          </li>
        </ul>
      </nav>
  );
}

export default LeftMenu;
