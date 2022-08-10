# The Component Lifecycle and HTTP
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FSJFXB%2FbtrhnciO81x%2FpfIVpgnZloBWZJoyCDYuRk%2Fimg.jpg" />

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fn64bu%2Fbtrhjr18f6Q%2F8F955gOrVq7bfyeXyNQyf1%2Fimg.jpg" />

Rendering:
- 요청해서 받은 내용을 브라우저 화면에 표시하는 것
- 서버로 부터 받은 내용을 브라우저 화면에 표시하는 것

Rendering Process (Web):
1. 서버에 정보를 요청한다.
2. 받아온 정보를 기반으로 DOM Tree를 구성한다.
3. DOM 트리가 구축되는 과정에 브라우저는 Render Tree를 구축한다.
4. CSS 설정을 적용한다.
5. 브라우저에 Render Tree를 표시한다.

화면에 최종적으로 보여주는 방식은 두 종류가 존재합니다.
1. Server-Side-Rendering(SSR)
2. Client-Side-Rendering(CSR)  

서버사이드 렌더링 (SSR)
- 페이지를 이동할 때마다 새로운 페이지(HTML + CSS + JS)를 요청한다.
- 한 마디로 페이지 이동마다 서버에서 다 완성하고 클라이언트에게 전달합니다.
- 장점:
  - 페이지가 다 구축된 상태로 보내기 때문에 검색엔진 최적화 (SEO) 가능합니다.
  - 완성된 HTML 파일을 클라이언트에게 전달하기 때문에 초기로딩속도를 많이 줄일 수 있습니다.
- 단점:
  - 프로젝트가 복잡해집니다.
  - 페이지 이동 때 완성본을 서버로부터 받기 때문에 깜빡거림이 발생할 수 있습니다.
  - 서버 렌더링에 따른 서버 부하가 커집니다.


클라이언트 사이드 렌더링(CSR):
- 처음 요청할 때 한 페이지만 불러옵니다.
- React.js를 예시로 `index.js`만 불러옵니다. (Single Page Application)
- 장점:
  - 사용자의 행동에 따른 필요한 부분만 다시 읽어오기 때문에 서버 측에서 렌더링하여 전체 페이지를 다시 읽는 것보다, 빠른 상호작용을 기대할 수 있습니다
  - 필요한 부분만 리로딩 없이 서버로부터 받아 화면을 갱신합니다 (VirtualDOM)
- 단점:
  - 초기 구동속도가 느립니다.
  - 검색엔진 최적화가 어렵습니다.
- `HTTP` 프로토콜을 사용해 `JSON` 데이터를 주고받음으로써 변경 사항이 있는 부분만 빠르게 반영할 수 있습니다.  

2. Rendering and Reusability (렌더링과 재사용성)
`CSR`에서 말했듯이 `SSR`과 다리 서버로부터 데이터를 받아 클라이언트에 렌러딩하는 방식입니다.
이 방식은 두 가지 문제를 해결할 수 있습니다.
- 변경된 부분만 렌더링
- 단위를 나눠서 (컴포넌트) 관리 가능
- 코드의 재사용성을 높여줌

3. VirtualDOM
기존에는 페이지 전환시 `DOM` 전체를 새로 생성하는 방식으로 화면을 띄우는 방식을 사용했습니다. 이렇게 되면 `HTML, CSS, JS` 파일을 리렌더링 하므로 속도가 느립니다. 페이스북에서 소개한 `react.js`는 이런 문제를 해결해냈습니다.

## Axios + HTTP
```bash
npx create-react-app lifecycle-practice
npm init -y
npm install express axios
```

```javascript
const url = 'https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=e312dbeb8840e51f92334498a261ca1d'
```

```javascript
// App.js
import "./App.css";
import axios from "axios";

function App() {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=e312dbeb8840e51f92334498a261ca1d";

  axios.get(url).then((res) => {
    console.log(res.data);
  });

  return (
    <div className="App">
      <h1>Sanity Check</h1>
    </div>
  );
}

export default App;
```

데이터를 받아왔는데 어떻게 하면 이 데이터를 사용할 수 있을까요?
클래스 방식으로 변환해 `state`를 이용해보겠습니다.

```javascript
import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=e312dbeb8840e51f92334498a261ca1d";

    axios.get(url).then((res) => {
      this.state = {
        temp: res.data.main.temp,
      };
    });
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.temp}</h1>
      </div>
    );
  }
}

export default App;
```

오류가 발생하는 이유는, `render` 함수가 호출되는 시점에, `axios.get()` 함수는 비동기로 동작하기 때문에 데이터를 받아오지 못했기 때문입니다. 이를 해결하기 위해, 
1. `this.temp`의 기본값 정의하기.
2. 데이터를 `render` 함수 내부에서 받아오기.

