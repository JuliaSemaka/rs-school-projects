import React, { useState } from 'react';
import { useActions } from '../hooks/useAction';
import { Links } from '../store/reducers/cardReducer.module';
import { ICardChangeProps, IInputValue } from './component.module';

function useInputValue(defaultValue: string = ''): IInputValue {
  const [value, setValue] = useState(defaultValue);

  return {
    value,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value),
  }
}

const AdminChangeCategory: React.FC<ICardChangeProps> = ({name, changeCategory, index} : ICardChangeProps) => {
  const { deleteCategory, createCategory, updateCategory } = useActions();
  const input: IInputValue = useInputValue(name);

  const delCategory = (): void => {
    if (index) {
      deleteCategory(index);
    }
    changeCategory();
  }

  const addCategory = (): void => {
    if (input.value) {
      console.log('index: ', index);
      if (index === undefined) {
        createCategory(input.value);
      } else {
        updateCategory(index, input.value);
      }
      changeCategory();
    }
  }

  return (
    <div className="card-category">
      <img className="cross" src={`${Links.static}images/cross.png`} alt="cross" onClick={delCategory} />
      <div>
        <label className="text text-label" htmlFor="category-name">Category Name:</label>
        <input className="text text-input" type="text" id="category-name" {...input} />
      </div>
      <div className="card-category__buttons">
        <button className="button button-card button-card-red" onClick={changeCategory}>Cancel</button>
        <button className="button button-card" onClick={addCategory}>Save</button>
      </div>
    </div>
  );
}

export default AdminChangeCategory;
