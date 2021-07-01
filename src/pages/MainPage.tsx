import React from 'react';
import { NavLink } from 'react-router-dom';
import { useActions } from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypedSelector';

export const MainPage: React.FC = () => {
  const {categoryCards} = useTypedSelector(state => state.cards);
  const {chouseCategory} = useActions();

  return (
    <React.Fragment>
          {categoryCards.map((item,index) => {
            return (
              <NavLink to="/category" className="main-card__container" onClick={chouseCategory.bind(null, index)}>
                  <div className="main-card">
                    <div className="main-card__front">{ item }</div>
                  </div>
              </NavLink>
            );
          })}
    </React.Fragment>
  );
}
