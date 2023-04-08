# DOM

- DOM을 구성하는 노드 객체는 여러개의 타입을 가지고 있고 노드 객체 타입별로 제공하는 속성, 메서드가 다르다.
- 프로토타입 체인을 통해 **상위 객체 프로토타입을 상속 받는 형태**를 가지고 있다.
- DOM을 구성하는 노드 객체들이 공통적으로 상속받는 프로토타입 객체들은 `Object.prototype` `EventTarget.prototype` `Node.prototype`
- DOM노드를 얻는 여러 DOM 메서드가 존재하는 데 이름을 보면 몇개의 노드를 반환하는지 알 수 있다
- `HTMLCollection` `NodeList` 는 유사배열객체, 이터러블로서 **for...of** **spread** 문법을 사용할 수 있다

**Document.prototype.getElementById**

- "id: value"가 존재하는 element는 암묵적으로 value 전역변수로 element 요소 노드 객체가 생성된다
- value 와 같은 이름으로 변수가 있으면 생성 안된다

**[Document | Element].prototype.getElementByTagName**

- HTMLCollection 객체 반환

**[Document | Element].prototype.getElementsByClassName**

- HTMLCollection 객체 반환

**[Document | Element].prototype.querySelector**
**[Document | Element].prototype.querySelectorAll**

- CSS selector 문법을 이용해 요소 노드를 찾는다
- NodeList 객체 반환

**Element.prototype.matches**

- CSS selector 문법을 이용해 특정 요소 노드인지 확인 가능

**Node.prototype.childNodes**
**Node.prototype.firstChild**
**Node.prototype.lastChild**
**Element.prototype.children**
**Element.prototype.firstElementChild**
**Element.prototype.lastElementChild**

- Node.prototype은 Text노드, Element노드 | NodeList 를 반환
- Element.prototype은 Element노드 | HTMLCollection 을 반환

**Node.prototype.hasChildrenNodes**
**Element.prototype.children.length**
**ELement.prototype.childElementCount**

**Node.ptototype.parentNode**
**Node.prototype.previousSibling**
**Node.prototype.nextSibling**
**Element.prototype.previousElementSibling**
**Element.prototype.nextElementSibling**

**Node.prototype.nodeType**
**Node.prototype.nodeName**

- element node : 1 / 대문자
- text node : 3 / #text
- document node : 9 / #document

**Node.prototype.nodeValue**

- text노드에서만 유효한 메서드로 text노드의 값, 다른 타입의 노드로 접근할 경우 null

**Element.prototype.innerHTML**
**Element.prototype.insertAdjacentHTML(position, DOMstring)**

- textContent와 달리 HTML파싱이 발생한다
- `<script>` 태그를 이용하는 XSS 공격에 취약하다
- HTML5 에서는 script 태그를 입력했을 때 파싱하지 않는다
- onerror를 통한 공격에 여전히 취약하다
- HTML sanitization : DOMPurify 라이브러리로 예방 가능
- position : beforebegin, afterbegin, beforeend, afterend

**Document.prototype.createElement(tagName)**
**Document.prototype.createTextNode(text)**
**Node.prototype.appendChild(childNode)**
**Document.prototype.createDocumentFragment**
**Node.prototype.insertBefore(newNode, childNode)**
**Node.prototype.cloneNode([deep: true | false])**

- `deep: true` 자식노드까지 모두 복사
- `deep: false` 모든 자식 노드를 복사 하지 않는다

**Node.prototype.replaceChild(newChild, oldChild)**
**Node.prototype.removeChild(child)**

**Element.prototype.className**
**Element.prototype.classList**

- DOMTokenList 객체를 반환
- add(...className)
- remove(...className)
- item(index)
- contains(className)
- replace(oldClassName, newClassName)
- toggle(className)
- forEach, entries, keys, values, supports •••
