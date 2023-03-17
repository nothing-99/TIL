# useEffect

리액트 컴포넌트의 최종 목적은 UI를 구성하는 것이다. 컴포넌트의 최종 목적을 위한 작업과 직접적으로 관련 없는 작업들을 **"side-effect"** 라고 한다. 이 사이드 이펙트는 컴포넌트 내부가 아닌 외부에서 작동하는 것이 좋다. (HTTP 요청, 브라우저 저장소에 데이터 저장, 타이머 설정 등)

예를 들어, 외부로 요청을 보내고 받은 데이터를 state 변수에 저장한다고 해보자. 함수 컴포턴트가 렌더링을 위해 실행이 되고 데이터 응답을 위한 요청을 보낸다. 요청에 대한 데이터를 받고 state 가 변경되었기에 새로 함수 컴포넌트를 실행하고 요청을 보낸다. 이것을 반복하면서 무한루프에 빠지는 문제가 발생할 수 있다.

```js
useEffect(
  () => {
    /* effect */
    return () => {
      /* cleanup */
    };
  },
  [
    /* dependencies */
  ]
);
```

1. 최초 실행시 함수 컴포넌트의 평가가 끝난 후 EFFECT 함수만 실행된다.
2. 함수 컴포넌트와 대응되는 DOM이 언마운트될 때 CLEANUP, EFFECT 함수가 실행된다.
3. dependencies 가 변경될 때 CLEANUP, EFFECT 함수가 실행된다

즉, 함수 컴포넌트의 UI 렌더링과 useEffect 함수의 실행이 직접적으로 큰 관계가 없다는 것을 알 수 있다.

## dependencies

**"의존성"** 에는 어떠한 것들이 들어가면 될까? 단순하게 useEffect 내부 함수에서 사용되는 모든 요소를 집어 넣으면 된다. 이때, 예외가 존재한다.

- **setState 함수를 사용시 해당 함수는 추가할 필요 없다** : 리액트가 setState 함수가 변경되지 않음을 보장하기 때문에 변경될 일이 없고 변경되서도 안된다.
- **브라우저 내장 API / 함수를 추가할 필요 없다** : 리액트 구성요소 렌더링 주기와 전혀 상관없기 때문이다.
- **컴포넌트 외부에서 정의한 변수나 함수를 추가할 필요 없다** : 외부에서 정의한 것들이라 내부 구성요소에 직접적으로 영향을 주지 않기 때문 (스코프 생각해보면 될듯)

`컴포넌트 함수 내부에서 정의된 variable, state, props, function 이 렌더링 되어 변경될 수 있는 경우 "dependencies" 에 추가해야 한다.`

## 예시

- localStorage 에서 로그인 여부 데이터를 받아와서 새로고침을 해도 로그인 했을 때 볼 수 있는 요소가 보이도록하자

```js
/*  dependencies 가 없는 빈 배열이 2번째 인자로 왔기 때문에
 *  최초 한번 실행된 후 언마운트 될때까지 실행되지 않는다.
 */
useEffect(() => {
  const isLoggedIn = localstorage.getItem("isLoggedIn");
  setIsLoggedIn(isLoggedIn);
}, []);
```

- 2번째 인자를 주지 않아보자

```js
/*  useEffect 를 사용하지 않은 것과 같다.
 *  함수 컴포넌트가 실행될 때마다
 *  useEffect 내부 EFFECT 함수 부분이 실행된다
 */
useEffect(() => {
  console.log("hello");
});
```

- 디바운싱

```js
// 최초 한번 함수 컴포넌트 실행시에는 setTimeout 만 실행된다.
useEffect(() => {
  /*  dependencies의 변경으로 useEffect 함수가 실행되면
   *  clearTimeout으로 타이머를 제거하고 --- (1)
   *  setTimeout으로 타이머를 생성한다 --- (2)
   *  변경이 일어나지 않는다면 1초 후 callback 함수를 실행한다.
   */
  const timeId = setTimeout(..., 1000);
  return () => {
    clearTimeout(timeId);
  }
}, [...])
```

- 특정 dependencies 의 변경이 일정 시간동안 없을 시 한번의 callback 함수가 실행되도록 할 수 있다.

- CLEANUP 함수에서 `clearTimeout` 을 실행하지 않는다면 중복 다수의 setTimeout 에 의한 callback 함수들이 실행된다.
