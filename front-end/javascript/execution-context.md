# Execution Context

자바스크립트 엔진은 `Call Stack` 을 가지고 있다. 콜스택에는 `Execution Context` 가 저장되는데 콜스택의 top 부분에 있는 실행 컨텍스트가 현재 실행중인 코드를 가지고 있는 부분이다. 실행 컨텍스트의 2가지 역할을 알 수 있다.

- 콜스택을 통해 **코드의 실행순서를 컨트롤** 한다. 함수가 호출되면 해당 함수의 실행 컨텍스트가 생성되고 콜스택에 push 되고 종료되면 콜스택에서 pop!
- 실행 컨텍스트는 실행코드 뿐 아니라 **실행에 필요한 모든 데이터들을 가지고 있는 자료구조** 이다.
