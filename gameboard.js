class Board {
    constructor(size){
        this.tiles = [];
        this.size  = size;
        this.tiles.length = this.size*this.size;
        this.totalErrors = document.body.appendChild(document.createElement('div'));
        this.elem = document.body.appendChild(document.createElement('div'));
        this.digits = document.body.appendChild(document.createElement('div'));
        this.tiles.index = 0;
        for (let i=0; i<this.tiles.length; i++){
            this.tiles[i] = { index: this.tiles.index++, value: 0, quadrant : 0, x: i % 9, y: parseInt(i/9) }; //access the index||value in grid||quadrant||x && y of an array
            if (this.tiles[i].x <= 2 && this.tiles[i].y <= 2 )                                               { this.tiles[i].quadrant = 1 }    // Top Left Quadrant
            if (this.tiles[i].x >= 3 && this.tiles[i].x <= 5 && this.tiles[i].y <= 2 )                       { this.tiles[i].quadrant = 2 }    // Top Middle Quadrant
            if (this.tiles[i].x > 5  && this.tiles[i].y <= 2 )                                               { this.tiles[i].quadrant = 3 }    // Top Right Quadrant
            if (this.tiles[i].x <= 2 && this.tiles[i].y > 2  && this.tiles[i].y <= 5 )                       { this.tiles[i].quadrant = 4 }    // Center Left Quadrant
            if (this.tiles[i].x >= 3 && this.tiles[i].x <= 5 && this.tiles[i].y > 2 && this.tiles[i].y <= 5 ){ this.tiles[i].quadrant = 5 }    // Center Quadrant
            if (this.tiles[i].x > 5  && this.tiles[i].y > 2  && this.tiles[i].y <= 5 )                       { this.tiles[i].quadrant = 6 }    // Center Right Quadrant
            if (this.tiles[i].x <= 2 && this.tiles[i].y > 5 )                                                { this.tiles[i].quadrant = 7 }    // Bottom Left Quadrant
            if (this.tiles[i].x >= 3 && this.tiles[i].x <= 5 && this.tiles[i].y>5 )                          { this.tiles[i].quadrant = 8 }    // Bottom Middle Quadrant
            if (this.tiles[i].x > 5  && this.tiles[i].y > 5 )                                                { this.tiles[i].quadrant = 9 }    // Bottom Right Quadrant
        }
        //if (this.tiles[i].index <= 9) {this.tiles.y[i] = 1}
        console.log(this);
    }
    draw(g){
        const { elem, size, digits, totalErrors } = this;
        let idDiv = 0;
        elem.id = 'board';
        digits.id = 'digits';
        totalErrors.id = 'error';
        elem.innerHTML = '';
        elem.style.setProperty('--size', size)
        digits.innerHTML = '';
        digits.style.setProperty('--size', size)
        g = this.generate();
        for (let y=0; y<size;y++){
            for (let x=0; x<size;x++){
                const d = document.createElement('div');
                d.id = idDiv;
                idDiv++;
                elem.appendChild(d);
                const tile = this.tiles[y*size+x];
                tile.x = x;
                tile.y = y;
                this.tiles[x].value = g[x];
                if (tile.value != 0){ d.textContent = tile.value };
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
        solution = solutionGen(shuffleFirstArr(solution));
        
        
        return solution
    }
    getRow(n){}
    getColumn(n){}
    getAll(){}

    getTile(x,y){
        if (x < 0 || y<0 || x>this.size-1 || y>this.size-1){return null};
        return this.tiles[y*this.size+x];
    }
}

export {Board};