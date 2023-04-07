# textContent | innerText

**textContent**

- 자식 노드들 중 text node 의 값만 모두 가져온다
- 이 프로퍼티를 이용해 content를 세팅할 때 완전 문자열로 취급하기 때문에 HTML-tag를 포함한 문자열을 주더라도 HTML파싱이 발생하지 않는다. 즉, text 노드의 값으로 그냥 들어간다고 보면 된다
- 들여쓰기, 공백 모두 포함된다

**innerText**

- `visibility: hidden` 으로 보여지지 않는 text node 의 값을 제외한 모든 text 를 가지고 온다.
- 들여쓰기, 공백 포함 안된다. 단, 각 string 사이에 개행 문자는 포함된다

**innerText 사용은 자제하자**

- CSS를 고려하기 때문에 textContent 보다 상대적으로 느리다.
