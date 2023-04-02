## React - useImperative

부모 컴포넌트가 자식 컴포넌트를 참조할 수 있도록 한다. 자식 컴포넌트에서 `React.forwardRef`, `useImperativeHandler` 를 사용하면 부모 컴포넌트에서 자식 컴포넌트를 참조할 수 있게 된다. 일반적으로 useRef()를 사용하면 DOM에 접근할 수 있게 되는데 useRef, React.forwardRef, useImperativeHandler 세트를 사용하면 자식 Comnponent에 접근할 수 있게 되는 느낌!!

단이 useRef 와 같이 리액트에 의해 완전히 컨트롤 되는 방식이 아니기 때문에 되도록이면 사용해야할 때만 사용하자. 긜고 **컴포넌트의 독립성이 줄어들기도 한다**

```js
useImperativeHandler(ref, createInstance, [deps]);
```

- ref : 부모로부터 전달받은 'ref'
- createInstance : 부모컴포넌트에 노출하려는 인스턴스 값을 정의한 함수
- [deps] : dependencies의 변경에 따라 인스턴스 값 업데이트

```js
import React, { useRef, useImperativeHandler, forwardRef } from "react";

const ChildComponent = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandler(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));

  return <input ref={inputRef} />;
});

export default ChildComponent;
```

- 일반적으로 리액트에서 "ref" 는 예약어라서 임의의 변수 이름으로 사용할 수 없는데 forwardRef 를 사용함으로써 ref를 인자로 받을 수 있게 된다.
- `focus: inputRef.current.focus`로 콜백을 넘겨주는 형태로 했지만 `TypeError: Illegal invocation` 오류의 행진을 봤음. **this binding** 문제로 리액트에서 잡아준 듯 하다.
- 위의 useImperativeHandler는 컴포넌트가 렌더링될 때마다 실행되기에 대체적으로 inputRef는 변경되지 않기에 (변경되지 않는 경우만) dependencies로 빈 배열을 추가하면 최초 실행 한번만 실행되도록 할 수 있다.

```js
import React, { useRef } from "react";
import ChildComponent from "./ChildComponent";

function ParentComponent() {
  // 자식 컴포넌트를 간접적으로 참조하기 위한 리액트 변수
  const childRef = useRef();

  const handleClick = () => {
    // 참조
    childRef.current.focus();
  };

  return (
    <div>
      <ChildComponent ref={childRef} />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}

export default ParentComponent;
```
