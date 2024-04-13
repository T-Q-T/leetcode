function groupAnagrams(strings) {
  const map = new Map();
  for (let item of strings) {
    const count = new Array(26).fill(0);
    for (let word of item) {
      count[word.charCodeAt() - "a".charCodeAt()]++;
    }
    const countStr = count.join(",");
    if (!map.has(countStr)) {
      map.set(countStr, [item]);
      continue
    }
    map.get(countStr).push(item);
  }
  return [...map.values()];
}

let res = groupAnagrams(["bdddddddddd","bbbbbbbbbbc"]);
debugger;
