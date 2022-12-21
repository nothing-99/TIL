# Wrapper Object

~~(JS에만 국한된 개념은 아닌걸로 알고 있다. 예전 자바 공식 문서에서도 Wrapper Object를 본 기억이...)~~

내장객체를 가지고 있다. `String` `Number` `Boolean` `Function` `Object` `Array` `RegExp` `Date` `Error`. 자바, C++, 파이썬에서의 클래스와 같은 형태를 가지고 있지만 엄밀히 말해 클래스가 아니다. **해당 타입의 객체를 생성하기 위한 생성자 함수이다** 

> **[참고]** Primitive type data 
> `number` `string` `boolean` `undefined` `null object` `symbol`

```js
'abcd'.length // 4
```
`'abcd'`는 "primitive type data" 이다. 즉, 프로퍼티를 가지는 객체가 아니다. 그런데 `.` 프로퍼티 접근 연산자를 사용해서 "length" 프로퍼티에 접근하고 에러도 발생하지 않는다... 다시 말하지만 `abcd` 는 string 타입의 primitive 타입 데이터이다. 객체가 아니다!!

**이것이 가능한 이유는 자스엔진이 일시적으로 `new String('abcd')` 를 통해 래퍼객체를 생성하기 때문이다.**

- Number, String 으로 생성한 객체의 메서드를 사용하기 위해 "new" 연산자를 통해 객체를 생성해야하는가? 절대 아니다!! JS엔진이 알아서 래퍼객체를 생성해주기 때문에 그냥 리터럴 방식으로 생성하면 된다. JS커뮤니티도 리터럴 방식을 적극 권장한다고 한다.

> **[참고]** JS에서는 함수도 객체의 형태로 저장된다. 

## 참고
- You Don't Know JS : this와 객체 프로토타입, 비동기와 성능 