import { Board } from "./gameboard.js";
/*
Temporary Board
*/

let mainSound = new Audio('lighthearted_loop.ogg');
mainSound.loop=true;
let clickSound = new Audio('click_sound_1.mp3');
clickSound.volume = 0.3;


let board = [
    "007491605",
    "200060309",
    "009007010",
    "058600004",
    "003000090",
    "006200187",
    "904070002",
    "670830000",
    "810045000"
]
let solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]

const gameOver =()=>{
    if (totalErrors == 3) {gamestate = 'gameover'}
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

const main =()=>{
    mainSound.play();
    let gamestate = 'normal';
    let totalErrors = document.getElementById('error')
    
    const newBoard = new Board (9);
    newBoard.getValuesFromStruct(board);
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
        console.log(selectedNumber)

        let board = document.getElementById('board').children
        for(let i=0; i<board.length; i++) {
            board[i].className = "empty";
            if (board[i].textContent == selectedNumber) { board[i].className = "tile-selected" }    // Selects all tiles in the board with the selected number from digits
        }
        
        //

    });

    newBoard.elem.addEventListener("click", (e)=>{      // Event clicker for board
        if (gamestate != 'normal') return
        clickSound.play();
        selectedTile = e.target;
        let indexSolution = findIndexOfSolution(solution, selectedTile.id)
        //console.log('Index Solution: ', indexSolution);
        //console.log('Index: ', selectedTile.id);
        //console.log('Tile: ',selectedTile);
        if (selectedTile.textContent == '' && selectedNumber == findSolution(solution, indexSolution)){
            selectedTile.textContent = selectedNumber;
            selectedTile.className = "tile-selected";
        }
        if (selectedNumber != findSolution(solution, indexSolution) && selectedNumber != null && selectedNumber != '123456789') {
            totalErrors.textContent++;
        }

        
    });
}

main();