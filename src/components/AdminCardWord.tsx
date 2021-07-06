import React from 'react';

const AdminCardWord: React.FC = () => {

  return (
    <>
      <div className="card-category card-category-word">
        <img className="cross" src="../../images/cross.png" alt="cross" />
        <p className="text text-title">Word: <span>Draw</span></p>
        <p className="text text-title">Translation: <span>Рисовать</span></p>
        <p className="text text-title">Sound file: <span>draw.mp3</span></p>
        <p className="text text-title">Image: </p>
        <img className="card-category-word-img" src="../../img/apple.jpg" alt="card" />
        <button className="button button-card">Change</button>
      </div>
    </>
  );
}

export default AdminCardWord;
