# 자료구조 - 최대이진힙

## insert

- 먼저 리스트의 끝에 요소를 추가한다.
- 추가한 요소가 알맞은 곳에 위치하도록 **bubble up** 을 한다.
  - push-up 이라고도 한다.
  - root까지의 path 상에 위치한 모든 노드들이 내림차순으로 정렬되도록 해야 한다. 새로 추가된 요소와 부모 요소를 비교 하면서 알맞은 위치에 오도록 한다.
- 새로 추가한 요소의 형제 요소가 존재하고 부모 push-up을 수행할 때 형제 요소와는 비교할 필요가 없어 보인다. 왜냐하면 어쨌든 자식 요소는 부모 요소보다 크기가 작고 새로운 요소가 부모 요소보다 크다는 것은 형제 요소보다 크다는 것이 보장되기 때문이다.

**pseudocode**

- push the value into the values property on the heap
- bubble up(push up)
  - create a variable called index which is the length of the values property
  - create a variable called parentIndex which is the floor of (index-1)/2
  - keep looping as long as the values element at the parentIndex is less than the values element at the child index
    - swap the value of the values element at the parentIndex with the value of the element property at the child index
    - set the index to the parentIndex and start over!

```js
// me
insert(value) {
  let childIndex = this.values.length;
  let parentIndex = Math.floor((childIndex-1)/2);
  this.values[childIndex] = value;
  // bubble up
  while (childIndex > 0 && this.values[childIndex] > this.values[parentIndex]) {
    [this.values[childIndex], this.values[parentIndex]] = [this.values[parentIndex], this.values[childIndex]];
    childIndex = parentIndex;
    parentIndex = Math.floor((childIndex-1)/2);
  }
}
```

```js
// lecture
insert(element) {
  this.values.push(element);
  this.bubbleUp();
}
bubbleUp() {
  let idx = this.values.length - 1;
  const element = this.values[idx];
  let parentIdx, parnet;
  while(idx > 0) {
    parentIdx = Math.floor((idx-1)/2);
    parent = this.values[parentIdx];
    if (element <= parent) break;
    this.values[parentIdx] = element;
    this.values[idx] = parent;
    idx = parentIdx;
  }
}
```

## extractmax

- root 요소를 추출한다.
- 가장 최근에 추가한 요소를 root 요소로 끌어올린다.
- 밑으로 내리면서(sink down, push down, bubble down ...) 적절한 위치로 옮긴다.

**sink down**
**bubble up**

- complete bianry tree를 기반으로 하고 부모 노드는 항상 자식 노드보다 크거나 작다라는 binary heap의 특성을 유지하기 위해 수행하는 연산이다.

**pseudocode**

- swap the first value in the vales property with the last one
- pop from the values property, so you can return the value at the end
- have the new root "sink down" tothe correct spot
  - your parent index starts at 0 (the root)
  - find left child, right child
  - if the left or right child is greater than the element...swap! if both left and rith children are larger, wap with the larges child
  - the child index you swapped to now becomes the new parent index
  - keep looping and swapping until neither child is larger than the element
  - return the old root

```js
// my
extractMax() {
  [this.values[0], this.values[this.values.length-1]] = [this.values[this.values.length-1], this.values[0]];
  const max = this.values.pop();
  let parentIdx = 0;
  while (parentIdx*2+1 < this.values.length) {
    const leftIdx = parentIdx * 2 + 1;
    const rightIdx = parentIdx * 2 + 2 < this.values.length ? parentIdx * 2 + 2 : null;

    // test
    console.log(`parentIdx: ${parentIdx}, leftIdx: ${leftIdx}, rightIdx: ${rightIdx}`);

    if (this.values[leftIdx] > this.values[parentIdx]) {
      if (rightIdx && this.values[rightIdx] > this.values[leftIdx]) {
        // test
        console.log('right swap');
        [this.values[parentIdx], this.values[rightIdx]] =  [this.values[rightIdx], this.values[parentIdx]];
        parentIdx = rightIdx;
      }
      else {
        console.log('left swap');
        [this.values[parentIdx], this.values[leftIdx]] =  [this.values[leftIdx], this.values[parentIdx]];
        parentIdx = leftIdx;
      }
    }
    else if (rightIdx && this.values[rightIdx] > this.values[parentIdx]) {
      // test
      console.log('right swap');
      [this.values[parentIdx], this.values[rightIdx]] =  [this.values[rightIdx], this.values[parentIdx]];
      parentIdx = rightIdx;
    }
    else {
      break;
    }
  }
  return max;
}
```

```js
// lecture
extractMax() {
  const max = this.values[0];
  const end = this.values.pop();
  if (this,values.length > 0) {
    this.values[0] = end;
    this.sinkDown();
  }
  return max;
}
sinkDown() {
  let idx = 0;
  const length = this.values.length;
  const element = this.values[0];
  while (true) {
    let leftChildIdx = idx * 2 + 1;
    let rightChildIdx = idx * 2 + 2;
    let leftChild, rightChild;
    let swap = null;

    if (leftChildIdx < length) {
      leftChild = this.values[leftChildIdx];
      if (leftChild > element) {
        swap = leftChildIdx;
      }
    }
    if (rightChildIdx < length) {
      rightChild = this.values[rightChildIdx];
      if ((swap === null && rightChild > element) || (swap !== null && rightChild > leftChild)) {
        swap = rightChildIdx;
      }
    }
    if (swap === null) break;
    this.values[idx] = this.values[swap];
    this.values[swap] = element;
    idx = swap;
  }
}
```

---

[[자료구조 및 알고리즘]]
