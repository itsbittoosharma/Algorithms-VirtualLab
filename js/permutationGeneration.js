function permutationGeneration(nums)
{
    var backtrack = (i, nums) => {
      if(i===nums.length){
        (nums.slice());
        return;
      }  
      for(let j = i; j < nums.length; j++){
        [nums[i],nums[j]] = [nums[j],nums[i]];
        backtrack(i+1, nums);
        [nums[i],nums[j]] = [nums[j],nums[i]];
      }
    }
    backtrack(0, nums);
    return;
};