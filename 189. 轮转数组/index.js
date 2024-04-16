/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
    let res = [],
      count = 0,
      i = nums.length - (k % nums.length)
    while (count < nums.length) {
      res.push(nums[i]);
      i++;
      count++;
      if (i === nums.length ) {
        i =0;
      }
    }
    return res;
  };

let res = rotate([1,2,3,4,5,6,7], 3);
debugger;
