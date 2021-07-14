import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useActions } from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypedSelector';
import AdminChangeWord from './AdminChangeWord';
import { IAdminWordPage } from './component.module';

const AdminCardWord: React.FC<IAdminWordPage> = ({item, index}: IAdminWordPage) => {
  const { indexCategory } = useTypedSelector(state => state.auth);
  const { deleteCard } = useActions();
  const [getChangeWord, setChangeWord] = useState(false);
  const history = useHistory();

  if (indexCategory === null) {
    history.push("/admin");
    return (<></>);
  }

  return (
    <>
      <div className={`card-category card-category-word ${getChangeWord && 'disabled'}`}>
        <img className="cross" src="../../images/cross.png" alt="cross" onClick={() => deleteCard(indexCategory, index)} />
        <p className="text text-title">Word: <span>{item.word}</span></p>
        <p className="text text-title">Translation: <span>{item.translation}</span></p>
        <p className="text text-title">Sound file: <span>{item.audioSrc}</span></p>
        <p className="text text-title">Image: </p>
        <img className="card-category-word-img" src={`../../${item.image ? item.image : 'img/unknown-img.jpg'}`} alt="card" />
        <button className="button button-card card-category-word__change" onClick={() => setChangeWord(true)}>Change</button>
      </div>
      {getChangeWord && <AdminChangeWord item={item} index={index} setChangeWord={() => setChangeWord(false)}/>}
    </>
  );
}

export default AdminCardWord;
