import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useActions } from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { Links } from '../store/reducers/cardReducer.module';

export const MainPage: React.FC = () => {
  const {
    categoryCards,
    isModePlay,
    isShowLeftMenu,
    listCards,
    isLoadingData,
  } = useTypedSelector((state) => state.cards);
  const { chooseCategory, hideMenu, getCards, getCategories } = useActions();

  useEffect(() => {
    getCards();
    getCategories();
  }, []);

  const hideLeftMenu = (): void => {
    if (isShowLeftMenu) {
      hideMenu();
    }
  };

  let classesMode: string[] = ['main-card__front'];
  if (isModePlay) {
    classesMode.push('game');
  }

  return (
    <React.Fragment>
      {isLoadingData ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <main className="main" onClick={hideLeftMenu}>
          <div className="main-container">
            {categoryCards.map((item, index) => {
              return (
                <NavLink
                  to="/category"
                  className="main-card__container"
                  key={index}
                  onClick={chooseCategory.bind(null, index)}
                >
                  <div className="main-card">
                    <div className={classesMode.join(' ')}>
                      <div
                        className="main-card__img"
                        style={{
                          backgroundImage: `url("${
                            listCards[index] &&
                            listCards[index][0]?.image &&
                            listCards[index][0].image.startsWith('data:')
                              ? ''
                              : Links.static
                          }${
                            listCards[index] && listCards[index][0]?.image
                              ? listCards[index][0].image
                              : 'img/help.png'
                          }")`,
                        }}
                      ></div>
                      <div className="text text-title text-center">{item}</div>
                    </div>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </main>
      )}
    </React.Fragment>
  );
};
