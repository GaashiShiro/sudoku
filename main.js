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

const main =()=>{
    let gamestate = 'normal';
    const newBoard = new Board (9);
    let o = newBoard.getValuesFromStruct(board);
    newBoard.draw();
}

main();