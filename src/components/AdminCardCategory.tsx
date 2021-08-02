import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useActions } from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { Links } from '../store/reducers/cardReducer.module';
import AdminChangeCategory from './AdminChangeCategory';
import { ICardProps } from './component.module';

const AdminCardCategory: React.FC<ICardProps> = ({
  index,
  name,
}: ICardProps) => {
  const { lengthCards } = useTypedSelector((state) => state.cards);
  const { changeIndexCategory, deleteCategory } = useActions();
  const [getChangeCategory, setChangeCategory] = useState(false);

  function changeCategory(): void {
    setChangeCategory(false);
  }

  return (
    <>
      <div className={`card-category ${getChangeCategory && 'disabled'}`}>
        <img
          className="cross"
          src={`${Links.static}images/cross.png`}
          alt="cross"
          onClick={() => deleteCategory(index)}
        />
        <NavLink
          to={`/admin/${name.replace(/\s/g, '')}/words`}
          className="text text-title"
          onClick={() => changeIndexCategory(index)}
        >
          {name}
        </NavLink>
        <p className="text text-button">
          Words: <span>{lengthCards[index]}</span>
        </p>
        <div className="card-category__buttons">
          <button
            className="button button-card"
            onClick={() => setChangeCategory(true)}
          >
            Update
          </button>
          <NavLink
            to={`/admin/${name.replace(/\s/g, '')}/words`}
            className="button button-card"
            onClick={() => changeIndexCategory(index)}
          >
            Words
          </NavLink>
        </div>
      </div>
      {getChangeCategory && (
        <AdminChangeCategory
          name={name}
          index={index}
          changeCategory={changeCategory}
        />
      )}
    </>
  );
};

export default AdminCardCategory;
