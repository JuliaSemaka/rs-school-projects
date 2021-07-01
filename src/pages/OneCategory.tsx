import React from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';

export const OneCategory: React.FC = () => {
  const {indexCategory, listCards} = useTypedSelector(state => state.cards);

  if (indexCategory === null) {
    return (<></>);
  }

  return (
    <React.Fragment>
      {listCards[indexCategory].map(item => {
        return (
          <div className="main-card__container">
            <div className="main-card">
              <div className="main-card__front">{item.word}</div>
              <div className="main-card__back"></div>
            </div>
          </div>
        );
      })}

      {/* <div className="main-card__container flipped"> */}

    </React.Fragment>
  );
}
