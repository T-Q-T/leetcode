// 判断字符集 s 是否包含 t
function isIncludeWord(s, t) {
  let isValid = true;
  for (let i = 0; i < t.length; i++) {
    // t 的 0 项不需要对比
    if (t[i] === 0) continue;
    if (s[i] < t[i]) {
      isValid = false;
      break;
    }
  }
  return isValid;
}

var minWindow = function (s, t) {
  if (t.length > s.length) return "";
  // 生成 t , s 的字符贮存集
  let tWordMap = new Array(58).fill(0),
    sWordMap = new Array(58).fill(0);
  // t 的字母数统计表
  for (let item of t) {
    tWordMap[item.charCodeAt() - "A".charCodeAt()]++;
  }

  //   s 的字母数统计表
  for (let item of s) {
    sWordMap[item.charCodeAt() - "A".charCodeAt()]++;
  }

  //   如果 s 全量都不包含 t ，则返回 ""
  if (!isIncludeWord(sWordMap, tWordMap)) return "";
  sWordMap = new Array(58).fill(0);
  let childStrings = [],
    // 记录上个涵盖最小尺寸索引，减少循环
    nextRight = 0,
    tmpSWordMap,isSlice=false;
  for (let i = 0; i < s.length; i++) {
    if(isSlice){
      sWordMap=[...tmpSWordMap]
      isSlice=false
    }
    sWordMap[s[i].charCodeAt() - "A".charCodeAt()]++;
    // 当滑动弹窗右侧滑到覆盖 t 字符串时,逐渐收缩滑窗左边界
    if (isIncludeWord(sWordMap, tWordMap)) {
      let left = undefined,
        count = 0;
      tmpSWordMap = [...sWordMap];
      isSlice=true
      // 寻找左边界
      while (left === undefined && count <= i) {
        // 左侧弹窗滑出时，字符串计数集减少对应字符数量
        sWordMap[s[count].charCodeAt() - "A".charCodeAt()]--;
        // 若当前索引字符串集减少后不含盖 t 的所有子串，说明当前索引即为涵盖子串的最小长度
        if (!isIncludeWord(sWordMap, tWordMap)) {
          left = count;
          break;
        }
        count++;
      }
      childStrings.push(s.slice(left, i + 1));
    }
  }

  return childStrings.sort((pre, cur) => pre.length - cur.length)[0];
};
let res = minWindow("gehzduwqkzuyotckqcusdiqubeqglkvuocttzrllqfjhzorpqnjwxbqyfiesscmigicfzna", "qsvczwsslkhwg");
debugger;
