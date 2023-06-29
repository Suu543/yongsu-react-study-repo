# State and Events

## Creact React App

React를 실제 프로젝트에 적용하기 위해서는 React 라이브러리, Webpack, Babel, Jest, ESLint 등 다양한 라이브러리와 도구를 설치하고 설정해야 합니다. 이 과정은 복잡하고 시간이 많이 걸릴 수 있습니다.

Create React App은 React 프로젝트를 빠르고 쉽게 시작할 수 있도록 도와주는 도구입니다. Create React App을 사용하면 한 줄의 코드로 React 프로젝트를 생성할 수 있습니다. Create React App은 React 라이브러리, Webpack, Babel, Jest, ESLint 등을 설치하고 설정합니다.

Create React App은 React 프로젝트를 시작하는 데 유용한 도구입니다. Create React App을 사용하면 React 프로젝트를 빠르고 쉽게 시작할 수 있습니다.

- https://create-react-app.dev/

```bash
npx create-react-app my-app
```

Create React App은 React 라이브러리, Webpack, Babel, Jest, ESLint 등을 설치하고 설정합니다.
Create React App을 사용하면 node_modules 폴더에 수많은 모듈이 설치됩니다. 이 모듈은 React 프로젝트를 개발하고 테스트하는 데 사용됩니다.

- package.json 파일에는 Create React App에 설치된 모듈이 나열되어 있습니다. 이 파일을 사용하여 React 프로젝트에 필요한 모듈을 설치할 수 있습니다.
- App.js 파일은 React 프로젝트의 기본 컴포넌트입니다. 이 파일에는 React 프로젝트의 UI가 정의되어 있습니다.
- Create React App을 사용하면 오류가 발생할 경우 오류 메시지가 잘 출력되어 상세한 처리가 가능합니다.
- Webpack이 있기 때문에 ES6 import를 사용할 수 있습니다.
- React.StrictMode는 필요 없다면 제거해도 됩니다.

```javascript
// node_modules에서 React 모듈을 가져오는 import문입니다.
import React from "react";

// from 부분에 주소 값이 있다면 local file
import "./index.css";
```

- `create-react-app`은 기본값으로 `App.js` 컴포넌트를 함수형으로 설정합니다. 아래와 같이 클래스 방식 변경할 수 있습니다.

