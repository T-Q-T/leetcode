/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  const strArr = s.split("");
  let maxLength = 0;
  strArr.forEach((item, index) => {
    let right = index + 1,
      wordSet = new Set([item]);
    while (right <= strArr.length - 1 && !wordSet.has(strArr[right])) {
      wordSet.add(strArr[right]);
      right++;
    }
    maxLength = Math.max(maxLength, wordSet.size);
  });
  return maxLength;
};

let res = lengthOfLongestSubstring("au");
debugger;
