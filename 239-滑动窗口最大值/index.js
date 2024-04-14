/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  if (k.length > nums.length) return [];
  const ans = [];
  let max = Math.max(...nums.slice(0, k));
  ans.push(max);
  for (let i = k; i < nums.length; i++) {
    // 滑窗最左端不是最大值时,即可直接使用之前的最大值
    if (nums[i] <= max && nums[i - k] !== max) {
      ans.push(max);
      continue;
    }
    // 滑窗左端是最大值时,说明当前弹窗内最大值将被移出,则重新计算弹窗内剩余的最大值
    if (nums[i - k] === max) {
      max = Math.max(...nums.slice(i - k + 1, i + 1));
      ans.push(max);
      continue;
    }
    ans.push(nums[i]);
    max = nums[i];
  }
  return ans;
};
let res = maxSlidingWindow([7, 2, 4], 2);


let maxSlidingWindows = function(nums, k) {
  const n = nums.length;
  const q = [];
  // # 1
  for (let i = 0; i < k; i++) {
      while (q.length && nums[i] >= nums[q[q.length - 1]]) {
          q.pop();
      }
      q.push(i);
  }

  const ans = [nums[q[0]]];
  // #2
  for (let i = k; i < n; i++) {
      while (q.length && nums[i] >= nums[q[q.length - 1]]) {
          q.pop();
      }
      q.push(i);
      // #3
      while (q[0] <= i - k) {
          q.shift();
      }
      ans.push(nums[q[0]]);
  }
  return ans;
};
let res2= maxSlidingWindows([7,6,5,10,3],4)

// 解法 单调队列
// 队列头始终队列内最大的一项,队列整体单调递减，如 [10,8,5,2]

// # 1
// 第一次遍历获得初始队列 ，遍历循环中，每出现突然递增，增删除元素直至递减位置 ，如 [10,9,8,7,9] -> [10,9]  ,因为滑窗是从
// 左到右滑动，左边小于 9 的内容即使先被滑出去，滑窗内最大值仍是 9, 决定因素始终为队列顶，及突然的递增节点

// #2 
// 第二次遍历即为开始滑动滑窗,同理保持弹窗队列单调递减特性

// #3
// 队列最左侧（即滑窗最大值）被滑出当前滑窗时,则从队列前端推出队列，[10,9,8] -> [9,8]
// 保持当前滑窗最大值仍是队列顶 q[0] （即为之前的 q[1]）

debugger;