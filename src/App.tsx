import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AppFooter from './components/AppFooter';
import AppHeader from './components/AppHeader';
import { useActions } from './hooks/useAction';
import { useTypedSelector } from './hooks/useTypedSelector';
import { MainPage } from './pages/MainPage';
import { OneCategory } from './pages/OneCategory';

function App() {
  const { isShowLeftMenu } = useTypedSelector(state => state.cards);
  const { hideMenu } = useActions();

  const hideLeftMenu = () => {
    if (isShowLeftMenu) {
      hideMenu();
    }
  }

  return (
    <BrowserRouter>
      <AppHeader />

      <main className="main" onClick={hideLeftMenu}>
          <Switch>
            <Route component={MainPage} path="/" exact/>
            <Route component={OneCategory} path="/category" />
          </Switch>
      </main>

      <AppFooter />
    </BrowserRouter>
  );
}

export default App;
