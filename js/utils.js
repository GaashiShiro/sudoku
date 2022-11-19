const randomNumIndex=()=>     { return Math.floor(Math.random() * 8) };
const randomNum=()=>          { return Math.floor(Math.random() * 9)+1 };
const diffRandNum=(min, max)=> { return Math.floor(Math.random() * (max - min +1) + min) }

const swap=(arr, x, y)=>{   //Swaps any array indexes
    if (x >= arr.length || x < 0 ){ console.log('X index is not defined in the array'); return }
    if (y >= arr.length || y < 0 ){ console.log('Y index is not defined in the array'); return }
    let oldX = arr[x];
    arr[x] = arr[y];
    arr[y] = oldX;
    return arr;
}

const shuffleArray=(arr, times)=>{        //Shuffles the first array number of times!!!
    if (times <= 0 ) { console.log('Number of shuffles must be greater than 0') ;return }
    for (let i=times; i>-1; i--){
        let x = randomNumIndex();
        let y = randomNumIndex();
        swap(arr, x , y);
    }
    return arr
}

const findIndexOfSolution=(solution, target)=>{
    solution = solution.join('');
    let result = target;
    return result;
}

const findSolution=(solution, target)=>{
    solution = solution.join('');
    return solution[target];
}

export {
    swap,
    shuffleArray,
    randomNumIndex, randomNum,
    findIndexOfSolution,
    findSolution,
    diffRandNum
}