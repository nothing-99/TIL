```
"You Don't Know JS - this와 객체 프로토타입, 비동기와 성능"
```

this 바인딩은 함수를 실행하는 시점에 발생한다. 즉, 함수를 어떻게 실행하는지에 따라 this가 다르게 결정된다.

## This 에 대한 오해

**this는 함수 그 자체를 가리킨다**

```js
function foo() {
  this.count++;
}
foo.count = 0;
for (let i = 0; i < 5; i++) {
  foo();
}
console.log(foo.count); // 0
```

- foo 함수 객체 프로퍼티에 { count: 0 } 을 추가
- 만약 this가 foo 함수를 가리킨다면 결과가 5
- 하지만 출력은 0
- **this는 함수 그 자체를 가리킨다**는 성립하지 않는다.
- this.count를 보면 초기화를 하지 않아 NaN이고 NaN에는 숫자를 더할 수 없다.
- 2가지 방식으로 처리할 수 있다.

```js
// this 미사용
function foo() {
  foo.count++;
}
```

```js
// this 사용
for (let i = 0; i < 5; i++) {
  foo.call(foo);
}
```

**this는 함수 스코프를 가리킨다**

```js
function foo() {
  a = 2;
  this.bar();
}
function bar() {
  console.log(this.a);
}
foo(); // Reference Error
```

this를 통해 foo와 bar을 연결하려는 의도가 보이지만 참조에러가 발생한다. `this.bar()`는 우연히 참조에러가 발생하지 않았지만 `this.a`는 우연히로 피하지 못했다... 스코프도 아니다.

## This 바인딩

### 일반 함수 실행 ➡︎ 전역 객체 (or undefined) 할당

```js
function foo() {
  console.log(this.a);
}
a = 10;
foo(); // 10
```

일반적인 함수 호출은 this에 전역객체를 할당한다.

```js
function foo() {
  "use strict";
  console.log(this.a);
}
a = 10;
foo(); // reference error
```

**STRICT MODE** 에서는 this에 undefined를 할당한다. 이때, **전역에 선언한 것을 제외하고 함수를 호출하는 부분에서 STRICT MODE를 선언했을 때**는 this에 전역객체가 할당된다.

```js
function foo() {
  console.log(this.a);
}
a = 10;
function bar() {
  "use strict";
  foo();
}
bar(); // 10
```

### 객체 프로퍼티로 실행 ➡︎ 해당 객체 할당

. 연산자 바로 앞에 위치한 객체를 this에 할당한다고 보면 된다.

```js
const obj = {
  a: 10,
  foo: function () {
    console.log(a);
  },
};
obj.foo(); // 10
```

**실수**

```js
let foo = obj.foo;

foo(); // undefined
```

foo 에 obj.foo reference를 저장한 시점에서 obj를 벗어났기 때문에 `foo()` 는 일반 함수 호출 형태를 가지기 때문에 전역객체가 할당된다.

setTimeout과 같이 콜백함수를 넘겨 특정 이벤트 후에 실행되는 경우에도 this에는 일반 함수 호출 규칙이 적용 돼 전역객체가 할당된다.

즉, **obj 객체를 거치지 않고** 해당 함수 객체의 레퍼런스 값을 이용해 다이렉트로 접근해 호출 가능하다.

### call, apply, bind ➡︎ 인자로 넘긴 객체 할당

- call, apply 는 this 에 할당할 객체와 argument 를 넘겨 함수를 실행시킨다.
- bind 는 this 에 할당할 객체를 넘겨 this 에 할당한 함수를 리턴한다.

```js
function foo() {
  console.log(this.a);
}
const obj = { a: 10 };
foo.call(obj); // 10
foo.apply(obj); // 10
let bar = foo.bind(obj);
bar(); // 10
```

정보 : forEach 에는 callback 함수와 this 에 할당할 객체를 넘길 수 있다

```js
function foo() {
  console.log(this.name);
}
const obj = { name: "rare" };
[1, 2, 3].forEach(foo, obj);
// rare rare rare
```

### new ➡︎ 새로운 객체 생성 후 할당

new 연산자를 통해 함수를 호출하면 객체 내부 메서드를 `[[construct]]` 호출한다. 이 메서드를 호출함으로서 수행되는 단계가 있다.

1. 새로운 빈 객체 생성
2. `[[prototype]]` 연결
3. this 에 새로운 객체 할당
4. 객체를 반환하는 코드가 없다면 this 리턴

```js
function Foo() {
  // 1. 새로운 객체 생성
  // const obj = new Object({});
  // 2. [[prototype]] 연결
  // obj.prototype = Foo.prototype;
  // 3. this 에 새로운 객체 할당
  // this = obj;
  this._a = 10;
  this.getNumber = function () {
    return this._a;
  };
  // 4. this 반환
  // return this;
}

let obj = new Foo();

obj.getNumber();
```

### 적용 우선 순위

1. new
2. call, apply, bind
3. object property(method)
4. general function call

## 예외

특정 바인딩을 의도했지만 일반 함수 호출 바인딩이 일어나는 경우가 있다.

### call, apply, bind에 null or undefined 넘기기

null을 명시하는 이유는 apply를 이용해 배열을 펼쳐서 인자로 전달하기 위해 bind를 이용해 인자를 미리 설정해두기 위해서이다.

this를 위한 어떠한 객체도 명시하지 않았기 때문에 call, apply는 즉시 this에 전역 객체가 할당이 되고 bind 후 일반 함수 형태로 실행 시 전역 객체가 할당이 된다.

this를 이용한 코드가 있을 시 원하지 않는 결과를 낳을 수 있기에 좀 더 안전한 방법이 있다. 바로 빈 객체를 전달하는 것이다. 이 객체는 내용이 하나도 없고 전혀 위임되지 않는다. 즉, 어떠한 곳에서도 사용되지 않는다

```js
const dmz = Object.create(null);

foo.apply(dmz, [2, 3, 4]);
const bar = foo.bind(dmz, 2, 3);
bar();
```

> 📜 Spread Operation (...) 으로 인해 apply 를 사용하지 않아도 된다.

### 간접 레퍼런스

변수에 함수 객체를 할당한 후 호출하면 this 에 전역 객체가 할당된다.

```js
a = 0;
const o = {
  a: 1,
  foo: function () {
    console.log(this.a);
  },
};
const p = {
  a: 2,
};

(p.foo = o.foo)(); // 0
```

2가 아닌 0이 호출된다. 콘솔창에 `p.foo = o.foo` 를 출력해보면 **foo 함수가 리턴**되는 것을 볼 수 있고 해당 함수를 호출하기 때문에 **일반 함수 호출이 적용돼** this 에 전역 객체가 바인딩된다.

### arrow function

arror function은 위의 4가지 규칙을 따르기 보다는 상위 스코프의 this를 할당한다.
