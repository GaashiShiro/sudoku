import { Board } from "./gameboard.js";
import {findIndexOfSolution, findSolution, diffRandNum } from "./utils.js"


let mainSound = new Audio('sound/lighthearted_loop.ogg');
mainSound.loop=true;
let clickSound = new Audio('sound/click_sound_1.mp3');
clickSound.volume = 0.3;
let wrongClick = new Audio('sound/toom_click.wav');
wrongClick.volume = 0.5;

const startTimer =()=>{
    const t = document.createElement('div');
    let timerInterval;
    t.id = 'timer';
    document.body.appendChild(t);
    clearInterval(timerInterval); // clears timer after restart
    timerInterval = setInterval(function () {
        let second = 0, minute = 0, hour = 0; // clear the variables
        timer.textContent = (hour ? hour + ':' : '') + (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second);
        second++;
        if (second == 60) { minute++; second = 0; } // If so, we add a minute and reset our seconds to 0
        if (minute == 60) { hour++; minute = 0;} // If we hit 60 minutes "one hour" we reset the minutes and plus an hour
    }, 1000);
}

const gameOver =()=>{
    // game over screen?
}

const gameMenu =()=>{
    document.body.style.backgroundImage = "url('pic/sudoku_game_logo2.png')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = 'top center';
    const m = document.createElement('div');
    m.id = 'menu';
    document.body.appendChild(m);
    const menu = document.getElementById('menu');
    const button = menu.appendChild(document.createElement('button'));
    button.textContent = 'Play Game';

    button.addEventListener('click', (e)=>{
        m.remove();
        //button.remove();
        const d = document.createElement('div');
        d.id = 'difficulty';
        document.body.appendChild(d);
        const diff          = document.getElementById('difficulty');
        const ezBut         = diff.appendChild(document.createElement('button'));
        ezBut.textContent   = 'Easy';
        const meBut         = diff.appendChild(document.createElement('button'));
        meBut.textContent   = 'Medium';
        const hardBut       = diff.appendChild(document.createElement('button'));
        hardBut.textContent = 'Hard';
        const extBut        = diff.appendChild(document.createElement('button'));
        extBut.textContent  = 'Leaderboard';
        d.addEventListener('click', (e)=>{
            let mode;
            if (e.target == ezBut)   { mode = 'easy';   d.remove(); gameStart(mode); document.body.style.backgroundImage = ''; return }
            if (e.target == meBut)   { mode = 'medium'; d.remove(); gameStart(mode); document.body.style.backgroundImage = ''; return }
            if (e.target == hardBut) { mode = 'hard';   d.remove(); gameStart(mode); document.body.style.backgroundImage = ''; return }
            if (e.target == extBut)  { mode = 'extreme';d.remove(); gameStart(mode); document.body.style.backgroundImage = ''; return }
        })
    })
}

const gameDifficulty =(mode)=>{
    if (mode == "easy")    { return diffRandNum(40, 45) };
    if (mode == "medium")  { return diffRandNum(45, 50) };
    if (mode == "hard")    { return diffRandNum(55, 58) };
    if (mode == "extreme") { return diffRandNum(65, 69) };
}

const gameStart =(mode)=>{
    mainSound.play();
    startTimer();
    let diff = gameDifficulty(mode);
    console.log(diff)
    let gamestate = 'normal';
    
    const newBoard = new Board (9);
    let solution = newBoard.generate();
    newBoard.removeRandom(diff);
    newBoard.draw();

    let selectedNumber = null;
    let selectedTile;

    newBoard.digits.addEventListener("click", (e)=>{    // Event clicker for digits
        if (gamestate != 'normal') return;
        clickSound.play();
        let selNum = e.target;
        let digits = document.getElementById('digits').children;
        for(let i=0; i<digits.length; i++) { digits[i].className = "empty" }
        selNum.className = "number-selected";
        selectedNumber = e.target.textContent;
        //console.log(selectedNumber)

        let board = document.getElementById('board').children
        for(let i=0; i<board.length; i++) {
            board[i].className = "empty";
            if (board[i].textContent == selectedNumber) { board[i].className = "tile-selected" }    // Selects all tiles in the board with the selected number from digits
        }
    });

    newBoard.elem.addEventListener("click", (e)=>{      // Event clicker for board
        let totalErrors = document.getElementById('error');
        if (gamestate != 'normal') return;
        selectedTile = e.target;
        let indexSolution = findIndexOfSolution(solution, selectedTile.id);
        //console.log('Index Solution: ', indexSolution);
        //console.log('Index: ', selectedTile.id);
        //console.log('Tile: ',selectedTile);
        if (selectedTile.textContent == '' && selectedNumber == findSolution(solution, indexSolution)){
            selectedTile.textContent = selectedNumber;
            clickSound.play();
            selectedTile.className = "tile-selected";
        }
        if (selectedNumber != findSolution(solution, indexSolution) && selectedNumber != null && selectedNumber != '123456789') {
            totalErrors.textContent++;
            wrongClick.play();
            if (totalErrors.textContent == 3) {
                gamestate = 'gameover';
                document.getElementById('error').remove();
                document.getElementById('board').remove();
                document.getElementById('digits').remove();
                document.body.style.backgroundImage = "url('pic/sudoku_game_logo2.png')";
                const lost = document.body.appendChild(document.createElement('div'))
                lost.id = 'losing-screen'
                lost.fontSize = '44px'
                lost.textContent = 'You lost'
                const button = document.body.appendChild(document.createElement('button'))
                button.textContent = 'Play Again';

                button.addEventListener('click', (e)=>{
                    gameStart();
                    button.remove();
                    lost.remove();
                    document.body.style.backgroundImage = '';
                })
            }
        }
    });
}
const main =()=>{
    gameMenu();
    //gameStart();      //Temporary start without menu
}

main();