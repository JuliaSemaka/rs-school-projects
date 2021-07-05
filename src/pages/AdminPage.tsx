import React, { useState } from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import AdminCardCategory from '../components/AdminCardCategory';
import AdminChangeCategory from '../components/AdminChangeCategory';
import { useTypedSelector } from '../hooks/useTypedSelector';

export const AdminPage: React.FC = () => {
  const { categoryCards } = useTypedSelector(state => state.cards);
  const match = useRouteMatch();
  const [newCategory, setNewCategory] = useState(false);

  return (
    <React.Fragment>
      <div className="header-admin">
        <ul>
          <li className="text text-title text-white">
            <NavLink to={`${match.url}`} className="choose">Categories</NavLink>
          </li>
          <li className="text text-title text-white">
            <NavLink to={`${match.url}/nameCategory/page`}>Words</NavLink>
          </li>
        </ul>
        <button className="header-logout button button-transparent text-title">Log out</button>
      </div>
      <main className="main">
        <div className="main-container">
          {categoryCards.map((name, i) => {
            return (<AdminCardCategory key={i} index={i} name={name}/>)
          })}
          {
            newCategory && <AdminChangeCategory name='' />
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
