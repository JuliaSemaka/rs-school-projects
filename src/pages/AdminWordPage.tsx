import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import AdminCardWord from '../components/AdminCardWord';
import AdminChangeWord from '../components/AdminChangeWord';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { ICards, Links } from '../store/reducers/cardReducer.module';

export const AdminWordPage: React.FC = () => {
  const { indexCategory, isAuthorize } = useTypedSelector(state => state.auth);
  const { listCards, categoryCards } = useTypedSelector(state => state.cards);
  const [getChangeWord, setChangeWord] = useState(false);

  if (!isAuthorize) {
    return (<Redirect to="/" />);
  }

  if (indexCategory === null) {
    return (<Redirect to="/admin" />);
  }

  return (
    <>
      <main className="main">
          <h3>Category: {categoryCards[indexCategory]}</h3>
        <div className="main-container">
          {
            listCards[indexCategory].map((item: ICards, index: number) => {
              return (<AdminCardWord item={item} index={index} key={index}/>);
            })
          }
          {getChangeWord && <AdminChangeWord setChangeWord={() => setChangeWord(false)} />}
          <div className="card-category card-category-word card-category-new" onClick={() => setChangeWord(true)}>
            <p className="text text-title">Add new Word</p>
            <img className="plus" src={`${Links.static}images/plus.png`} alt="plus" />
          </div>
        </div>
      </main>
    </>
  );
}
