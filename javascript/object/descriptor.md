# Descriptor

객체 프로퍼티는 2가지로 분류할 수 있다. 
- Data Property
- Access Property

대부분의 프로퍼티는 "데이터 프로퍼티" 로 분류할 수 있고 "접근자 프로퍼티" 인 특수한 프로퍼티를 설정할 수 있다. 데이터 프로퍼티와 접근자 프로퍼티의 차이는 Property Descriptor 에서 쉽게 볼 수 있다.

## Data Property || Access Property
- data property
  - **value** : 프로퍼티 값 설정
  - **writable** : 값 변경 가능 여부
  - **enumerable** : 객체 프로퍼티 순회 포함 여부
  - **configurable** : Descriptor 변경 가능 여부
- Access Property
  - **get** : getter 정의
  - **set** : setter 정의
  - **enumerable** : 객체 프로퍼티 순회 대상 가능 여부
  - **configurable** : Descriptor 변경 가능 여부

접근자 프로퍼티의 `get`, `set` 특성은 함수의 형태를 가진다. 이름 그대로 get 은 접근자 프로퍼티로 부터 데이터를 얻는 함수이고 set 은 접근자 프로퍼티로 특정 데이터의 값을 업데이트하는 함수이다. 그렇다고 접근자 프로퍼티를 함수처럼 `()` 를 뒤에 붙여서 사용하지 않는다.

## 생각
- **descriptor 의 default 값은 경우에 따라 다르다.**
```js
const obj = {};

// first case
obj.a = 1;
// second case
Object.defineProperty(obj, 'b', { value: 2 });
```

**obj.a**, **obj.b** 의 각 Descriptor 에서 value 를 제외한 나머지는 어떤 값으로 설정되었을까?
```js
const descriptorA = Object.getOwnPropertyDescriptor(obj, 'a');
const descriptorB = Object.getOwnPropertyDescriptor(obj, 'b');

console.log(JSON.stringify(descriptorA, null, 2));
console.log(JSON.stringify(descriptorB, null, 2));
```
```json
// obj.a descriptor
{
  "value": 1,
  "writable": true,
  "enumerable": true,
  "configurable": true
}

// obj.b descriptor
{
  "value": 2,
  "writable": false,
  "enumerable": false,
  "configurable": false
}
```

- **`configurable: false` 일 때, Descriptor 의 모든 내용이 변경 불가능할까?**
답은 No!! 봤을 때 2가지 경우 변경 가능했다.
  - writable 에 대해서 false -> true 로 변경 가능
  - value 에 대한 변경은 configurable 과는 상관없고 오직 writable 과 관련 
```js
const obj = { a: 5, };
console.log(JSON.stringify(Object.getOwnProperty(obj, 'a'), null, 2));
// { value: 5, writable: true, enumerable: true, configurable: true }

// 변경 불가!!
Object.defineProperty(obj, 'a', { configurable: false });

Object.defineProperty(obj, 'a', { value: 10 }); // success
Object.defineProperty(obj, 'a', { writable: false }); // success
Object.defineProperty(obj, 'a', { enumerable: false }); // error
Object.defineProperty(obj, 'a', { configurable: false }); // error

obj.a = 20; // 'use strict' 사용 시 error!
console.log(obj.a) // 10
```

## 객체 불변 단계
1. **Object.preventExtensions(obj)** 
    - 프로퍼티 추가를 억제한다.
    - 프로퍼티 삭제는 가능하다. 
    - 프로퍼티 삭제 후 다시 추가?? 안된다.
2. **Object.seal(obj)**
    - **Object.preventExtensions(obj)** 받고 모든 프로퍼티의 `configurable` 를 false 로 변경한다.
    - 프로퍼티 삭제나 프로퍼티 재설정이 불가능해진다. (아직 값 변경은 가능)
3. **Object.freeze(obj)**
    - **Object.seal(obj)** 받고 모든 프로퍼티의 `writable` 를 false 로 변경한다.
    - 프로퍼티 값 변경도 불가능해진다.

이것은 대상 객체와 객체 직속 프로퍼티에만 적용되는 내용이다. 즉, 프로퍼티가 객체를 가리키는 레퍼런스일 경우 가리키고 있는 객체나 그 객체의 프로퍼티에는 적용되지 않는다.

만약 이것까지 포함해서 완전한 불변 객체를 원한다면 순환하면서 모든 객체에 대해서 **Object.freeze()** 를 적용해야 할 것이다. 

**하지만 이렇게 해야 하는 경우도 거의 없고 해야 한다면 코드 작성 방향을 새롭게 해야할 것이다.**

```js
let obj = {
    a: 1,
    b: [1, 2, 3],
    c: {
        a: 2,
        c: {
            a: () => { console.log(this); },
            b: {
                d: '1',
            }
        },
    },
};
const queue = [obj];
while (queue.length) {
    const freezed = queue.shift();
    Object.freeze(freezed);
    for (let key in freezed) {
        const type = typeof freezed[key];
        if (type === 'object') 
            queue.push(freezed[key]);
    }
}
console.log("success");
console.log(JSON.stringify(Object.getOwnPropertyDescriptors(obj), null, 2));
console.log(JSON.stringify(Object.getOwnPropertyDescriptors(obj.c), null, 2));
console.log(JSON.stringify(Object.getOwnPropertyDescriptors(obj.c.c), null, 2));
console.log(JSON.stringify(Object.getOwnPropertyDescriptors(obj.c.c.b), null, 2));
```
```json
// 모든 프로퍼티의 writable, configurable 이 false 로 설정된 것을 볼 수 있다.
{
  "a": {
    "value": 1,
    "writable": false,
    "enumerable": true,
    "configurable": false
  },
  "b": {
    "value": [
      1,
      2,
      3
    ],
    "writable": false,
    "enumerable": true,
    "configurable": false
  },
  "c": {
    "value": {
      "a": 2,
      "c": {
        "b": {
          "d": "1"
        }
      }
    },
    "writable": false,
    "enumerable": true,
    "configurable": false
  }
}
Script snippet #1:26 {
  "a": {
    "value": 2,
    "writable": false,
    "enumerable": true,
    "configurable": false
  },
  "c": {
    "value": {
      "b": {
        "d": "1"
      }
    },
    "writable": false,
    "enumerable": true,
    "configurable": false
  }
}
Script snippet #1:27 {
  "a": {
    "writable": false,
    "enumerable": true,
    "configurable": false
  },
  "b": {
    "value": {
      "d": "1"
    },
    "writable": false,
    "enumerable": true,
    "configurable": false
  }
}
Script snippet #1:28 {
  "d": {
    "value": "1",
    "writable": false,
    "enumerable": true,
    "configurable": false
  }
}
```

## 참조
- You Don't Know JS : this와 객체 프로토타입, 비동기와 성능 