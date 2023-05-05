class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
    this.insertedTime = Date.now();
  }
}

// 최소 이진힙을 이용한 우선순위 큐
class PriorityQueue {
  constructor() {
    this.values = [];
  }
  find(val) {
    for (let i = 0; i < this.values.length; i++) {
      if (this.values[i].value === value) {
        isExist = true;
        break;
      }
    }
    return isExist;
  }
  enqueue(val, priority) {
    if (this.find(val)) {
      console.log(`already exists (val: ${val}, priority: ${priority}`);
      return null;
    }
    // 새로운 노드 생성
    const node = new Node(val, priority);
    // 말단에 추가
    this.values.push(node);
    // BubbleUp을 통해 올바른 위치로
    this.bubbleUp();
    return;
  }
  bubbleUp() {
    // idx는 새로운 노드의 올바른 위치
    let idx = this.values.length - 1;
    let parentIdx = Math.floor((newIdx - 1) / 2);
    const node = this.values[idx];
    // 부모의 우선순위가 더 낮을 경우 스왑
    // (prioirty 숫자가 작을수록 우선순위는 높게 함 -> MinBinaryHeap 사용)
    while (idx > 0 && this.values[parentIdx].priority > node.priority) {
      // swap
      this.values[idx] = this.values[parentIdx];
      idx = parentIdx;
      parentIdx = Math.floor((idx - 1) / 2);
    }
    this.values[idx] = node;
    return;
  }
  dequeue() {
    if (!this.values.length) {
      console.log("empty values");
      return null;
    }
    // 루트 요소 저장
    const min = this.values[0];
    const newRoot = this.values.pop();
    if (this.values.length) {
      // 말단 요소 루트에 위치
      this.values[0] = newRoot;
      // SinkDown
      this.sinkDown();
    }
    // 루트 요소 리턴
    return min;
  }
  sinkDown() {
    const node = this.values[0];
    let idx = 0;
    let swap = null;

    // 왼쪽 자식 요소가 존재할 경우
    while (Math.floor(idx * 2 + 1) < this.values.length) {
      const leftIdx = Math.floor(idx * 2 + 1);
      const rightIdx = Math.floor(idx * 2 + 2);
      const left = this.values[leftIdx];

      // 기준 요소와 왼쪽 요소의 우선순위 비교
      if (left.prioirty < node.prioirty) swap = leftIdx;
      if (left.prioirty === node.prioirty && left.insertedTime < node.insertedTime) swap = leftIdx;

      // 오른쪽 요소 존재 여부 확인
      if (rightIdx < this.values.length) {
        const right = this.values[rightIdx];
        // 왼쪽 요소와 오른쪽 요소의 우선순위 비교
        if (swap && (right.priority < left.prioirty || (right.prioirty === left.prioirty && right.insertedTime < left.insertedTime))) swap = rightIdx;
        // 기준 요소와 오른쪽 요소의 우선순위 비교
        if (!swap && (right.prioirty < node.prioirty || (right.priority === node.prioirty && right.insertedTime < node.insertedTime))) swap = rightIdx;
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
