# 스코프

`Scope` 는 **식별자의 유효범위** 이다. 변수, 클래스, 함수, 객체 등을 사용할 때 해당 식별자를 사용할 수 있는 범위이다. (다른 프로그래밍 언어도 같음) 자바스크립트 엔진은 식별자의 값을 참조할 때 스코프를 보고 값을 참조한다.

```js
var text = 'global';
function foo() {
  var text = 'foo';
  console.log(text);
  function innerFoo() {
    var text = 'foo';
  }
}
function bar() {
  var text = 'bar';
  console.log(text);
}
console.log(text); // 'global'
foo(); // 'foo'
bar(); // 'bar'
```

위 코드를 보면 3개의 스코프가 존재한다.
- 전역 스코프
- foo 지역 스코프
- innerFoo 지역 스코프
- bar 지역 스코프

각 함수에서 선언된 식별자들은 각 함수의 스코프에 저장된다. 그리고 자신의 상위 스코프의 참조 값을 가진다. 이것을 이용해서 상위 스코프에 존재하는 식별자들에 대한 접근이 가능해진다. **(스코프 체인)**

[ innerFoo ] => [ foo ] => [ global ]

하위 스코프가 상위 스코프로의 참조 즉, 단방향으로 연결되어 있기 때문에 상위 스코프에서 하위 스코프로의 식별자 접근은 불가능하다. 

## Lexical Scope (Static Scope)

Lexical Scope는 자바스크립트가 상위 스코프를 결정할 때 따르는 정책이다. 2가지 정책이 존재한다.

- Dynamic Scope : 함수를 호출한 위치에 따라 상위 스코프 결정
- Static Scope : 함수를 정의한 위치에 따라 상위 스코프 결정

대다수의 프로그래밍 언어들은 렉시컬 스코프를 따르고 있다. 자바스크립트 또한 그렇다.

```js
let nft = 'RAYC';
function bayc() {
  let nft = 'BAYC'
  nft();
}
function nft() {
  console.log(`my avorite nft is ${nft}`);
}
```

> **this binding**과 헷갈리지 말자!