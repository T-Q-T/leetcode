/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */

var merge = function (intervals) {
  // 将所有区间以左节点大小排序
  intervals = intervals.sort((pre, cur) => pre[0] - cur[0]);
  for (let i = 0; i < intervals.length-1; i++) {
    if (isInterval(intervals[i], intervals[i + 1])) {
      intervals[i] = mergeInterval(intervals[i], intervals[i + 1]);
      intervals.splice(i + 1, 1);
      i--
    }
  }
  return intervals;
};
/**
 * @description 判断两个数组是否相交
 * @param {*} a
 * @param {*} b
 */
function isInterval(a, b) {
  return a[1] >= b[0];
}

function mergeInterval(a, b) {
  return [a[0], Math.max(a[1],b[1])];
}

let res = merge([[1,4],[0,2],[3,5]]);
debugger;
