import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useActions } from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { ICards, Stars } from '../store/reducers/cardReducer.module';
import { IOneCardProps } from './component.module';

const OneCard: React.FC<IOneCardProps> = ({item, listenAudio, finishGame}: IOneCardProps) => {
  const { isModePlay, arrGameWords, arrStars } = useTypedSelector(state => state.cards);
  const { fillArrayWords, addClick, addCorrect, addWrong, setStars, changeMode } = useActions();
  const [flipped, setFlepped] = useState(false);
  const history = useHistory();

  const classesCard: string[] = ["main-card"];
  const classesChoiceCard: string[] = classesCard.concat(["choice"]);

  let classesMode: string[] = ['main-card__front'];
  const basicsButton: string[] = ['button', 'button-green', 'text', 'text-button'];
  let classesButton: string[] = basicsButton.concat(['button-start-game', 'disabled']);
  if (isModePlay) {
    classesMode.push('game');
    classesButton.pop();
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
            fillArrayWords([...arrGameWords]);
          } else {
            finishGame();
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

  return (
    <div className={`main-card__container ${flipped && 'flipped'}`}>
      <div className={!arrGameWords.length || arrGameWords.find(elem => elem.word === item.word) ? classesCard.join(' ') : classesChoiceCard.join(' ')}>
        <div className={classesMode.join(' ')}>
          <div className="main-card__img-fully" style={{backgroundImage: `url("./${item.image}")`}} onClick={() => chouseCard(item)}></div>
          <div className="text text-title text-center" onClick={() => chouseCard(item)}>{ item.word }</div>
          <img className="main-card__img-rotate" src="./img/rotate2.png" alt="rotate" onClick={() => setFlepped(true)}/>
        </div>
        <div className="main-card__back text text-title" onMouseOut={() => setFlepped(false)}>
          { item.translation }
        </div>
      </div>
    </div>
  );
}

export default OneCard;
