# Doubly Linked List

- [Singly Linked List 와 구조 비교](#compare-with-singlylinkedlist)
- Method
  - [push](#push)
  - [pop](#pop)
  - [shift](#shift)
  - [unshift](#unshift)

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