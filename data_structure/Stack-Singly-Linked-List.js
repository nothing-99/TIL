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
    const newNode = new Node(val);
    if (this.size === 0) {
      this.first = newNode;
      this.last = newNode;
    }
    else {
      newNode.next = this.first;
      this.first = newNode;
    }
    return ++this.size;
  }
  pop() {
    if (!this.first) return null;
    const target = this.first;
    if (this.size === 1) {
      this.first = null;
      this.last = null;
    }
    else {
      this.first = target.next;
      target.next = null;
    }
    this.size--;
    return target;
  }
}

const stack = new Stack();