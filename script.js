window.onload = function() {
    const PIANO = document.querySelector('.piano');
    const PIANOKEYS = document.querySelectorAll('.piano-key');
    const NOTLET = document.querySelectorAll('.btn-container .btn');
    const FULLSCREEN = document.querySelector('.fullscreen');


    const isNotesOrLetters = () => {
        NOTLET.forEach((elem) => {
            if (elem.classList.contains('btn-active'))  {
                let changeButton = elem.getAttribute('data-button');
                if (changeButton == 'letter') {
                    PIANOKEYS.forEach((item) => {
                        item.classList.remove('piano-key-note')
                        item.classList.add('piano-key-letter')
                    })
                } else if (changeButton == 'note') {
                    PIANOKEYS.forEach((item) => {
                        item.classList.remove('piano-key-letter')
                        item.classList.add('piano-key-note')
                    })
                }
            }
        })
    }

    const clickButton = (event) => {
        NOTLET.forEach((elem) => {
            elem.classList.remove('btn-active')
        });
        event.target.classList.add('btn-active')
        isNotesOrLetters();
    }

    const playAudio = (note) => {
        const src = `./assets/audio/${note}.mp3`;
        const audio = new Audio();
        audio.src = src;
        audio.currentTime = 0;
        audio.play();
    }

    const activeKey = (event) => {
        event.target.classList.add('piano-key-active');
        playAudio(event.target.getAttribute('data-note'));
    }

    const notActiveKey = (event) => {
        event.target.classList.remove('piano-key-active');
    }

    const pressKeyPiano = (event) => {
        if (event.target.classList.contains('piano-key')) {
            event.target.classList.add('piano-key-active');
            playAudio(event.target.getAttribute('data-note'));

            PIANOKEYS.forEach((item) => {
                item.addEventListener('mouseover', activeKey);
                item.addEventListener('mouseout', notActiveKey);
            });
        }
    }

    const releaseKeyPiano = (event) => {
        PIANOKEYS.forEach((item) => {
            item.classList.remove('piano-key-active');
            item.removeEventListener('mouseover', activeKey);
            item.removeEventListener('mouseout', notActiveKey);
        })
    }

    const pressKeyboard = (event) => {
        PIANOKEYS.forEach((item) => {
            if (item.getAttribute('data-letter') == event.code.slice(-1)) {
                item.classList.add('piano-key-active');
                playAudio(item.getAttribute('data-note'));
            }
        })
    }

    const releaseKeyboard = (event) => {
        PIANOKEYS.forEach((item) => {
            if (item.getAttribute('data-letter') == event.code.slice(-1)) {
                item.classList.remove('piano-key-active');
            }
        })
    }

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
    }

    isNotesOrLetters();
    NOTLET.forEach((elem) => {
        elem.addEventListener('click', clickButton);
    })
    FULLSCREEN.addEventListener('click', toggleFullScreen)

    PIANO.addEventListener('mousedown', pressKeyPiano, false);
    window.addEventListener('mouseup', releaseKeyPiano);

    window.addEventListener('keydown', pressKeyboard);
    window.addEventListener('keyup', releaseKeyboard);


}