```javascript
// Before
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

```javascript
// After
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
```

## require (CommonJS) vs import (NodeJS)

JS 개발을 하다보면 `require`나 `import` 키워드를 통해 외부 파일 혹은 라이브러리의 코드를 불러옵니다.

- `require`: NodeJS에서 사용되고 있는 `CommonJS` 키워드입니다. `require` 키워드를 사용하여 NodeJS 모듈을 불러올 수 있습니다.
- `import`: ES6(2015)에서 도입된 키워드입니다. `import` 키워드를 사용하여 ES6 모듈을 불러올 수 있습니다.

`require`와 `import`는 모두 외부 파일 혹은 라이브러리의 코드를 불러오는 데 사용되지만, 몇 가지 차이점이 있습니다. `require`는 NodeJS 모듈을 불러오는 데 사용되며, `import`는 ES6 모듈을 불러오는 데 사용됩니다. 또한, `require`는 외부 파일의 코드를 모두 가져오지만, `import`는 필요한 부분의 코드만 가져올 수 있습니다.

`require`와 `import`는 모두 외부 파일 혹은 라이브러리의 코드를 불러오는 데 유용한 키워드입니다. 어떤 키워드를 사용할지는 프로젝트의 특성에 따라 결정할 수 있습니다.

```javascript
const moment = require("moment");
import moment from "moment";
```

네, 맞습니다. `CommonJS` 방식은 변수를 할당하듯 모듈 혹은 외부 파일을 불러오는 방식으로 동작합니다. `ES6` 방식을 따르는 `import`의 경우 `Python` 처럼 `import` 키워드를 사용해 조금 더 명시적으로 모듈 혹은 외부 파일을 불러오는 방식으로 동작합니다.

`ES6(ES2015)` 모듈 시스템인 `import`가 많이 사용되고 있습니다. 그럼에도 `import` 키워드가 100% 대체되어 사용될 수 없습니다. `<script>` 태그를 사용하는 브라우저 환경과, `Node.JS`에서도 `CommonJS`를 기본 모듈 시스템으로 사용하고 있습니다. `Babel`등의 코드 변환(transpile) 도구가 없는 경우에는 `require` 키워드를 사용해야합니다.

`import`와 `require`는 모두 외부 파일 혹은 라이브러리의 코드를 불러오는 데 사용되지만, 몇 가지 차이점이 있습니다.

`import`는 `require`보다 더 명시적이고, 유연합니다. 또한, `import`는 `require`보다 더 최신 기능을 지원합니다.
`import`와 `require`는 모두 외부 파일 혹은 라이브러리의 코드를 불러오는 데 유용한 키워드입니다. 어떤 키워드를 사용할지는 프로젝트의 특성에 따라 결정할 수 있습니다.

## What is State?

**State**: Value of variable(s) at any given time.

React State는 React 컴포넌트의 상태를 저장하는 데 사용되는 개념입니다. React State는 객체로 표현되며, 컴포넌트의 렌더링에 영향을 미치는 모든 값을 저장할 수 있습니다. React State는 setState() 메서드를 사용하여 업데이트할 수 있습니다. setState() 메서드는 값을 업데이트하고 컴포넌트를 다시 렌더링합니다.

React State는 React 컴포넌트의 상태를 관리하는 데 중요한 개념입니다. React State를 사용하면 컴포넌트의 상태를 쉽게 관리하고, 컴포넌트의 렌더링을 제어할 수 있습니다.

React는 Virtual DOM을 사용하여 UI를 업데이트합니다. Virtual DOM은 실제 DOM의 추상 표현입니다. React는 Virtual DOM을 사용하여 실제 DOM을 업데이트해야 하는 부분만 업데이트합니다. 이로 인해 React는 UI를 빠르고 효율적으로 업데이트할 수 있습니다.

React State와 Virtual DOM을 함께 사용하면 React는 UI를 빠르고 효율적으로 업데이트할 수 있습니다.

예를 들어, 쇼핑몰 사이트의 장바구니를 생각해볼 수 있습니다. 장바구니를 하나의 컴포넌트로 가정했을 때, 여러 물건 카테고리에 들어가도 이전에 담아 둔 장바구니 내용이 그대로 유지되는 것을 확인할 수 있습니다. React는 각 컴포넌트의 상태 값을 어떻게 논리적이고 안전하게 유지할까요?

React는 DOM을 활용해 계산하고 반영하는 것은 많은 시간과 자원이 듭니다. 그래서 React는 State라는 개념을 활용해 이러한 작업을 pure JavaScript로 처리함으로써 fast and cheap 방식으로 작업을 수행합니다.

Tic Tac Toe 게임을 생각해보면, board에 새로운 말이 놓일 때마다 화면 전체를 업데이트해 다시 그리는 DOM 방식을 이용한다면 많은 계산이 필요합니다. 그러나 State를 활용하면 pure JavaScript 간의 값만을 비교하기 때문에, 이러한 계산을 줄이고, Virtual DOM을 활용해 빠르게 화면에 반영할 수 있습니다.

```javascript
// StateInAction.js
import React, { Component } from "react";

class StateInAction extends Component {
  constructor() {
    super();
    this.state = {
      text: "State In Action",
    };
  }

  render() {
    return <h1>{this.state.text}</h1>;
  }
}

export default StateInAction;
```

React State를 정의할 때는 위와 같이 constructor 함수의 this를 사용해야 합니다. 이 예시의 this의 경우 StateInAction 컴포넌트의 constructor 함수를 가리키고 있습니다. constructor 내부에 어떤 것을 적어도 상관없지만, state는 특수한 키워드이기 때문에, state를 이용하고 싶은 경우 반드시 this.state를 사용해야 합니다.

state를 업데이트하고 싶은 경우 부모 클래스인 Component 클래스에 정의된 setState 함수를 사용해야 합니다. 단, setState 함수를 사용하기 위해서는 반드시 super() 함수를 먼저 호출해야 합니다.

setTimeout 함수를 활용해 setState 동작을 확인할 수 있습니다.

```javascript
import React, { Component } from "react";

class StateInAction extends Component {
  constructor() {
    super();
    this.state = {
      text: "State In Action",
    };

    setTimeout(() => {
      this.setState({
        text: "State Changed",
      });
    }, 2000);
  }

  render() {
    return <h1>{this.state.text}</h1>;
  }
}

