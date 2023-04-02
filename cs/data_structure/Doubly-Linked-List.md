# Doubly Linked List

- [Singly Linked List 와 구조 비교](#compare-with-singlylinkedlist)
- Method
  - [push](#push)
  - [pop](#pop)
  - [shift](#shift)
  - [unshift](#unshift)
  - [get](#get)
  - [set](#set)
  - [insert](#insert)
  - [remove](#remove)
- [Time-Complex](#time-complex)

## Compare with SinglyLinkedList

`Singly Linked List` 와 비교했을 때 기본적인 구조는 똑같다.
- List가 `node`로 구성 
- list의 시작과 끝은 각각 `head` `tail` 
- node의 개수를 `length` 로 저장

BUT! `node`의 구성요소가 약간 다르다. Singly Linked List의 노드는 다음 노드를 가리키는 포인터 1개를 가지지만 Doubly Linked List의 노드는 **이전 노드를 가리키는 포인터도 가진다**
- Singly Linked List node : value, next
- Doubly Linked List node : value, next, prev

node의 구성요소가 1개가 더 많기 때문에 메모리를 더 사용함을 알 수 있지만 그만큼 기능적 측면에서 유연하게 대응할 수 있다 `trade-off`

```js
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
}
```
[UP](#doubly-linked-list)

## Method
### Push
`push(val)` : LinkedList의 끝에 새로운 노드를 추가한다
- **LinkedList에 node가 없는 경우** : head, tail이 newNode를 가리키게 한다.
- **LinkedList에 node가 1개 이상 있는 경우** : tail.next는 newNode를, newNode.prev는 tail을 가리키게 한다. 그 후 tail이 newNode를 가리키도록 한다.

마지막에 LinkedList의 길이를 변경을 잊지말자!! `this.length++`

```js
push(val) {
  // 새로운 노드 생성
  const newNode = new Node(val);

  // node가 없는 경우
  if (!this.head) {
    this.head = newNode;
    this.tail = newNode;
  }
  // node가 있는 경우
  else {
    this.tail.next = newNode;
    newNode.prev = this.tail;
    this.tail = newNode;
  }
  this.length++;
  return this;
}
```
[UP](#doubly-linked-list)

### pop
`pop()` : LinkedList의 끝에서 노드를 추출한다.
- **LinkedList에 node가 없는 경우**
- **LinkedList에 node가 있는 경우**
  - **node가 1개인 경우** : head, tail 을 null 로!
  - **node가 2개 이상인 경우** : tail 앞 node 를 새로운 tail로 설정하고 기존 tail과 새로운 tail의 연결을 끊는다.

**반드시 양방향 모두 끊어야 한다**
기술적으로는 새로운 tail의 next만 null로 해도 상관없다. 이것은 순전히 LinkedList 입장에서의 생각이다. 추출된 노드의 prev를 null로 설정하지 않는다면 이 노드를 통해 LinkedList 안에 있는 모든 node에 접근할 수 있다. 

```js
pop() {
  // node 가 0개인 경우
  if (!this.head) return null;
  const poppedNode = this.tail;
  // node가 1개인 경우
  if (this.length === 1) {
    this.head = null;
    this.tail = null;
  }
  // node가 2개 이상인 경우
  else {
    this.tail = poopedNode.prev;
    // new tail --> old tail [연결끊기]
    this.tail.next = null;
    // new tail <-- old tail [연결끊기]
    poppedNode.prev = null;
  }
  this.length--;
  return poopedNode;
}
```
[UP](#doubly-linked-list)

### shift
`shift()` : LinkedList의 앞에서 node를 추출한다.
- **node가 0개인 경우**
- **node가 1개인 경우** : head, tail 을 null로 설정
- **node가 2개 이상인 경우** : 기존 head.next 를 새로운 head로 설정하고 새로운 head.prev는 null로, 기존 head.next는 null로 값을 변경한다. (pop과 동일! **양방향 모두 끊어야함**)

```js
shift() {
  // node가 0개인 경우
  if (!this.head) return null;
  const poppedNode = this.head;
  // node가 1개인 경우
  if (this.length === 1) {
    this.head = null;
    this.tail = null;
  }
  // node가 2개 이상인 경우
  else {
    this.head = poppedNode.next;
    // 양방향 연결 끊기
    this.head.prev = null;
    poppedNode.next = null;
  }
  this.length--;
  return poppedNode;
}
```
[UP](#doubly-linked-list)

### unshift
`unshift(val)` : LinkedList의 앞에 새로운 node를 추가한다.
- **node가 0개인 경우**
- **node가 1개 이상인 경우**
```js
unshift(val) {
  // 새로운 노드 생성
  const newNode = new Node(val);
  // 노드가 0개인 경우
  if (!this.head) {
    this.head = newNode;
    this.tail = newNode;
  }
  // 노드가 1개 이상인 경우
  else {
    this.head.prev = newNode;
    // 양방향 연결
    newNode.next = this.head;
    this.head = newNode;
  }
  this.length++;
  return this;
}
```
[UP](#doubly-linked-list)

## get
`get(index)` : index위치의 node를 찾는다.
- 유효한 index가 아닌 경우 : 0보다 작거나 LinkedList의 길이와 같거나 큰 경우 (index는 0부터 시작임)
- 유효한 index인 경우
  - index가 0에 가까운 경우 : `head` 에서 검색 시작
  - index가 LinekdList의 길이에 가까운 경우 : `tail` 에서 검색 시작

물론, 검색 시작 노드를 나누지 않고 head에서 해도 되지만!! 더블 포인터를 이용하고 성능상에서도 이점을 볼 수 있음.

```js
get(index) {
  // index가 유요하지 않은 경우
  if (index < 0 || index >= this.length) return null;
  let target, count;
  // head를 검색 시작 노드로
  if (index <= this.length/2) {
    target = this.head;
    count = 0;
    while (count !== index) {
      target = target.next;
      count++;
    }
  }
  // tail을 검색 시작 노드로
  else {
    target = this.tail;
    count = this.length-1;
    while (count !== index) {
      target = target.prev;
      count--;
    }
  }
  return target;
}
```
[UP](#doubly-linked-list)

### set
`set(index, val)` : index 위치에 있는 노드의 데이터를 val로 바꾼다.
- index위치의 노드는 `get(index)`를 사용해 쉽게 찾을 수 있다.
```js
set(index, val) {
  const target = this.get(index);
  if (target) {
    target.val = val;
    return true;
  }
  return false;
}
```
[UP](#doubly-linked-list)

### insert
`insert(index, val)` : val을 가지는 새로운 노드를 생성해 index 위치에 끼워 넣는다.
- **유효한 index가 아닌 경우** : 0보다 작거나 LinkedList의 길이보다 큰 경우 
- **index가 0인 경우** : LinkedList의 시작 부분에 새로운 노드를 추가하는 것과 같기 때문에 `unshift(val)` 
- **index가 전체 노드의 개수와 같은 경우** : LinkedList의 끝 부분에 새로운 노드를 추가하는 것과 같기 때문에 `push(val)`
- **index가 0보다 크고 노드의 개수보다 작은 경우** : `get(index-1)`을 통해 새로운 노드가 위치할 부분의 앞 노드를 찾아서 4개의 포인터(연결)를 수정한다
  - newNode.prev = prev
  - newNode.next = prev.next
  - prev.next.prev = newNode
  - prev.next = newNode

> `prev.next.prev` `prev.next` 의 순서를 지켜야할 듯 하다. 후자를 먼저 실행할 경우 prev.next.prev는 newNode.prev와 같아져 **newNode.prev = newNode**를 실행하게 된다.

```js
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
```
[UP](#doubly-linked-list)

### remove
`remove(index)` : index 위치의 노드를 찾아 추출한다.
- **유효한 index가 아닌 경우** : `0 < index <= this.length`
- **index가 0인 경우** : LinkedList의 head에 있는 node를 추출하는 것이기 때문에 `shift()`
- **index가 this.length-1인 경우** : LinkedList의 tail에 있는 node를 추출하는 것이기 때문에 `pop()`
- **index가 0과 this.length-1 사이인 경우** : `get(index)`를 통해 추출 대상 노드를 찾아 대상 노드의 이전 노드와 다음 노드를 서로 연결시켜주고 대상 노드의 `prev` `next` 를 모두 **null**로 초기화시킨다.
```js
remove(index) {
  if (index < 0 || index >= this.length) return null;
  if (index === 0) return shift();
  if (index === this.length-1) return pop();

  const target = this.get(index);
  target.prev.next = target.next, target.next.prev = target.prev;
  target.prev = null, target.next = null;
  this.length--;
  return target;
}
```
[UP](#doubly-linked-list)

## time complex
- `insertion` **O(1)**
- `removal` **O(1)** : Doubly Linked List는 `prev` 포인터의 존재로 이전 노드에 접근 가능하다. `this.tail.prev` 를 통해 새로운 tail node를 찾을 수 있기 때문에 O(1) 의 시간복잡도를 가진다.
- `search` `access` **O(N)** : Singly Linked List 와 비교했을 때 시간복잡도는 같지만 자세히 들어가면 차이가 존재한다. Doubly Linked List 는 index 를 보고 `head` `tail` 중 검색 시작 지점을 달리 하기 때문에 O(N/2) 이다. 

Doubly Linked List 와 Singly Linked List 의 차이는 이전 노드를 가리키는 **`prev` 의 존재여부**이다.

Doubly Linked List는 `prev`의 존재로 **메모리를 더 소요**하지만 **메서드 성능면에서 이점**을 본다 