```javascript
import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      temp: "",
    };
  }

  render() {
    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=e312dbeb8840e51f92334498a261ca1d";

    axios.get(url).then((res) => {
      this.setState({
        temp: res.data.main.temp,
      });
    });

    return (
      <div className="App">
        <h1>{this.state.temp}</h1>
      </div>
    );
  }
}

export default App;
```

여기서는 문제가 발생합니다. `setState` 함수를 호출하면, `render` 함수가 다시 호출되므로, 무한 루프에 빠지게 됩니다. `React Lifecycle`을 이해하면 이 문제를 해결할 수 있습니다.
1. componentDidMount: 컴포넌트가 마운트되고 첫 렌더링이 완료된 후에 호출됩니다.
- `render` 함수가 최초 호출되고 난 뒤 시점에 바로 호출되는 함수입니다. 
- 이 함수에 데이터를 받아오는 걸 정의하면 오류, 무한 루프 없이 데이터를 받아와 화면에 반영할 수 있습니다.
- 하나 더 알아주면 좋은 점은 `componentDidMount`와 같은 함수를 사용하기 위해 `Component` 클래스를 상속했습니다.

```javascript
import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      temp: "",
    };
  }

  componentDidMount() {
    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=e312dbeb8840e51f92334498a261ca1d";

    axios.get(url).then((res) => {
      this.setState({
        temp: res.data.main.temp,
      });
    });
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.temp}</h1>
      </div>
    );
  }
}

export default App;
```
<img src="https://cdn-images-1.medium.com/max/800/1*O4ROErlSRyYxa3S8AdFG3A.png">
위 코드의 동작 순서를 간단하게 정리해보면


1. `constructor` 함수에서 `this.state`의 기본값 정의.
2. `render` 함수 호출로 최초 렌더링 실행
3. 최초 `render` 함수 이후에 호출되는 `componentDidMount` 함수 안에서`componentDidMount` 함수 안에서 `axios.get` 함수 호출하여 데이터 받아오기.
4. 받아온 데이터를 `setState` 함수를 통해 갱신하기.
5. `setState` 함수는 `state`를 갱신하고 `render` 함수를 다시 실행하여 화면에 반영하도록 동작.

## React Lifecycle Summary
<img src="https://cdn-images-1.medium.com/max/800/1*Pp6DO3Q5-4EwhgqSa8STzA.png" />

1. `constructor` 함수 실행.
- `super()` 함수 호출을 통한 부모 클래스의 생성자 함수 호출.
- `this.state` 초기값 설정
2. `render` 함수 호출.

3. `componentDidMount`
- 최초 `render` 함수 호출 이후, `componentDidMount` 함수 호출.
- `componentDidMount`
- `axios.get` 함수 호출 등으로 데이터를 받아오기.
- 받아온 데이터를 `state` 혹은 `props`에 업데이트하기.
- `setState` 등 `state` or `props` 업데이트 반영을 위해 `render` 함수 호출.
4. `render (Updating)`
- `props` or `state` 값 변경 이후 `render` 함수 호출.

5. `componentDidUpdate`
- `render (updating)` 함수 호출 이후, `componentDidUpdate` 함수 호출.
- 서비스 로직에 따라 몇 번의 `render`가 재호출 될지는 알 수 없다.

6. `componentWillUnmount`
- 해당 `component`가 필요 없을 때, 사라지기 전 `componentWillUnmount` 함수 호출.

References
- https://reactjs.org/docs/react-component.html
- https://reactjs.org/docs/state-and-lifecycle.html
- https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

## Lifecycle - componentDidMount()
- Invoked immediately after a component is mounted.
- 영어를 해석하면 컴포넌트가 화면에 렌더링 되는 순간 바로 호출되는 함수라고 이해할 수 있습니다. 컴포넌트를 화면에 렌더링하는 함수는 `render` 밖에 없으므로 `render` 함수가 리턴값을 반환하는 순간 `componentDidMount` 함수가 호출됩니다.

Resoureces
- https://materializecss.com/getting-started.html

