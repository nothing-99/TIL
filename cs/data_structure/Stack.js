class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
  push(val) {
    const node = new Node(val);
    if (this.size === 0) {
      this.first = node;
      this.last = node;
    } else {
      node.next = this.first;
      this.first = node;
    }
    this.size += 1;
    return;
  }
  pop() {
    if (!this.size) {
      return undefined;
    }
    const target = this.first;
    if (this.size === 1) {
      this.first = null;
      this.last = null;
    } else {
      this.first = target.next;
      // 하지 않아도 상관없지만
      // 빠질 노드에서 링크드 리스트에 접근할 수 있는 여지를 없애기 위해 null 로...
      target.next = null;
    }
    this.size -= 1;
    return target.val;
  }
}
