class Node {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  } 
  push(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    }
    else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }
  pop() {
    if (!this.head) return null;
    const poppedNode = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    }
    else {
      this.tail = poppedNode.prev;
      this.tail.next = null;
      poppedNode.prev = null;
    }
    this.length--;
    return poppedNode;
  }
  shift() {
    if (!this.head) return null;
    const poppedNode = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    }
    else {
      this.head = poppedNode.next;
      this.head.prev = null;
      poppedNode.next = null;
    }
    this.length--;
    return poppedNode;
  }
  unshift(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    }
    else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }
  get(index) {
    if (index < 0 || index >= this.length) return null;
    let target, count;
    if (index <= this.length/2) {
      target = this.head;
      count = 0;
      while (count != index) {
        target = target.next;
        count++;
      }
    }
    else {
      target = this.tail;
      count = this.length-1;
      while (count != index) {
        target = target.prev;
        count--;
      }
    }
    return target;
  }
  set(index, val) {
    const target = this.get(index);
    if (target) {
      target.val = val;
      return true;
    }
    return false;
  }

  show() {
    if (!this.head) return null;

    let current = this.head;
    let count = 0;
    let ret = '';
    while (count < this.length) {
      ret += current.val;
      current = current.next;
      count++;
    }
    return ret;
  }
  insert(index, val) {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return !!this.unshift(val);
    if (index === this.length) return !!this.push(val);
    const newNode = new Node(val);
    const prevNode = this.get(index-1);
    newNode.prev = prevNode, newNode.next = prevNode.next;
    prevNode.next.prev = newNode, prevNode.next = newNode;
    this.length++;
    return true;
  }
  remove(index) {
    if (index < 0 || index >= this.length) return null;
    if (index === 0) return this.shift();
    if (index === this.length-1) return this.pop();
    const target = this.get(index);
    target.prev.next = target.next, target.next.prev = target.prev;
    target.prev = null, target.next = null;
    this.length--;
    return target;
  }
}