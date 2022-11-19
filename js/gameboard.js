import {swap, shuffleArray, randomNum, randomNumIndex} from "./utils.js"
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
            if (tile[i].x <= 2 && tile[i].y <= 2 )                                    { tile[i].quadrant = 0 }    // Top Left Quadrant
            if (tile[i].x >= 3 && tile[i].x <= 5 && tile[i].y <= 2 )                  { tile[i].quadrant = 1 }    // Top Middle Quadrant
            if (tile[i].x > 5  && tile[i].y <= 2 )                                    { tile[i].quadrant = 2 }    // Top Right Quadrant
            if (tile[i].x <= 2 && tile[i].y > 2  && tile[i].y <= 5 )                  { tile[i].quadrant = 3 }    // Center Left Quadrant
            if (tile[i].x >= 3 && tile[i].x <= 5 && tile[i].y > 2 && tile[i].y <= 5 ) { tile[i].quadrant = 4 }    // Center Quadrant
            if (tile[i].x > 5  && tile[i].y > 2  && tile[i].y <= 5 )                  { tile[i].quadrant = 5 }    // Center Right Quadrant
            if (tile[i].x <= 2 && tile[i].y > 5 )                                     { tile[i].quadrant = 6 }    // Bottom Left Quadrant
            if (tile[i].x >= 3 && tile[i].x <= 5 && tile[i].y>5 )                     { tile[i].quadrant = 7 }    // Bottom Middle Quadrant
            if (tile[i].x > 5  && tile[i].y > 5 )                                     { tile[i].quadrant = 8 }    // Bottom Right Quadrant
        }
        //console.log(this);
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
        let template = "387491625241568379569327418758619234123784596496253187934176852675832941812945763";
        let randomN1 = Math.floor(Math.random() * 10);
        let randomN2 = Math.floor(Math.random() * 10);
        
        for (let i=0; i<this.tiles.length; i++){ this.tiles[i].value = template[i] }                                  // Assigns each board element with its value
        
        const shuffleColumns=()=>{
            for (let x=0; x<9; x=x+3) {                                          //Loop for each 3 pairs
                let col0 = this.getRow(x);
                let col1 = this.getRow(x+1);
                let col2 = this.getRow(x+2);
                    
                for (let t=randomN1; t--;){                            // Loop for number of shuffles
                    for (let  i=0; i<9; i++){                       // Loop all results in that column
                        [col0[i].value, col1[i].value] = [col1[i].value, col0[i].value];
                        [col1[i].value, col2[i].value] = [col2[i].value, col1[i].value];
                    }
                }
            }
        }
        const shuffleRows=()=>{
            for (let x=0; x<9; x=x+3) {
                let row0 = this.getColumn(x);
                let row1 = this.getColumn(x+1);
                let row2 = this.getColumn(x+2);
                    
                for (let t=randomN2; t--;){
                    for (let  i=0; i<9; i++){
                        [row0[i].value, row1[i].value] = [row1[i].value, row0[i].value];
                        [row1[i].value, row2[i].value] = [row2[i].value, row1[i].value];
                    }
                }
            }
        }
        shuffleRows();
        shuffleColumns();
        
        const copyOfTiles = this.tiles.map(t => t.value);
        //console.log(copyOfTiles)
        return copyOfTiles
    }

    removeRandom(num){             // num hides a certain number of tiles by changing them to 0
        for (let i=0; i<num; i++){
            let n = (Math.floor(Math.random()*80));
            this.tiles[n].value = 0; 
        }
    }
    

    getQuadrant(num) { return this.tiles.filter(e => e.quadrant == num) };
    getRow(num){ return this.tiles.filter(e => e.x == num) };
    getColumn(num){ return this.tiles.filter(e => e.y == num) };
    getTile(x,y){
        if (x < 0 || y<0 || x>this.size-1 || y>this.size-1){return null};
        return this.tiles[y*this.size+x];
    }
}

export {Board};