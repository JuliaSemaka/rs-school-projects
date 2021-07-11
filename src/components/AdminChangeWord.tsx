import React, { useState } from 'react';
import { IAdminChangeWord } from './component.module';

function useInputValue(defaultValue: string = '') {
  const [value, setValue] = useState(defaultValue);

  return {
    value,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value),
  }
}

const AdminChangeWord: React.FC<IAdminChangeWord> = ({item, setChangeWord}: IAdminChangeWord) => {
  const inputWord = useInputValue(item?.word ?? '');
  const inputTranslation = useInputValue(item?.translation ?? '');
  const [getSound, setSound] = useState(item?.audioSrc ?? '');
  const [getImage, setImage] = useState(item?.image ?? '');

  function onloadFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file: File  = (event.target.files as FileList)[0];
    const reader = new FileReader();
    // reader.onload = () => {
    //   const img = new Image();
    //   const aud = new Audio();
    //   img.setAttribute('src', (reader.result as string));
    //   img.classList.add('image-avatar');
    //   console.log(aud);
    // };
    reader.readAsDataURL(file);
    console.log(reader, file);
  }

  return (
    <div className="card-category card-category-word">
      <img className="cross" src="../../images/cross.png" alt="cross" />
      <div>
        <label className="text text-label" htmlFor="category-name">Word:</label>
        <input className="text text-input" type="text" id="category-name" {...inputWord}/>
      </div>
      <div>
        <label className="text text-label" htmlFor="category-name">Translation:</label>
        <input className="text text-input" type="text" id="category-name" {...inputTranslation}/>
      </div>
      <div className="card-category__row">
        <p>Sound:</p>
        <div className="card-category__row_select">
          <input className="button button-card" type="file" onChange={onloadFile} />
          <div className="button button-card">Select file</div>
          <p>{getSound}</p>
        </div>
      </div>
      <div className="card-category__row">
        <p>Image: </p>
        <div className="card-category__row_select">
          <input className="button button-card" type="file" onChange={onloadFile} />
          <div className="button button-card">Select file</div>
          <p>{getImage}</p>
        </div>
      </div>
      <div className="card-category__buttons">
        <button className="button button-card button-card-red" onClick={setChangeWord}>Cancel</button>
        <button className="button button-card">Save</button>
      </div>
    </div>
  );
}

export default AdminChangeWord;
