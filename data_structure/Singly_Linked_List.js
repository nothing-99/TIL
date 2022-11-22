class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(val) {
    const newNode = new Node(val);

    if (!newNode.val) return this;
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;

    return this;
  }
  pop() {
    if (this.length === 0) return null;

    let popNode = this.head;
    let newTail = null;
    while(popNode.next) {
      newTail = popNode;
      popNode = popNode.next;
    }

    if (!newTail) {
      this.head = null;
      this.tail = null;
    } else {
      newTail.next = null;
      this.tail = newTail;
    }
    this.length--;

    return popNode;
  }
  shift() {
    if (!this.head) return null;

    const targetNode = this.head;
    const newHead = this.head.next;
    if (!newHead) {
      this.head = null;
      this.tail = null;
    } else {
      this.head.next = null; // 선택사항
      this.head = newHead;
    }
    this.length--;

    return targetNode;
  }
  unshift(val) {
    const newNode = new Node(val);
    
    if (!newNode.val) return this;
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;

    return this;
  }
  get(index) {
    if (index < 0 || index >= this.length) return null;

    let targetNode = this.head;
    let count = index;
    while(count) {
      targetNode = targetNode.next;
      count--;
    }

    return targetNode;
  }
  set(index, val) {
    const targetNode = this.get(index);
    
    if (targetNode) {
      targetNode.val = val;
      return true;
    }
    return false;
  }
  insert(index, val) {
    if (index < 0 || index > this.length) return false;
    if (index === 0) this.unshift(val);
    else if (index === this.length) this.push(val);
    else {
      const newNode = new Node(val);
      const preNode = this.get(index-1);
      newNode.next = preNode.next;
      preNode.next = newNode;
      this.length++;
    }
    return true;

    /*
    if (index < 0 || index > this.length) return false;
    if (index === 0) return !!this.unshift(val);
    if (index === this.length) return !!this.push(val);
    const newNode = new Node(val);
    const preNode = this.get(index-1);
    newNode.next = preNode.next;
    preNode.next = newNode;
    this.length++;
    return true;
    */
  }
  remove(index) {
    if (index < 0 || index >= this.length) return null;
    if (index === 0) return this.shift();
    if (index === this.length-1) return this.pop();
    const preNode = this.get(index-1);
    const targetNode = preNode.next;
    preNode.next = targetNode.next;
    this.length--;
    return targetNode;
  }
  reverse() {
    if (this.length <= 1) return this;
    
    let prevNode = null;
    let currentNode = this.head;
    let nextNode = currentNode.next;
    while(nextNode) {
      currentNode.next = prevNode;
      prevNode = currentNode;
      currentNode = nextNode;
      nextNode = nextNode.next;
    }
    currentNode.next = prevNode;
    let temp = this.head;
    this.head = this.tail;
    this.tail = temp;
    
    return this;
  }

  show() {
    if (this.length === 0) return null;
    let currentNode = this.head;
    let ret = '';
    for (let i = 0; i < this.length; i++) {
      ret += `${currentNode.val} `;
      currentNode = currentNode.next;
    }

    return ret.slice(0, ret.length-1);
  }
}

const list = new SinglyLinkedList();