/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  let res = [],
    count = 0,
    i = nums.length - (k % nums.length);
  while (count < nums.length&&i<nums.length-1) {
    res.push(nums[i]);
    i++;
    count++;
    if (i === nums.length) {
      i = 0;
    }
  }
  res.forEach((item, index) => {
    nums[index] = item;
  });
};

let res = rotate([1], 1);
debugger;
