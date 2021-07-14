import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AdminCardWord from '../components/AdminCardWord';
import AdminChangeWord from '../components/AdminChangeWord';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { ICards } from '../store/reducers/cardReducer.module';

export const AdminWordPage: React.FC = () => {
  const { indexCategory } = useTypedSelector(state => state.auth);
  const { listCards, categoryCards } = useTypedSelector(state => state.cards);
  const [getChangeWord, setChangeWord] = useState(false);
  const history = useHistory();

  if (indexCategory === null) {
    history.push("/admin");
    return (<></>);
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
            <img className="plus" src="../../images/plus.png" alt="plus" />
          </div>
        </div>
      </main>
    </>
  );
}
