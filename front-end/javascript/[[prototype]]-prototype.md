# `[[Prototype]]` | `prototype`

**`[[Prototype]]`**

- 객체 내부 슬롯으로 상속 받은 객체의 프로토타입 객체를 가리킨다
- `object.__proto__`, `Object.getPrototypeOf(object)`

**`prototype`**

- 객체의 프로토타입 객체를 가리킨다
- `object.prototype`

~~모든 객체는 자신의 **프로토타입 객체**를 가지고 있다.~~ 프로토타입 객체를 통해 부모객체, 부모객체로 부터 상속 받는 자식객체 관계가 만들어진다. 자식객체는 `[[Prototype]]` 에 부모객체의 참조값을 가지고 있다가 아니라 **부모객체의 프로토타입 객체**의 참조값을 가지고 있다.

**생성자 함수 객체를 통해 생성된 인스턴스 객체를 보자**

```js
function Language(name) {
  this.name = name;
}
Language.prototype.getName = function () {
  return this.name;
};

const js = new Language("Javascript");
const py = new Language("Python");

console.log(js.getName()); // Javascript
console.log(py.getName()); // Python
console.log(js.prototype); // undefined
console.log(js.__proto__ === py.__proto__); // true
console.log(Language.prototype === js.__proto__);
console.log(js.__proto__.constroctor.prototype === py.__proto__); // true
```

- 생성자 함수 객체의 프로토타입 객체는 `constructor` 속성으로 생성자 함수 객체의 참조값을 가진다.
- js와 py는 Language를 통해 생성된 instance 객체이고 `__proto__` 는 Language 함수 객체를 가리키지 않고 Language 함수 객체의 프로토타입 객체를 가리키고 있다.
- new 와 생성자 함수를 통해 반환되는 객체가 어떤 것인지 생각하면 **this 에 함수를 추가하는 방법**은 공유하는 방식이 아니라는 것을 알 수 있다.
