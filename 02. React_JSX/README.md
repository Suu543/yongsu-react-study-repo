# JSX & Babel

- https://www.freecodecamp.org/news/jsx-in-react-introduction/
- https://reactjs.org/docs/introducing-jsx.html

```javascript
<div id="root" className="container">
  I love React
</div>;

// Try it out
("use strict");

/*#__PURE__*/
React.createElement(
  "div",
  {
    id: "root",
    class: "container",
  },
  "I love React"
);
```

이 지점에서 파악할 수 있는 것은, `Babel`이 컴파일하는 과정에서 모든 코드를 `JavaScript`로 간주한다는 점입니다.
`JavaScript`에는 `class` 키워드가 이미 사용되고 있기 때문에, `React` 에서는 `className`을 사용합니다. <br />
알아두면 좋은 점은 `createElement`의 두 번째 인자 `object`형태의 값들을 `속성(attribute)`이라 부릅니다.

```javascript
<div id="root" className="container">
  I love React
</div>;

// Try it out
("use strict");

/*#__PURE__*/
React.createElement(
  "div",
  {
    id: "root",
    className: "container",
  },
  "I love React"
);
```

이 방식을 이용해서 중첩된 `HTML`을 구현할 수 있다. <br />
주의해야 할 점은 반드시 여닫는 태그를 명시해야 한다는 점입니다.
그렇지 않으면 `jsx`가 시작과 끝을 확인하는 데 문제가 생깁니다.

```javascript
<div id="root" className="container">
  <p>I love React</p>
  <span>Hello World</span>
</div>;

// Try it out
("use strict");

/*#__PURE__*/
React.createElement(
  "div",
  {
    id: "root",
    className: "container",
  },
  /*#__PURE__*/ React.createElement("p", null, "I love React"),
  /*#__PURE__*/ React.createElement("span", null, "Hello World")
);
```

스타일을 위해 `materialui CDN`을 추가.

- https://materializecss.com/getting-started.html

변수에 `HTML` 태그를 담고, 마치 값인 것처럼 사용할 수 있습니다.

```javascript
const markup = (
  <div className="row">
    <div className="col s2">
      <div className="card hoverable small">
        <div className="card-image">
          <img src="https://www.santarosaforward.com/img/managed/Image/111/file.jpg" />
        </div>
        <div className="card-content">
          <p>Hello</p>
          <p>World</p>
        </div>
        <div className="card-action">
          <a href="#">$59.99</a>
        </div>
      </div>
    </div>
  </div>
);

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(markup);
```

`HTML`요소의 컨텐츠에 `JS` 변수값을 할당할 때는 `중괄호({ })`를 사용하면 됩니다.

```javascript
const data = {
  title: "React From the Beginning",
  author: "Yongsu Jeong",
  saleOn: false,
};

function saleOn() {
  return false;
}

const markup = (
  <div className="row">
    <div className="col s2">
      <div className="card hoverable small">
        <div className="card-image">
          <img src="https://www.santarosaforward.com/img/managed/Image/111/file.jpg" />
        </div>
        <div className="card-content">
          <p>{data.title}</p>
          <p>{data.author}</p>
        </div>
        <div className="card-action">
          <a href="#">${saleOn() ? 9.99 : 59.99}</a>
        </div>
      </div>
    </div>
  </div>
);

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(markup);
```

이렇게 변수에 `HTML` 코드를 할당하고 내부적으로 `Babel` 컴파일해 사용하는 방식 자체를 `jsx`라 칭합니다.
정의는 다양할 수 있지만 간단하게 생각하는 것이 좋습니다.

`jsx` vs `document.##`

```javascript
const data = {
  title: "React From the Beginning",
  author: "Yongsu Jeong",
  saleOn: false,
};

function saleOn() {
  return false;
}

const markup = (
  <div className="row">
    <div className="col s2">
      <div className="card hoverable small">
        <div className="card-image">
          <img src="https://www.santarosaforward.com/img/managed/Image/111/file.jpg" />
        </div>
        <div className="card-content">
          <p>{data.title}</p>
          <p>{data.author}</p>
        </div>
        <div className="card-action">
          <a href="#">${saleOn() ? 9.99 : 59.99}</a>
        </div>
      </div>
    </div>
  </div>
);

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(markup);
```

`markup`의 경우 `plain javascript` 형태를 띠고 딱 정의된 것을 위주로 객체가 형성된 것을 확인할 수 있습니다. <br /> 반면에 `document`방식은 불필요한 모든 `Document` 요소가 한 번에 움직이는 것을 확인할 수 있습니다. <br /> `jsx` 방식이 `document` 방식보다 압도적으로 크기가 작으므로 속도가 빠르고, 관리가 용이합니다.
영어로는 `cheap and small`로 표현됩니다.

```javascript
// render takes 2 args:
// 1. what to render - react element (Not DOM element)
// 2. where to render - DOM element
ReactDOM.render(markup, document.getElementById("root"));
```

1. 처음에는 `where to render`에 정의한 `DOM` 요소에 렌더링을 합니다.
2. 이후 `virtualDOM`에 현재 렌러딩된 `DOM`의 복제(replica)를 하나 생성합니다.
   <img src="https://cdn-images-1.medium.com/max/800/1*Vh0hZeByYj923GXHWCXPCA.png" />

3. 이후 값의 비교는 `DOM`을 이용해 `HTML`에 직접 접근해 비교하는 방식이 아닌, `plain javascript`를 활용해 객체 간의 비교로 변경된 지점을 추적합니다. (cheap and small)
4. 화면에 변경이 발생하면, 이전의 `VirtualDOM`과 현재 `DOM`을 `plain javascript`를 통해 비교하고, 전체를 다시 렌더링하는 것이 아닌, 객체 간의 비교를 통해 필요한 부분에만 변경 사항을 반영합니다. <br />
   기존의 `DOM`은 변경이 발생하면 전체 요소를 렌더링하는 반면에, `React`는 객체 간의 비교로 필요한 부분만 업데이트한다는 점에서 굉장히 빠른 속도로 변화를 반영할 수 있습니다.
   <img src="https://cdn-images-1.medium.com/max/1000/1*J8gTVVd1Mf6L0Dqg0NbNkQ.png" />
