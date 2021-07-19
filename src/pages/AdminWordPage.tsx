import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Redirect } from 'react-router-dom';
import AdminCardWord from '../components/AdminCardWord';
import AdminChangeWord from '../components/AdminChangeWord';
import { useActions } from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { ICards, Links } from '../store/reducers/cardReducer.module';

export const AdminWordPage: React.FC = () => {
  const { indexCategory, isAuthorize } = useTypedSelector(state => state.auth);
  const { listCards, categoryCards, lengthCards } = useTypedSelector(state => state.cards);
  const { getCardsPage, clearCards } = useActions();
  const [getChangeWord, setChangeWord] = useState(false);
  const [getPage, setPage] = useState(1);

  useEffect(() => {
    if (indexCategory !== null) {
    clearCards(indexCategory);
    getCardsPage(indexCategory, getPage);
    setPage(prev => prev + 1)
    }
  }, []);

  if (!isAuthorize) {
    return (<Redirect to="/" />);
  }

  if (indexCategory === null) {
    return (<Redirect to="/admin" />);
  }

  function cardPage() {
    getCardsPage(indexCategory as number, getPage);
    setPage(prev => prev + 1);
  }

  return (
    <>
      <main className="main">
          <h3>Category: {categoryCards[indexCategory]}</h3>
        <div className="main-container">
        <InfiniteScroll
          dataLength={listCards[indexCategory].length}
          next={cardPage}
          hasMore={listCards[indexCategory].length !== lengthCards[indexCategory]}
          loader={<div className="spinner-border" role="status" style={{position: 'absolute', bottom: '-45px', left: '3%'}}>
                    <span className="visually-hidden">Loading...</span>
                  </div>}
          style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
        >
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
        </InfiniteScroll>
        </div>
      </main>
    </>
  );
}
