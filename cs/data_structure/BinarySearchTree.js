class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  search(value) {
    let target = this.root;

    while (target && target.value !== value) {
      if (value < target.value) target = target.left;
      else target = target.right;
    }

    return target ? target.value : null;
  }
  insert(value) {
    if (this.search(value)) return;
    const newNode = new Node(value);
    let [parent, current] = [null, this.root];

    while (current) {
      parent = current;
      if (value === parent.value) return;
      else if (value < parent.value) current = parent.left;
      else current = parent.right;
    }

    if (!parent) {
      this.root = newNode;
    } else if (value < parent.value) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }
    // console
    console.log(`insert ${value}`);
    return;
  }
  delete(value) {
    let [target, parent, which, newChild] = [this.root, null, null, 0];
    while (target && value !== target.value) {
      parent = target;
      if (value < parent.value) {
        target = parent.left;
        which = "left";
      } else {
        target = parent.right;
        which = "right";
      }
      // message
      console.log(`parent node ${parent ? parent.value : null}`);
      console.log(`target node ${target ? target.value : null}`);
    }
    // 루트가 비었을 경우, 부모가 리프 노드인 경우
    if (!target) {
      // message
      console.log(`can't find ${value}`);
      return;
    }
    // 자식 0개
    if (!target.left && !target.right) newChild = null;
    // 자식 1개
    else if (target.left && !target.right) newChild = target.left;
    else if (target.right && !target.left) newChild = target.right;
    // 자식 2개
    else {
      newChild = this.findMin(target.right);
      newChild.left = target.left;
      // 오른쪽 서브트리에 노드가 1개 있을 경우를 생각해야 한다.
      newChild.right = newChild !== target.right ? target.right : null;
    }
    parent[which] = newChild;
    target = null;
    // message
    console.log(`delete ${value}`);
    return;
  }
  findMin(root) {
    // 해당 서브트리의 가장 작은 값을 가진 노드를 찾는다.
    // root 노드부터 가장 왼쪽 끝에 있는 노드
    let [parent, current] = [null, root];
    while (current.left) {
      parent = current;
      current = parent.left;
    }
    // 가장 작은 노드에 오른쪽 자식을 가장 작은 노드의 위치로 올린다.
    // null이면 null대로, 있으면 있는대로
    parent.left = current.right;
    return current;
  }
}
