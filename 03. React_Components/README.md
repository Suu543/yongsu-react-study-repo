# React Components

React 컴포넌트는 React에서 UI를 구성하는 블록입니다. 컴포넌트는 JavaScript 함수로 정의되며, 데이터와 상태를 가질 수 있습니다. 컴포넌트를 사용하면 복잡한 UI를 쉽게 만들고 유지 관리할 수 있습니다.

React 컴포넌트는 JavaScript 함수와 유사하게 작동합니다. 컴포넌트는 데이터를 입력받아 화면에 출력하는 함수입니다. 컴포넌트는 JavaScript 함수와 달리 DOM을 직접 조작하지 않습니다. 컴포넌트는 React에게 화면에 출력할 DOM을 알려줍니다. React는 컴포넌트에서 받은 정보를 사용하여 DOM을 업데이트합니다.

다음은 React 컴포넌트와 JavaScript 함수의 차이점을 요약한 표입니다.

| React 컴포넌트                            | JavaScript 함수                      |
| ----------------------------------------- | ------------------------------------ |
| DOM을 직접 조작하지 않습니다.             | DOM을 직접 조작합니다.               |
| React에게 화면에 출력할 DOM을 알려줍니다. | 화면에 출력할 DOM을 직접 생성합니다. |
| React가 DOM을 업데이트합니다.             | DOM을 직접 업데이트합니다.           |

React 컴포넌트는 JavaScript 함수와 유사하게 작동하지만, DOM을 직접 조작하지 않는다는 점이 다릅니다. React는 컴포넌트에서 받은 정보를 사용하여 DOM을 업데이트합니다.

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
  </head>
  <body>
    <div id="root"></div>

    <script type="text/babel">
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

      root.render(<markup />);
    </script>
  </body>
</html>
```

다음 코드를 재사용 가능한 리액트 컴포넌트 형태로 변환해 보겠습니다.

```javascript
// Card.js
function Card() {
  return (
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
}
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
  </head>
  <body>
    <div id="root"></div>

    <script type="text/babel">
      const container = document.getElementById("root");
      const root = ReactDOM.createRoot(container);

      root.render(
        <Card
          title="React From the Beginning"
          name="Yongsu Jeong"
          price="19.90"
        />
      );
    </script>
  </body>
</html>
```

`React`에서는 `JSX`를 반환하는 함수를 호출할 때 `<ComponentName />`와 같은 방식으로 호출할 수 있습니다. 주의해야 할 점은 `JSX`를 반환하는 경우 `HTML`과 구분하기 위해 컴포넌트의 첫 글자는 대문자로 정의해야 합니다 (리액트는 소문자로 시작하는 컴포넌트를 DOM 태그로 취급하기 때문입니다.). 이러한 `JSX`를 반환하는 함수를 보고 `컴포넌트(component)`라고 부릅니다.
