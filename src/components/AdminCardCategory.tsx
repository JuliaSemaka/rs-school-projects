import React, { useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import AdminChangeCategory from './AdminChangeCategory';
import { ICardProps } from './component.module';

const AdminCardCategory: React.FC<ICardProps> = ({ index, name }: ICardProps) => {
  const { listCards } = useTypedSelector(state => state.cards);
  const [changeCategory, setChangeCategory] = useState(false);

  return (
    <>
      <div className={`card-category ${changeCategory && 'disabled'}`}>
        <img className="cross" src="./images/cross.png" alt="cross" />
        <p className="text text-title">{name}</p>
        <p className="text text-button">Words: <span>{listCards[index].length}</span></p>
        <div className="card-category__buttons">
          <button className="button button-card" onClick={() => setChangeCategory(true)}>Update</button>
          <button className="button button-card">Add word</button>
        </div>
      </div>
      {changeCategory && <AdminChangeCategory name={name} />}
    </>
  );
}

export default AdminCardCategory;
