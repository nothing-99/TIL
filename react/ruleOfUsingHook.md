## React - Hook 사용 시 규칙

- 리액트 함수나 사용자 정의 훅 함수에서만 호출하자 : JSX를 리턴하는 리액트 컴포넌트 함수
- 사용할 때는 직할로만 사용하자 : 함수가 평가될 때 스코프에 등록되도록!!
- (useEffect 한정) effect, cleanup 함수에서 참조되는 모든 항목을 dependencies 에 추가하자
  - state update 함수는 예외
  - 내장 API or 함수 예외
  - 컴포넌트 외부에서 정의한 변수나 함수 예외
