//bit-masking approach

function subsetGeneration_iterative(array)                 
{
  for (var i = 0; i < (1 << array.length); i++) {
    var subset = [];
    for (var j = 0; j < array.length; j++)
      if (i & (1 << j))
        subset.push(array[j]);

    delete subset;
  }
}

//Backtracking approach

function subsetGeneration_backtracking(array)              
{
    function fork(i, t) {
        if (i === array.length) {
            return;
        }
        fork(i + 1, t.concat([array[i]]));
        fork(i + 1, t);
    }
  
    fork(0, []);
    return;
  }