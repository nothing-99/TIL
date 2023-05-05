class Node {
  constructor(val) {
    this.prev = null;
    this.next = null;
    this.val = val;
  }
}
class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
  enqueue(val) {
    const node = new Node(val);
    if (!this.size) {
      this.first = node;
      this.last = node;
    } else {
      this.first.prev = node;
      node.next = this.first;
      this.first = node;
    }
    this.size += 1;
    return;
  }
  dequeue(val) {
    if (!this.size) {
      return undefined;
    }
    const target = this.last;
    if (this.size === 1) {
      this.first = null;
      this.last = null;
      target.prev = null;
      target.prev = null;
    } else {
      target.prev.next = null;
      this.last = target.prev;
      target.prev = null;
    }
    this.size -= 1;
    return target.val;
  }
}
