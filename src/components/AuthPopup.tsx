import React from 'react';
import { useActions } from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useHistory } from 'react-router-dom';

const AuthPopup: React.FC = () => {
  const { isViewPopup } = useTypedSelector(state => state.auth);
  const { changeViewPopup, changeAdminPage } = useActions();
  const history = useHistory();

  function loginButton(e: React.FormEvent) {
    e.preventDefault();
    changeAdminPage();
    changeViewPopup();
    history.push("/admin");
  }

  return (
    <div className={`popup ${!isViewPopup && "disabled"}`}>
      <div className="popup-header">
        <p className="text text-title text-title-popup">Login</p>
        <span onClick={changeViewPopup}>&#10008;</span>
      </div>
      <form className="popup-form" onSubmit={loginButton}>
          <input className="text text-title text-title-popup popup-form-input" type="text" placeholder="login" />
          <input className="text text-title text-title-popup popup-form-input" type="text" placeholder="password" />
          <div className="popup-form-buttons">
            <button className="button button-form text-button form__button-cancel" type="button" onClick={changeViewPopup}>cancel</button>
            <input className="button button-form button-green text-button form__button-add" type="submit" value="login" />
          </div>
      </form>
    </div>
  );
}

export default AuthPopup;


