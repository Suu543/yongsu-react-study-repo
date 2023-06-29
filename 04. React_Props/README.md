# React Props

React 컴포넌트를 JavaScript 함수 동작 방식에 비유해서 설명해드리겠습니다.

React 컴포넌트는 마치 어떤 작업을 수행하는 함수와 비슷합니다. 함수는 입력값을 받아서 일련의 작업을 수행하고, 결과값을 반환합니다. 마찬가지로 React 컴포넌트는 입력값을 받아서 UI를 생성하고, 렌더링된 결과를 반환합니다.

예를 들어, 우리가 "안녕하세요"라는 문자열을 출력하는 작업을 수행하는 함수가 있다고 가정해봅시다. 이 함수는 "안녕하세요"를 출력하는 것이 전부인 간단한 작업을 수행합니다. React 컴포넌트도 이와 유사한 동작을 합니다.

React 컴포넌트는 입력값으로 "props"라고 불리는 속성들을 받아옵니다. 이 속성들은 컴포넌트에 전달되는 데이터입니다. 함수가 입력값을 활용하여 작업을 수행하는 것처럼, React 컴포넌트는 받은 props를 활용하여 UI를 생성합니다.

예를 들어, 다음과 같은 React 컴포넌트를 생각해봅시다.

```javascript
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}
```

이 컴포넌트는 `props`라는 입력값을 받아서 이름을 출력하는 역할을 합니다. 함수의 매개변수로 입력값을 받는 것과 마찬가지로, React 컴포넌트는 `props`라는 매개변수를 받아서 그 안에 있는 `name` 속성을 출력합니다.

이렇게 React 컴포넌트는 함수처럼 입력값을 받아서 작업을 수행하고 결과를 반환하는 방식으로 동작합니다. 이러한 컴포넌트들을 조합하여 웹 애플리케이션의 UI를 구성할 수 있습니다.

```javascript
<Card key1={value1} key2={value2} key3={value3} />
```

```javascript
// Card.js
function Card(props) {
  return (
    <div className="row">
      <div className="col s2">
        <div className="card hoverable small">
          <div className="card-image">
            <img src="https://www.santarosaforward.com/img/managed/Image/111/file.jpg" />
          </div>
          <div className="card-content">
            <p>{props.title}</p>
            <p>{props.name}</p>
          </div>
          <div className="card-action">
            <a href="#">${props.price}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
```

React 컴포넌트는 인자 값을 받을 때 일반적으로 `props`라는 이름을 이용해 받습니다. `props`는 객체 형태를 띠기 때문에 `key: value` 방식으로 값에 접근할 수 있습니다.

예를 들어, 다음과 같은 컴포넌트가 있다고 가정합니다.

```
function Welcome(props) {
  return (
    <h1>Hello, {props.name}</h1>
  );
}
```

이 컴포넌트는 `name`이라는 `props`를 입력받아 "Hello, {props.name}"이라는 텍스트를 출력합니다.

`props`는 객체이기 때문에 `key: value` 방식으로 값에 접근할 수 있습니다. 예를 들어, `name`이라는 `props`의 값을 가져오려면 다음과 같이 작성합니다.

```
const name = props.name;
```

`props`는 컴포넌트에게 전달되는 데이터입니다. 컴포넌트는 `props`를 사용하여 화면에 표시할 내용을 결정합니다.

<img src="https://cdn-images-1.medium.com/max/1000/1*sSGS2gQSymtdhakXgLzTfQ.png" />

```javascript
// data.js
const data = [
  {
    course: "React from the beginning",
    instructor: "Yongsu Jeong",
    price: "9.99",
  },
  {
    course: "React from the beginning",
    instructor: "Yongsu Jeong",
    price: "9.99",
  },
  {
    course: "React from the beginning",
    instructor: "Yongsu Jeong",
    price: "9.99",
  },
  {
    course: "React from the beginning",
    instructor: "Yongsu Jeong",
    price: "9.99",
  },
];
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
    />

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
    <script src="./Card.js" type="text/babel"></script>
    <script src="./data.js"></script>
  </head>
  <body>
    <div id="root"></div>

    <script type="text/babel">
      const container = document.getElementById("root");
      const root = ReactDOM.createRoot(container);

      root.render(
        <div>
          <Card
            title={data[0].course}
            name={data[0].instructor}
            price={data[0].price}
          />
          <Card
            title={data[1].course}
            name={data[1].instructor}
            price={data[1].price}
          />
          <Card
            title={data[2].course}
            name={data[2].instructor}
            price={data[2].price}
          />
          <Card
            title={data[3].course}
            name={data[3].instructor}
            price={data[3].price}
          />
        </div>
      );
    </script>
  </body>
</html>
```
