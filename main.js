import { Board } from "./gameboard.js";
/*
Temporary Board
*/

let mainSound = new Audio('lighthearted_loop.ogg');
mainSound.loop=true;
let clickSound = new Audio('click_sound_1.mp3');
clickSound.volume = 0.3;
let wrongClick = new Audio('toom_click.wav');
wrongClick.volume = 0.5;



const gameOver =()=>{
    // game over screen?
}

const findIndexOfSolution=(solution, target)=>{
    solution = solution.join('');
    let result = target;
    return result;
}

const findSolution=(solution, target)=>{
    solution = solution.join('');
    return solution[target]
}

const gameMenu =()=>{
    document.body.style.backgroundImage = "url('sudoku_game_logo2.png')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = 'top center'
    const m = document.createElement('div');
    m.id = 'menu';
    document.body.appendChild(m);
    const menu = document.getElementById('menu');
    const button = menu.appendChild(document.createElement('button'))
    button.textContent = 'Play Game';

    button.addEventListener('click', (e)=>{
        gameStart();
        m.remove();
        button.remove();
        document.body.style.backgroundImage = '';
    })
}

const gameStart =()=>{
    mainSound.play();
    let gamestate = 'normal';
    
    const newBoard = new Board (9);
    let solution = newBoard.generate();
    newBoard.removeRandom(54);
    newBoard.draw();

    let selectedNumber = null;
    let selectedTile;

    newBoard.digits.addEventListener("click", (e)=>{    // Event clicker for digits
        if (gamestate != 'normal') return
        clickSound.play();
        let selNum = e.target;
        let digits = document.getElementById('digits').children
        for(let i=0; i<digits.length; i++) { digits[i].className = "empty" }
        selNum.className = "number-selected"
        selectedNumber = e.target.textContent;
        //console.log(selectedNumber)

        let board = document.getElementById('board').children
        for(let i=0; i<board.length; i++) {
            board[i].className = "empty";
            if (board[i].textContent == selectedNumber) { board[i].className = "tile-selected" }    // Selects all tiles in the board with the selected number from digits
        }
    });

    newBoard.elem.addEventListener("click", (e)=>{      // Event clicker for board
        let totalErrors = document.getElementById('error')
        if (gamestate != 'normal') return
        selectedTile = e.target;
        let indexSolution = findIndexOfSolution(solution, selectedTile.id)
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
                document.body.style.backgroundImage = "url('sudoku_game_logo2.png')";
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