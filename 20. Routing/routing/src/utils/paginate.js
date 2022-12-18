import _ from "lodash";

// lodash object to chain all the lodash objects
// 1. items 가져온다
// 2. startIndex 뒤로 자른다
// 3. startIndex 뒤로 잘라온 것 중 pageSize 만큼만 가져온다
// 4. 값을 리턴한다.

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;

  return _(items).slice(startIndex).take(pageSize).value();
}
