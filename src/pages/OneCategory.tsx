import React, {useEffect, useRef, useState} from 'react';
import { useHistory } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import OneCard from '../components/OneCard';
import { useActions } from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { Stars } from '../store/reducers/cardReducer.module';

export const OneCategory: React.FC = () => {
  const { indexCategory, listCards, isModePlay, arrGameWords, arrStars, isShowLeftMenu } = useTypedSelector(state => state.cards);
  const { fillArrayWords, hideMenu } = useActions();
  const [mainFinish, setMainFinish] = useState(true);
  const history = useHistory();

  const hideLeftMenu = (): void => {
    if (isShowLeftMenu) {
      hideMenu();
    }
  }

  useEffect(() => {
    if (arrGameWords.length) {
      sayWord();
    }
  }, [[arrGameWords]]);

  if (indexCategory === null) {
    history.push("/");
    return (<></>);
  }

  let classesMode: string[] = ['main-card__front'];
  const basicsButton: string[] = ['button', 'button-green', 'text', 'text-button'];
  let classesButton: string[] = basicsButton.concat(['button-start-game', 'disabled']);
  let classesButtonRepeat: string[] = basicsButton.concat(['button-circle']);
  if (isModePlay) {
    classesMode.push('game');
    classesButton.pop();
  }

  function sayWord(): void {
    if (arrGameWords[0]) {
      setTimeout(() => listenAudio(arrGameWords[0].audioSrc), 500);
    }
  }

  function createArrayWords(): number | void {
    if (indexCategory === null) {   //нельзя поставить ! т.к. может быть равно 0, и
      throw Error();
    }
    let shuffledArr = [...listCards[indexCategory]];
    shuffledArr.sort(function(){
      return Math.random() - 0.5;
    });
    fillArrayWords(shuffledArr);
  }

  function startGame(): void {
    if (!arrGameWords.length) {
      createArrayWords();
    } else {
      sayWord();
    }
  }

  function listenAudio(audioSrc: string): void {
    const src = `./${audioSrc}`;
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
  }

  const finishGame = () => {
    setMainFinish(false);
  }

  return (
    <React.Fragment>
      <AppHeader />
      <main className="main" onClick={hideLeftMenu}>
        <div className="main-stars">
          {arrStars.map((elem,i) => elem === Stars.STAR ?
            <img src="./img/star.svg" alt="star" key={i} /> :
            <img src="./img/star-win.svg" alt="star" key={i} />)}
          </div>
        <div className="main-container">
          {listCards[indexCategory].map(item => {
            return (
              <OneCard key={item.word} item={item} listenAudio={listenAudio} finishGame={finishGame} />
            );
          })}
        </div>
        <div className={`main-finish ${mainFinish && "disabled"}`}>
          {
            arrStars.every(item => item === Stars.STAR_WIN) ?
              <img src="./img/success.jpg" alt="success" /> :
              <div>
                <h3 className="text text-errors">{arrStars.filter(item => item === Stars.STAR).length} errors</h3>
                <img src="./img/failure.jpg" alt="failure" />
              </div>
          }
        </div>
        <button
          className={!arrGameWords.length ? classesButton.join(' ') : classesButtonRepeat.join(' ')}
          onClick={startGame}>
            {!arrGameWords.length ? "Start game" : <img src="./img/repeat.svg" alt="repeat" />}
        </button>
      </main>
    </React.Fragment>
  );
}
