/**
 * @description 根据输入行数生成所有座位贮存
 * @param {*} n
 * @returns
 */
function generatePositionMap(n, reservedSeats) {
  //  贮存所有位置坐标
  const positionMap = new Map();
  new Array(10 * n).fill(null).forEach((item, index) => {
    const count = index + 1;
    const x = Math.ceil(count / 10);
    const y = count % 10 === 0 ? 10 : count % 10;
    //每个座位的行/列组成 key ,选择字符串是因为 map 集合类型使用原始类型方便查询
    const positionKey = `${x}-${y}`;
    positionMap.set(positionKey, {
      position: count,
      status: "emptySeats",
    });
  });
  return setReservedSeats(positionMap, reservedSeats);
}

/**
 * @description 设置已预定座位状态
 */
function setReservedSeats(positionMap, reservedSeats) {
  reservedSeats.forEach((item) => {
    const [x, y] = item,
      positionKey = `${x}-${y}`;
    if (positionMap.has(positionKey)) {
      positionMap.get(positionKey).status = "reserved";
    }
  });
  return positionMap;
}

/**
 * @description 计算 4 人连排座的最大数
 * @param {*} positionMap
 * @returns
 */
function calcContinuitySeat(positionMap) {
  let count = 0;
  const rowMapArr = [];
  for (let i = 0; i < positionMap.size / 10; i++) {
    // 获取每一行的元素,以行为基准推入总集合
    let row = [...positionMap].slice(i * 10, (i + 1) * 10);
    rowMapArr.push(row);
  }
  rowMapArr.forEach((row) => {
    // 仅当除去首尾后其他位置均为未预定的情况下,该行才能容纳两组家庭
    const isContainTwoGroup = row
      .slice(1, 9)
      .every((pos) => pos[1].status === "emptySeats");
    if (isContainTwoGroup) {
      count = count + 2;
      return;
    }
    // 下列三种列号状态为未预定的组合下，无需考虑其他位置，满足其中之一即可连续入座一组家庭
    validOneGroupMap = [
      [2, 3, 4, 5],
      [4, 5, 6, 7],
      [6, 7, 8, 9],
    ];
    // 仅下列情况满足能容纳一组家庭,即列号为 2~5 或 4~7 或 6~9 为未预定状态时
    const isCanContainOneGroup =
      row.slice(1, 5).every((pos) => pos[1].status === "emptySeats") ||
      row.slice(3, 7).every((pos) => pos[1].status === "emptySeats") ||
      row.slice(5, 9).every((pos) => pos[1].status === "emptySeats");
    // 未预定位置无法容纳一组家庭时提前退出
    if (!isCanContainOneGroup) return;
    count++;
  });
  return count;
}

// 详细版
/**
 * @param {number} n
 * @param {number[][]} reservedSeats
 * @return {number}
 */
let maxNumberOfFamilies = function (n, reservedSeats) {
  const positionMap = generatePositionMap(n, reservedSeats);
  return calcContinuitySeat(positionMap);
};

let result = maxNumberOfFamilies(3, [
  [1, 2],
  [1, 3],
  [1, 8],
  [2, 6],
  [3, 1],
  [3, 10],
]);

// 简介版  ---------------------------------------------------------------------------------
let calc = function (n, reservedSeats) {
  // 0 代表未预定位置 1 代表已预定位置
  const init = "00000000";
  // 生成座位表
  let pos = new Array(n).fill(init);
  // 生成已预定座位表
  reservedSeats.forEach((item) => {
    const [x, y] = item,
      row = x - 1,
      column = y - 2;
    // 设置已预定座位
    if (y !== 1 && y !== 10) {
      pos[row] = pos[row].slice(0, column) + "1" + pos[row].slice(column + 1);
    }
  });
  let count = 0;
  pos.forEach((row) => {
    const isTwoGroup = row === init;
    if (isTwoGroup) {
      count = count + 2;
      return;
    }
    const isOneGroup =
      row.slice(0, 4) === "0000" ||
      row.slice(2, 6) === "0000" ||
      row.slice(4, 8) === "0000";
    if (isOneGroup) count++;
  });
  return count;
};

let r = calc(3, [
  [1, 2],
  [1, 3],
  [1, 8],
  [2, 6],
  [3, 1],
  [3, 10],
]);

// 极速效率版 ---------------------------------------------------------------------------------

function isNotCrossArr(a, b) {
  return a.every((i) => !b.includes(i));
}
let simpleCac = function (n, reservedSeats) {
  let count = 0;
  let reservedMap = new Map();
  // 生成已预定座位的集合,key 为行，value 为列
  reservedSeats.forEach((item) => {
    const [x, y] = item;
    if (!reservedMap.get(x)) {
      reservedMap.set(x, [y]);
    } else {
      reservedMap.get(x).push(y);
    }
  });
  // 没被预定的行均可坐两组人
  count = (n - reservedMap.size) * 2;
  // 计算预定的行的能坐的组数
  for (let item of reservedMap.entries()) {
    const [x, y] = item;
    if (isNotCrossArr(y, [2, 3, 4, 5]) && isNotCrossArr(y, [6, 7, 8, 9])) {
      count += 2;
    } else if (
      isNotCrossArr(y, [2, 3, 4, 5]) ||
      isNotCrossArr(y, [6, 7, 8, 9]) ||
      isNotCrossArr(y, [4, 5, 6, 7])
    ) {
      count++;
    }
  }
  return count;
};
let res = simpleCac(3, [
  [1, 2],
  [1, 3],
  [1, 8],
  [2, 6],
  [3, 1],
  [3, 10],
]);