export default StateInAction;
```

## State do's and don'ts

React State를 업데이트할 때는, 반드시 setState 함수를 통해서 업데이트해야 합니다. 그렇지 않으면 state의 정상적인 업데이트를 보장할 수 없습니다.

setState 함수는 this.state의 값을 업데이트하고, 컴포넌트를 다시 렌더링합니다. setState 함수는 값을 업데이트하고, 컴포넌트를 다시 렌더링합니다.

setState 함수를 사용하지 않고 this.state의 값을 직접 업데이트하면, 컴포넌트가 다시 렌더링되지 않을 수 있습니다. 이로 인해, state의 값이 정상적으로 업데이트되지 않을 수 있습니다.

setState 함수를 사용하여 state를 업데이트하면, 컴포넌트가 다시 렌더링되고, state의 값이 정상적으로 업데이트됩니다.

```javascript
import React, { Component } from "react";

class StateInAction extends Component {
  constructor() {
    super();
    this.state = {
      text: "State In Action",
    };

    setTimeout(() => {
      // Bad practice
      // this.state.text = "State Changed!";
      this.setState({
        text: "State Changed",
      });
    }, 2000);
  }

  render() {
    return <h1>{this.state.text}</h1>;
  }
}

export default StateInAction;
```

setTimeout 함수의 콜백으로 arrow function을 사용하면, this 바인딩이 setTimeout 함수의 this로 설정됩니다. 따라서 setState 함수는 this를 통해 state를 업데이트할 수 있습니다.
setTimeout 함수의 콜백으로 일반 함수를 사용하면, this 바인딩이 window로 설정됩니다. 따라서 setState 함수는 this를 통해 state를 업데이트할 수 없습니다. setTimeout 함수의 콜백으로 arrow function을 사용하는 것이 좋습니다.

```javascript
import React, { Component } from "react";

class StateInAction extends Component {
  constructor() {
    super();
    this.state = {
      text: "State In Action",
    };

    setTimeout(() => {
      this.setState({
        text: "State Changed",
      });
    }, 2000);

    // setTimeout(function () {
    //   this.setState({
    //     text: "State Changed",
    //   });
    // }, 2000);
  }

  render() {
    return <h1>{this.state.text}</h1>;
  }
}

export default StateInAction;
```

## Events in React

`button` ==> `input` ==> `form`

```javascript
// SimpleEvents.js
import React, { Component } from "react";

class SimpleEvents extends Component {
  constructor() {
    super();
  }

  handleClick() {
    console.log("Test!");
  }

  handleChange() {
    console.log("User Changed the input!!");
  }

  handleSubmit(e) {
    console.log("Form Submitted");
    e.preventDefault();
  }

  render() {
    // Old School
    // document.querySelector(".btn").addEventListener("click", () => {
    //   console.log("Button was clicked!");
    // });

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <button onClick={() => console.log("Test1")} className="btn">
            Click Me!
          </button>
          <button onClick={this.handleClick} className="btn">
            Click Me!
          </button>
          <input
            onChange={this.handleChange}
            type="text"
            placeholder="Enter Some Text!"
          />
        </form>
      </div>
    );
  }
}

export default SimpleEvents;
```

```javascript
// App.js
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

// import StateInAction from "./StateInAction";
import SimpleEvents from "./SimpleEvents";

class App extends Component {
  render() {
    return (
      <div className="App">
        <SimpleEvents />
      </div>
    );
  }
}

export default App;
```

## Available Events

- https://reactjs.org/docs/events.html

## Changing state with an event

```javascript
import React, { Component } from "react";

class EventAndState extends Component {
  constructor() {
    super();
    this.state = {
      inputText: "",
    };
  }

  handleClick() {
    console.log("Test!");
  }

  handleChange(e) {
    console.log(e.target);
    console.log(this.state.inputText);
  }

  handleSubmit(e) {
    console.log("Form Submitted");
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <button onClick={() => console.log("Test1")} className="btn">
            Click Me!
          </button>
          <button onClick={this.handleClick} className="btn">
            Click Me!
          </button>
          <input
            onChange={this.handleChange}
            placeholder="Enter Some Text!"
            type="text"
          />
        </form>
      </div>
    );
  }
}

