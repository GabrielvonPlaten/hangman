// Globala variabler
window.onload = init;
var wordList = ['DEVELOPER', 'MICROSOFT', 'GALAXY', 'SILICON'];

var correctAnswerNumber = 0;
var hangmanImg;
var hangmanImgNumber = 0;

 //Restart game Button
function restartGameButton() {
    location.reload();
}

function init() {

    var startGameButton = document.getElementById('startGameBtn');

    var letterButtons = document.getElementById('letterButtons');
    var alphabetBtns = document.querySelectorAll('.btn');

    //Timer variables
    var timerSeconds = document.getElementById('seconds');
    var timerDecimals = document.getElementById('decimals');
    var seconds = 00;
    var decimals = 00;
    var interval;

    //Start function
    startGameButton.addEventListener('click', startGameFunction);
    function startGameFunction(event) {
        for (var i = 0; i < alphabetBtns.length; i++) {
            alphabetBtns[i].removeAttribute('disabled');
        }
        selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
        letterBoxes();
        clearInterval(interval);
        interval = setInterval(Timer, 10);
        event.target.setAttribute('disabled', 'disabled');
    }


    //The function which generates the letter boxes
    function letterBoxes() {
        for (var i = 0; i < selectedWord.length; i++) {
            var box = document.createElement('li');
            box.innerHTML = '<input disabled id=boxList' + i + '>';
            letterBoxesUl.appendChild(box);
        }
    }

    //Check if your answer is correct
    function checkAnswer(event) {
        var answer = event.target.value;
        if (selectedWord.indexOf(answer) >= 0) {
            correctAnswer(answer);
        } else {
            incorrectAnswer();
        }
    }

    //This will send the answer to checkAnswer once a letter button is cliced.
    for (var j = 0; j < alphabetBtns.length; j++) {
        alphabetBtns[j].addEventListener('click', checkAnswer);
        alphabetBtns[j].addEventListener('click', function (event) {
            event.target.setAttribute('disabled', 'disabled');
        });
    }

    //Correct answer & winning function
    function correctAnswer(answer) {
        for (var j = 0; j < selectedWord.length; j++) {
            if (selectedWord[j] == answer) {
                document.getElementById('boxList' + j++).value = answer;
                correctAnswerNumber++;
                if (correctAnswerNumber === selectedWord.length) {
                    setTimeout(function () {
                        clearInterval(interval);
                        document.getElementById('message').innerHTML = 'NOT GUILTY! You have proven your innocence.';
                    }, 200);
                }
            }
        }
    }

    //Wrong answer function
    function incorrectAnswer() {
        hangmanImgNumber++;
        var hangmanImg = document.getElementById('hangman');
        hangmanImg.src = 'images/h' + hangmanImgNumber + '.png';

        if (hangmanImgNumber === 6) {
            for (var f = 0; f < alphabetBtns.length; f++) {
                alphabetBtns[f].setAttribute('disabled', 'disabled');
            }
            clearInterval(interval);
            document.getElementById('message').innerHTML = 'You have died. Bitter and alone';
        }
    }

    //Game timer
    function Timer() {
        decimals++;

        if (decimals < 9) {
            timerDecimals.innerHTML = '0' + decimals;
        }
        if (decimals > 9) {
            timerDecimals.innerHTML = decimals;
        }
        if (decimals > 99) {
            seconds++;
            timerSeconds.innerHTML = '0' + seconds;
            decimals = 0;
            timerDecimals.innerHTML = '0' + 0;
        }
        if (seconds > 9) {
            timerSeconds.innerHTML = seconds;
        }
    }
}