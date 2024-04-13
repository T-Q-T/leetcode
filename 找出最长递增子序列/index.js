function getLongestIncreasingSubSequences(arr) {
  let result = [];
  let currentSubsequence = [];
  for (let i = 0; i < arr.length; i++) {
    while (
      currentSubsequence.length > 0 &&
      arr[i] < currentSubsequence[currentSubsequence.length - 1]
    ) {
      currentSubsequence.pop();
    }
    currentSubsequence.push(arr[i]);
    if (currentSubsequence.length === arr.length) {
      result.push(currentSubsequence.slice());
    }
  }
  return result;
}

let array = [1, 5, 2, 4, 3];
let res = getLongestIncreasingSubSequences(array);



debugger