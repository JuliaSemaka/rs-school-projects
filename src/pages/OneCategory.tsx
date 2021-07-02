import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';

function listenAudio(audioSrc: string): void {
  const src = `./${audioSrc}`;
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}

export const OneCategory: React.FC = () => {
  const {indexCategory, listCards, isModePlay} = useTypedSelector(state => state.cards);
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

  function startGame(event: React.MouseEvent<HTMLElement>): void {
    const target = event.target as HTMLElement;
    target.classList.add('disabled');
    document.querySelector('.button-circle')?.classList.remove('disabled');
  }

  return (
    <React.Fragment>
      <div className="main-container">
        {listCards[indexCategory].map(item => {
          return (
            <div className='main-card__container' key={item.word}>
              <div className="main-card">
              <div className={classesMode.join(' ')}>
                <div className="main-card__img-fully" style={{backgroundImage: `url("./${item.image}")`}} onClick={() => listenAudio(item.audioSrc)}></div>
                <div className="text text-title text-center" onClick={() => listenAudio(item.audioSrc)}>{ item.word }</div>
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
      <button className={classesButtonRepeat.join(' ')} onClick={startGame}>
        <img src="./img/repeat.svg" alt="repeat" />
      </button>

    </React.Fragment>
  );
}
