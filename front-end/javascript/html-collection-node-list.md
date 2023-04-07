# HTMLCollection | NodeList

- 유사 객체 배열이고 이터러블이여서 **for...of** **spread** 문법을 사용할 수 있다
- DOM 요소 객체를 인자로 가지고 있다
- HTMLCollection은 **Live**이고 NodeList는 **no-Live**이다.
- Live의 경우 실시간 변경이 반영된다는 것이다.
- NodeList.children 을 통해 Live NodeList를 얻을 수 있다.
- **spread** 문법을 이용해 배열로 만든 후 조작하는 것이 좋다

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="./styles.css" />
    <style>
      .red {
        color: red;
      }
      .blue {
        color: blue;
      }
    </style>
  </head>
  <body>
    <ul>
      <li class="red">first</li>
      <li class="red">second</li>
      <li class="red">third</li>
    </ul>
    <script>
      // HTMLCollection
      const $elems = document.getElementsByClassName("red");

      for (let i = 0; i < 3; i++) {
        $elems[i].className = "blue";
      }
    </script>
  </body>
</html>
```

- **i == 0** : 첫번째 요소의 클래스가 blue로 바뀌면서 `ClassName == 'red'` 조건으로 모은 HTMLCollection 에서 빠지게 된다. 고로 한칸씩 당겨진다.
- **i == 1** : 현재 HTMLCollection은 [second, third] 형태로 third 의 클래스를 blue 로 바꾸게 된다. 마찬가지로 third 도 빠지게 된다.
- **i == 2** : 현재 HTMLCollection은 [second] 형태라서 `index == 2` 는 undefined 라 TypeError가 발생한다.
- first, third는 파란색, second는 빨간색
