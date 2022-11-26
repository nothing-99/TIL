# Stack

- [stack?](#LIFO)
- [code](#code)
- [time-complexity](#time-complexity)

## LIFO
스택은 데이터를 저장하는 자료구조이고 **LIFO** 정책을 가진다. LIFO는 Last-In First-Out의 줄임말로 **가장 마지막에 저장한 데이터를 가장 먼저 추출하는 것**이다. 대표적인 예시로 **Call Stack** 이다. 

> - Undo / Redo : stack 2개로 구현 가능한 것 같음.
> - 다른 알고리즘에서 처리한 데이터, 아직 처리하지 못한 데이터들을 추적하기 위한 용도로 stack 을 사용하기도 한다 (queue도 마찬가지)
## code
- 자바스크립트에 내장된 list
- LinkedList를 이용해 별도로 구현

자바스크립트에 내장된 리스트를 사용한다면 { `push` `pop` }, { `unshift` `shift` } 2개의 페어로 각각 stack을 구현할 수 있다.
```js
const stack = [];

stack.push(1);
stack.push(2);
stack.pop(); // 2
```
```js
const stack = [];

stack.unshift(1);
stack.unshift(2);
stack.shift(); // 2
```

생각해야할 부분이 있다. list는 배열로 동작하는데 배열은 각 데이터의 위치에 대응되는 index 정보를 가지고 있다. 데이터의 위치가 변하게되면 각 데이터의 위치에 대응되는 index도 변경해줘야 한다.

- { `push` `pop` } : list 끝 부분에서 데이터가 추가되고 추출되기 때문에 다른 데이터들의 위치에 대한 index 변경이 없다.
- { `unshift` `shift` } : list 앞 부분에서 데이터가 추가되고 추출되기 때문에 다른 데이터들의 위치에 대한 index 변경이 존재한다. ( `unsfhit`를 수행하면 다른 데이터들의 index를 모두 1을 더해야하고 `shift`를 수행하면 1을 빼야한다 )

**list의 경우 { `push` `pop` } 을 이용해서 stack을 구현하는 것이 좋아 보인다**

자바스크립트에 내장된 list는 위의 4개의 메서드 외 많은 메서드를 가지고 있다. stack은 데이터를 넣고 데이터를 빼는 메서드만 가지고 있으면 되는데!!! **LinkedList를 이용해 구현할 수 있다.**

```js
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
    if (this.size === 0) return null;
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
    return target.val;
  }
}
```
## time complexity
- **insertion O(1)**
- **removal O(1)**

list의 `unshift` `shift` 를 이용한다면 **O(1)** 의 시간복잡도를 가질 수 없다. 다른 데이터들의 index를 모두 수정해야 하기 때문에 **O(N)** 

SinglyLinkedList의 끝에서 데이터를 추가하고 추출한다면 **O(1)** 의 시간복잡도를 가질 수 없다. push 는 문제없지만 pop 시에 새로운 last node 가 될 last node 의 이전 노드를 찾아야 하는데 first node 부터 검색을 시작해야 하는 문제가 있다. **O(N)**

DoublyLinkedList를 통해 구현한다면 앞에서든 뒤에서든 문제 없을 것이다.