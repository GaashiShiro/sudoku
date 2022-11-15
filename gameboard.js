import {swap, shuffleArray, randomNum} from "./utils.js"
class Board {
    constructor(size){
        this.tiles = [];
        
        this.size  = size;
        this.tiles.length = this.size*this.size;
        this.totalErrors = document.body.appendChild(document.createElement('div'));
        this.elem = document.body.appendChild(document.createElement('div'));
        this.digits = document.body.appendChild(document.createElement('div'));
        this.tiles.index = 0;
        const tile = this.tiles;
        for (let i=0; i<tile.length; i++){
            tile[i] = { index: tile.index++, value: 0, quadrant : 0, x: i % 9, y: Math.floor(i/9) }; //access the index||value in grid||quadrant||x && y of an array
            if (tile[i].x <= 2 && tile[i].y <= 2 )                                    { tile[i].quadrant = 1 }    // Top Left Quadrant
            if (tile[i].x >= 3 && tile[i].x <= 5 && tile[i].y <= 2 )                  { tile[i].quadrant = 2 }    // Top Middle Quadrant
            if (tile[i].x > 5  && tile[i].y <= 2 )                                    { tile[i].quadrant = 3 }    // Top Right Quadrant
            if (tile[i].x <= 2 && tile[i].y > 2  && tile[i].y <= 5 )                  { tile[i].quadrant = 4 }    // Center Left Quadrant
            if (tile[i].x >= 3 && tile[i].x <= 5 && tile[i].y > 2 && tile[i].y <= 5 ) { tile[i].quadrant = 5 }    // Center Quadrant
            if (tile[i].x > 5  && tile[i].y > 2  && tile[i].y <= 5 )                  { tile[i].quadrant = 6 }    // Center Right Quadrant
            if (tile[i].x <= 2 && tile[i].y > 5 )                                     { tile[i].quadrant = 7 }    // Bottom Left Quadrant
            if (tile[i].x >= 3 && tile[i].x <= 5 && tile[i].y>5 )                     { tile[i].quadrant = 8 }    // Bottom Middle Quadrant
            if (tile[i].x > 5  && tile[i].y > 5 )                                     { tile[i].quadrant = 9 }    // Bottom Right Quadrant
        }
        console.log(this);
    }
    draw(){
        const { elem, size, digits, totalErrors } = this;
        let idDiv = 0;
        elem.id = 'board';
        digits.id = 'digits';
        totalErrors.id = 'error';
        elem.innerHTML = '';
        elem.style.setProperty('--size', size)
        digits.innerHTML = '';
        digits.style.setProperty('--size', size)
        // Drawing Board
        for (let y=0; y<size;y++){
            for (let x=0; x<size;x++){
                const d = document.createElement('div');
                d.id = idDiv;
                idDiv++;
                elem.appendChild(d);
                const tile = this.tiles[y*size+x];
                if (tile.value != 0){ d.textContent = tile.value };
            }
        }
        // Drawing Digits below Board
        for (let d = 1; d<10; d++){             
            const e = document.createElement('div');
            digits.appendChild(e);
            e.classList = "empty";
            e.textContent = d;
        }
    }

    generate(){
        const { elem, size, tiles } = this;
        const sudokuNums = [1,2,3,4,5,6,7,8,9];
        let copyNums = sudokuNums.slice();
        copyNums = shuffleArray(copyNums, 50)
        let solution;
        
        const solutionGen=(origArr)=>{
            let arr = [];
            while ( origArr.length > 0 ){ arr.push(Number(origArr.splice(Math.floor(Math.random() * origArr.length), 1))) };
            return arr;
        }
        
        let rowOne = solutionGen(copyNums);
        solution = rowOne;
        
        for (let i = 0; i<solution.length; i++){
            this.tiles[i].value = solution[i]   // Assigns each board element with its value
        }

        const generateTileContent =(index)=>{
            //tiles[index] = 9;  <--- Example
            let random = randomNum();  //Gets random number between 1-9
            const q1 = this.getQuadrant(1);
            const q2 = this.getQuadrant(2);
            const q3 = this.getQuadrant(3);
            const r1 = this.getRow(1);
            this.tiles[index].value = random;
            //if (!r1.find(t => t.value == random)) { this.tiles[index].value = random }
        }

        generateTileContent(9);
        generateTileContent(10);
        generateTileContent(11);
        generateTileContent(12);
        generateTileContent(13);
        generateTileContent(14);
        generateTileContent(15);
        generateTileContent(16);
        generateTileContent(17);
        generateTileContent(18);
        generateTileContent(19);
        generateTileContent(20);
        generateTileContent(21);
        generateTileContent(22);
        generateTileContent(23);
        generateTileContent(24);
        generateTileContent(25);
        generateTileContent(26);
        generateTileContent(27);
        generateTileContent(28);

    }

    getQuadrant(num) { return this.tiles.filter(e => e.quadrant == num) };

    getRow(num){ return this.tiles.filter(e => e.x == num) };
    getColumn(num){ return this.tiles.filter(e => e.y == num) };
    getAll(){}

    getTile(x,y){
        if (x < 0 || y<0 || x>this.size-1 || y>this.size-1){return null};
        return this.tiles[y*this.size+x];
    }
}

export {Board};