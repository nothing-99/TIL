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
  insert(value) {
    const node = new Node(value);
    let parent = null;
    let cur = this.root;

    while (cur !== null) {
      parent = cur;
      if (value < cur.value) {
        cur = cur.left;
      } else if (value > cur.value) {
        cur = cur.right;
      } else {
        console.log(`이미 존재하는 값 (${value})`);
        return;
      }
    }
    if (!parent) {
      // root노드가 비었을 경우
      this.root = node;
    } else if (value < parent.value) {
      // 왼쪽 노드로
      parent.left = node;
    } else {
      // 오른쪽 노드로
      parent.right = node;
    }
    return;
  }
  search(value) {
    let cur = this.root;
    while (cur && cur.value !== value) {
      if (value < cur.value) {
        cur = cur.left;
      } else {
        cur = cur.right;
      }
    }
    return cur ? cur.value : null;
  }
  delete(value) {
    // 트리가 빈 경우
    if (!this.root) return undefined;

    let parentOfTarget = null;
    let newChild = null;
    let target = this.root;
    let index = null;

    // value를 가진 노드 target,
    // target의 부모 노드 parentOfTarget,
    while (target && value !== target.value) {
      parentOfTarget = target;
      if (value < target.value) {
        target = target.left;
        index = "left";
      } else {
        target = target.right;
        index = "right";
      }
    }
    // value를 가진 노드가 없는 경우
    if (!target) return undefined;
    // target의 자식이 없는 경우
    if (!target.left && !target.right) newChild = null;
    // 하나의 자식 노드만 존재하는 경우
    else if (target.left && !target.right) newChild = target.left;
    else if (!target.left && target.right) newChild = target.right;
    // 2개의 자식 노드가 존재하는 경우
    // target의 왼쪽 서브트리에 있는 모든 값보다 크고
    // target의 오른쪽 서브트리에 있는 모든 값보다 작은 노드를 찾아야 한다.
    // target의 오른쪽 서브트리에서 가장 작은 값을 찾으면 된다.
    else {
      // min은 왼쪽 자식은 무조건 없어야 하고 오른쪽 자식은 상관없다.
      let min = target.right.left ? null : target.right;
      if (!min) {
        // 이 코드에는 부모 노드를 가리키는 포인터가 없기 때문에 부모 노드를 리턴,,
        const parentOfMin = this.findParentOfMin(target.right);
        min = parentOfMin.left;
        parentOfMin.left = min.right;
      }
      min.left = target.left;
      min.right = target.right;
      newChild = min;
    }
    // parentOfTarget === null 이면 target === this.root
    !parentOfTarget ? (this.root = newChild) : (parentOfTarget[index] = newChild);

    return `delete ${value}`;
  }
  findParentOfMin(subRoot) {
    let parent = subRoot;
    let child = subRoot.left;
    while (child.left) {
      parent = child;
      child = child.left;
    }
    return parent;
  }
}
