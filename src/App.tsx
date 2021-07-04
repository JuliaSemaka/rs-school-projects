import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AppFooter from './components/AppFooter';
import AppHeader from './components/AppHeader';
import { useActions } from './hooks/useAction';
import { useTypedSelector } from './hooks/useTypedSelector';
import { MainPage } from './pages/MainPage';
import { OneCategory } from './pages/OneCategory';
import { StatsticsPage } from './pages/StatistictPage';
import { IStatisticsFields, IStatisticsState } from './store/reducers/statisticsReducer.module';

function App() {
  const { isShowLeftMenu, categoryCards, listCards} = useTypedSelector(state => state.cards);
  const { fields }: IStatisticsState = useTypedSelector(state => state.statistics);
  const { hideMenu, addAllStatistic } = useActions();

  const hideLeftMenu = (): void => {
    if (isShowLeftMenu) {
      hideMenu();
    }
  }

  function fillStatistics(): IStatisticsFields[] {
    let arrStatistics: IStatisticsFields[] = [];
    listCards.forEach((category, index) => {
      category.forEach(item => {
        const arrAboutWords: IStatisticsFields = {
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
    return arrStatistics;
  }

  useEffect(() => {
    const savedStatistics = JSON.parse(localStorage.getItem('statistics') || '[]') as IStatisticsFields[];
    let arrStatistics: IStatisticsFields[] = [];
    if (!savedStatistics.length) {
      arrStatistics = fillStatistics();
    }
    addAllStatistic(savedStatistics.length ? savedStatistics : arrStatistics)
  }, [])

  useEffect(() => {
    localStorage.setItem('statistics', JSON.stringify(fields))
  }, [fields])

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
