# DocumentFragment

**DOM과 상관없는 별도의 메모리 공간에 저장해둔 임시 DOM 껍데기로 생각하면 될 듯.. DOM에 추가할 요소들을 추가해 서브트리를 구성한 후 DOM에 서브트리를 더한다**

---

- DOM을 구성할 수 있는 노드 객체의 한 종류로서 여러개의 요소를 하나의 덩어리로 묶을 수 있다
- `Object` ➡︎ `EventTarget` ➡︎ `Node` ➡︎ `DocumentFragment` (객체 상속 구조)

여러개의 요소를 DOM에 추가할 때 **DocumentFragment 에 요소들을 추가**하고 **마지막에 DocumentFragment 객체를 DOM에 추가**할 수 있다.

100개의 `li` 요소를 추가할 때 100번의 DOM을 추가하고 리플로우가 필요하다면 100번의 리플로우가 발생한다.

하지만 Fragement 객체에 100개의 `li` 요소를 추가한 후 DOM에 DocumentFragment 객체를 추가하면 1번의 DOM변경과 필요하다면 1번의 리플로우만 발생한다.

```js
const $ul = document.querySelector("ul");
const $fragment = document.createDocumentFragment();

for (let i = 0; i < 100; i++) {
  const $li = document.createElement("li");
  $li.textContent = `Hello ${i}`;
  $fragment.appendChild();
}

$ul.appendChild($fragment);
delete $fragment;
```

**조심**

- ~~일부 브라우저에서는 지원하지 않을 수 있기에 브라우저 호환성을 고려해야 한다.~~ ( 대부분 현대 브라우저에서는 다 지원한는 듯?? 리액트 <> 도 지원하니...)
- 실제 DOM과는 상관없기 때문에 마지막에 실제 DOM에 추가해야만 한다

## 참조

- https://tillog.netlify.app/posts/document-fragment
- https://developer.mozilla.org/ko/docs/Web/API/DocumentFragment