export default EventAndState;
```

위 코드를 작성하고, `handleChange` 함수를 실행시키면, `this.state.inputText`가 정의되지 않았다는 오류메세지가 출력됩니다. 그 이유는 `handleChange`의 `this`가 `EventAndState` 클래스의 인스턴스를 가리키고 있지 않기 때문입니다. 이를 해결하기 위해서는 `constructor` 함수에서 `this binding`을 설정해야 합니다.

`handleChange` 함수는 `this` 바인딩을 설정하여 `EventAndState` 클래스의 인스턴스를 가리키도록 합니다. 따라서 `handleChange` 함수는 `this.state.inputText`를 사용할 수 있습니다.

```javascript
// 첫 번째 해결책 - arrow function
handleChange = (e) => {
  console.log(e.target);
  console.log(this.state.inputText);
}

// 두 번째 해결책 - constructor this binding
constructor() {
  super();
  this.handleChange = this.handleChange.bind(this);
}
```

개인적으로는 첫 번째 해결책(arrow function) 사용을 권장합니다.

```javascript
import React, { Component } from "react";

class EventAndState extends Component {
  constructor() {
    super();
    this.state = {
      inputText: "",
    };

    this.handleClick = this.handleChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick() {
    console.log("Test!");
  }

  handleChange(e) {
    console.log(e.target);
    this.setState({
      inputText: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("Form Submitted");
    this.setState({
      inputText: "",
    });
  }

  render() {
    return (
      <div>
        <h1>{this.state.inputText}</h1>
        <form onSubmit={this.handleSubmit}>
          <button onClick={() => console.log("Test1")} className="btn">
            Click Me!
          </button>
          <button onClick={this.handleClick} className="btn">
            Click Me!
          </button>
          <input
            onChange={this.handleChange}
            placeholder="Enter Some Text!"
            type="text"
          />
        </form>
      </div>
    );
  }
}

export default EventAndState;
```

## prevState in setState

- https://velog.io/@kym123123/%EB%B9%84%EB%8F%99%EA%B8%B0%EB%A1%9C-%EB%8F%99%EC%9E%91%ED%95%98%EB%8A%94-react%EC%9D%98-setState%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC

```javascript
import { Component } from "react";

class AsyncComp extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

  add = (number) => {
    // 전달받은 이자 number만큼 state 값을 증가시키기
    // this.setState({ count: this.state.count + number });
    this.setState(
      (prevState) => {
        // closure에 존재하는 count라는 프로퍼티 덮어씌우기
        const { count } = prevState;
        console.log("prevState: ", count);
        return { count: count + number };
      },
      () => {
        console.log("Current Count: ", this.state.count);
      }
    );
  };

  handleClick = () => {
    this.add(1); // count 1 증가 ==> 1 출력 예상
    this.add(2); // count 2 증가 ==> 1 + 2 ==> 3 출력 예상
    this.add(3); // count 3 증가 ==> 3 + 3 ==> 6 출력 예상
    // ------
  };

  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick={this.handleClick}>Count 증가</button>
      </div>
    );
  }
}

export default AsyncComp;
```

```javascript
import { Component } from "react";

class NumberCounter extends Component {
  constructor() {
    super();
    this.state = { count: 0 };
  }

  handleIncrement = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  handleDecrement = () => {
    this.setState((prevState) => ({ count: prevState.count - 1 }));
  };

  handleReset = () => {
    this.setState({ count: 0 });
  };
  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick={this.handleIncrement}>증가</button>
        <button onClick={this.handleReset}>초기화</button>
        <button onClick={this.handleDecrement}>감소</button>
      </div>
    );
  }
}

export default NumberCounter;
```

## Practice

1. `StatePractice` 컴포넌트가 생성됩니다.
2. `input` 태그와 `h3` 태그를 추가하고, `message`라는 이름의 상태(state)를 정의합니다.
3. `h3` 태그의 내용에 `message` 상태를 반영합니다.
4. `input`에 `onFocus` 이벤트가 발생하면, `message` 상태를 "They agree to the site terms of service by filling out the form"으로 설정합니다.
5. `h3` 태그에 `onMouseEnter` 이벤트를 추가하여 마우스가 올라갔을 때, `h3` 태그의 내용을 초기화합니다.
6. `img` 태그를 추가하고, `onLoad` 이벤트를 추가하여 이미지 크기가 100px 이상인 경우, "Your image is big!"를 콘솔에 출력합니다.

## Answer

```javascript
import { Component } from "react";

