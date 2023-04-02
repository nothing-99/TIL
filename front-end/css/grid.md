# grid

flex와 마찬가지로 grid 구조를 만들기 위해 wrapper 요소에서 설정한다.

**grid-template-columns**
**grid-template-rows**

- 원하는 column의 개수만큼 각 column의 원하는 크기를 기입하면 기입한 크기의 columns들이 생긴다. (row도 마찬가지)
- px, rem, % 등 다양한 크기 단위로 작성 가능하다.
- fr을 통해 비율로도 크기를 줄 수 있다.
- **repeat(n, size)** : 반복된 경우 이렇게 함수를 이용해 간단히 표현할 수 있다.
- 각 라인을 시발점으로 너비를 지정해주는 느낌이다.

```css
grid-template-columns: 1fr 1fr 1fr 1fr;
grid-template-columns: repeat(4, 1fr);
grid-template-columns: repeat(3, 1fr) 1fr;
```

**gap**
**row-gap**
**column-gap**

- row와 column 사이의 간격을 정할 수 있다.
- **gap**을 통해 row-gap과 column-gap을 한 번에 정할 수 있다.
  - `gap: gap` or `gap: row column`

**grid-template-areas**
**grid-area**

- layout을 디자인 한다..
- grid-area를 통해 layout를 구성할 요소들의 이름을 작성한다.
- grid-template-areas를 통해 요소들을 배치시켜 layout을 디자인한다.
- 이때 grid-template-columns, grid-template-rows를 통해 column, row 의 크기를 줄 수 있는데 layout한 column row의 개수를 고려해서 줘야한다.
- auto를 통해 가능한 한 많은 공간을 차지하게 할 수 있음.(화면 전체를 사용한다)

```html
<div class="wrapper">
  <div class="header">Header</div>
  <div class="content">Content</div>
  <div class="nav">Nav</div>
  <div class="footer">Footer</div>
</div>
```

```css
.wrapper div {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2rem;
}

.wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 50px repeat(2, 1fr) 50px;
  grid-template-areas:
    "header header header header"
    "content content content nav"
    "content content content nav"
    "footer footer footer footer";
  height: 100vh;
}
.header {
  background: salmon;
  grid-area: header;
}
.content {
  background: brown;
  grid-area: content;
}
.nav {
  background: bisque;
  grid-area: nav;
}
.footer {
  background: aquamarine;
  grid-area: footer;
}
```

**grid-column-start**
**grid-column-end**
**grid-row-start**
**grid-row-end**

- grid 요소들이 차지하는 범위를 각 요소별로 설정할 수 있다.
- 중요한 것은 시작과 끝을 정하는 기준이 "선" 이라는 것이다.
- "몇번째 선에서 몇번째 선까지"

```css
.header {
  background: salmon;
  grid-column-start: 1;
  grid-column-end: 5;
}
.content {
  background: brown;
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 4;
}
.nav {
  background: bisque;
  grid-row-start: 2;
  grid-row-end: 4;
}
.footer {
  background: aquamarine;
  grid-column-start: 1;
  grid-column-end: 5;
}
```

**grid-column**
**grid-row**

- grid line 끝에서부터 -1, -2, ••• 인덱스를 부여할 수 있다.
- Trick: 처음부터 끝까지 grid를 차지하는 요소가 있을 때 `grid-column: 1 / -1;`로 가능하다.
- **span n**: n칸만큼의 grid cell을 차지하도록 할 수 있다.

```css
.header {
  background: salmon;
  grid-column: span 4;
}
.content {
  background: brown;
  grid-column: 1 / span 3;
  grid-row: span 2;
}
.nav {
  background: bisque;
  grid-row: span 2;
}
.footer {
  background: aquamarine;
  grid-column: span 4;
}
```

grid-template-[column|row]를 통해 grid layout을 설정할 때, 각 라인의 이름을 부여할 수 있다. -> 딱히 사용하지 않을 것 같음

```css
.wrapper {
  display: grid;
  grid-template-columns: [first] 100px [second] 100px [third] 100px;
  grid-template-rows: repeat(3, [sexy-line] 100px);
}
.header {
  grid-column: 1 / -1;
  grid-row: sexy-line 2 / -1;
}
```

**grid-template**

