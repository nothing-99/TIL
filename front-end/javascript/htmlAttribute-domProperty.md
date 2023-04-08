# Attribute Node

- HTML 파싱할 때 HTML요소의 attribute 1개당 1개의 Attribute 노드를 생성한다. 생성된 Attribute 노드들의 참조는 유사 배열 객체면서 이터러블인 **NamedNodeMap** 객체에 저장되고 `DOM.attributes`를 통해 접근가능하다.
- Element 노드 객체에도 각 attribute 와 대응되는 프로퍼티가 생성된다. (무조건 1:1로 대응되는 것은 아님)
- HTML parsing ➡︎ attribute node 생성 ➡︎ NamedNodeMap 객체 생성 ➡︎ attributes 프로퍼티로 참조
- HTML parsing ➡︎ HTML attribute 에 대응될 수 있는 DOM property 생성
- ~~정확한 순서는 모르지만 큰 방향은 이런 듯...~~

**Element.prototype.getAttributes(attributeName)**
**Element.prototype.setAttributes(attributeName, attributeValue)**
**Element.prototype.hasAttribute(attributeName)**
**Element.prototype.removeAttribute(attributeName)**

- attributes 프로퍼티에 접근하지 않고 요소 노드에서 지원하는 메서드로 attribute node 값을 획득, 수정, 존재여부를 확인할 수 있다

## Attribute Node | DOM property

- 사용자와의 상호작용으로 element attribute 가 변경될 수 있는데 이때 변경되는 것은 attribute node 가 아닌 **element node 의 프로퍼티** 값이다.
- attribute node 값을 수정할 때는 무조건 **setAttributes** 메서드를 사용해야 한다
- attribute node 의 값은 무조건 string 이지만 DOM property 는 아닐 수 있다.
- 일반적으로 attribute node 는 **HTML 속성의 초기값**, DOM property 는 **최신값**을 나타낸다고 할 수 있다. (무조건은 아님,, 메서드를 통해 attribute node 도 변경 가능)
