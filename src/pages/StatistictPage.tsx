import React from 'react';
import { useActions } from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IStatisticsState } from '../store/reducers/statisticsReducer.module';
import { EKeysStatistics } from './pages.module';

export const StatsticsPage: React.FC = () => {
  const { fields }: IStatisticsState = useTypedSelector(
    (state) => state.statistics
  );
  const { isShowLeftMenu } = useTypedSelector((state) => state.cards);
  const { resetStatistics, sortStatistics, hideMenu } = useActions();

  const hideLeftMenu = (): void => {
    if (isShowLeftMenu) {
      hideMenu();
    }
  };

  return (
    <React.Fragment>
      <main className="main" onClick={hideLeftMenu}>
        <div className="main-container">
          <button
            className="button button-error text text-button"
            onClick={resetStatistics}
          >
            Reset
          </button>
          <table className="table table-light">
            <thead>
              <tr>
                <th
                  scope="col"
                  onClick={sortStatistics.bind(null, EKeysStatistics.word)}
                >
                  Word <span>⇳</span>
                </th>
                <th
                  scope="col"
                  onClick={sortStatistics.bind(
                    null,
                    EKeysStatistics.translation
                  )}
                >
                  Translation <span>⇳</span>
                </th>
                <th
                  scope="col"
                  onClick={sortStatistics.bind(null, EKeysStatistics.category)}
                >
                  Category <span>⇳</span>
                </th>
                <th
                  scope="col"
                  onClick={sortStatistics.bind(null, EKeysStatistics.clicks)}
                >
                  Clicks <span>⇳</span>
                </th>
                <th
                  scope="col"
                  onClick={sortStatistics.bind(null, EKeysStatistics.correct)}
                >
                  Correct <span>⇳</span>
                </th>
                <th
                  scope="col"
                  onClick={sortStatistics.bind(null, EKeysStatistics.wrong)}
                >
                  Wrong <span>⇳</span>
                </th>
                <th
                  scope="col"
                  onClick={sortStatistics.bind(null, EKeysStatistics.procent)}
                >
                  % errors <span>⇳</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {fields.map((item, index) => {
                return (
                  <React.Fragment key={'cat' + index}>
                    <tr>
                      <td>{item.word}</td>
                      <td>{item.translation}</td>
                      <td>{item.category}</td>
                      <td>{item.clicks}</td>
                      <td>{item.correct}</td>
                      <td>{item.wrong}</td>
                      <td>{item.procent}</td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </React.Fragment>
  );
};
