import React, { useState } from 'react';
import { ICardChangeProps } from './component.module';

const AdminChangeCategory: React.FC<ICardChangeProps> = ({name} : ICardChangeProps) => {
  function useInputValue(defaultValue = '') {
    const [value, setValue] = useState(defaultValue);

    return {
      value,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value),
    }
  }
  return (
    <div className="card-category">
      <img className="cross" src="./images/cross.png" alt="cross" />
      <div>
        <label className="text text-label" htmlFor="category-name">Category Name:</label>
        <input className="text text-input" type="text" id="category-name" value={name} />
      </div>
      <div className="card-category__buttons">
        <button className="button button-card button-card-red">Cancel</button>
        <button className="button button-card">Create</button>
      </div>
    </div>
  );
}

export default AdminChangeCategory;
