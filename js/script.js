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
    //Start game button
    var startGameButton = document.getElementById('startGameBtn');

    var letterButtons = document.getElementById('letterButtons');
    var alphabetBtns = document.querySelectorAll('.btn');

    //Timer variables
    var timerSeconds = document.getElementById('seconds');
    var timerDecimals = document.getElementById('decimals');
    var interval;


    //Start function
    startGameButton.addEventListener('click', startGameFunction, false);

    function startGameFunction(event) {
        for (var i = 0; i < alphabetBtns.length; i++) {
            alphabetBtns[i].removeAttribute('disabled');
        }
        document.getElementById('time').style.display= 'block';
        selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
        letterBoxes();
        clearInterval(interval);
        Timer();
        this.style.display = 'none';

    }


    //The function which generates the letter boxes
    function letterBoxes() {
        for (var i = 0; i < selectedWord.length; i++) {
            var box = document.createElement('li');
            box.innerHTML = '<input disabled id=boxList' + i + '>';
            letterBoxesUl.appendChild(box);
        }
    }

    //This will send the answer to checkAnswer once a letter button is cliced.
    for (var j = 0; j < alphabetBtns.length; j++) {
        alphabetBtns[j].addEventListener('click', checkAnswer);
        alphabetBtns[j].addEventListener('click', function (event) {
            event.target.setAttribute('disabled', 'disabled');
        });
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
                    });
                }
            }
        }
    }

    //Wrong answer function
    function incorrectAnswer() {
        hangmanImgNumber++;
        var hangmanImg = document.getElementById('hangman');
        hangmanImg.src = 'images/h' + hangmanImgNumber + '.png';
        //Disables all buttons
        if (hangmanImgNumber === 6) {
            for (var f = 0; f < alphabetBtns.length; f++) {
                alphabetBtns[f].setAttribute('disabled', 'disabled');
            }
            clearInterval(interval);
            document.getElementById('message').innerHTML = 'You have died. Bitter and alone.';
        }
    }

    //Game timer. Once it reaches 0 the game ends.
    function Timer() {
        var timeleft = 30;
        var downloadTimer = setInterval(function () {
            timeleft--;
            document.getElementById("countdowntimer").textContent = timeleft;
            //Disables all buttons
            if (timeleft <= 0) {
                for (var f = 0; f < alphabetBtns.length; f++) {
                    alphabetBtns[f].setAttribute('disabled', 'disabled');
                }
                //Message after it reaches 0
                clearInterval(downloadTimer);
                var hangmanImg = document.getElementById('hangman');
                hangmanImg.src = 'images/h6.png';
                document.getElementById('message').innerHTML = 'You have died. Bitter and alone.';
                document.getElementById('time').innerText = 'The correct word was ' + selectedWord;
            }
        }, 1000);
    }
}