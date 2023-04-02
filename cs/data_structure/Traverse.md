# Traverse

- [Traverse](#what)
- [BFS](#bfs)
- [DFS](#dfs)

## what

트리의 종류와 상관없이 트리 안에 있는 모든 노드들을 방문하기 위한 방법이 존재한다. 
- BFS : Breadth-First Search
- DFS : Depth-First Search
  - Pre-order : 
  - Post-order
  - In-order

> Pre, Post, In 은 부모 노드를 기준으로 생각하면 된다. 부모 노드, 왼쪽 자식 노드, 오른쪽 자식 노드가 존재한다고 생각해본다.
> - Pre : 부모, 왼쪽, 오른쪽
> - Post : 왼쪽, 오른쪽, 부모
> - In : 왼쪽, 부모, 오른쪽
> 
> 여기서 생각할 점은 노드 단위를 넘어 서브트리 단위로 생각해야한다.

[UP](#traverse)

## BFS
- `queue`를 이용해서 구현
- `queue`를 `root` 노드로 초기화

1. `queue.dequeue()` 를 통해 node를 얻는다.
2. 얻은 노드의 왼쪽 자식 노드가 존재한다면 `queue.enqueue(node.left)`
3. 얻은 노드의 오른쪽 자식 노드가 존재한다면 `queue.enqueue(node.right)`
4. store node.value 
5. `queue` 에 노드가 존재하지 않을 때까지 반복
```js
BFS() {
  if (!this.root) return null;

  let data = [], queue = [this.root], visiting;
  while (queue.length) {
    visiting = queue.shitf();
    visiting.left && queue.push(visiting.left);
    visiting.right && queue.push(visiting.right);
    data.push(visiting.value);
  }
  return data.join(' ');
}
```
[UP](#traverse)

## DFS
- 헬퍼 함수의 재귀를 통해 구현

```js
DFS_Pre() {
  if (!this.root) return null;

  let data = [];
  function traverse(visiting) {
    data.push(visiting.value);
    visiting.left && traverse(visiting.left);
    visiting.right && traverse(visiting.right);
  }
  traverse(this.root);

  return data.join(' ');
}
DFS_Post() {
  if (!this.root) return null;

  let data = [];
  function traverse(visiting) {
    visiting.left && traverse(visiting.left);
    visiting.right && traverse(visiting.right);
    data.push(visiting.value);
  }
  traverse(this.root);

  return data.join(' ');
}
DFS_In() {
  if (!this.root) return null;

  let data = [];
  function traverse(visiting) {
    visiting.left && traverse(visiting.left);
    data.push(visiting.value);
    visiting.right && traverse(visiting.right);
  }
  traverse(this.root);

  return data.join(' ');
}
```
[UP](#traverse)