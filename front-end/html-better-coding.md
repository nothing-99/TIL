# HTML Best Practices - How to Build a Better HTML - Based Website
## <h1>은 페이지당 1개만 사용하자
- SEO가 페이지의 핵심요소를 파악하는데 도움이 된다.

## heading tag를 순서대로, 중간 생략없이 사용하자
- 스크린 리더를 사용하는 분들에게 혼란을 줄 수 있기 때문에 heading tag 생략없이 사용하자.
- No
```html
<h1></h1>
<h3></h3>
<h5></h5>
```
- Yes
```html
<h1></h1>
<h2></h2>
<h3></h3>
```

## 이미지에 설명을 덧붙일 때, <figure>을 사용하자
- SEO측면에서 검색엔진이 이미지를 찾기가 쉽다.
- 스크린 리더들의 이해에 도움을 준다.
- Yes
```html
<figure>
  <img src="#" alt="대체">
  <figcaption>설명</figcaption>
</figure>
```
- No
```html
<div>
  <img src="#" alt="대체">
  <p>설명</p>
</div>
```

## div 보다는 semantic elements를 애용하자
- html 스크립트 가독성 뿐 아니라 스크린리더 사용자분들의 웹페이지 이해에 큰 도움을 준다.
```html
<header>
  <h1>header</h1>
</header>
<footer>
  <a href="#">Home</a>
  <a href="#">About</a>
  <a href="#">Contact</a>
</footer>
```

## { bold, italicize } text를 위해 { <b>, <i> }가 아닌 { <strong>, <em> }을 사용하자
- <b>, <i> 태그는 semantic meaning을 가지지 않는다.
- <strong>, <em> 태그는 중요한 텍스트임을 나타낸다.
```html
<p>
  <strong>importance</strong>
  <em>importance</em>
</p>
```

## inline elements안에 block-level elements를 사용하지말자.
- inline element 안에 block-level element (X)
- block-level element 안에 inlin, block-level element (O)
- [The W3C Markup Validation Service](https://validator.w3.org/)

## 참조
- [HTML Best Practices – How to Build a Better HTML-Based Website](https://www.freecodecamp.org/news/html-best-practices/)