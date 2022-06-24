document.getElementById("downloadButton").style.display="none";
document.getElementById("myChart").style.display="none";



var label=new Array();
label[0]="Time (in microseconds)";
label[1]="Time (in milliseconds)";
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
  var algorithm=document.getElementById("algo").value;


  if(algorithm!="quickSort")
  {
    var timeReq=0;
    var size=1;
    var sizeArray=new Array();
    var timeArray=new Array();

    var randArray=Array.from({length : size}, () => Math.floor(Math.random() * 100000));

    outerloop:
    while(timeReq < timeLimit)
    {

      switch (algorithm)
      {
        case "binarySearch":
          randArray=Array.from({length : size}, () => Math.floor(Math.random() * 100000));
          randArray.sort(function(a, b){return a - b});
          timeReq = performance.now();
          binarySearch(randArray, randArray[size-1]);
          timeReq = Math.round((performance.now() - timeReq)*1000);
          break;

        case "sequentialSearch":
          timeReq = performance.now();
          sequentialSearch(randArray, size);
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
          if(size>28){
            break outerloop;
          }
          randArray=Array.from({length : size}, () => Math.floor(Math.random() * 1000));
          timeReq = performance.now();
          subsetGeneration_iterative(randArray);
          timeReq = Math.round((performance.now() - timeReq)*10)/10000;
          break;

        case "permutationGeneration":
          if(size>12){
            break outerloop;
          }
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

    document.getElementById("myChart").style.display="inline";
    document.getElementById("myChart_quick").style.display="none";

    document.getElementById("downloadButton").style.display="inline";

    document.getElementById("download").addEventListener('click', function(){
      /*Get image of canvas element*/
      var url_base64jp = document.getElementById("myChart").toDataURL("image/jpg");
      /*get download button (tag: <a></a>) */
      var a =  document.getElementById("download");
      /*insert chart image url to download button (tag: <a></a>) */
      a.href = url_base64jp;
    });
    
  }

  //For Quicksort``````````````````````````````````````````````````````````````````````````````````````````````````````````

  else
  {
    var timeReq=0;

    var size=1;

    var sizeArray_left=new Array();
    var sizeArray_middle=new Array();
    var sizeArray_median=new Array();

    var timeArray_left=new Array();
    var timeArray_middle=new Array();
    var timeArray_median=new Array();

    //left_pivot

    while(timeReq<timeLimit)
    {
      var randArray=Array.from({length : size}, () => Math.floor(Math.random() * 100000));
      timeReq = performance.now();
      quickSort_left(randArray,0,randArray.length -1);
      timeReq = Math.round((performance.now() - timeReq)*10)/10;

      if(timeReq<timeLimit)
      {
        sizeArray_left.push(size);
        timeArray_left.push(timeReq);
      }
      
      size=size*2;
    }

    //middle_pivot

    timeReq=0;
    size=1;

    while(timeReq<timeLimit)
    {
      var randArray=Array.from({length : size}, () => Math.floor(Math.random() * 100000));
      timeReq = performance.now();
      quickSort_middle(randArray,0,randArray.length -1);
      timeReq = Math.round((performance.now() - timeReq)*10)/10;

      if(timeReq<timeLimit)
      {
        sizeArray_middle.push(size);
        timeArray_middle.push(timeReq);
      }
      
      size=size*2;
    }

    //median_pivot

    timeReq=0;
    size=1;

    while(timeReq<timeLimit)
    {
      var randArray=Array.from({length : size}, () => Math.floor(Math.random() * 100000));
      timeReq = performance.now();
      quickSort_median(randArray,0,randArray.length -1);
      timeReq = Math.round((performance.now() - timeReq)*10)/10;

      if(timeReq<timeLimit)
      {
        sizeArray_median.push(size);
        timeArray_median.push(timeReq);
      }
      
      size=size*2;
    }

    //chart
    
    var xValues = timeArray_median;
    new Chart("myChart_quick", 
    {
      type: "line",
      data: 
      {
        labels: xValues,
        datasets: [{
          label: "Size",
          data: sizeArray_median,
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

    document.getElementById("myChart_quick").style.display="inline";
    document.getElementById("myChart").style.display="none";

    document.getElementById("downloadButton").style.display="inline";

    document.getElementById("download").addEventListener('click', function(){
      /*Get image of canvas element*/
      var url_base64jp = document.getElementById("myChart_quick").toDataURL("image/jpg");
      /*get download button (tag: <a></a>) */
      var a =  document.getElementById("download");
      /*insert chart image url to download button (tag: <a></a>) */
      a.href = url_base64jp;
    });

  }

}
