import React from 'react';
import { useActions } from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypedSelector';

const AppFooter: React.FC = () => {
  const { isShowLeftMenu } = useTypedSelector((state) => state.cards);
  const { hideMenu } = useActions();

  const hideLeftMenu = (): void => {
    if (isShowLeftMenu) {
      hideMenu();
    }
  };

  return (
    <footer className="footer" onClick={hideLeftMenu}>
      <div className="text text-button">
        <a href="https://github.com/JuliaSemaka">Github</a>
      </div>
      <div className="text text-button">2021</div>
      <div className="text text-button">
        <img src="https://rs.school/images/rs_school_js.svg" alt="logo" />
      </div>
      <div className="text text-button">
        <a href="https://rs.school/js/">rs.school</a>
      </div>
    </footer>
  );
};

export default AppFooter;
