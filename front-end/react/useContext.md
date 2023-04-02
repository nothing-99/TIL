## React - useContext

여러 컴포넌트에서 사용되는 state가 있고 데이터를 생성하는 컴포넌트와 데이터를 사용하는 컴포넌트의 거리가 먼 만큼 긴 props-chain을 통해 데이터가 전달된다. 만약 복잡한 리액트 앱이 있을 경우 복잡한 props-chain을 가질 수 있다. 이때 전역에서 사용되는 state-store을 만들 수 있고 컴포넌트 어디에서든 사용할 수 있도록 하는 존재가 있다. 그 존재가 바로 **Context**

context는 **여러 컴포넌트에서 사용되는 state를 관리**하는 데에 적합하다. props-chain을 제거할 필요가 있을 때 context 사용을 고려해 보자. 코드가 간결해지고 global state를 관리가 용이해진다.(무조건 정답은 아님)

하지만 문제를 유발할 수 있다.

## 문제

- **재사용 불가** : context를 통해 state를 바로 넘겨주는 경우 재사용을 못하는 컴포넌트가 될 수 있다.
- **성능 하락** : 자주 변경하는 state를 context를 통해 관리하는 경우 최적화가 돼 있지 않기 때문에 성능상 불이익을 얻을 수 있다.

(여러 컴포넌트에서 사용)props-chain이 너무 복잡하고 자주 변경되는 state의 경우 (Context 보다는) **Redux** 사용을 고려해 볼 수 있다.

## Context

- `createContext()` : context를 생성한다. **context는 Provider, Consumer 컴포넌트를 가지는 객체**이다. 초기값도 설정할 수 있다.
- `Provider` : context에서 관리하는 state를 공급하기 위한 컴포넌트이다. 데이터를 공급하기 위한 **value** props를 가진다.
- `Consumer` : context에서 관리하는 state를 사용하기 위한 컴포넌트이다. 해당 컴포넌트 내부에 함수가 와야하고 함수의 인자로 context를 넘겨준다.
- `useContext(context)` : Consumer 보다 더 간단히 context를 사용할 수 있는 리액트 훅이다.

```js
// myContext.js

import { createContext } from "react";

// context 생성
const MyContext = createContext();

export default MyContext;
```

```js
// index.js
// App 이하에 있는 모든 컴포넌트에 context를 공급한다.
// Consumer Component를 사용 or useContext를 사용
import MyContext from './myContext';

return (
	<MyContext.Provider value={{ state, setState }}>
		<App />
	<MyContext.Provider />
);
```

- MyContext.Provider를 리턴하는 컴포넌트 함수를 만들어서 사용할 수 있다. 사용 시 더욱 깔끔하게 사용 가능

```js
// myContext.js
export const MyContextProvider = (props) => {
  const [state, setState] = useState();
  return <MyContext.Provider value={{ state, setState }}>{props.children}</MyContext.Provider>;
};
```

```js
import { MyContextProvider } from "./myContext";

return (
  <MyContextProvider>
    <App />
  </MyContextProvider>
);
```

- MyContext.Consumer, useContext 사용하기

```js
// Consumer
import MyContext from './myContext';
return (
	<MyContext.Consumer>
		(context) => {
			return (
				<div>{context.state}</div>
			);
		}
	</MyContext.Consumer>
);
```

```js
// useContext
import MyContext from "./myContext";
const { state } = useContext(MyContext);
return <div>{state}</div>;
```
