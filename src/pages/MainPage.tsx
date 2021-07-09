import React from 'react';
import { NavLink } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import { useActions } from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypedSelector';

export const MainPage: React.FC = () => {
  const { categoryCards, isModePlay, isShowLeftMenu } = useTypedSelector(state => state.cards);
  const { chooseCategory, hideMenu } = useActions();

  const hideLeftMenu = (): void => {
    if (isShowLeftMenu) {
      hideMenu();
    }
  }

  let classesMode: string[] = ['main-card__front'];
  if (isModePlay) {
    classesMode.push('game');
  }

  return (
    <React.Fragment>
        <main className="main" onClick={hideLeftMenu}>
          <div className="main-container">
            {categoryCards.map((item,index) => {
              return (
                <NavLink to="/category" className="main-card__container" key={index} onClick={chooseCategory.bind(null, index)}>
                    <div className="main-card">
                      <div className={classesMode.join(' ')}>
                        <div className="main-card__img" style={{backgroundImage: `url("./img/category${index}.jpg")`}}></div>
                        <div className="text text-title text-center">{ item }</div>
                      </div>
                    </div>
                </NavLink>
              );
            })}
          </div>
      </main>
    </React.Fragment>
  );
}
