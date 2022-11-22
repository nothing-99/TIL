# Singly Linked List

- [시간복잡도, 배열과 비교](#compare)
- [method](#method)
  - [push](#push)
  - [pop](#pop)
  - [shift](#shift)
  - [unshift](#unshift)
  - [get](#get)
  - [set](#set)
  - [insert](#insert)
  - [remove](#remove)
  - [reverse](#reverse)
- [code](#code)

## compare

- `insertion`**O(1)** : 단일연결리스트의 앞과 뒤에 데이터를 넣는 경우 노드 생성 후 포인터만 변경해주는 작업만 하면 되기 때문에 항상 일정한 시간이 걸린다. 배열의 경우는 다르다.
  - 배열은 각 데이터의 위치정보와 매핑되는 index를 가지고 있기 때문에 새로운 데이터를 배열에 추가할 시 다른 데이터들의 index도 모두 수정 해야한다. 단, 제일 마지막에 데이터를 추가할 시에는 간단하다 **O(1)**. 평균적으로 **O(N)**
- `removal` **O(1)** **O(N)** : 제일 앞의 노드를 제거할 때는 **O(1)**의 시간이 걸리지만 제일 뒤의 노드를 제거할 때는 새로운 tail노드가 될 이전 노드를 찾아야하기 때문에 **O(N-1)**의 시간이 걸린다.
  - 배열은 insertion과 마찬가지로 다른 데이터의 index 수정으로 인해 **O(N)**의 시간복잡도가 걸린다.
- `search` `access` **O(N)** : 단일연결리스트는 index를 가지고 있지 않기 때문에 head노드부터 검색을 시작해야 한다.
  - 배열은 index 정보를 가지고 있기 때문에 데이터 위치정보와 매핑되는 index를 가지고 있다면 **O(1)**

**배열, 단일연결리스트가 있을 때 `데이터의 삽입, 삭제가 빈번`, `임의의 위치에 있는 데이터에 대한 접근이 적음` 의 조건을 만족한다면 단일연결리스트 사용을 고려해보자**

> 실제로는 잘 사용 안되는 듯,,, 합니다.

## method
### push

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
### pop

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

### shift
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

### unshift
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

### get
`get(index)` : (index + 1)번째 노드를 리턴한다. 
- `index < 0` : 일반적으로 첫번째 요소의 인덱스는 0
- `index >= list.length` : 리스트의 길이는 데이터의 개수고 마지막 노드의 인덱스는 (리스트의 길이 - 1) 이다
- `0 <= index < list.length` : 일반적인 경우
```js
get(index) {
  if (index < 0 || index >= this.length) return null;
  let target = this.head;
  for (let i = 0; i < index; i++) {
    target = target.next;
  }

  return target;
}
```
[UP](#singly-linked-list)

### set
`set(index, val)` : index에 위치한 노드의 value값을 val로 설정한다. 이때 우리는 `get(index)` 를 사용하면 쉽게 해결할 수 있다.

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
[UP](#singly-linked-list)

### insert
`insert(index, val)` : index 위치에 val 값을 가지는 노드를 추가한다.
- `index < 0 || index > this.length` : 해당 위치에는 추가할 수 없음
- `index === 0` : `this.unshift(val)` 을 수행
- `index === this.length` : `this.push(val)` 을 수행
- `index > 0 && index < this.length` : (index-1)번째 노드를 찾아서 새로운 노드의 next에 (index-1)번째 노드의 next의 값을 넣고 (index-1)번째 노드의 next 에는 새로운 노드로 바꾼다.
```js
insert(index, val) {
  if (index < 0 || index > this.length) return false;
  if (index === 0) return !!this.unshift(val);
  if (index === this.length) return !!this.push(val);
  const newNode = new Node(val);
  const prevNode = get(index-1);
  newNode.next = prevNode.next;
  prevNode.next = newNode;
  this.length++; // 중요
  return true;
}
```
> **TIP** 임의의 데이터의 `bool` 타입을 필요로 할 때는 앞에 `!!`를 추가하면 된다.

[UP](#singly-linked-list)
### remove
`remove(index)` : index번째 노드를 제거한다.
- `index < 0 || index >= this.length` : 해당 위치에는 노드가 없음
- `index === 0` : `shift()` 를 수행
- `index === this.length-1` : `pop()` 을 수행
- `index >= 0 && index < this.length-1` : `get(index-1)` 을 통해 앞에 위치한 노드를 찾고 앞의 노드의 next에는 index번째 노드의 다음 노드를 가리키도록 한다.

```js
remove(index) {
  if (index < 0 || index >= this.length) return null;
  if (index === 0) return this.shift();
  if (index === this.length-1) return this.pop();
  const prevNode = get(index-1);
  const target = prevNode.next;
  prevNode.next = target.next;
  this.length--; // 중요
  return target;
}
```
[UP](#singly-linked-list)

### reverse
`reverse()` : 리스트에 있는 노드의 순서를 뒤집는다.

의외로 단순하게 해결할 수 있다. 3개의 변수를 만든다.
- prevNode : currentNode.next 로 세팅될 노드
- currentNode : 현재 기준 노드
- nextNode : 기준 노드의 다음 노드로 기준 노드의 next를 prevNode로 변경하면 기존의 기준 노드의 next가 가리키고 있던 노드의 위치를 잃어버리기 때문에 임시로 저장해두기 위한 변수

`currentNode`는 head노드로, `prevNode`는 head노드 앞에는 어떠한 노드도 없기 때문에 null로, `nextNode`는 head노드의 다음 노드로 초기화한다.

1. currentNode.next = prevNode
2. prevNode = currentNode 
3. currentNode = nextNode
4. nextNode = nextNode.next

기준노드의 next포인터가 기준노드 앞의 노드를 가리키도록 하고 기준노드를 다음노드로 변경하는 과정을 반복해서 수행한다. `prevNode - currentNode - nextNode` 윈도우가 한칸씩 이동하면서 작업을 수행한다고 생각하자

**마지막에 기존 head노드와 tail노드를 바꿔주는 것을 잊어먹으면 안된다.**

```js
reverse() {
  if (this.length <= 1) return this;

  let prevNode = null;
  let currentNode = this.head;
  let nextNode = currentNode.next;

  while (nextNode) {
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
```

구현을 달리하면 되겠지만 이 방식은 마지막에 loop를 빠져 나온 후 `currentNode.next = prevNode` 를 꼭 작성해야 한다.

currentNode가 tail노드가 됐을 때 nextNode는 null로 세팅이 되고 currentNode.next를 prevNode로 세팅하지 않은 채 loop를 빠져나오기 때문이다.

[UP](#singly-linked-list)