```html
/* index.html */
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

    <!-- Compiled and minified JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

Materialize CSS
- https://materializecss.com/modals.html#!

```javascript
// App.js
import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      temp: "",
    };

    // M = materialize
    let elems = document.querySelectorAll(".modal");
    let instances = window.M.Modal.init(elems);
  }

  componentDidMount() {
    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=e312dbeb8840e51f92334498a261ca1d";

    axios.get(url).then((res) => {
      this.setState({
        temp: res.data.main.temp,
      });
    });
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.temp}</h1>
        <a
          className="waves-effect waves-light btn modal-trigger"
          href="#modal1"
        >
          Modal
        </a>

        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>Modal Header</h4>
            <p>A bunch of text</p>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close waves-effect waves-green btn-flat"
            >
              Agree
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
```
- `document.querySelectorAll(".modal")` 요소를 찾아야 하는 데, `constructor` 함수가 호출되는 시점에는 `render`가 호출되지 않았기 때문에 `undefined`을 반환합니다. 이런 문제를 해결하기 위해 최초 `render`가 된 이후에, `componentDidMount` 함수에 정의하면 정상적으로 접근할 수 있게 됩니다.

```javascript
// App.js
import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      temp: "",
    };
  }

  componentDidMount() {
    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=e312dbeb8840e51f92334498a261ca1d";

    axios.get(url).then((res) => {
      this.setState({
        temp: res.data.main.temp,
      });
    });

    // M = materialize
    let elems = document.querySelectorAll(".modal");
    let instances = window.M.Modal.init(elems);
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.temp}</h1>
        <a
          className="waves-effect waves-light btn modal-trigger"
          href="#modal1"
        >
          Modal
        </a>

        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>Modal Header</h4>
            <p>A bunch of text</p>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close waves-effect waves-green btn-flat"
            >
              Agree
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
```

## The Lifecycle - render
- The `render()` method is the only required method in a class component.
- 해석을 해보면 `class` 방식으로 컴포넌트를 생성할 때, 유일하게 `render` 함수만 반드시 작성해야 한다는 것을 알 수 있습니다.
- https://reactjs.org/docs/react-component.html#render
- https://openweathermap.org/weather-conditions

```javascript
import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      temp: "",
      cityName: "",
      weather: "",
      high: "",
      low: "",
      icon: "",
    };
  }

  componentDidMount() {
    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=e312dbeb8840e51f92334498a261ca1d";

    axios.get(url).then((res) => {
      this.setState({
        temp: res.data.main.temp,
        cityName: res.data.name,
        weather: res.data.weather[0].main,
        high: res.data.main.temp_max,
        low: res.data.main.temp_min,
        icon: res.data.weather[0].icon,
      });
    });

    // M = materialize
    let elems = document.querySelectorAll(".modal");
    let instances = window.M.Modal.init(elems);
  }

  render() {
    const iconUrl = `http://openweathermap.org/img/wn/${this.state.icon}.png`;

    return (
      <div className="App">
        <h1>{this.state.temp}</h1>
        <a
          className="waves-effect waves-light btn modal-trigger"
          href="#modal1"
        >
          Details
        </a>

        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>{this.state.cityName}</h4>
            <p>
              High: {this.state.high} - Low: {this.state.low}
            </p>
            <p>
              {this.state.weather} <img alt="weather icon" src={iconUrl} />
            </p>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close waves-effect waves-green btn-flat"
            >
              Agree
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
```
- `constructor` ==> `render` ==> `componentDidMount` ==> `setState` ==> `render` ==> 

## Searching City
- `input` 태그에 입력한 도시를 기준으로 검색하는 기능을 추가해보겠습니다.
```javascript
import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      temp: "",
      cityName: "",
      weather: "",
      high: "",
      low: "",
      icon: "",
    };
  }

  componentDidMount() {
    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=e312dbeb8840e51f92334498a261ca1d";

    axios.get(url).then((res) => {
      this.setState({
        temp: res.data.main.temp,
        cityName: res.data.name,
        weather: res.data.weather[0].main,
        high: res.data.main.temp_max,
        low: res.data.main.temp_min,
        icon: res.data.weather[0].icon,
      });
    });

    // M = materialize
    let elems = document.querySelectorAll(".modal");
    let instances = window.M.Modal.init(elems);
  }

  searchCity = (e) => {
    e.preventDefault();
    // console.log("Form Submitted!!!");
    const city = document.getElementById("city").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=e312dbeb8840e51f92334498a261ca1d`;
    console.log(city);
    axios.get(url).then((res) => {
      this.setState({
        temp: res.data.main.temp,
        cityName: res.data.name,
        weather: res.data.weather[0].main,
        high: res.data.main.temp_max,
        low: res.data.main.temp_min,
        icon: res.data.weather[0].icon,
      });
    });
  };

  render() {
    const iconUrl = `http://openweathermap.org/img/wn/${this.state.icon}.png`;

    return (
      <div className="App">
        <div className="row">
          <div className="col s6 offset-s3">
            <h1>{this.state.temp}</h1>
            <a
              className="waves-effect waves-light btn modal-trigger"
              href="#modal1"
            >
              Details
            </a>
            <form onSubmit={this.searchCity}>
              <input id="city" type="text" placeholder="Enter a city name" />
            </form>
          </div>
        </div>

        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>{this.state.cityName}</h4>
            <p>
              High: {this.state.high} - Low: {this.state.low}
            </p>
            <p>
              {this.state.weather} <img alt="weather icon" src={iconUrl} />
            </p>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close waves-effect waves-green btn-flat"
            >
              Agree
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
```

## The Lifecycle - componentDidUpdate
- `componentDidUpdate` is invoked immediately after updating occurs. This method is not called for the initial render.
- 해석을 해보면 최초 `render`를 제외하고, 두 번째로 호출되는 `render` 함수가 종료되는 시점에 `componentDidUpdate` 함수가 호출되는 것으로 이해할 수 있습니다.
- https://reactjs.org/docs/react-component.html
- 다음 코드의 로그를 통해 `lifecycle` 동작 순서를 이해할 수 있습니다.

```javascript
// App.js
import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor() {
    console.log("Constructor is running...");
    super();
    this.state = {
      temp: "",
      cityName: "",
      weather: "",
      high: "",
      low: "",
      icon: "",
    };
  }

  componentDidMount() {
    console.log("ComponentDidMount is running...");
    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=e312dbeb8840e51f92334498a261ca1d";

    axios.get(url).then((res) => {
      this.setState({
        temp: res.data.main.temp,
        cityName: res.data.name,
        weather: res.data.weather[0].main,
        high: res.data.main.temp_max,
        low: res.data.main.temp_min,
        icon: res.data.weather[0].icon,
      });
    });

    // M = materialize
    let elems = document.querySelectorAll(".modal");
    let instances = window.M.Modal.init(elems);
  }

  componentDidUpdate() {
    console.log("ComponentDidUpdate is running...");
  }

  searchCity = (e) => {
    e.preventDefault();
    // console.log("Form Submitted!!!");
    const city = document.getElementById("city").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=e312dbeb8840e51f92334498a261ca1d`;
    console.log(city);
    axios.get(url).then((res) => {
      this.setState({
        temp: res.data.main.temp,
        cityName: res.data.name,
        weather: res.data.weather[0].main,
        high: res.data.main.temp_max,
        low: res.data.main.temp_min,
        icon: res.data.weather[0].icon,
      });
    });
  };

  render() {
    console.log("render is running...");
    const iconUrl = `http://openweathermap.org/img/wn/${this.state.icon}.png`;

    return (
      <div className="App">
        <div className="row">
          <div className="col s6 offset-s3">
            <h1>{this.state.temp}</h1>
            <a
              className="waves-effect waves-light btn modal-trigger"
              href="#modal1"
            >
              Details
            </a>
            <form onSubmit={this.searchCity}>
              <input id="city" type="text" placeholder="Enter a city name" />
            </form>
          </div>
        </div>

        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>{this.state.cityName}</h4>
            <p>
              High: {this.state.high} - Low: {this.state.low}
            </p>
            <p>
              {this.state.weather} <img alt="weather icon" src={iconUrl} />
            </p>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close waves-effect waves-green btn-flat"
            >
              Agree
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
```

- 코드 리팩토링 및 `componentDidUpdate` 함수 인자에 대해서 알아보겠습니다.
- `prevProps`: 이전 `props` 값에 대한 정보를 담고 있습니다.
- `prevState`: 이전 `state` 값에 대한 정보를 담고 있습니다.
- `snapshot`: `getSnapshotBeforeUpdate()` 참조

```javascript
// App.js
import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor() {
    console.log("Constructor is running...");
    super();
    this.state = {
      temp: "",
      cityName: "",
      weather: "",
      high: "",
      low: "",
      icon: "",
    };
  }

  componentDidMount() {
    console.log("ComponentDidMount is running...");
    this.getCityWeather("London");
    // M = materialize
    let elems = document.querySelectorAll(".modal");
    let instances = window.M.Modal.init(elems);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("ComponentDidUpdate is running...");
    console.log(prevProps);
    console.log(prevState);
    console.log(snapshot);
  }

  searchCity = (e) => {
    e.preventDefault();
    // console.log("Form Submitted!!!");
    const city = document.getElementById("city").value;
    this.getCityWeather(city);
  };

  getCityWeather = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=e312dbeb8840e51f92334498a261ca1d`;
    console.log(city);
    axios.get(url).then((res) => {
      this.setState({
        temp: res.data.main.temp,
        cityName: res.data.name,
        weather: res.data.weather[0].main,
        high: res.data.main.temp_max,
        low: res.data.main.temp_min,
        icon: res.data.weather[0].icon,
      });
    });
  };

  render() {
    console.log("render is running...");
    const iconUrl = `http://openweathermap.org/img/wn/${this.state.icon}.png`;

    return (
      <div className="App">
        <div className="row">
          <div className="col s6 offset-s3">
            <h1>{this.state.temp}</h1>
            <a
              className="waves-effect waves-light btn modal-trigger"
              href="#modal1"
            >
              Details
            </a>
            <form onSubmit={this.searchCity}>
              <input id="city" type="text" placeholder="Enter a city name" />
            </form>
          </div>
        </div>

        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>{this.state.cityName}</h4>
            <p>
              High: {this.state.high} - Low: {this.state.low}
            </p>
            <p>
              {this.state.weather} <img alt="weather icon" src={iconUrl} />
            </p>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close waves-effect waves-green btn-flat"
            >
              Agree
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
```

Quick Quiz:
- 다음 컴포넌트를 실행하고, `rain` 이라는 글자가 포함된 `weather`가 있는 경우 `Maximum update depth exceeded`라는 오류가 출력됩니다. 
1. 이 오류의 원인은 무엇일까요?
2. 이 오류는 어떻게 처리할 수 있을까요? 

```javascript
// App.js
import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor() {
    console.log("Constructor is running...");
    super();
    this.state = {
      temp: "",
      cityName: "",
      weather: "",
      high: "",
      low: "",
      icon: "",
      isRaining: "",
    };
  }

  componentDidMount() {
    console.log("ComponentDidMount is running...");
    this.getCityWeather("London");
    // M = materialize
    let elems = document.querySelectorAll(".modal");
    let instances = window.M.Modal.init(elems);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("ComponentDidUpdate is running...");
    // console.log(prevProps);
    // console.log(prevState);
    // console.log(snapshot);

    const isRaining = this.state.weather.includes("rain");
    if (isRaining) {
      this.setState({
        isRaining: "Rain rain go away!!!",
      });
    }
  }

  searchCity = (e) => {
    e.preventDefault();
    // console.log("Form Submitted!!!");
    const city = document.getElementById("city").value;
    this.getCityWeather(city);
  };

  getCityWeather = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=e312dbeb8840e51f92334498a261ca1d`;
    console.log(city);
    axios.get(url).then((res) => {
      this.setState({
        temp: res.data.main.temp,
        cityName: res.data.name,
        weather: res.data.weather[0].main,
        high: res.data.main.temp_max,
        low: res.data.main.temp_min,
        icon: res.data.weather[0].icon,
      });
    });
  };

  render() {
    console.log("render is running...");
    const iconUrl = `http://openweathermap.org/img/wn/${this.state.icon}.png`;

    return (
      <div className="App">
        <div className="row">
          <div className="col s6 offset-s3">
            <h1>{this.state.temp}</h1>
            <h1>{this.state.isRaining}</h1>
            <a
              className="waves-effect waves-light btn modal-trigger"
              href="#modal1"
            >
              Details
            </a>
            <form onSubmit={this.searchCity}>
              <input id="city" type="text" placeholder="Enter a city name" />
            </form>
          </div>
        </div>

        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>{this.state.cityName}</h4>
            <p>
              High: {this.state.high} - Low: {this.state.low}
            </p>
            <p>
              {this.state.weather} <img alt="weather icon" src={iconUrl} />
            </p>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close waves-effect waves-green btn-flat"
            >
              Agree
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
```

Quick Quiz Solution
```javascript
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("ComponentDidUpdate is running...");
    // console.log(prevProps);
    // console.log(prevState);
    // console.log(snapshot);

    if (this.state.weather !== prevState.weather) {
      const isRaining = this.state.weather.includes("rain");
      if (isRaining) {
        this.setState({
          isRaining: "Rain rain go away!!!",
        });
      }
    } else {
      this.setState({
        isRaining: "",
      });
    }
  }
```

## Refactoring the weather widget
- Step1
```javascript
// Modal.js
import React, { Component } from "react";

class Modals extends Component {
  render() {
    return <h1>Modal Component</h1>;
  }
}

export default Modals;

// Headers.js
import React from 'react';

function Headers(props) {
    return (
        <h1>Headers Component</h1>
    )
}

export default Headers;

// App.js
  render() {
    console.log("render is running...");
    const iconUrl = `http://openweathermap.org/img/wn/${this.state.icon}.png`;

    return (
      <div className="App">
        <div className="row">
          <div className="col s6 offset-s3">
            <h1>{this.state.temp}</h1>
            <h1>{this.state.isRaining}</h1>
            <Headers />
            <a
              className="waves-effect waves-light btn modal-trigger"
              href="#modal1"
            >
              Details
            </a>
            <form onSubmit={this.searchCity}>
              <input id="city" type="text" placeholder="Enter a city name" />
            </form>
          </div>
        </div>

        <Modal />
        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>{this.state.cityName}</h4>
            <p>
              High: {this.state.high} - Low: {this.state.low}
            </p>
            <p>
              {this.state.weather} <img alt="weather icon" src={iconUrl} />
            </p>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close waves-effect waves-green btn-flat"
            >
              Agree
            </a>
          </div>
        </div>
      </div>
    );
  }
```
- step2
```javascript
// App.js
  render() {
    console.log("render is running...");
    const iconUrl = `http://openweathermap.org/img/wn/${this.state.icon}.png`;

    return (
      <div className="App">
        <div className="row">
          <div className="col s6 offset-s3">
            <Headers temp={this.state.temp} isRaining={this.state.isRaining} />
            <a
              className="waves-effect waves-light btn modal-trigger"
              href="#modal1"
            >
              Details
            </a>
            <form onSubmit={this.searchCity}>
              <input id="city" type="text" placeholder="Enter a city name" />
            </form>
          </div>
        </div>

        <Modal
          iconUrl={iconUrl}
          weather={this.state.weather}
          cityName={this.state.cityName}
          low={this.state.low}
          high={this.state.high}
        />
      </div>
    );
  }

// Headers.js
import React from "react";

function Headers(props) {
  return (
    <div>
      <h1>{props.temp}</h1>
      <h1>{props.isRaining}</h1>
    </div>
  );
}

export default Headers;

// Modal.js
import React, { Component } from "react";

class Modal extends Component {
  render() {
    return (
      <div id="modal1" className="modal">
        <div className="modal-content">
          <h4>{this.props.cityName}</h4>
          <p>
            High: {this.props.high} - Low: {this.props.low}
          </p>
          <p>
            {this.props.weather}
            <img alt="weather icon" src={this.props.iconUrl} />
          </p>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close waves-effect waves-green btn-flat"
          >
            Agree
          </a>
        </div>
      </div>
    );
  }
}

export default Modal;
```

## The Lifecycle - componentWillUnmount()
- ComponentWillUnmoun() is invoked immediately before a component is unmounted and destroyed. Perform any necessary cleanup in this method, sucha as invalidating timers, canceling network requests, or cleaning up any subscriptions that were created in componentDidMount().

- `state`에 `showModal` 속성을 추가하고, 조건부로 `modal`이 렌더링 되도록 구현했습니다.
- `showModal`을 `false`로 변했을 때 `Modal.js` 컴포넌트의 `componentWillUnmount` 함수가 실행되는 것을 확인할 수 있습니다. 실행되는 이유는 조건이 `false`가 됨으로써 더 이상 화면에 렌더링 되지 않았기 때문입니다.

```javascript
import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Headers from "./Headers";
import Modal from "./Modal";

class App extends Component {
  constructor() {
    console.log("Constructor is running...");
    super();
    this.state = {
      temp: "",
      cityName: "",
      weather: "",
      high: "",
      low: "",
      icon: "",
      isRaining: "",
      showModal: true,
    };
  }

  componentDidMount() {
    console.log("ComponentDidMount is running...");
    this.getCityWeather("London");
    // M = materialize
    let elems = document.querySelectorAll(".modal");
    let instances = window.M.Modal.init(elems);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("ComponentDidUpdate is running...");
    // console.log(prevProps);
    // console.log(prevState);
    // console.log(snapshot);

    if (this.state.weather !== prevState.weather) {
      const isRaining = this.state.weather.includes("rain");
      if (isRaining) {
        this.setState({
          isRaining: "Rain rain go away!!!",
        });
      }
    }
  }

  searchCity = (e) => {
    e.preventDefault();
    // console.log("Form Submitted!!!");
    const city = document.getElementById("city").value;
    this.getCityWeather(city);
  };

  getCityWeather = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=e312dbeb8840e51f92334498a261ca1d`;
    console.log(city);
    axios.get(url).then((res) => {
      this.setState({
        temp: res.data.main.temp,
        cityName: res.data.name,
        weather: res.data.weather[0].main,
        high: res.data.main.temp_max,
        low: res.data.main.temp_min,
        icon: res.data.weather[0].icon,
        showModal: true,
      });
    });
  };

  removeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    console.log("render is running...");
    const iconUrl = `http://openweathermap.org/img/wn/${this.state.icon}.png`;

    return (
      <div className="App">
        <div className="row">
          <div className="col s6 offset-s3">
            <button onClick={this.removeModal} className="btn">
              Remove from DOM!!
            </button>
            <Headers temp={this.state.temp} isRaining={this.state.isRaining} />
            <a
              className="waves-effect waves-light btn modal-trigger"
              href="#modal1"
            >
              Details
            </a>
            <form onSubmit={this.searchCity}>
              <input id="city" type="text" placeholder="Enter a city name" />
            </form>
          </div>
        </div>

        {this.state.showModal ? (
          <Modal
            iconUrl={iconUrl}
            weather={this.state.weather}
            cityName={this.state.cityName}
            low={this.state.low}
            high={this.state.high}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default App;
```

```javascript
// Modal.js
import React, { Component } from "react";

class Modal extends Component {
  
  componentWillUnmount() {
    console.log("Component is about to be history...");
  }

  render() {
    return (
      <div id="modal1" className="modal">
        <div className="modal-content">
          <h4>{this.props.cityName}</h4>
          <p>
            High: {this.props.high} - Low: {this.props.low}
          </p>
          <p>
            {this.props.weather}
            <img alt="weather icon" src={this.props.iconUrl} />
          </p>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close waves-effect waves-green btn-flat"
          >
            Agree
          </a>
        </div>
      </div>
    );
  }
}

export default Modal;
```
- `componentWillUnmount` 함수가 어느 시점에 동작한다는 것은 파악했습니다. 하지만 구체적으로 어떤 상황이 쓸 수 있을지 잘 떠오르지 않을 수 있습니다. `Modal` 컴포넌트에 `componentDidMount` 함수에 `setInterval`을 추가해 `componentWillUnmount` 사용 용례를 알아보겠습니다.

```javascript
// Modal.js
import React, { Component } from "react";

class Modal extends Component {
  componentDidMount() {
    setInterval(() => {
      console.log("test!");
    }, 500);
  }

  componentWillUnmount() {
    console.log("Component is about to be history...");
  }

  render() {
    return (
      <div id="modal1" className="modal">
        <div className="modal-content">
          <h4>{this.props.cityName}</h4>
          <p>
            High: {this.props.high} - Low: {this.props.low}
          </p>
          <p>
            {this.props.weather}
            <img alt="weather icon" src={this.props.iconUrl} />
          </p>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close waves-effect waves-green btn-flat"
          >
            Agree
          </a>
        </div>
      </div>
    );
  }
}

export default Modal;
```

- 위 코드를 실행하면 `componentWillUnmount` 함수가 실행되었음에도 불구하고, `Event Quere and Stack`에 이전에 할당된 `setInterval` 콜백이 동작하는 것을 확인할 수 있습니다. 이 경우에 `componentWillUnmount` 함수 로직에 `clearInterval` 코드를 추가하면 손쉽게 `componentWillUnmount` 함수 호출과 함께 `setInterval` 콜백이 정상적으로 종료할 수 있습니다.
  
```javascript
import React, { Component } from "react";

class Modal extends Component {
  componentDidMount() {
    this.timer = setInterval(() => {
      console.log("test!");
    }, 500);
  }

  componentWillUnmount() {
    console.log("Component is about to be history...");
    clearInterval(this.timer);
  }

  render() {
    return (
      <div id="modal1" className="modal">
        <div className="modal-content">
          <h4>{this.props.cityName}</h4>
          <p>
            High: {this.props.high} - Low: {this.props.low}
          </p>
          <p>
            {this.props.weather}
            <img alt="weather icon" src={this.props.iconUrl} />
          </p>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close waves-effect waves-green btn-flat"
          >
            Agree
          </a>
        </div>
      </div>
    );
  }
}

export default Modal;
```

## Managing forms with State
- https://reactjs.org/docs/forms.html
```javascript
// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import FormPractice from "./FormPractice";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<FormPractice />);

reportWebVitals();

// FormPractice.js
import React, { Component } from "react";

class FormPractice extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted!!!");
    // const name = document.getElementById("name").value;
    // console.log(name);
  };

  changeName = (e) => {
    console.log(e.target.value);
    this.setState({
      name: e.target.value,
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s6 offset-sm-3">
            <form onSubmit={this.handleSubmit}>
              <input
                onChange={this.changeName}
                value={this.state.name}
                type="text"
                placeholder="Enter Name Please..."
              />
              <input type="submit" value="submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default FormPractice;
```

- 더욱 효율적으로 이 문제를 해결하고 싶으면 아래와 같이 코드를 작성할 수 있습니다.
```javascript
onChange = (e) => {
    console.log(e.target.value)
    this.setState(
        {
            [e.target.name]: e.target.value
        }
    )
}
```

## Data Flows Down (Pass State Up)
- https://reactjs.org/docs/lifting-state-up.html

```javascript
// BoilingVerdict.js
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

export default BoilingVerdict;
```

```javascript
// Calculator.js
import React, { Component } from "react";
import BoilingVerdict from "./BoilingVerdict";

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { temperature: "" };
  }

  // Arrow Function으로 변경하면 별도의 bind 불필요
  handleChange(e) {
    this.setState({ temperature: e.target.value });
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>Enter temperature in Celsius:</legend>
        <input value={temperature} onChange={this.handleChange} />
        <BoilingVerdict celsius={parseFloat(temperature)} />
      </fieldset>
    );
  }
}

export default Calculator;
```

- 섭씨온도와 동시에 화씨온도를 구하고 싶은 경우 아래 input 태그를 복사 붙여 넣게 해도 되지만, 이는 `react` 사용 목적과는 벗어난 방식입니다. 이 방식 대신에 `TemperatureInput` 컴포넌트를 하나 생성해 효과적으로 코드를 작성할 수 있습니다.
```javascript
<input value={temperature} onChange={this.handleChange} />
<input value={temperature} onChange={this.handleChange} />
```

```javascript
// TemperatureInput.js
import React, { Component } from 'react';

const scaleNames = {
  c: "Celsius",
  f: "Fahrenheit",
};

class TemperatureInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { temperature: "" };
  }

  handleChange(e) {
    this.setState({ temperature: e.target.value });
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}

export default TemperatureInput
```
<img alt="Image Not Found" src="https://cdn-images-1.medium.com/max/800/1*_Y8R_kzSR13rXKJ4Uj97ag.png" />

섭씨든 화씨든 둘 중 하나의 온도가 변경되었을 때 섭시 변환 및 출력을 담당하는 하단의 제일 왼쪽 컴포넌트와, 가운데 물 끓음 여부를 담당하는 컴포넌트와, 제일 오른쪽 컴포넌트 모두가 온도를 감지할 수 있어야 합니다. 하지만 현재 방식은 `TemperatureInput` 컴포넌트가 자신만의 `state`와 `onChange` 함수를 가지고 있기 때문에 `state`가 공유되지 않은 것을 확인할 수 있습니다. 이러한 문제를 해결하기 위해 `state`와 `onChange` 함수 자체를 `props`로 세 컴포넌트가 공통으로 부모로 두고 있는 `Calculator` 컴포넌트로부터 전달받는 방식을 적용할 수 있습니다.

- 온도가 변할 때 세 개의 컴포넌트가 동시에 변화를 감지하도록 설정하는 방법은 아래와 같습니다

```javascript
import React, { Component } from "react";
import BoilingVerdict from "./BoilingVerdict";
import TemperatureInput from "./TemperatureInput";

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      scale: "C",
      temperature: "20",
    };
  }

  // Arrow Function으로 변경하면 별도의 bind 불필요
  handleChange(e, scale) {
    this.setState({
      temperature: e.target.value,
      scale: scale,
    });
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.state.scale;
    let fTemp;
    let cTemp;

    if (scale === "C") {
      // convert celcius to F
      fTemp = Math.round((temperature * 9) / 5 + 32);
      // we don't need to convert C
      cTemp = temperature;
    } else if (scale === "F") {
      cTemp = Math.round(((temperature - 32) * 5) / 9);
      fTemp = temperature;
    }

    return (
      <fieldset>
        <TemperatureInput
          temperature={fTemp}
          scale="F"
          handleChange={this.handleChange}
        />
        <TemperatureInput
          temperature={cTemp}
          scale="C"
          handleChange={this.handleChange}
        />
        <BoilingVerdict celsius={parseFloat(cTemp)} />
      </fieldset>
    );
  }
}

export default Calculator;
```

```javascript
// TemperatureInput.js
import React, { Component } from "react";

class TemperatureInput extends Component {
  render() {
    const temperature = this.props.temperature;

    return (
      <fieldset>
        <legend>Enter temperature in {this.props.scale}:</legend>
        <input
          value={temperature}
          onChange={(e) => this.props.handleChange(e, this.props.scale)}
        />
      </fieldset>
    );
  }
}

export default TemperatureInput;
```

## Styling Components
- https://reactjs.org/docs/dom-elements.html

방법 #1
```javascript
import React, { Component } from "react";

class TemperatureInput extends Component {
  render() {
    const temperature = this.props.temperature;
    let style;

    if (temperature > 100) {
      style = {
        color: "red",
        backgroundColor: "yellow",
        fontSize: "30px",
      };
    }

    return (
      <div>
        <legend style={style}>Enter temperature in {this.props.scale}:</legend>
        <input
          value={temperature}
          onChange={(e) => this.props.handleChange(e, this.props.scale)}
        />
      </div>
    );
  }
}

export default TemperatureInput;
```

방법 #2
```css
.temp-input .too-hot {
  color: red;
  background-color: yellow;
  font-size: 30px;
}
```

```javascript
import React, { Component } from "react";
import "./temperatureInput.css";

class TemperatureInput extends Component {
  render() {
    const temperature = this.props.temperature;
    let hotClass;

    if (temperature > 100) {
      hotClass = "too-hot";
    }

    return (
      <div className="temp-input">
        <legend className={hotClass}>
          Enter temperature in {this.props.scale}:
        </legend>
        <input
          value={temperature}
          onChange={(e) => this.props.handleChange(e, this.props.scale)}
        />
      </div>
    );
  }
}

export default TemperatureInput;
```