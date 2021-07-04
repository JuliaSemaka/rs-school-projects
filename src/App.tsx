import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AppFooter from './components/AppFooter';
import AppHeader from './components/AppHeader';
import { useActions } from './hooks/useAction';
import { useTypedSelector } from './hooks/useTypedSelector';
import { MainPage } from './pages/MainPage';
import { OneCategory } from './pages/OneCategory';
import { StatsticsPage } from './pages/StatistictPage';
import { IStatisticsFields } from './store/reducers/statisticsReducer.module';

function App() {
  const { isShowLeftMenu, categoryCards, listCards} = useTypedSelector(state => state.cards);
  const { hideMenu, addAllStatistic } = useActions();

  const hideLeftMenu = () => {
    if (isShowLeftMenu) {
      hideMenu();
    }
  }

  let arrStatistics: IStatisticsFields[] = [];
  listCards.forEach((category, index) => {
    category.forEach(item => {
      const arrAboutWords = {
        word: item.word,
        translation: item.translation,
        category: categoryCards[index],
        clicks: '0',
        correct: '0',
        wrong: '0',
        procent: '0',
      };
      arrStatistics.push(arrAboutWords);
    })
  })

  useEffect(() => {
    addAllStatistic(arrStatistics)
  }, [])

  return (
    <BrowserRouter>
      <AppHeader />

      <main className="main" onClick={hideLeftMenu}>
          <Switch>
            <Route component={MainPage} path="/" exact/>
            <Route component={OneCategory} path="/category" />
            <Route component={StatsticsPage} path="/statistics" />
          </Switch>
      </main>

      <AppFooter />
    </BrowserRouter>
  );
}

export default App;
