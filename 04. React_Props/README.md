# React Props

`react`에서 `HTML`을 리턴하는 함수를 `component`라 칭한다. 이런 `component` 함수를 호출할 때는 `<Component />` 방식으로 호출하고, 이름은 `HTML`과 구분하기 위해 첫 번째 글자는 대문자로 정의해야 한다.

이런 `component` 또한 함수이기 때문에 인자를 받을 수 있다. `인자 혹은 속성(attribute)`를 주기 위해서는 다음과 같이 정의해야 한다.

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

`Component`는 인자 값을 받을 때 일반적으로 `props(properties)`라는 이름을 이용해 받는다. `props`를 `객체(object)` 형태를 띠기 때문에 `key: value` 방식으로 값에 접근할 수 있다.
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
