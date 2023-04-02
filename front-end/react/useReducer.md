# useReducer

`useState` 와 결은 비슷하지만 좀 더 복잡하고 복잡한 만큼 추가적인 기능을 가진다.

```js
const [state, dispatchFn] = useReducer(reducerFn, initialState, initialFn);
const reducerFn = (prev, action) => {
  return newState;
};
```

- **state** : useState와 같이 현재 state snapshot
- **dispatchFn** : useState는 리액트에 state에 대한 새로운 값을 전달해주는 함수인 반면 useReducer는 reducerFn에 특정 _action_ 정보를 전달하는 함수 (argument를 통해)
- **reducerFn** : 리액트는 reducer 함수에 state 에 대해서 가장 최신 snapshot 정보인 **"prevState"**, dispatch 로 부터 받은 **"action"** 을 매개변수로 전달한다. 2개의 정보를 가지고 새로운 state 가 될 데이터를 리턴 (dispatch로 부터 전달받은 "action"에 따라 다른 값을 newState 로 전달할 수 있다)
- **initialState** : 초기 state
- **initialFn** : 초기 state 를 설정할 함수 (http request, ajax 등)

## 코드

이메일 데이터

```js

```
