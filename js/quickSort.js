function swap(items, leftIndex, rightIndex)
{
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}


//middle pivot------------------------------------------------------------------------------------------

function partition_middle(items, left, right) 
{
  var pivot   = items[Math.floor((right + left) / 2)], //middle element
      i       = left //left pointer
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

function quickSort_middle(items, left, right) {
    var index;
    if (items.length > 1) {
        index = partition_middle(items, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSort_middle(items, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSort_middle(items, index, right);
        }
    }
    return ;
}


//left pivot--------------------------------------------------------------------------------------------

function partition_left(items, left, right) 
{
  var pivot   = items[left], //middle element
      i       = left //left pointer
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


function quickSort_left(items, left, right) {
  var index;
  if (items.length > 1) {
      index = partition_left(items, left, right); //index returned from partition
      if (left < index - 1) { //more elements on the left side of the pivot
          quickSort_left(items, left, index - 1);
      }
      if (index < right) { //more elements on the right side of the pivot
          quickSort_left(items, index, right);
      }
  }
  return ;
}




//median_pivot-----------------------------------------------------------------------------------------

function medianIndex(items,left,right)
{
	var middle=Math.floor((right + left) / 2);
    
    
    if(items[left]>items[middle])
    {
    
    	if(items[left]<items[right])
        	return left;
            
        else if(items[middle]>items[right])
        	return middle;
            
        else
        	return right;
        	
    }
    
    else{
    
    	if(items[left]>items[right])
        	return left;
            
        else if(items[middle]<items[right])
        	return middle;
            
        else
        	return right;
    }
    
}


function partition_median(items, left, right) 
{
  var median=medianIndex(items,left,right);
  var pivot   = items[median], //median element
      i       = left //left pointer
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



function quickSort_median(items, left, right) {
    var index;
    if (items.length > 1) {
        index = partition_median(items, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSort_middle(items, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSort_middle(items, index, right);
        }
    }
    return ;
}