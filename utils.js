const swap=(arr, x, y)=>{   //Swaps any array indexes
    if (x >= arr.length || x < 0 ){ console.log('X index is not defined in the array'); return }
    if (y >= arr.length || y < 0 ){ console.log('Y index is not defined in the array'); return }
    let oldX = arr[x];
    arr[x] = arr[y];
    arr[y] = oldX;
    return arr;
}

export { swap }