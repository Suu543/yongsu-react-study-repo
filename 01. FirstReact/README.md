# Introduction

## What is React?

**UI**: 사용자와 컴퓨터가 정보를 쉽게 주고받을 수 있도록 하는 수단. <br />
(A JavaScript library for building user interfaces.)

1995년: Java, PHP, Ruby, Apache, JavaScript 언어가 탄생한 시기다. <br /> 이 시기에 Netscape (당시 유일한 브라우저였다)는 웹 개발에 착수했다. 당시 웹 사이트는 23,000개 정도 있었습니다.

1999년: JavaScript를 제외한 다른 언어는 꽤나 무거운 언어(서버용)로 간주되었고, JavaScript은 가벼운 언어로 간주했습니다.

2005년: jQuery, AJAX, IOS/Android가 세상에 나오기 시작했다. 당시 약 1억 개의 웹사이트가 존재했다. 당시 브라우저 간의 제약 사항이 달랐기 때문에 웹 사이트 개발이 어려웠다. jQuery를 이용하면 하나의 방식으로 모든 브라우저에서 잘 동작하도록 함으로써 이 문제를 해결해주었다.

2010: V8/Node, Angular/Backbone 등이 출시되기 시작했다. 넷플릭스도 초기에 Angular/Backbone을 이용해 개발되었다.

2010: jQuery는 웹사이트를 구현에 필요한 코드를 획기적으로 줄여주었다. 그럼에도 웹사이트가 너무 거대해졌을 때, 똑같이 코드 분량이 많아진다는 문제가 발생했다. Angular/Backbone이 출시되고 이 문제를 해결하기 시작했다.

2013: React가 출시되었다.

### How can we modernize web development?

다음 사진과 같이 웹 개발이 현대화되기 이전에는 화살표를 코드라고 가정했을 때 여러 기능의 코드들이 한곳에 모여있는 것을 확인할 수 있다.
이 방식의 문제점은 유지보수 및 관리가 너무 힘들다는 점이다.
<img src="https://cdn-images-1.medium.com/max/800/1*lN_PQvO4XRU3BhbyP78ETg.png" />

React와 같은 라이브러리는 이 문제를 획기적으로 해결했다.
다음 사진과 같이 기능별 혹은 페이지별 코드를 분리해 따로 관리하는 것이 가능해졌고, 동시에 원한다면 코드를 자유롭게 추가, 삭제, 갱신, 수정을 정말 간단하게 할 수 있게 되었다.

<img src="https://cdn-images-1.medium.com/max/800/1*joH4WBOH427k6eALZZRSyw.png" />

실생활에 비유하자면 옛날의 웹 개발은 자동차 한 대가 전체로 기능했고, 수정 시 전체를 옮겨 수정했다면, 현대 웹 개발은 필요한 부분만 부품처럼 빼와서 수정할 수 있다고 생각할 수 있습니다.

이와 같이 의미 있는 단위로 쪼개는 행위를 보고

- 모듈화(Modularization)라는 표현을 사용합니다.
- 상태 관리를 쉽게 할 수 있습니다.
- 효율적입니다. 모든 부분이 모듈 단위로 분리되어 있기 때문에 관리가 용이합니다.
- 프론트엔드와 백엔드를 완전히 분리해 관리할 수 있습니다.

React는 웹에서 귀찮고, 어렵고, 작고 등등의 불편한 것들을 더욱 쉽게 관리할 수 있게 도와주는 도구라 생각할 수 있습니다.

### React Keywords

- JSX
- ES6
  - Babel
  - Webpack/node

```javascript
// npm init -y
// npm install express
```

- React-CDN: https://reactjs.org/docs/cdn-links.html
- babel-standalone: https://cdnjs.com/libraries/babel-standalone
  - minified 버전 사용하기

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script
      crossorigin
      src="https://unpkg.com/react@18/umd/react.production.min.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
    ></script>
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"
      integrity="sha512-kp7YHLxuJDJcOzStgd6vtpxr4ZU9kjn77e6dBsivSz+pUuAuMlE2UTdKB7jjsWT84qbS8kdCWHPETnP/ctrFsA=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    ></script>
  </head>
  <body>
    <div id="root"></div>

    /* HTML과 JS를 섞어서 사용하고 있는 것을 확인할 수 있다. */
    <script type="text/babel">
      const container = document.getElementById("root");
      const root = ReactDOM.createRoot(container);
      const SanityComp = <h1>Sanity Check</h1>;
      root.render(<h1>Hello World</h1>);
    </script>
  </body>
</html>
```

- 서버를 켜고 `localhost:3000` 접속 시 출력되지 않는 경우, `폴더이름/index.html` 접속 시 출력된다.

## What Just Happened?

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>

    /* 1. react */
    <script
      crossorigin
      src="https://unpkg.com/react@18/umd/react.production.min.js"
    ></script>

    /* 2. react-dom => ReactDOM.render() 함수를 사용하게 해줍니다. */
    <script
      crossorigin
      src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
    ></script>

    /* 3. Babel */
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"
      integrity="sha512-kp7YHLxuJDJcOzStgd6vtpxr4ZU9kjn77e6dBsivSz+pUuAuMlE2UTdKB7jjsWT84qbS8kdCWHPETnP/ctrFsA=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    ></script>
  </head>
  <body>
    <div id="root"></div>

    <script type="text/babel">
      /* 4. render의 인자 값으로 작성한 값은 JSX로 작성한 값입니다. */
      const container = document.getElementById("root");
      const root = ReactDOM.createRoot(container);
      const SanityComp = <h1>Sanity Check</h1>;
      root.render(<h1>Hello World</h1>);
    </script>
  </body>
</html>
```

1. `babel`을 먼저 이해해보자

- 어떤 브라우저든 이해할 수 있도록 ES6 JavaScript를 컴파일 해준다.
- https://babeljs.io/

```javascript
// Put in next-gen JavaScript
() => 2

// Get Browser-Compatible JavaScript Out
(function () {
    return 2;
});

// ---------------------------
// Babel => Try it out
() => <h2>Sanity Check</h2>

// "use strict";

() => /*#__PURE__*/React.createElement("h1", null, "Sanity Check");
```

요약:

1. `text/babel` 방식으로 `babel`이 컴파일을 진행한다.
2. `React.DOM` 함수는 두 번째 CDN (react-dom)에서 찾아 호출된다.
3. `React.DOM`의 첫 번째 인자인 `<h1></h1>` 형태는 `babel` 컴파일러를 통해 `React.createElement()`로 컴파일된다.
4. `React.createElement`는 첫 번째 CDN (react)에서 찾아 호출된다.
5. `JSX` 반환되고 리엑트 방식으로 실행된다.

- https://reactjs.org/docs/react-api.html#createelement
- https://www.freecodecamp.org/news/jsx-in-react-introduction/
