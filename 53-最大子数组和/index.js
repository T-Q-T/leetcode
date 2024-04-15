/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  if (nums.length === 1) return nums[0];
  if (nums.every((item) => item < 0)) {
    return Math.max(...nums);
  }
  let recursionCacFun = function (num) {
    const firstPositiveNum = num.findIndex((item) => item >= 0);
    let max = num[firstPositiveNum],
      result = [num[firstPositiveNum]],
      current = num[firstPositiveNum];
    for (let i = firstPositiveNum + 1; i < num.length; i++) {
      current = current + num[i];
      if (current > max) {
        max = current;
        result[0] = max;
      }
      if (num[i] < 0) {
        result.push(...recursionCacFun(num.slice(i + 1)));
      }
    }
    return result;
  };

  let allResult = recursionCacFun(nums);
  return allResult.sort((pre, cur) => cur - pre)[0];
};

let res = maxSubArray([0]);
debugger;
