import React from 'react';
import { useHistory } from 'react-router-dom';
import { useActions } from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { ICards } from '../store/reducers/cardReducer.module';

export const OneCategory: React.FC = () => {
  const {indexCategory, listCards, isModePlay, arrGameWords} = useTypedSelector(state => state.cards);
  const {fillArrayWords} = useActions();
  const history = useHistory();

  if (indexCategory === null) {
    history.push("/");
    return (<></>);
  }

  let classesMode = ['main-card__front'];
  let classesButton = ['button', 'button-start-game', 'button-green', 'text', 'text-button', 'disabled'];
  let classesButtonRepeat = ['button', 'button-circle', 'button-green', 'text', 'text-button', 'disabled'];
  document.querySelector('.button-circle')?.classList.add('disabled');
  if (isModePlay) {
    classesMode.push('game');
    classesButton.pop();
    document.querySelector('.button-start-game')?.classList.remove('disabled');
    document.querySelector('.button-circle')?.classList.add('disabled');
  }

  function flippedAdd(event: React.MouseEvent<HTMLElement>): void {
    (event.target as HTMLElement).closest('.main-card__container')?.classList.add('flipped');
  }

  function flippedOut(event: React.MouseEvent<HTMLElement>): void {
    (event.target as HTMLElement).closest('.main-card__container')?.classList.remove('flipped');
  }

  function sayWord() {
    console.log(arrGameWords);
    if (arrGameWords[0]) {
      setTimeout(() => listenAudio(arrGameWords[0]), 1000);
    }
  }

  function createArrayWords() {
    if (!indexCategory) {
      throw Error();
    }
    let shuffledArr = [...listCards[indexCategory]];
    shuffledArr.sort(function(){
      return Math.random() - 0.5;
    });
    console.log(shuffledArr);
    fillArrayWords(shuffledArr);

    sayWord();
  }

  function startGame(event: React.MouseEvent<HTMLElement>): void {
    const target = event.target as HTMLElement;
    target.classList.add('disabled');
    document.querySelector('.button-circle')?.classList.remove('disabled');

    // createArrayWords();
  }

  function listenAudio(item: ICards): void {
    const src = `./${item.audioSrc}`;
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
  }

  function chouseCard(item: ICards): void {
    if (!isModePlay) {
      listenAudio(item);
    }
  }

  return (
    <React.Fragment>
      <div className="main-container">
        {listCards[indexCategory].map(item => {
          return (
            <div className='main-card__container' key={item.word}>
              <div className="main-card">
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
          );
        })}
      </div>
      <button className={classesButton.join(' ')} onClick={startGame}>Start game</button>
      <button className={classesButtonRepeat.join(' ')} onClick={sayWord}>
        <img src="./img/repeat.svg" alt="repeat" />
      </button>

    </React.Fragment>
  );
}
