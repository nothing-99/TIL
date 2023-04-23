# 자료구조 - 이진힙

## Binary heap

binary search tree 와 약간 다른 규칙을 가지고 있다.

- binary heap 은 크게 2개의 경우를 가지고 이름을 보면 알 수 있다.
  - **max-binary heap** : 부모 노드는 항상 자식 노드보다 큰 값을 가진다.
  - **min-binary heap** : 부모 노드는 항상 자식 노드보다 작은 값을 가진다.
- 자식 노드 간의 순서가 없다. (왼쪽 자식, 오른쪽 자식의 순서 상관없다)

-> 부모 노드는 항상 자식 노드 보다 큰 값을 가지며 왼쪽부터 자식 노드로 채우자

**왜?**

- 우선순위 큐를 구현하는데 자주 사용된다.
  - 큐는 요소들을 추가, 삭제하면서 요소들의 순서를 추적한다.
  - 우선순위는 각 요소들의 중요도의 값을 부여해서 그 값에 따라 요소들을 적절한 위치에 놓는다.
- 그래프 순회에서 자주 사용된다.

::이진 탐색 트리와 이진힙의 차이를 명확히 알자::

**binary heap 구현 - list/array**

- parent node : n
  - left child node : (n\*2)+1
  - right child node : (n\*2)+2
- child node : n
  - parent node : (n-1)/2 (소수점 생략 -> 내림을 통해 가능)

## max-binary heap

- 부모 노드는 최대 2개의 자식 노드를 가진다.
- **부모 노드는 항상 자식 노드 보다 큰 값을 가진다.**
- 형제 노드 간에는 순서가 없다.
- 한쪽으로 치우친 형태가 나올 수 있는 이진 탐색 트리와 달리 compact 한 트리를 구성한다.
- root-node가 최대 값을 가진다는 것만 보장된다.

> min-binary heap 은 반대라고 생각하면 된다.

## time complexity

- **insertion** : O(logN)
- **removeal** : O(logN)
- **search** : O(N)

---

[[자료구조 및 알고리즘]]
