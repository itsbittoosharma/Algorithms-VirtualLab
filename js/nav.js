document.getElementById("downloadButton").style.display="none";
document.getElementById("myChart").style.display="none";



var label=new Array();
label[0]="Time (in nanoseconds)";
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
    var arrSize=1000000;
    var size=arrSize;
    timeLimit=timeLimit*0.001;
    var sizeArray=new Array();
    var timeArray=new Array();
    var sizeofArr=0;
    if (algorithm == 'binarySearch') 
    {
      var randArray = Array.from({ length: arrSize }, () => Math.floor(Math.random() * arrSize));
      randArray.sort(function (a, b) { return a - b });
      
      var loop = 1; //100000 size
      while (timeReq < timeLimit) 
      {
        var startTime = window.performance.now();
        for (var i = 1; i <= loop; i++) {
          for(var j=0;j<10000;j++)
          binarySearch(randArray, randArray[99]);
          
        }
        var endtime = window.performance.now();
        timeReq = (endtime - startTime)/10000;
        sizeofArr = (loop * arrSize);
        loop +=10;
        console.log(timeReq);
        if (timeReq < timeLimit) {
          sizeArray.push(sizeofArr);
          // timeArray.push((timeReq*0.001));
          timeArray.push(Math.round((timeReq/0.001)*100)/100);
        }
  
      }
    }
    else
    {
    var randArray=Array.from({length : size}, () => Math.floor(Math.random() * 100000));

    outerloop:
    while(timeReq < timeLimit)
    {

      switch (algorithm)
      {
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
          if(size==1){
            alert("This is going to take time and website may not respond for some time. Have patience, result would be generated.")
          }
          if(size>28){
            break outerloop;
          }
          randArray=Array.from({length : size}, () => Math.floor(Math.random() * 1000));
          timeReq = performance.now();
          subsetGeneration_iterative(randArray);
          timeReq = Math.round((performance.now() - timeReq)*10)/10000;
          break;

        case "permutationGeneration":
          if(size==1){
            alert("This is going to take time and website may not respond for some time. Have patience, result would be generated.")
          }
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
  }



    //Calculating size for exact time Limit (Hahahahahahahaaa)

    if(algorithm=="sequentialSearch")
    {
      size=Math.round(sizeArray[sizeArray.length-1]*timeLimit/timeArray[timeArray.length-1]);
      sizeArray.push(size);
      timeArray.push(timeLimit);
    }

    else if(algorithm=="matrixAddition")
    {
      size=Math.round(Math.sqrt(timeLimit/timeArray[timeArray.length-1])*sizeArray[sizeArray.length-1]);
      sizeArray.push(size);
      timeArray.push(timeLimit);
    }

    else if(algorithm=="matrixMultiplication")
    {
      size=Math.round(Math.cbrt(timeLimit/timeArray[timeArray.length-1])*sizeArray[sizeArray.length-1]);
      sizeArray.push(size);
      timeArray.push(timeLimit);
    }

    else if(algorithm=="subsetGeneration")
    {
      timeArray[timeArray.length-1]=timeLimit;
    }

    else if(algorithm=="permutationGeneration")
    {
      timeArray[timeArray.length-1]=timeLimit;
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
