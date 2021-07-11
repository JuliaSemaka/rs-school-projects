import React, { useState } from 'react';
import AdminCardCategory from '../components/AdminCardCategory';
import AdminChangeCategory from '../components/AdminChangeCategory';
import { useTypedSelector } from '../hooks/useTypedSelector';

export const AdminPage: React.FC = () => {
  const { categoryCards } = useTypedSelector(state => state.cards);
  const [newCategory, setNewCategory] = useState(false);

  function changeNewCategory() {
    setNewCategory(false);
  }

  return (
    <React.Fragment>
      <main className="main">
        <div className="main-container">
          {categoryCards.map((name, i) => {
            return (<AdminCardCategory key={i} index={i} name={name}/>)
          })}
          {
            newCategory && <AdminChangeCategory name='' changeCategory={changeNewCategory} />
          }
          <div className="card-category card-category-new" onClick={() => setNewCategory(true)}>
            <p className="text text-title">Create new Category</p>
            <img className="plus" src="./images/plus.png" alt="plus" />
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}
