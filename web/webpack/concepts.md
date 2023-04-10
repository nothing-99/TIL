# 웹팩 - concepts

- webpack은 모던 자바스크립트 애플리케이션을 위한 **static moudule bundler**
- 프로젝트에 필요한 모든 모듈을 매핑하고 하나 이상의 번들을 생성하는 디펜던시 그래프를 만든다.

> **dependency graph**
>
> - 전체 시스템(앱 등)을 구성하는 요소들의 종속 관계를 표현하는 그래프
> - 웹팩은 하나의 파일이 다른 파일에 의존할 때마다 의존성으로 취급
> - 웹팩은 엔트리 포인트에서 시작해서 앱에서 필요한 모든 모듈을 포함하는 dependency graph를 재귀적으로 빌드한 다움 하나의(여러개 가능)번들로 묶음

**entry**

- dependency graph를 생성하기 위해 사용해야 하는 모듈
- 기본값은 `./src/index.js`
- `webpack.config.js`에서 entry 설정 가능

```js
module.exports = {
  entry: "./webpack/start.js",
};
```

**output**

- 생성될 번들의 이름과 위치를 웹팩에게 알려주는 역할
- 기본값 `./dist/main.js`, `./dist`
- `webpack.config.js`에서 output 설정 가능
  - output.path : 위치
  - output.filename : 이름

```js
const path = require("path");
module.exports = {
  entry: "./webpack/start.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "my-webpack.bundle.js",
  },
};
```

**loader**

- 웹팩이 JS, JSON을 제외한 파일을 처리할 수 있도록 하는 역할 (기본적으로 JS, JSON만 처리 가능) ~~나도 머리에 언어팩 심고싶다~~
- webpack.config.js 에서 loader 설정 가능 `module.rules`
  - test 속성 : 변환이 필요한 파일을 식별
  - use 속성 : 변환을 위해 사용되는 로더

```js
const path = require("path");
module.exports = {
  entry: "./webpack/start.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "my-webpack.bundle.js",
  },
  module: {
    // "번들에 추가하기 전에 raw-roader를 이용해서 변환해줘"
    rules: [{ test: /\.txt$/, use: "raw-loader" }],
  },
};
```

**plugins**

- 번들 최적화, asset 관리, 환경 변수 주입 등과 같은 작업을 수행할 수 있도록 한다.
- 선행적으로 `require()` 를 통해 플러그인을 요청하고 `plugins` 배열에 추가해야 한다.
- new 연산자로 호출하여 플러그인의 인스턴스를 만들어야 한다
- [Plugins | 웹팩](https://webpack.kr/plugins)

```js
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
```

**mode**

- 모드별로 최적화가 다르게 동작한다
- 기본값은 `production`
- `production` `development` `none`

## 참조

- [Concepts | 웹팩](https://webpack.kr/concepts)
