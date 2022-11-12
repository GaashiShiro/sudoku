class Board {
    constructor(size){
        this.tiles = [];
        this.size  = size;
        this.tiles.length = this.size*this.size;
        this.totalErrors = document.body.appendChild(document.createElement('div'));
        this.elem = document.body.appendChild(document.createElement('div'));
        this.digits = document.body.appendChild(document.createElement('div'));
        for (let i=0; i<this.tiles.length; i++){
            this.tiles[i] = { value: 0, quadrant : 0 }; //access the index of an array || n = quadrant number
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
        for (let y=0; y<size;y++){
            for (let x=0; x<size;x++){
                const d = document.createElement('div');
                d.id = idDiv
                idDiv++;
                elem.appendChild(d);
                const tile = this.tiles[y*size+x];
                tile.x = x;
                tile.y = y;
                if (tile.value != 0){ d.textContent = tile.value };
                if (x <= 2 && y <= 2 )                     { tile.quadrant = 1 }    // Top Left Quadrant
                if (x >= 3 && x <= 5 && y <= 2 )           { tile.quadrant = 2 }    // Top Middle Quadrant
                if (x > 5  && y <= 2 )                     { tile.quadrant = 3 }    // Top Right Quadrant
                if (x <= 2 && y > 2  && y <= 5 )           { tile.quadrant = 4 }    // Center Left Quadrant
                if (x >= 3 && x <= 5 && y > 2 && y <= 5 )  { tile.quadrant = 5 }    // Center Quadrant
                if (x > 5  && y > 2  && y <= 5 )           { tile.quadrant = 6 }    // Center Right Quadrant
                if (x <= 2 && y > 5 )                      { tile.quadrant = 7 }    // Bottom Left Quadrant
                if (x >= 3 && x <= 5 && y>5 )              { tile.quadrant = 8 }    // Bottom Middle Quadrant
                if (x > 5  && y > 5 )                      { tile.quadrant = 9 }    // Bottom Right Quadrant
            }
        }
        for (let d = 1; d<10; d++){
            const e = document.createElement('div');
            digits.appendChild(e);
            e.classList = "empty";
            e.textContent = d;
        }
    }

    generate(){
        const { elem, size, tiles } = this;
        const randomNumIndex=()=> { return Math.floor(Math.random() * 8) };
        const randomNum=()=>      { return Math.floor(Math.random() * 9)+1 };
        const sudokuNums = [1,2,3,4,5,6,7,8,9];
        let solution;
        const swap=(arr, x, y)=>{
            arr = sudokuNums;
            let oldX = arr[x];
            arr[x] = arr[y];
            arr[y] = oldX;
            return arr
        }
        const shuffleFirstArr=(arr)=>{        //Shuffles the first array 50 times!!!
            for (let i= 50; i>-1; i--){
                let x = randomNumIndex();
                let y = randomNumIndex();
                swap(arr, x , y);
            }
            return arr;
        }
        const solutionGen=()=>{
            let origArr = sudokuNums;
            let arr = [];
            while (origArr.length > 0){
                arr.push(Number(origArr.splice(Math.floor(Math.random() * origArr.length), 1)));
            }
            return arr
        }
        const generateBoard=()=>{
            while (tiles.length != 81){
                solution = solutionGen(shuffleFirstArr(solution));
                console.log(solution)
            }
            return solution
        }
        return solution = generateBoard();
    }

    getRow(n){

    }
    
    getColumn(n){

    }
    getAll(){

    }

    getTile(x,y){
        if (x < 0 || y<0 || x>this.size-1 || y>this.size-1){return null};
        return this.tiles[y*this.size+x]
    }
    getValuesFromStruct(board){
        for (let e = 0; e<board.length; e++){
            this.tiles[e].value = board[e];
        }
    }
}

export {Board};