/**
 * @param {number[]} nums
 * @return {number}
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
// 解法一
var longestConsecutive = function (nums) {
  if (!nums.length) return 0;
  nums = [...new Set(nums.sort((pre, cur) => cur - pre))];
  const dp = new Array(nums.length).fill(1);
  for (let i = 0; i <= nums.length; i++) {
    let outer = nums[i],
      next = i + 1;
    if (outer - nums[next] > 1) {
      continue;
    }
    while (outer - nums[next] === 1 && next <= nums.length - 1) {
      outer = nums[next];
      next++;
      dp[i]++;
    }
    i = next - 1;
  }
  return Math.max(...dp);
};

let res = longestConsecutive([
  -7, -1, 3, -9, -4, 7, -3, 2, 4, 9, 4, -9, 8, -7, 5, -1, -7,
]);


// 解法二
let sort = (nums) => {
  if (!nums.length) return 0;
  nums = [...new Set(nums.sort((pre, cur) => cur - pre))];
   const dp={}
  let current = 0,
    next = 1,
    // 连续递增的组号
    serialGroup = 0;
    dp[serialGroup]=1
  while (next <= nums.length - 1) {
    if (nums[current] - nums[next] > 1 || nums[current] - nums[next] === 0) {
      current++;
      next++;
      serialGroup++
      dp[serialGroup]=1
      continue;
    }
    dp[serialGroup]++
    current++
    next++;
  }
  return Math.max(...Object.values(dp))
};

let result = sort([-7, -1, 3, -9, -4, 7, -3, 2, 4, 9, 4, -9, 8, -7, 5, -1, -7]);
debugger;
