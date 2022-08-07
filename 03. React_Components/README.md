# React Components
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
      src="https://unpkg.com/react@16/umd/react.production.min.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"
    ></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>
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
                <img src="http://lorempixel.com/400/400/nature/" />
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

      console.log(markup);

      // takes 2 args:
      // 1. what - a react element
      // 2. where
      ReactDOM.render(markup, document.getElementById("root"));
    </script>
  </body>
</html>
```

다음 코드를 더욱 `react`스럽게 변환해 보겠습니다.
```javascript
// Card.js
function Card() {
    return (
        <div className="row">
            <div className="col s2">
            <div className="card hoverable small">
                <div className="card-image">
                <img src="http://lorempixel.com/400/400/nature/" />
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
      src="https://unpkg.com/react@16/umd/react.production.min.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"
    ></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>
    <script src="./Card.js" type="text/babel"></script>
  </head>
  <body>
    <div id="root"></div>

    <script type="text/babel">
      // takes 2 args:
      // 1. what - a react element
      // 2. where

      ReactDOM.render(
        <Card />,
        document.getElementById("root")
      );
    </script>
  </body>
</html>
```
`react`에서는 `jsx`를 리턴하는 함수를 호출할 때 ``와 같은 방식으로 호출할 수 있다. 주의할 점은 `jsx` 리턴하는 경우 `HTML`과 구분하기 위해 첫 번째 글자는 대문자로 정의해야 한다. <br />
`jsx`를 리턴하는 하는 함수를 보고 `component`라 칭한다.



