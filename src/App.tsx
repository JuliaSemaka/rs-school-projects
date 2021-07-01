import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import { MainPage } from './pages/MainPage';
import { OneCategory } from './pages/OneCategory';

function App() {
  return (
    <BrowserRouter>
      <AppHeader />

      <main className="main">
        <div className="main-container">
          <Switch>
            <Route component={MainPage} path="/" exact/>
            <Route component={OneCategory} path="/category" />
          </Switch>
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;
