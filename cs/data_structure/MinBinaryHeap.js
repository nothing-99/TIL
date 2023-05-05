class MinBinaryHeap {
  constructor() {
    this.values = [];
  }
  insert(newData) {
    // 말단에 위치시킨다
    let newDataIdx = this.values.length;
    let comparedIdx = Math.floor((newDataIdx - 1) / 2);
    // 부모요소와 비교
    // 부모요소가 더 클 경우 스왑
    while (newDataIdx > 0 && this.values[comparedIdx] > newData) {
      this.values[newDataIdx] = this.values[comparedIdx];
      [newDataIdx, comparedIdx] = [comparedIdx, Math.floor((comparedIdx - 1) / 2)];
    }
    this.values[newDataIdx] = newData;
  }
  extractMin() {
    // 가장 작은 값이 보장된 루트 요소
    const extracted = this.values.length ? this.values[0] : null;
    if (this.values.length === 1) this.values.pop();
    if (this.values.length > 1) {
      // 말단 요소 루트로 올리기
      this.values[0] = this.values.pop();
      // 말단 요소 올바른 곳에 위치시키기
      this.sinkDown();
    }
    return extracted;
  }
  sinkDown() {
    const cur = this.values[0];
    let idx = 0;
    let swap = null;

    // 왼쪽 자식 요소가 존재할 경우
    while (Math.floor(idx * 2 + 1) < this.values.length) {
      const leftIdx = Math.floor(idx * 2 + 1);
      const rightIdx = Math.floor(idx * 2 + 2);
      const left = this.values[leftIdx];

      // 기준 요소와 왼쪽 요소의 비교
      if (left < cur) swap = leftIdx;
      // 오른쪽 요소 존재 여부 확인
      if (rightIdx < this.values.length) {
        const right = this.values[rightIdx];
        // 왼쪽 요소와 오른쪽 요소의 비교
        if (swap && right < left) swap = rightIdx;
        // 기준 요소와 오른쪽 요소의 비교
        if (!swap && right < cur) swap = rightIdx;
      }
      // 현재 위치가 올바른 위치
      if (!swap) break;
      // 스왑
      this.values[idx] = this.values[swap];
      [idx, swap] = [swap, null];
    }
    this.values[idx] = node;
  }
}
