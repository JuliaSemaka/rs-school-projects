import React, {useEffect, useRef} from 'react';
import { useHistory } from 'react-router-dom';
import { useActions } from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { ICards, Stars } from '../store/reducers/cardReducer.module';

export const OneCategory: React.FC = () => {
  const {indexCategory, listCards, isModePlay, arrGameWords, arrStars} = useTypedSelector(state => state.cards);
  const {fillArrayWords, addClick, addCorrect, addWrong, setStars, changeMode} = useActions();
  const history = useHistory();
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (arrGameWords.length) {
      sayWord();
    }
  }, [[...arrGameWords]]);

  if (indexCategory === null) {
    history.push("/");
    return (<></>);
  }

  let classesMode = ['main-card__front'];
  const basicsButton = ['button', 'button-green', 'text', 'text-button'];
  let classesButton = basicsButton.concat(['button-start-game', 'disabled']);
  let classesButtonRepeat = basicsButton.concat(['button-circle']);
  if (isModePlay) {
    classesMode.push('game');
    classesButton.pop();
  }

  function flippedAdd(event: React.MouseEvent<HTMLElement>): void {
    (event.target as HTMLElement).closest('.main-card__container')?.classList.add('flipped');
  }

  function flippedOut(event: React.MouseEvent<HTMLElement>): void {
    (event.target as HTMLElement).closest('.main-card__container')?.classList.remove('flipped');
  }

  function sayWord() {
    if (arrGameWords[0]) {
      setTimeout(() => listenAudio(arrGameWords[0].audioSrc), 1000);
    }
  }

  function createArrayWords() {
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

  function chouseCard(item: ICards): void {
    if (!isModePlay) {
      listenAudio(item.audioSrc);
      addClick(item.word);
    } else {
      if (arrGameWords.length) {
        if (arrGameWords[0].word === item.word) {
          arrGameWords.shift();
          addCorrect(item.word);
          listenAudio('./audio/correct.mp3');
          setStars(Stars.STAR_WIN);
          if (arrGameWords.length) {
            fillArrayWords(arrGameWords);
          } else {
            ref.current?.classList.remove('disabled');
            arrStars.every(item => item === Stars.STAR_WIN) ?
              listenAudio('./audio/success.mp3') :
              listenAudio('./audio/failure.mp3');
            setTimeout(() => {
              fillArrayWords(arrGameWords);
              changeMode();
              history.push("/");
            }, 3000);
          }
        } else if (arrGameWords.find(elem => elem.word === item.word)) {
          listenAudio('./audio/error.mp3');
          addWrong(item.word);
          setStars(Stars.STAR);
        }
      }
    }
  }

  const classesCard = ["main-card"];
  const classesChoiceCard = classesCard.concat(["choice"]);

  return (
    <React.Fragment>
      <div className="main-stars">
        {arrStars.map((elem,i) => elem === Stars.STAR ?
          <img src="./img/star.svg" alt="star" key={i} /> :
          <img src="./img/star-win.svg" alt="star" key={i} />)}
        </div>
      <div className="main-container">
        {listCards[indexCategory].map(item => {
          return (
          <React.Fragment key={item.word}>
            <div className='main-card__container'>
              <div className={!arrGameWords.length || arrGameWords.find(elem => elem.word === item.word) ? classesCard.join(' ') : classesChoiceCard.join(' ')}>
                <div className={classesMode.join(' ')}>
                  <div className="main-card__img-fully" style={{backgroundImage: `url("./${item.image}")`}} onClick={() => chouseCard(item)}></div>
                  <div className="text text-title text-center" onClick={() => chouseCard(item)}>{ item.word }</div>
                  <img className="main-card__img-rotate" src="./img/rotate2.png" alt="rotate" onClick={flippedAdd}/>
                </div>
                <div className="main-card__back text text-title" onMouseOut={flippedOut}>
                  { item.translation }
                </div>
              </div>
            </div>
          </React.Fragment>
          );
        })}
      </div>
      <div className="main-finish disabled" ref={ref}>
        {
          arrStars.every(item => item === Stars.STAR_WIN) ?
            <img src="./img/success.jpg" alt="success" /> :
            <div>
              <h3 className="text text-errors">{arrStars.filter(item => item === Stars.STAR).length + 1} errors</h3>
              <img src="./img/failure.jpg" alt="failure" />
            </div>
        }
      </div>
      <button
        className={!arrGameWords.length ? classesButton.join(' ') : classesButtonRepeat.join(' ')}
        onClick={startGame}>
          {!arrGameWords.length ? "Start game" : <img src="./img/repeat.svg" alt="repeat" />}
      </button>
    </React.Fragment>
  );
}
