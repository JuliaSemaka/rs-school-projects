import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Redirect } from 'react-router-dom';
import AdminCardCategory from '../components/AdminCardCategory';
import AdminChangeCategory from '../components/AdminChangeCategory';
import { useActions } from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { Links } from '../store/reducers/cardReducer.module';

export const AdminPage: React.FC = () => {
  const { categoryCards, lengthCategory } = useTypedSelector(state => state.cards);
  const { isAuthorize } = useTypedSelector(state => state.auth);
  const { getCategoriesPage, clearCategories, setLengthCategory, setLengthWords, getCards } = useActions();
  const [newCategory, setNewCategory] = useState(false);
  const [getPage, setPage] = useState(1);

  useEffect(() => {
    setLengthCategory();
    setLengthWords();
    clearCategories();
    getCategoriesPage(getPage);
    setPage(prev => prev + 1);
    getCards();
  }, []);

  if (!isAuthorize) {
    return (<Redirect to="/" />);
  }

  function changeNewCategory(): void {
    setNewCategory(false);
  }

  function categoriesPage(): void {
    getCategoriesPage(getPage);
    setPage(prev => prev+1);
  }

  return (
    <React.Fragment>
      <main className="main">
        <div className="main-container">
        <InfiniteScroll
          dataLength={categoryCards.length}
          next={categoriesPage}
          hasMore={categoryCards.length !== lengthCategory}
          loader={<div className="spinner-border" role="status" style={{position: 'absolute', bottom: '-45px', left: '3%'}}>
                    <span className="visually-hidden">Loading...</span>
                  </div>}
          style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', minWidth: '350px' }}
        >
          {categoryCards.map((name, i) => {
            return (<AdminCardCategory key={i} index={i} name={name}/>)
          })}
          {
            newCategory && <AdminChangeCategory name='' changeCategory={changeNewCategory} />
          }
          <div className="card-category card-category-new" onClick={() => setNewCategory(true)}>
            <p className="text text-title">Create new Category</p>
            <img className="plus" src={`${Links.static}images/plus.png`} alt="plus" />
          </div>
        </InfiniteScroll>
        </div>
      </main>
    </React.Fragment>
  );
}
