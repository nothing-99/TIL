# flex

**부모 요소를 flexbox로 만듦**으로서 자식 요소들의 위치를 제어할 수 있게 된다.

**display: flex**

- flexbox로 만들기

```html
<div class="wrapper">
  <div></div>
  <div></div>
  <div></div>
</div>
```

```css
.wrapper {
  display: flex;
  height: 100vh;
}
```

**flex-direction**

- main-axis를 결정한다.
- `display:flex`의 기본 main-axis는 row임

```css
flex-direction: row;
/*  main-axis : row
 *  cross-axis : column
 */
flex-direction: column;
/*  main-axis : column
 *  cross-axis : row
 */
```

**justify-content**

- main-axis에 대해서 요소들의 위치를 설정한다

**align-items**

- cross-axis에 대해서 각 요소들의 정렬한다.

> 📜 항상 부모 요소 즉, flexbox 내에서 위치가 설정된다. 위치가 변경되지 않아도 당황하지 말고 flexbox의 width, height를 확인해보자

**align-content**

- `flex-wrap: wrap` 일때만 적용된다.
- cross-axis에 대해서 **각 라인들을 하나의 요소로 보고** 정렬한다

**align-self**

- 하나의 요소를 cross-axis에 대해서 위치를 설정한다

**order**

- 하나의 요소의 순서를 변경할 수 있다
- HTML의 수정없이 CSS로 순서를 변경할 수 있다. 그래서 개발자 도구를 확인 해보면 html 파일에는 변경이 되지 않음을 볼 수 있다.
- 모든 요소의 기본값은 0
- order 비교 -> HTML 순서 비교를 통해 위치가 결정됨을 볼 수 있다.

**flex-wrap**

- **nowrap**
  - flexbox의 기본값
  - 하나의 일직선 상에 모든 요소를 위치시키도록 한다. 이때 요소의 정해진 크기는 신경쓰지 않는다.
- **wrap**
  - "최대한" 한줄로 유지하되 자식 요소의 크기를 고려해 다음줄로 넘긴다.
  - **cross-start** ➡︎ **cross-end** 방향으로 요소들을 배치해 나간다
- **wrap-reverse**
  - **cross-end** ➡︎ **cross-start** 방향으로 요소들을 배치해 나간다

**flex-shrink**

- `flex-wrap: nowrap`이고 요소의 정해진 크기를 보존하면서 한 줄에 위치시킬 수 없을 때, \*\*특정 요소만 더 또는 덜 줄어들게 할 수 있다.
- 기본값은 1
- `flex-shrink: 3` : 다른 요소와 비교해서 (1:) 3배 정도 더 찌그러든다.

**flex-grow**

- main-axis의 빈 공간을 정해진 비율로 차지한다.

**flex-basis**

- **main-axis 에서의 최초 길이**를 정해준다.
- flexbox 에서 **자식 요소의 초기 너비(or높이)를 정해주는 것 뿐** 윈도우의 크기가 변할 때 flex-shrink, flex-grow 에서 정해준 비율에 따라 크기가 변한다. (고정되는 크기가 아님)
