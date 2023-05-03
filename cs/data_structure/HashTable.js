// 해시테이블 클래스
class HashTable {
  // size: 해시테이블 크기
  constructor(size = 4) {
    this.keyMap = new Array(size);
  }
  _hash(key) {
    const PRIME = 31;
    let total = 0;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      const converted = key[i].charCodeAt() - 96;
      total = (total + converted + PRIME) % this.keyMap.length;
    }
    return total;
  }
  // set
  // separate chaining
  set(key, value) {
    const index = this._hash(key);
    let isExist = false;
    // 동일 key 부재
    if (!this.keyMap[index]) {
      this.keyMap[index] = [];
    } else {
      for (let i = 0; i < this.keyMap[index].length; i++) {
        // 동일 key 존재
        if (this.keyMap[index][i][0] === key) {
          // value 업데이트
          this.keyMap[index][i][1] = value;
          isExist = true;
        }
      }
    }
    if (!isExist) {
      // 데이터 형태 : [key, value]
      this.keyMap[index].push([key, value]);
    }
    return 1;
  }
  // get
  get(key) {
    // 데이터 형태 : [key, value]
    const index = this._hash(key);
    if (this.keyMap[index]) {
      for (let i = 0; i < this.keyMap[index].length; i++) {
        const data = this.keyMap[index][i];
        if (data[0] === key) {
          return data[1];
        }
      }
    }
    return undefined;
  }
  // keys
  keys() {
    const keyList = [];
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j = 0; j < this.keyMap[i].length; j++) {
          const key = this.keyMap[i][j][0];
          keyList.push(key);
        }
      }
    }
    return keyList;
  }
  // values
  values() {
    const valueList = [];
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j = 0; j < this.keyMap[i].length; j++) {
          const val = this.keyMap[i][j][1];
          // 중복제거
          if (!valueList.includes(val)) {
            valueList.push(val);
          }
        }
      }
    }
    return valueList;
  }
}
