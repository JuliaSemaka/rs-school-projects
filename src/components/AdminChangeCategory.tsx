import React, { useState } from 'react';
import { ICardChangeProps } from './component.module';

function useInputValue(defaultValue: string = '') {
  const [value, setValue] = useState(defaultValue);

  return {
    value,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value),
  }
}

const AdminChangeCategory: React.FC<ICardChangeProps> = ({name, changeCategory} : ICardChangeProps) => {
  const input = useInputValue(name);

  return (
    <div className="card-category">
      <img className="cross" src="./images/cross.png" alt="cross" />
      <div>
        <label className="text text-label" htmlFor="category-name">Category Name:</label>
        <input className="text text-input" type="text" id="category-name" {...input} />
      </div>
      <div className="card-category__buttons">
        <button className="button button-card button-card-red" onClick={changeCategory}>Cancel</button>
        <button className="button button-card">Save</button>
      </div>
    </div>
  );
}

export default AdminChangeCategory;
