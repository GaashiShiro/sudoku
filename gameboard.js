class Board {
    constructor(size){
        this.tiles = [];
        this.size  = size;
        this.tiles.length = this.size*this.size;
        this.elem = document.body.appendChild(document.createElement('div'));
        this.digits = document.body.appendChild(document.createElement('div'));
        this.totalErrors = document.body.appendChild(document.createElement('div'));
        for (let i=0; i<this.tiles.length; i++){
            this.tiles[i] = { value: 0 }; //access the index of an array
        }
        //console.log(this);
    }
    draw(){
        const {elem, size, digits, totalErrors} = this;
        let idDiv = 0;
        elem.id = 'board';
        digits.id = 'digits';
        totalErrors.id = 'error';
        totalErrors.innerHTML = 0;
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
            }
        }
        for (let d = 1; d<10; d++){
            const e = document.createElement('div');
            digits.appendChild(e);
            e.classList = "empty";
            e.textContent = d;
        }
    }
    getTile(x,y){
        if (x < 0 || y<0 || x>this.size-1 || y>this.size-1){return null};
        return this.tiles[y*this.size+x]
    }
    getValuesFromStruct(board){
        board = board.join('');
        for (let e = 0; e<board.length; e++){
            this.tiles[e].value = board[e];
        }
    }
}

export {Board};