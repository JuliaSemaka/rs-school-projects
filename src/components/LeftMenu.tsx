import React from 'react';
import { NavLink } from 'react-router-dom';
import { useActions } from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypedSelector';

const LeftMenu: React.FC = () => {
  const {categoryCards, isShowLeftMenu} = useTypedSelector(state => state.cards);
  const {showMenu,chouseCategory} = useActions();

  const classesMenu = ['menu'];
  if (isShowLeftMenu) {
    classesMenu.push('active');
  }
  return (
    <nav className={ classesMenu.join(' ') }>
        <ul className="menu-list">
          <li className="menu-list__item">
            <NavLink to="/" className="menu-list__link text text-button text-white" onClick={showMenu}>Main Page</NavLink>
          </li>
          {categoryCards.map((name, i) => {
            return (<li className="menu-list__item" key={i}>
            <NavLink to="/category" className="menu-list__link text text-button text-white" onClick={chouseCategory.bind(null, i)}>{name}</NavLink>
          </li>)
          })}

        </ul>
      </nav>
  );
}

export default LeftMenu;
