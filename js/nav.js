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
  var timeLimit=document.getElementById("time").value;
  var timeReq=0;
  var size=1;
  var sizeArray=new Array();
  var timeArray=new Array();
  var algorithm=document.getElementById("algo").value;

  var randArray=Array.from({length : size}, () => Math.floor(Math.random() * 100000));

  outerloop:
  while(timeReq < timeLimit)
  {

    switch (algorithm)
    {
      case "binarySearch":
        randArray.sort(function(a, b){return a - b});
        timeReq = performance.now();
        binarySearch(randArray, randArray[size-1]);
        timeReq = Math.round((performance.now() - timeReq)*1000);
        break;

      case "sequentialSearch":
        randArray=Array.from({length : size}, () => Math.floor(Math.random() * 100000));
        timeReq = performance.now();
        sequentialSearch(randArray, randArray[size-1]);
        timeReq = Math.round((performance.now() - timeReq)*1000);
        break;

      case "quickSort":
        randArray=Array.from({length : size}, () => Math.floor(Math.random() * 100000));
        timeReq = performance.now();
        quickSort(randArray, 0, randArray.length -1);
        timeReq = Math.round((performance.now() - timeReq)*10)/10;
        break;

      case "matrixAddition":
        timeReq = performance.now();
        matrixAddition(randArray,size);
        timeReq = Math.round((performance.now() - timeReq)*10)/10;
        break;

      case "matrixMultiplication":
        timeReq = performance.now();
        matrixMultiplication(randArray,size);
        timeReq = Math.round((performance.now() - timeReq)*10)/10;
        break;

      case "subsetGeneration":
        randArray=Array.from({length : size}, () => Math.floor(Math.random() * 1000));
        timeReq = performance.now();
        subsetGeneration_iterative(randArray);
        timeReq = Math.round((performance.now() - timeReq)*10)/10000;
        break;

      case "permutationGeneration":
        randArray=Array.from({length : size}, () => Math.floor(Math.random() * 1000));
        timeReq = performance.now();
        permutationGeneration(randArray);
        timeReq = Math.round((performance.now() - timeReq)*10)/10000;
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
      fill: false,
      showLine: true
    }]
  },
  options: 
  {
    legend: {display: false},
    title: {
      display: true,
      text: document.getElementById("algo").value
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
            display: true,
            labelString: document.getElementById("label_text").innerHTML
        }
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
