// function forEach(array: any, iteratee: (value: any, key: number) => void) {
//   let index = -1;
//   const length = array.length;
//   while (++index < length) {
//     iteratee(array[index], index);
//   }
//   return array;
// }

// export function deepClone(target: any, map = new WeakMap()) {
//   if (typeof target === "object") {
//     const isArray = Array.isArray(target);

//     let cloneTarget: any = isArray ? [] : {};

//     if (map.get(target)) {
//       return map.get(target);
//     }
//     map.set(target, cloneTarget);

//     const keys = isArray ? undefined : Object.keys(target);
//     if (keys) {
//       forEach(keys || target, (value, key) => {
//         if (keys) key = value;
//         cloneTarget[key] = deepClone(target[key], map);
//       });
//     }

//     return cloneTarget;
//   }

//   return target;
// }

// 判断JSON是否为空
export function jsonIsEmpty(json: Record<string, any>) {
  return JSON.stringify(json) === "{}" || Object.keys(json).length === 0;
}

// 获取JSON序列化字符串
export function jsonSerialize(json: Record<string, string | number | null>): string {
  if (jsonIsEmpty(json)) return "";

  const searchParams = new URLSearchParams();
  for (let key in json) {
    searchParams.append(key, json[key] ? (json[key] as string) : "");
  }
  return searchParams.toString();
}

// 深度合并
// export function deepMerge(...json: Record<string, any>[]) {}

export function getMonth(){
  const months:any = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  };
  return months[new Date().getMonth()+1]
  
}

export function GetPercent(num:any, total:any) {
  num = parseFloat(num);
  total = parseFloat(total);
  if (isNaN(num) || isNaN(total)) {
    return "-";
  }
  return total <= 0 ? 0 : (Math.round(num / total * 10000) / 100.00);
}