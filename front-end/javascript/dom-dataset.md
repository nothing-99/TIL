# data-set

HTML attribute 로 `data-` 형식으로 기입하면 DOM 프로퍼티 `dataset` 에 카멜형태로 저장된다. 반대도 가능

```html
<div id="div" data-name="div" data-name-value="high"></div>
```

```js
div.dataset.name; // 'div'
div.dataset.nameValue; // 'high'

div.dataset.helloWorld = "hello world";
// <div ... data-hello-world="hello world">
```
