import { Board } from "./gameboard.js";
import {findIndexOfSolution, findSolution, diffRandNum, startTimer, sTimer } from "./utils.js"


let mainSound = new Audio('sound/lighthearted_loop.ogg');
mainSound.loop=true;
let clickSound = new Audio('sound/click_sound_1.mp3');
clickSound.volume = 0.3;
let wrongClick = new Audio('sound/toom_click.wav');
wrongClick.volume = 0.5;
let score = 0;

const calculateScore=(mode, errors)=>{
    if (mode == 'easy')     { score = score + (100*(3-errors)) };
    if (mode == 'medium')   { score = score + (200*(3-errors)) };
    if (mode == 'hard')     { score = score + (300*(3-errors)) };
    if (mode == 'extreme')  { score = score + (400*(3-errors)) };
    console.log(score);
    return score;
}

const gameMenu =()=>{
    const m = document.createElement('div');
    const g = document.body.appendChild(document.createElement('div'));
    g.id = 'game'
    m.id = 'menu';
    g.appendChild(m);
    g.style.backgroundImage = "url('pic/sudoku_game_logo2.png')";
    g.style.backgroundRepeat = "no-repeat";
    g.style.backgroundSize = 'cover';
    g.style.backgroundPositionY = "-220px";
    
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
    const game = document.getElementById('game');
    game.appendChild(m);
    m.textContent = 'You Won';
    const timer = document.getElementById('timer').textContent;
    const completionTime = document.createElement('div');
    completionTime.id = 'timer';
    m.appendChild(completionTime);
    completionTime.textContent = 'Completion Time: '+timer;

    const finalScore = document.createElement('div');
    finalScore.id = 'finalScore';
    m.appendChild(finalScore);
    finalScore.textContent = 'Score: '+score;
    
    const button = m.appendChild(document.createElement('button'));
    button.textContent = 'Play Again?';
    button.addEventListener('click', (e)=>{
        m.remove();
        completionTime.remove();
        difficultyButtons();
        button.remove();
    })
}
const difficultyButtons=()=>{
    const d = document.createElement('div');
    d.id = 'difficulty';
    const game = document.getElementById('game');
    game.appendChild(d);
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
        if (e.target == ezBut)   { mode = 'easy';   d.remove(); gameStart(mode); game.remove(); return }
        if (e.target == meBut)   { mode = 'medium'; d.remove(); gameStart(mode); game.remove(); return }
        if (e.target == hardBut) { mode = 'hard';   d.remove(); gameStart(mode); game.remove(); return }
        if (e.target == extBut)  { mode = 'extreme';d.remove(); gameStart(mode); game.remove(); return }
    })
}
const gameDifficulty =(mode)=>{
    if (mode == "easy")    { return diffRandNum(40, 45) }; // 40, 45
    if (mode == "medium")  { return diffRandNum(46, 50) };
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
    let diff = gameDifficulty(mode);
    console.log('Tiles Hidden: ',diff,'\n','Mode: ', mode);    
    const newBoard = new Board (9);
    score = 0;
    let solution = newBoard.generate();
    newBoard.removeRandom(diff);
    newBoard.draw();
    sTimer();
    let selectedNumber = null;
    let selectedTile;
    let board = document.getElementById('board').children;
    let numbersFound = findNumbers(board);
    let count = document.getElementById('count').children;
    
    for (let i=0; i<numbersFound.length; i++) { newBoard.countNum[numbersFound[i]]--; }
    newBoard.draw();
    for (let i=1; i<10; i++){ if (newBoard.countNum[i] == 0) {count[i-1].textContent = ''; digits.children[i-1].textContent = ''; digits.children[i-1].className = ""; }}
    newBoard.digits.addEventListener("click", (e)=>{    // Event clicker for digits
        if (gamestate != 'normal') return;
        clickSound.play();
        let selNum = e.target;
        let digits = document.getElementById('digits').children;
        for(let i=0; i<digits.length; i++) { if (digits[i].className != "") { digits[i].className = "empty" } }
        if (selNum.className != "") {selNum.className = "number-selected"};
        selectedNumber = e.target.textContent;
        let board = document.getElementById('board').children;
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
        if (selectedTile.textContent == '' && selectedNumber == findSolution(solution, indexSolution)){
            selectedTile.textContent = selectedNumber;
            clickSound.play();
            selectedTile.className = "tile-selected";
            count[selectedNumber-1].textContent--;
            newBoard.countNum[selectedNumber]--;
            let totalErrors = document.getElementById('error');
            let scoreDiv = document.getElementById('score');
            scoreDiv.textContent = calculateScore(mode, totalErrors.textContent);
            console.log('Text Content: ',scoreDiv.textContent)
            //console.log(Math.abs(Object.values(newBoard.countNum).reduce((a,b)=>a+b)-100)+'%')
            for (let i=1; i<10; i++){
                if (newBoard.countNum[i] == 0) {count[i-1].textContent = ''; digits.children[i-1].textContent = ''; digits.children[i-1].className = "";}
            }
            if (Object.values(newBoard.countNum).every(value => value === 0 )) {
                const timer = document.getElementById('timer').textContent;
                let minutes = Number(timer[0].toString()+timer[1].toString())*60;
                let seconds = minutes + Number(timer[3].toString()+timer[4].toString());
                console.log(timer)
                console.log(score)
                console.log(seconds)
                score = (score*2) - (seconds*10);
                gameWon();
                const game = document.getElementById('game');
                document.getElementById('score').remove();
                document.getElementById('timer').remove();
                document.getElementById('error').remove();
                document.getElementById('board').remove();
                document.getElementById('digits').remove();
                document.getElementById('count').remove();
                game.style.backgroundImage = "url('pic/sudoku_game_logo2.png')";
                game.style.backgroundRepeat = "no-repeat";
                game.style.backgroundSize = 'cover';
                game.style.backgroundPositionY = "-220px";
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
                const game = document.getElementById('game');
                game.style.backgroundImage = "url('pic/sudoku_game_logo2.png')";
                game.style.backgroundRepeat = "no-repeat";
                game.style.backgroundSize = 'cover';
                game.style.backgroundPositionY = "-220px";
                const lost = game.appendChild(document.createElement('div'))
                lost.id = 'losing-screen';
                lost.fontSize = '44px';
                lost.textContent = 'You lost';
                const button = lost.appendChild(document.createElement('button'))
                button.textContent = 'Play Again';
                button.addEventListener('click', (e)=>{
                    difficultyButtons();
                    button.remove();
                    lost.remove();
                    
                })
            }
        }
        //------------------------------------------------------------------------------------------------------------------
    });
}
const main =()=>{
    gameMenu();
    //gameStart('easy');      //Temporary start without menu
}
main();