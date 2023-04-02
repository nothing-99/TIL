# Queue

- [queue?](#fifo)
- [code](#code)
- [time complexirt](#time-complexity)

## FIFO
큐는 **FIFO** 정책을 따르는 자료구조이다. FIFO는 First-In First-Out의 줄임말로 **가장 먼저 저장한 데이터를 가장 먼저 추출하는 것**이다. 

- 맛집에서 줄 선대로 들어가는 경우
- 명절에 기차 예매시 대기열이 생기고 순서대로 예매 페이지로 들어가는 경우
- 여러페이지의 문서를 프린트 하는 경우

## Code

자바스크립트에 내장된 배열을 이용하면 { `push` `shift` } { `unshift` `pop` } 페어들로 구현할 수 있다. 하지만 `shift`, `unshift` 는 다른 데이터들의 index 의 업데이트가 불가피하다.

Singly Linked List를 이용한다면 
- **enqueue** : 끝에 노드를 추가
- **dequeue** : 앞에서 노드를 추출

> Doubly Linked List를 이용한다면 `enqueue` `dequeue` 모두 **O(1)** 로 구현할 수 있다.

```js
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
  enqueue(val) {
    const newNode = new Node(val);
    if (this.size === 0) {
      this.first = newNode;
      this.last = newNode;
    }
    else {
      this.last.next = newNode;
      this.last = newNode;
    }
    return ++this.size;
  }
  dequeue() {
    if (this.size === 0) return null;
    const target = this.first;
    if (this.size === 1) {
      this.first = null;
      this.last = null;
    }
    else {
      this.first = target.next;
    }
    this.size--;
    return target.val;
  }
}
```

## Time Complexity

- **insertion O(1)**
- **removal O(1)**

array에서 `unshift` `shift` 를 통해 데이터를 추가하고 추출할 때 **O(N)** 의 시간복잡도를 가지지만 Queue가 아닌 것은 아니다. 

**모로가든 도로가든 FIFO 만 따르도록 하면 큐라고 할 수 있다!**