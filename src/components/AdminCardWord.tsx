import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useActions } from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { Links } from '../store/reducers/cardReducer.module';
import AdminChangeWord from './AdminChangeWord';
import { IAdminWordPage } from './component.module';
import { listenAudio } from '../pages/OneCategory';

const AdminCardWord: React.FC<IAdminWordPage> = ({item, index}: IAdminWordPage) => {
  const { indexCategory } = useTypedSelector(state => state.auth);
  const { deleteCard } = useActions();
  const [getChangeWord, setChangeWord] = useState(false);

  if (indexCategory === null) {
    return (<Redirect to="/admin" />);
  }

  return (
    <>
      <div className={`card-category card-category-word ${getChangeWord && 'disabled'}`}>
        <img className="cross" src={`${Links.static}images/cross.png`} alt="cross" onClick={() => deleteCard(indexCategory, index)} />
        <p className="text text-title">Word: <span>{item.word}</span></p>
        <p className="text text-title">Translation: <span>{item.translation}</span></p>
        <p className="text text-title" onClick={() => listenAudio(item.audioSrc)}>
          Sound file:
          <span className="cursor-pointer">{item.audioSrc}</span>
          <img className="cursor-pointer" src={`${Links.static}images/note.png`} alt="note" />
          </p>
        <p className="text text-title">Image: </p>
        <img className="card-category-word-img" src={`${item.image.startsWith('data:') ? '' : Links.static}${item.image ? item.image : 'img/unknown-img.jpg'}`} alt="card" />
        <button className="button button-card card-category-word__change" onClick={() => setChangeWord(true)}>Change</button>
      </div>
      {getChangeWord && <AdminChangeWord item={item} index={index} setChangeWord={() => setChangeWord(false)}/>}
    </>
  );
}

export default AdminCardWord;
