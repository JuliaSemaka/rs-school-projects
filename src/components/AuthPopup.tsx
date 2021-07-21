import React, { useState } from 'react';
import { useActions } from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useHistory } from 'react-router-dom';
import { ADMIN, IInputValue } from './component.module';

function useInputValue(defaultValue: string = ''): IInputValue {
  const [value, setValue] = useState(defaultValue);

  return {
    value,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value),
  }
}

const AuthPopup: React.FC = () => {
  const { isViewPopup } = useTypedSelector(state => state.auth);
  const { changeViewPopup, changeAdminPage, setAuthorize, setFetchAuth } = useActions();
  const history = useHistory();
  const [getPrompt, setPrompt] = useState(false);
  const inputLogin: IInputValue = useInputValue('');
  const inputPassword: IInputValue = useInputValue('');

  async function loginButton(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    if (inputLogin.value === ADMIN && inputPassword.value === ADMIN) {
      setAuthorize(true);
      setFetchAuth(true);
      changeViewPopup();
      changeAdminPage();
      history.push("/admin");
      setPrompt(false);
      sessionStorage.setItem('isAuthAdmin', 'true');
    } else {
      setPrompt(true);
    }
  }

  return (
    <div className={`popup ${!isViewPopup && "disabled"}`}>
      <div className="popup-header">
        <p className="text text-title text-title-popup">Login</p>
        <span onClick={changeViewPopup}>&#10008;</span>
      </div>
      <form className="popup-form" onSubmit={loginButton}>
          <input className="text text-title text-title-popup popup-form-input" type="text" placeholder="login" {...inputLogin} />
          <input className="text text-title text-title-popup popup-form-input" type="text" placeholder="password" {...inputPassword} />
          <div className={`auth-prompt ${getPrompt && 'text-red'}`}>
            <div className="text text-title">Для входа под админом</div>
            <div className="text">Login: {ADMIN}</div>
            <div className="text">Password: {ADMIN}</div>
          </div>
          <div className="popup-form-buttons">
            <button className="button button-form text-button form__button-cancel" type="button" onClick={changeViewPopup}>cancel</button>
            <input className="button button-form button-green text-button form__button-add" type="submit" value="login" />
          </div>
      </form>
    </div>
  );
}

export default AuthPopup;


