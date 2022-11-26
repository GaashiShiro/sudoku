import { Board } from "./gameboard.js";
import {findIndexOfSolution, findSolution, diffRandNum } from "./utils.js"


let mainSound = new Audio('sound/lighthearted_loop.ogg');
mainSound.loop=true;
let clickSound = new Audio('sound/click_sound_1.mp3');
clickSound.volume = 0.3;
let wrongClick = new Audio('sound/toom_click.wav');
wrongClick.volume = 0.5;


const startTimer=()=>{
    const t = document.createElement('div');
    let timerInterval;
    t.id = 'timer';
    document.body.appendChild(t);
    let second = 0, minute = 0 // clear the variables
    clearInterval(timerInterval); // clears timer after restart
    timerInterval = setInterval(function () {
        t.textContent = (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second);
        second++;
        if (second == 60) { minute++; second = 0; } // add a minute and reset our seconds to 0
    }, 1000);
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
        difficultyButtons();
    })
}

const gameWon =()=>{
    const m = document.createElement('div');
    m.id = 'won';
    document.body.appendChild(m);
    m.textContent = 'You Won';
    const timer = document.getElementById('timer').textContent;
    const completionTime = document.createElement('div');
    completionTime.id = 'timer';
    m.appendChild(completionTime);
    completionTime.textContent = 'Completion Time: '+timer;
    const button = document.body.appendChild(document.createElement('button'));
    button.textContent = 'Play Again?';
    button.addEventListener('click', (e)=>{
        m.remove();
        completionTime.remove();
        difficultyButtons();
        button.remove()
    })
}

const difficultyButtons=()=>{
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
}

const gameDifficulty =(mode)=>{
    if (mode == "easy")    { return diffRandNum(10, 10) }; // 40, 45
    if (mode == "medium")  { return diffRandNum(45, 50) };
    if (mode == "hard")    { return diffRandNum(55, 58) };
    if (mode == "extreme") { return diffRandNum(65, 69) };
}

const findNumbers =(board)=>{
    let arr = [];
    for (let i=0; i<board.length; i++){
        if (board[i].textContent != 0) { arr.push(board[i].textContent)}
    }
    return arr
}

const gameStart =(mode)=>{
    mainSound.play();
    let gamestate = 'normal';
    
    startTimer();
        

    let diff = gameDifficulty(mode);
    console.log('Tiles Hidden: ',diff,'\n','Mode: ', mode);    
    const newBoard = new Board (9);
    let solution = newBoard.generate();
    newBoard.removeRandom(diff);
    newBoard.draw();
    let selectedNumber = null;
    let selectedTile;
    let board = document.getElementById('board').children;
    let numbersFound = findNumbers(board);
    let count = document.getElementById('count').children;
    for (let i=0; i<numbersFound.length; i++) {
        newBoard.countNum[numbersFound[i]]--;
    }
    newBoard.draw();
    for (let i=1; i<10; i++){
        if (newBoard.countNum[i] == 0) {count[i-1].textContent = ''; digits.children[i-1].textContent = ''; digits.children[i-1].className = "";}
    }

    newBoard.digits.addEventListener("click", (e)=>{    // Event clicker for digits
        if (gamestate != 'normal') return;
        clickSound.play();
        let selNum = e.target;
        let digits = document.getElementById('digits').children;
        for(let i=0; i<digits.length; i++) { if (digits[i].className != "") { digits[i].className = "empty" } }
        if (selNum.className != "") {selNum.className = "number-selected"};
        selectedNumber = e.target.textContent;
        //console.log(selectedNumber)

        let board = document.getElementById('board').children
        for(let i=0; i<board.length; i++) {
            board[i].className = "empty";
            if (board[i].textContent == selectedNumber) { board[i].className = "tile-selected" }    // Selects all tiles in the board with the selected number from digits
        }
    });
    // --------------------------------       Event clicker for board ------------------------------------------------------------
    newBoard.elem.addEventListener("click", (e)=>{   
        if (gamestate != 'normal') return;
        let totalErrors = document.getElementById('error');
        let board = document.getElementById('board');
        selectedTile = e.target;
        let indexSolution = findIndexOfSolution(solution, selectedTile.id);
        
        //console.log('Index Solution: ', indexSolution);
        //console.log('Index: ', selectedTile.id);
        //console.log('Tile: ',selectedTile);
        if (selectedTile.textContent == '' && selectedNumber == findSolution(solution, indexSolution)){
            selectedTile.textContent = selectedNumber;
            clickSound.play();
            selectedTile.className = "tile-selected";
            count[selectedNumber-1].textContent--;
            newBoard.countNum[selectedNumber]--;
            for (let i=1; i<10; i++){
                if (newBoard.countNum[i] == 0) {count[i-1].textContent = ''; digits.children[i-1].textContent = ''; digits.children[i-1].className = "";}
            }


            //let digits = document.getElementById('digits');
            //let timer = document.getElementById('timer');

            if (Object.values(newBoard.countNum).every(value => value === 0 )) {
                gameWon();
                document.getElementById('timer').remove();
                document.getElementById('error').remove();
                document.getElementById('board').remove();
                document.getElementById('digits').remove();
                document.getElementById('count').remove();
                document.body.style.backgroundImage = "url('pic/sudoku_game_logo2.png')";

            };
        }
        //-------------------------------------- "You Lost" Section ----------------------------------------------------------
        if (selectedNumber != findSolution(solution, indexSolution) && selectedNumber != null && selectedNumber != '123456789') {
            totalErrors.textContent++;
            wrongClick.play();
            if (totalErrors.textContent == 3) {
                gamestate = 'gameover';
                document.getElementById('timer').remove();
                document.getElementById('error').remove();
                document.getElementById('board').remove();
                document.getElementById('digits').remove();
                document.getElementById('count').remove();
                document.body.style.backgroundImage = "url('pic/sudoku_game_logo2.png')";
                const lost = document.body.appendChild(document.createElement('div'))
                lost.id = 'losing-screen'
                lost.fontSize = '44px'
                lost.textContent = 'You lost'
                const button = document.body.appendChild(document.createElement('button'))
                button.textContent = 'Play Again';

                button.addEventListener('click', (e)=>{
                    difficultyButtons();
                    button.remove();
                    lost.remove();
                    document.body.style.backgroundImage = "url('pic/sudoku_game_logo2.png')";
                })
            }
        }
        //------------------------------------------------------------------------------------------------------------------
    });
}
const main =()=>{
    gameMenu();
    //gameStart();      //Temporary start without menu
}
main();