# copy in object
복사 정도에 따라 shallow copy, deep copy로 구분한다. 내용물까지 완전히 별도의 존재라면 deep copy, 일부 내용물은 같은 대상을 가리킨다면 shallow copy 이다.

```js
let arr = [1, 2, 3];
const obj = { first: 1, second: 2, };
const obj1 = {
    number: 100,
    array: arr,
    object: obj,
};
```
- `{ first: 1, second: 2 }` `{ number: 100, ••• }` 이 두 객체는 별도의 공간에 저장되고 `obj`, `obj1` 은 각각 객체의 주소값을 가지는 레퍼런스 변수이다.

```js
const obj2 = obj1;
console.log(obj1 === obj2) // true
```
- obj1, obj2 는 같은 객체를 가리키고 있기 때문에 copy라고 볼 수 없다.

```js
const obj2 = Object.assign({}, obj1);
console.log(obj1 === obj2) // false
console.log(obj1.object === obj2.object) // true
```
- obj1, obj2 는 서로 다른 객체를 가리키고 있기 때문에 copy 이다.
- obj1, obj2의 object 프로퍼티는 동일한 객체를 가리키고 있기 때문에 shallow copy 이다.
- `Object.assign(target, src[, src2, •••])`은 target object 에 1개 이상의 source object 의 `enuerable: true` 인 프로퍼티들을 "**=**" 할당을 통해 복사한다.

```js
const obj2 = JSON.parse(JSON.stringify(obj1));
console.log(obj1 === obj2) // false
console.log(obj1.ogject === obj2.object) // false
console.log(obj1.array === obj2.array) // false
```
- obj1, obj2 는 서로 다른 객체를 가리키고 있기 때문에 copy 이다.
- obj1, obj2의 object 프로퍼티는 서로 다른 객체를 가리키고 있기 때문에 deep copy 이다.
- 하지만 완전한 방법은 아니다. 

## arr의 값을 바꾸면 어떻게 될까?
```js
// array를 let으로 선언한 이유~ 
// 우선은 const로 선언하고 이후 변경해야할 경우 let으로 선언하자.
arr = [1, 2, 3];
console.log(obj1.array === arr)
```
obj1.array, arr 모두 [1, 2, 3]을 가지는 것 같은데?? 콘솔창에서 `false`를 볼것이다. 함수객체도 별도의 공간에 생성되는데 배열객체도 당연하게 별도의 공간에 저장된다. 

js engine은 처음 `let arr=[1, 2, 3]`을 실행할 때 `[1, 2, 3]` 배열 객체를 생성해서 arr에 배열 객체의 주소값을 저장한다.

이후 `arr=[1, 2, 3]`을 실행할 때 js engine은 새로운 `[1, 2, 3]` 배열 객체를 생성해서 arr에 이 새로운 배열 객체의 주소값을 저장한다.

이로인해 obj1.array 와 arr 은 서로 다른 값을 가지게 되는 것이다!!! 

```js
// JSON을 이용한 deep copy, arr 새로운 배열 할당 이후 
console.log(arr === obj1.array); // fasle
console.log(arr === obj2.array); // fasle
console.log(obj1.array === obj2.array); // fasle
```
## 참조
- You Don't Know JS : this와 객체 프로토타입, 비동기와 성능 