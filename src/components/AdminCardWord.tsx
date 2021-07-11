import React, { useState } from 'react';
import AdminChangeWord from './AdminChangeWord';
import { IAdminWordPage } from './component.module';

const AdminCardWord: React.FC<IAdminWordPage> = ({item}: IAdminWordPage) => {
  const [getChangeWord, setChangeWord] = useState(false);

  return (
    <>
      <div className={`card-category card-category-word ${getChangeWord && 'disabled'}`}>
        <img className="cross" src="../../images/cross.png" alt="cross" />
        <p className="text text-title">Word: <span>{item.word}</span></p>
        <p className="text text-title">Translation: <span>{item.translation}</span></p>
        <p className="text text-title">Sound file: <span>{item.audioSrc}</span></p>
        <p className="text text-title">Image: </p>
        <img className="card-category-word-img" src={`../../${item.image}`} alt="card" />
        <button className="button button-card card-category-word__change" onClick={() => setChangeWord(true)}>Change</button>
      </div>
      {getChangeWord && <AdminChangeWord item={item} setChangeWord={() => setChangeWord(false)}/>}
    </>
  );
}

export default AdminCardWord;