- {% |**fr**}로 유연한 layout을 만들 수 있다.
- 사용할 때 주의할 점은 grid 공간 내부에 요소들이 위치한다는 것이다. 만약 grid의 높이가 없다면 fr, %로 요소들의 크기를 정한다 할지라도 화면에 나타나지 않는다. -> **fr , % 는 주어진 공간내에서 비율로 공간을 차지하도록 한다.**
- " grid-template-rows / grid-template-columns " 로 작성해 사용할 수도 있다.
- 뭔가 grid-template-areas 랑 grid-template-rows, grid-template-columns 를 섞어 놓은 듯한 느낌으로도 사용할 수 있다.

```css
.wrapper {
  display: grid;
  grid-template:
    "header header header header" 1fr
    "content content content nav" 2fr
    "footer footer footer footer" 1fr / 1fr 1fr 1fr 1fr;
}
```

**justify-items**
**align-items**

- 전자는 수평방향으로 각 grid에서 grid를 차지하고 있는 요소의 위치를 정한다.
- 후자는 수직방향으로 각 grid에서 grid를 차지하고 있는 요소의 위치를 정한다.
- (기본값)stretch : grid를 차지하고 있는 요소를 최대한 늘려서 grid를 채우도록 한다.

**place-items**

- `place-items: align-items justify-items` 로 작성할 수도 있다.

**justify-content**
**align-content**
**place-content**

- (기본값)start

> 📜 place-items 와 place-content 비교
>
> - place-items는 ~각 grid 범위 내에서~ 가지고 있는 요소들의 위치를 정한다.
> - place-content는 ~grid container 범위 내에서~ 전체 grid를 대상으로 라인 단위로 위치를 조절한다.

**justify-self**
**align-self**
**place-self**

- 하나의 요소에 적용한다.

**grid-auto-rows**
**grid-auto-columns**

- grid-template, grid-template-rows, grid-template-columns를 통해 layout을 설정할 수 있다.
- layout으로 설정한 grid 개수 범위를 넘어선 각 요소에 대해서 적용할 수 있는 프로퍼티이다.
- 크기를 정할 수 있다.

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(4, 100px);
  /*  grid-template-rows: repeat(4, 100px);
   *  - 상관없다.
   *  - 
   */
  grid-auto-rows: 100px;
  grid-gap: 10px;
}
```

**grid-auto-flow**

- flex-direction과 유사하다고 보면 된다.
- grid가 생성되는 flow를 결정한다.
- { row, column }

```css
grid-template-columns: repeat(10, 1fr);
```

- 윈도우 창을 줄였을 때 각 grid 요소들의 크기가 엄청 작아진다.
- **최소크기를, 최대크기를 설정할 수 있는 프로퍼티** **minmax**

```css
grid-template-columns: repeat(10, minmax(100px, 1fr));
```

- 1fr의 크기를 기본으로 하되 최소크기를 100px로 설정한다.
- 최소크기로 template-columns에서 설정한 column의 개수를 감당할 수 없을 때 줄을 바꾸기 보다는 윈도우 창을 벗어난 곳까지 펼쳐짐...

**auto-fill**

- 빈 column으로 공간을 채운다
- 새로운 요소가 들어오면 빈 column 공간이 차지하고 있는 공간을 준다.
- 정확한 사이즈를 위해서

**auto-fit**

- 존재하는 column을 늘려서 공간을 채운다
- 새로운 요소가 들어오면 다른 요소들의 크기가 줄어들고 새로운 요소가 공간에 들어온다.
- 유동적인 사이즈를 위해서

```css
.grid:first-child {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-auto-rows: 100px;
  grid-gap: 10px;
}
.grid:last-child {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-auto-rows: 100px;
  grid-gap: 10px;
}
```

grid를 구성하고 있는 박스의 크기를 직접 설정하기 보다는 내부 content를 기준으로 박스의 크기를 설정 하도록 한다.

**max-content**

- 내부 content가 필요한 만큼 박스를 커지게 한다.

**min-content**

- 내부 content가 작아질 수 있는 만큼 박스를 작아지게 한다.
- content가 박스 밖으로 나오는 일이 없다. Good!

```css
.grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(max-content, 1fr));
  grid-template-rows: 100px;
  grid-gap: 10px;
}
```

- max-content는 content크기에 맞게 box의 크기를 키우는데 빈 여백이 있는 box들을 볼 수 있다. 이것은 minmax(max-content, **1fr**)에서 **1fr**로 크기가 맞춰졌기 때문이다.
- 화면을 계속 줄이다보면 max-content에 맞게 box크기가 줄어듦을 볼 수 있다.

```css
grid-template-columns: repeat(auto-fill, minmax(20px, max-content));
```
