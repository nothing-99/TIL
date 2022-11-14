# Singly Linked List

- method
  - [push](#push)
  - [pop](#pop)
  - [shift](#shift)
  - [unshift](#unshift)

## push

새로운 데이터를 가진 노드를 생성하고 Linked_List 마지막에 연결한 후 tail로 설정한다. 새로운 노드를 추가할 때 고려해야할 상황이 있다

- LinkedList에 node가 없는 경우
- LinkedList에 node가 있는 경우

node가 없는 경우, `head` `tail` 모두가 새로운 노드를 가리키도록 한다.
node가 있는 경우, `tail` 이 새로운 노드를 가리키도록 한다.

```js
push(val) {
  const newNode = new Node(val);

  // LinkedList에 node가 없는 경우
  if (!this.head) {
    this.head = newNode;
    this.tail = newNode;
  }
  // LinkedList에 node가 1개 이상인 경우
  else {
    this.tail.next = newNode;
    this.tail = newNode;
  }
  this.length++;

  return this;
}
```
[UP](#singly-linked-list)
## pop

가장 마지막 노드를 리턴하고 끝에서 2번째 노드를 `tail`로 설정한다. 그럼 `tail`이 될 끝에서 2번째 노드를 찾아야한다. 이때, 찾기만 해서는 안되고 고려해야할 상황들이 존재한다.

- LinkedList에 node가 없는 경우
- LinkedList에 node가 1개인 경우
- LinkedList에 node가 2개인 경우

node가 없는 경우, pop의 대상이 되는 node가 없기 때문에 `undeinfed` or `null` 을 리턴하면 된다.
node가 1개인 경우, `head`, `tail` node가 동일한 1개의 node를 가리키고 있는 상황이다. 이때, 1개의 node를 pop할 경우 빈 linked_list라는 것을 설정해야한다. `head = null, tail = null`
node가 2개인 경우, 이것이 일반적인 상황이다. tail node는 리턴하고 끝에서 2번째 노드를 새로운 `tail` 로 설정한다.

```js
pop() {
  // LinkedList에 node가 없는 경우
  if (!this.head) return null;

  let current = this.head;
  let newTail = null;

  while (current.next) {
    newTail = current;
    current = current.next;
  }
  // LinkedList에 node가 1개인 경우
  if (newTail === null) {
    this.head = null;
    this.tail = null;
  }
  // LinkedList에 node가 2개 이상인 경우
  else {
    newTail.next = null;
    tail = newtail;
  }
  this.length--;

  return current;
}
```
[UP](#singly-linked-list)

## shift
LinkedList의 Head에 있는 node를 List에서 빼는 동시에 리턴한다. Head에 있는 노드가 가리키고 있는 다음 노드를 헤드로 설정하고 기존의 노드는 리턴한다. 

- LinkedList에 node가 없는 경우
- LinkedList에 node가 1개 이상인 경우
- **shift() 후 LinkedList에 node가 없는 경우**

node가 없는 경우, null을 리턴한다.
node가 1개 이상인 경우, head는 head.next 노드를 가리키도록 하고 기존의 head는 리턴한다.

**중요** 마지막 고려사항을 생각지 않고 수행한 결과 LinkedList에 어떠한 노드도 남아있지 않아야 하는데 `tail`이 마지막으로 shift한 노드를 가리키고 있었다. 이것을 처리해줘야한다.

```js
shift() {
  // LinkedList에 node가 없는 경우
  if (!this.head) return null;

  // LinkedList에 node가 1개 이상인 경우
  const currentHead = this.head;
  this.head = currentHead.next;
  this.length--;

  // shift 결과 LinkedList에 node가 없는 경우
  if (this.length === 0) this.tail = null;

  return currentHead;
}
```
[UP](#singly-linked-list)

## unshift
LinkedList의 Head에 새로운 노드를 추가한다. `push`와 비교했을 때 push는 tail에 새로운 노드를 추가하고 `unsfhit`는 head에 새로운 노드를 추가한다.

- LinkedList에 node가 없는 경우
- LinkedList에 node가 1개 이상인 경우

node가 없는 경우, head, tail이 새로운 노드를 가리키도록 해야한다.
node가 1개 이상인 경우, 새로운 노드의 포인터가 현재 head의 노드를 가리키도록 하고 head는 새로운 노드를 가리키도록 한다. 

```js
unshift(val) {
  const newNode = new Node(val);

  // LinkedList에 node가 없는 경우
  if (!this.head) {
    this.head = newNode;
    this.tail = newNode;
  }
  // LinkedList에 node가 1개 이상인 경우
  else {
    newNode.next = this.head;
    this.head = newNode;
  }
  this.length++;
  
  return this;
}
```
[UP](#singly-linked-list)