document.getElementById("downloadButton").style.display="none";
document.getElementById("myChart").style.display="none";

document.getElementById("submitButton").onclick=function()
{

  if(document.getElementById("time").value==="")
  {
    document.getElementById("downloadButton").style.display="none";
    document.getElementById("myChart").style.display="none";
    alert("ERROR-Please Enter the time.");

    return false;
  }

  function binarySearch(sortedArray, key){
    
    let start = 0;
    let end = sortedArray.length - 1;

    while (start <= end) {
        let middle = Math.floor((start + end) / 2);

        if (sortedArray[middle] === key) 
        {
            // found the key
            return;
        } 
        else if (sortedArray[middle] < key) 
        {
            // continue searching to the right
            start = middle + 1;
        } 
        else 
        {
            // search searching to the left
            end = middle - 1;
        }
    }
	// key wasn't found
    return;
}

function sequentialSearch(arr, key)
{
  for(let i = 0; i < arr.length; i++){
      if(arr[i] === key){
          return ;
      }
  }
  return ;
}

function swap(items, leftIndex, rightIndex)
{
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}

function partition(items, left, right) 
{
  var pivot   = items[Math.floor((right + left) / 2)], //middle element
      i       = left, //left pointer
      j       = right; //right pointer
  while (i <= j) {
      while (items[i] < pivot) {
          i++;
      }
      while (items[j] > pivot) {
          j--;
      }
      if (i <= j) {
          swap(items, i, j); //sawpping two elements
          i++;
          j--;
      }
  }
  return i;
}

function quickSort(items, left, right) {
  var index;
  if (items.length > 1) {
      index = partition(items, left, right); //index returned from partition
      if (left < index - 1) { //more elements on the left side of the pivot
          quickSort(items, left, index - 1);
      }
      if (index < right) { //more elements on the right side of the pivot
          quickSort(items, index, right);
      }
  }
  return ;
}

function matrixAddition(array1, array2) {
  var result=new Array();
  for(let i=0; i<array1.length; ++i){
    result.push(array1[i]+array2[i]);
  }

  return ;
}


function subsetGeneration(array) 
{

  function fork(i, t) {
      if (i === array.length) {
          result.push(t);
          return;
      }
      fork(i + 1, t.concat([array[i]]));
      fork(i + 1, t);
  }

  var result = [];
  fork(0, []);
  return ;
}

function permutationGeneration(array,size,n)
{
        // if size becomes 1 then stop
        if (size == 1)
            return ;
  
        for (let i = 0; i < size; i++) {
            permutationGeneration(array, size - 1, n);
  
            // if size is odd, swap 0th i.e (first) and
            // (size-1)th i.e (last) element
            if (size % 2 == 1) {
                let temp = array[0];
                array[0] = array[size - 1];
                array[size - 1] = temp;
            }
  
            // If size is even, swap ith
            // and (size-1)th i.e last element
            else {
                let temp = array[i];
                array[i] = array[size - 1];
                array[size - 1] = temp;
            }
        }
}
  
  var timeLimit=document.getElementById("time").value;
  var timeReq=0;
  var size=1;
  var sizeArray=new Array();
  var timeArray=new Array();
  var algorithm=document.getElementById("algo").value;

  

  while(timeReq < timeLimit)
  {
    
    var randArray=Array.from({length : size}, () => Math.floor(Math.random() * 100000));

    switch (algorithm)
    {
      case "binarySearch":
        randArray.sort(function(a, b){return a - b});
        timeReq = new Date().getTime();
        binarySearch(randArray, randArray[Math.floor(Math.random() * randArray.length)]);
        timeReq = (new Date().getTime()) - timeReq;
        break;

      case "sequentialSearch":
        timeReq = new Date().getTime();
        sequentialSearch(randArray, randArray[Math.floor(Math.random() * randArray.length)]);
        timeReq = (new Date().getTime()) - timeReq;
        break;

      case "quickSort":
        timeReq = new Date().getTime();
        quickSort(randArray, 0, randArray.length -1);
        timeReq = (new Date().getTime()) - timeReq;
        break;

      case "matrixAddition":
        timeReq = new Date().getTime();
        matrixAddition(randArray, randArray);
        timeReq = (new Date().getTime()) - timeReq;
        break;

      case "matrixMultiplication":
        //code
        break;

      case "subsetGeneration":
        timeReq = new Date().getTime();
        subsetGeneration(randArray);
        timeReq = (new Date().getTime()) - timeReq;
        break;

      case "permutationGeneration":
        timeReq = new Date().getTime();
        permutationGeneration(randArray, randArray.length, randArray.length);
        timeReq = (new Date().getTime()) - timeReq;
        break;

      default:
        alert("Some error has occured");
    }

    if(timeReq<timeLimit)
    {
      sizeArray.push(size);
      timeArray.push(timeReq);
    }

    size=size*2;
  }


  var xValues = timeArray;

new Chart("myChart", 
{
  type: "line",
  data: 
  {
    labels: xValues,
    datasets: [{
      data: sizeArray,
      borderColor: "green",
      fill: false
    }]
  },
  options: 
  {
    legend: {display: false}
  }
});

document.getElementById("downloadButton").style.display="inline";
document.getElementById("myChart").style.display="inline";

document.getElementById("download").addEventListener('click', function(){
  /*Get image of canvas element*/
  var url_base64jp = document.getElementById("myChart").toDataURL("image/jpg");
  /*get download button (tag: <a></a>) */
  var a =  document.getElementById("download");
  /*insert chart image url to download button (tag: <a></a>) */
  a.href = url_base64jp;
});

}
