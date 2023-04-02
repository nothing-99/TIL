# this
렉시컬 스코프와 달리 this는 호출 방법에 따라 바인딩 값이 동적으로 달라진다. 함수의 상위 스코프를 결정하는 `렉시컬 스코프`는 함수를 평가할 때 함수 객체가 생성되는 시점에 정해지고 `this`는 함수 호출하는 시점에 정해진다.
> 절대로 this는 그 자체로 자기 자신 또는 자신의 스코프를 가리키지 않는다. 오로지 함수 호출과 관련 있다.

- 일반 함수 호출 
- 메서드 호출
- new 생성자 함수 호출
- call, apply, bind 메서드를 통한 함수 호출

## 일반 함수 호출
일반 함수 호출과 함께 기본적으로 `this` 에는 전역객체가 바인딩된다. 단, `use strict` 에서는 **undefined** 가 바인딩된다.
```js
// 전역객체에 { a : 10 } 프로퍼티 추가
var a = 10;
function foo() {
  console.log(this.a);
}
function bar() {
  'use strict'
  console.log(this);
  // console.log(this.a) -> Uncaught TypeError: Cannot read properties of undefined (reading 'a')
}
// this는 함수 호출 시점에 바인딩된다.
// 일반 함수 호출은 기본적으로 this에 전역객체 할당
foo(); // this.a => window.a
bar(); // undefined
```

## 객체에 의한 호출
특정 객체에 의해 호출되는 경우 **this에는 해당 객체가 바인딩**된다. 여러개의 객체가 연결된 형태에서는 가장 마지막에 위치한 객체가 this에 바인딩된다. this-binding 에서는 무조건 함수 호출 부분에만 집중해야 한다.
```js
const rayc = {
  name: 'rare apepe yc',
  getName: getName,
};
const mk = {
  name: 'meta kongz',
  getName: getName,
  rayc: rayc,
};
function getName() {
  return this.name;
}
// rayc의 객체가 getName을 호출했기 때문에
// getName에서의 this는 rayc가 된다.
console.log(mk.rayc.getName()); // rare apepe yc
console.log(mk.getName()); // meta kongz
```

> **[생각]** class를 이용한 메서드 함수나 위의 방식으로 객체에 함수 프로퍼티를 가지게 할 때 해당 객체나 클래스 인스턴스들이 메서드 본체를 가지고 있는 것이 아니다. 해당 함수 객체는 별도로 만들어지고 각 객체들은 해당 함수 객체의 참조값을 프로퍼티의 값으로 가지고 있을 뿐이다. (단지 참조하는 것 뿐)

객체를 통한 함수 호출은 this 에 호출한 객체가 할당된다고 했다. (함수 호출 시점에!!) But, 비 유 티 ! 객체의 함수 프로퍼티를 다른 변수에 할당한 후 실행하면 this에는 일반함수호출처럼 this가 바인딩된다. 아래 3가지를 생각하면 쉽게 이해할 수 있다.

- 함수는 별도의 함수 객체상태로 존재하고 객체는 함수객체의 참조값을 가진다
- 일반함수 호출은 this에 전역 객체 또는 undefined 가 할당된다.
- this는 오로지 함수호출과 관련있다.

```js
var name = 'nothing';
const rayc = {
  name: 'rare apepe yc',
  getName: getName,
};
function getName() {
  console.log(this.name);
}
const nothing = rayc.getName;
nothing(); // nothing

```


## 참조
- 모던 자바스크립트 Deep Dive
- You don't know js [한글판]