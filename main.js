import { Board } from "./gameboard.js";
/*
Temporary Board
*/


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
    let gamestate = 'normal';
    let totalErrors = document.getElementById('error')
    
    const newBoard = new Board (9);
    newBoard.getValuesFromStruct(board);
    newBoard.draw();
    
    
    let selectedNumber = null;
    let selectedTile;

    newBoard.digits.addEventListener("click", (e)=>{
        if (gamestate != 'normal') return
        selectedNumber = e.target.textContent;
        //console.log('Digit: ',selectedNumber);
    });

    newBoard.elem.addEventListener("click", (e)=>{
        if (gamestate != 'normal') return
        selectedTile = e.target;
        let indexSolution = findIndexOfSolution(solution, selectedTile.id)
        //console.log('Index Solution: ', indexSolution);
        //console.log('Index: ', selectedTile.id);
        //console.log('Tile: ',selectedTile);
        if (selectedTile.textContent == '' && selectedNumber == findSolution(solution, indexSolution)){
            selectedTile.textContent = selectedNumber;
        }
        if (selectedNumber != findSolution(solution, indexSolution) && selectedNumber != null) {
            totalErrors.textContent++;
        }
    });
    console.log(totalErrors.textContent)
}

main();