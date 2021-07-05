import React from 'react';
import { useParams, NavLink, useRouteMatch } from 'react-router-dom';
import AdminCardWord from '../components/AdminCardWord';

export const AdminWordPage: React.FC = () => {
  const category = useParams();
  const match = useRouteMatch();
  console.log(category);

  return (
    <>
    <div className="header-admin">
        <ul>
          <li className="text text-title text-white">
            <NavLink to="/admin">Categories</NavLink>
          </li>
          <li className="text text-title text-white">
            <NavLink to={match.url} className="choose">Words</NavLink>
          </li>
        </ul>
        <button className="header-logout button button-transparent text-title">Log out</button>
      </div>
      <main className="main">
          <h3>Category: Action (set A)</h3>
        <div className="main-container">
          <AdminCardWord />
          <AdminCardWord />
          <AdminCardWord />
        </div>
      </main>
    </>
  );
}
