class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}
class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
  push(val) {
    const newNode = new Node(val);
    if (this.size === 0) {
      this.first = newNode;
      this.last = newNode;
    }
    else {
      this.last.next = newNode;
      newNode.prev = this.last;
      this.last = newNode;
    }
    return ++this.size;
  }
  pop() {
    if (!this.last) return null;
    const target = this.last;
    if (this.size === 1) {
      this.first = null;
      this.last = null;
    }
    else {
      target.prev.next = null;
      this.last = target.prev;
      target.prev = null;
    }
    this.size--;
    return target;
  }
}

const stack = new Stack();