class StatePractice extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
    };

    this.handleFocus = this.handleFocus.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.imageLoad = this.imageLoad.bind(this);
  }

  handleFocus = (event) => {
    this.setState({
      message: "You agree to our terms of service by filling out the form",
    });
  };

  handleEnter = (event) => {
    this.setState({
      message: "",
      imageWidth: "",
    });
  };

  imageLoad = (event) => {
    console.dir(event.target);

    if (event.target.width > 100) {
      console.log("Your Image is large");
    }
  };

  render() {
    return (
      <div>
        <input onFocus={this.handleFocus} type="text" />
        <h3 onMouseEnter={this.handleEnter}>{this.state.message}</h3>
        <img onLoad={this.imageLoad} src="https://picsum.photos/200" />
      </div>
    );
  }
}

export default StatePractice;
```

## Stateful vs Stateless Components

<img src="https://cdn-images-1.medium.com/max/800/1*NzrgRjmrzv4MFwQDPSkcpQ.png" />

Stateful (상태를 가진 컴포넌트):

- 복잡하고 지능적입니다.
- `state`를 가지고 있습니다.
- 입력값 `a`와 출력값 `b`가 서로 다를 수 있습니다. 내부 로직에 의해 언제든지 변경될 수 있습니다.

Stateless (상태를 가지지 않는 컴포넌트):

- 간단하고 순수합니다.
- `state`를 가지고 있지 않습니다.
- 입력값 `a`와 출력값 `b`가 동일합니다. 항상 일관된 결과를 반환합니다.

```javascript
// pure function
// 몇 번을 호출하던 인자를 2, 3으로 줬을 때 결과는 5다.
function sum(x, y) {
  return x + y;
}

sum(2, 3); // 5

// Non Pure Function
const rand = Math.random();

function sum(x, y) {
  return x + y + rand;
}

sum(2, 3);
```

## State and Props Together

```javascript
// cards.js
const data = [
  {
    course: "React From the Beginning",
    instructor: "Robert Bunch",
    image: "https://img-c.udemycdn.com/course/240x135/2195280_49b2_2.jpg",
  },
  {
    course: "Apache Kafka Series",
    instructor: "Stephane Maarek",
    image: "https://img-c.udemycdn.com/course/240x135/1075642_b6d2_9.jpg",
  },
  {
    course: "Music Production in Logic Pro X",
    instructor: "Tomas George",
    image: "https://img-c.udemycdn.com/course/240x135/897192_2cee_7.jpg",
  },
  {
    course: "Unity Game Development",
    instructor: "Jonathan Weinberger",
    image: "https://img-c.udemycdn.com/course/240x135/1328572_b05d_5.jpg",
  },
];
```

```javascript
// index.html
<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
</head>
```

```javascript
// App.js
import "./App.css";
import CardSet from "./CardSet";
import cards from "./cards";

function App() {
  return (
    <div className="App">
      <CardSet cards={cards} />
    </div>
  );
}

export default App;
```

```javascript
// Card.js - stateless component
function Card(props) {
  return (
    <div>
      <div>
        <img src={props.card.image} alt={props.card.instructor} />
      </div>

      <div>
        <p>{props.card.course}</p>
        <p>{props.card.instructor}</p>
      </div>

      <div>
        <a href="#">$9.99</a>
      </div>
    </div>
  );
}

export default Card;
```

```javascript
// CardSet.js - stateful component
import { Component } from "react";
import Card from "./Card";

class CardSet extends Component {
  constructor() {
    super();
    this.state = {
      chosenCards: [],
    };
  }

  saveCourse = (index) => {
    if (
      this.state.chosenCards.filter(
        (e) => e.course === this.props.cards[index].course
      ).length > 0
    ) {
      const copyRemoveOfCards = this.state.chosenCards.filter(
        (e) => e.course !== this.props.cards[index].course
      );

      this.setState({
        chosenCards: copyRemoveOfCards,
      });
    } else {
      // Bad Practice
      // this.state.chosenCards.push(this.props.cards[index]);
      const copyOfCards = [...this.state.chosenCards];
      copyOfCards.push(this.props.cards[index]);
      this.setState({
        chosenCards: copyOfCards,
      });
    }
  };

  render() {
    console.log(this.state.chosenCards);

    const savedCard = this.state.chosenCards.map((card, index) => {
      return <Card key={index} card={card} />;
    });

    const cardList = this.props.cards.map((card, i) => {
      return (
        <div>
          <Card key={i} card={card} idx={i} />
          <button
            onClick={() => {
              this.saveCourse(i);
            }}
          >
            Save
          </button>
        </div>
      );
    });

    return (
      <div>
        {cardList}
        {savedCard}
      </div>
    );
  }
}

export default CardSet;
```
