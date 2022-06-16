document.getElementById("downloadButton").style.display="none";
document.getElementById("myChart").style.display="none";

var label=new Array();
label[0]="Time (in microseconds)";
label[1]="Time (in microseconds)";
label[2]="Time (in milliseconds)";
label[3]="Time (in milliseconds)";
label[4]="Time (in milliseconds)";
label[5]="Time (in seconds)";
label[6]="Time (in seconds)";

function getText(selection)
{
  txtSelected = selection.selectedIndex;
  document.getElementById('label_text').innerHTML = label[txtSelected];
}

document.getElementById("submitButton").onclick=function()
{

  document.getElementById("loader").style.display='flex';

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


function matrixMultiplication(array1, array2){
  var result=0;
  for(let i=0; i<array1.length; ++i){
    result+=array1[i]*array2[i];
  }

  return;
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
  delete result;
  return;
}

const permutationGeneration = (arr = []) => {
  let res = []
  const helper = (arr2) => {
     if (arr2.length==arr.length)
     return res.push(arr2)
     for(let e of arr)
     if (!arr2.includes(e))
     helper([...arr2, e])
  };
  helper([])

  delete result;
  return;
};


  var timeLimit=document.getElementById("time").value;
  var timeReq=0;
  var size=1;
  var sizeArray=new Array();
  var timeArray=new Array();
  var algorithm=document.getElementById("algo").value;

  outerloop:
  while(timeReq < timeLimit)
  {
    
    var randArray=Array.from({length : size}, () => Math.floor(Math.random() * 100000));

    switch (algorithm)
    {
      case "binarySearch":
        randArray.sort(function(a, b){return a - b});
        timeReq = new Date().getTime();
        binarySearch(randArray, randArray[size-1]);
        timeReq = (new Date().getTime()) - timeReq;
        break;

      case "sequentialSearch":
        timeReq = new Date().getTime();
        sequentialSearch(randArray, randArray[size-1]);
        timeReq = ((new Date().getTime()) - timeReq);
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
        timeReq = new Date().getTime();
        matrixMultiplication(randArray, randArray);
        timeReq = (new Date().getTime()) - timeReq;
        break;

      case "subsetGeneration":
        if(size==26){
          break outerloop;
        }
        timeReq = new Date().getTime();
        subsetGeneration(randArray);
        timeReq = ((new Date().getTime()) - timeReq)/1000;
        break;

      case "permutationGeneration":
        if(size==11){
          break outerloop;
        }
        timeReq = new Date().getTime();
        permutationGeneration(randArray);
        timeReq = ((new Date().getTime()) - timeReq)/1000;
        break;

      default:
        alert("Some error has occured");
    }

    if(timeReq<timeLimit)
    {
      sizeArray.push(size);
      timeArray.push(timeReq);
    }
    
    if(algorithm=="subsetGeneration" || algorithm=="permutationGeneration"){
      size=size+1;
    }
    else{
      size=size*2;
    }
  }

var xValues = timeArray;

new Chart("myChart", 
{
  type: "line",
  data: 
  {
    labels: xValues,
    datasets: [{
      label: "Size",
      data: sizeArray,
      borderColor: "green",
      fill: false
    }]
  },
  options: 
  {
    legend: {display: false},
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
            display: true,
            labelString: document.getElementById("label_text").innerHTML
        },
    }],
     yAxes: [{
        display: true,
        scaleLabel: {
           display: true,
           labelString: "Size (no. of elements)"
       }
    }]
  }
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
