# method?
일반적으로 메서드는 "**객체에 속해있는 함수**" 를 일컫는다. 그럼 자바스크립트에서도 객체 안에 있는 메서드가 객체에 속해 있는 함수일까? 답은 "**NO**"

```js
const obj = {
  method: function() { console.log('나는 객체에 속해 있을까?'); },
};
```
`obj.method` 는 `function() { ••• }` 함수객체를 가지는 것이 아니라 함수객체가 저장된 위치(주소)값을 가진다. 즉, 해당 함수 객체를 가리키는 **레퍼런스(또는 포인터)** 이다.

```js
const func = obj.method;

// 실행
obj.method();
func();
```
자스의 객체 메서드가 함수객체의 주소값을 가지기 때문에 위의 코드는 정상적으로 작동한다 (오류 없음) **`obj.method` 와 `func` 은 같은 함수객체를 가리키는 레퍼런스이다**. 이 2개의 유일한 차이는 this binding 뿐... ~~그럼 메서드라고 불러야할까, 함수라고 불러야할까? 그냥 흐름에 맡길란다.~~

> this-binding 은 함수 정의 부분 기준이 아니라 함수 실행 부분을 기준으로 한다. 일반적인 함수 호출은 global 객체가 바인딩되고 객체에 의한 함수 호출은 호출한 객체가 바인딩된다.

## 참고
- You Don't Know JS : this와 객체 프로토타입, 비동기와 성능 