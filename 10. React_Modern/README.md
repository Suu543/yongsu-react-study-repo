# State and Events

## Creact React App
`React`를 실제 프로젝트에 적용 과정에 많은 설정이 필요하다. `create-react-app`을 이용하면 한 줄의 코드로 모든 설정을 할 수 있다.

- https://create-react-app.dev/

```bash
npx create-react-app my-app
```

`node_modules`을 확인해보면 수많은 `modules`이 있는 것을 확인할 수 있습니다.
- 개발서버는 `webpack` 모듈을 통해 실행됩니다.
- 유닛테스트는 `jest` 모듈을 통해 실행됩니다.

`package.json` 파일을 확인해보면
- `dependencies`에 `react`와 `react-dom`가 있는 것을 확인할 수 있습니다.
- `react-script`는 `node_modules`에 있는 `modules`을 조합해 `react`를 효율적으로 사용할 수 있도록 해줍니다.
- `npm start` 명령어가 의미하는 바는 `react-script start` 커멘드를 실행을 의미합니다.
<br />
- `App.js` 파일을 확인해보면 `ReactDOM.render()` 메서드를 사용하여 `<App />` 컴포넌트를 출력합니다.
- `create-react-app` 사용의 장점은 오류가 발생 시, 오류 메세지가 잘 출력되어 상세한 처리가 가능합니다.
- `webpack`이 있기 때문에 ES6 `import` 사용할 수 있습니다.
- `<React.StrictMode>`는 필요 없다면 제거해도 됩니다.

```javascript
// from 부분에 주소 값이 없다면 node_module
import React from 'react';

// from 부분에 주소 값이 있다면 local file
import "./index.css"
```

- `create-react-app`은 기본값으로 `App.js` 컴포넌트를 함수형으로 설정합니다. 아래와 같이 클래스 방식 변경할 수 있습니다.

```javascript
// Before
import logo from './logo.svg';
import './App.css';

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
- require: `NodeJS`에서 사용되고 있는 `CommonJS` 키워드입니다.
- import: `ES6(2015)`에서 도입된 키워드입니다.

```javascript
const moment = require("moment");
import moment from "moment";
```
- `CommonJS` 방식은 변수를 할당하듯 모듈 혹은 외부 파일을 불러오는 방식으로 동작합니다.
- `ES6` 방식을 따르는 `import`의 경우 `Python` 처럼 `import` 키워드를 사용해 조금 더 명시적으로 모듈 혹은 외부 파일을 불러오는 방식으로 동작합니다.
- `ES6(ES2015)` 모듈 시스템인 `import`가 많이 사용되고 있습니다. 그럼에도 `import` 키워드가 100% 대체되어 사용될 수 없습니다. `<script>` 태그를 사용하는 브라우저 환경과, `Node.JS`에서도 `CommonJS`를 기본 모듈 시스템으로 사용하고 있습니다. `Babel`등의 코드 변환(transpile) 도구가 없는 경우에는 `require` 키워드를 사용해야합니다.

## What is State?
- State: Value of variable(s) at any given time.

하나 혹은 둘 이상의 `react` 컴포넌트 내부에서 바뀔 수 있는 모든 값을 의미합니다. 예시로는 쇼핑몰 사이트의 장바구니를 생각할 수 있습니다. 장바구니를 하나의 컴포넌트로 가정했을 때, 여러 물건 카테고리에 들어가도 이전에 담아 둔 장바구니 내용이 그대로 유지되는 것을 확인할 수 있습니다. `react`가 각 컴포넌트의 상태 값을 어떻게 논리적이고 안전하게 유지하는지 알아보겠습니다.

`DOM`을 활용해 계산하고 반영하는 것은 많은 시간과 자원이 듭니다. 그래서 `react`는 `state(상태)`라는 개념을 활용해 이러한 작업을 `pure javascript`로 처리함으로써 `fast and cheap` 방식으로 작업을 수행합니다. 

`Tic Tac Toe` 게임을 생각해보면 `board`에 새로운 말이 놓일 때마다 화면 전체를 업데이트해 다시 그리는 `DOM` 방식을 이용한다면 많은 계산이 필요합니다. 그러나 `state`를 활용하면 `pure javascript`간의 값만을 비교하기 때문에, 이러한 계산을 줄이고, `virtualDOM`을 활용해 빠르게 화면에 반영할 수 있습니다.

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
`state`를 정의할 때는 위와 같이 `constructor` 함수의 `this`를 사용해야 합니다. 이 예시의 `this`의 경우 `StateInAction` 컴포넌트의 `constructor` 함수를 가리키고 있습니다. `constructor` 내부에 어떤 것을 적어도 상관없지만, `state`는 특수한 키워드이기 때문에, `state`를 이용하고 싶은 경우 반드시 `this.state`를 사용해야 합니다.

`state`를 업데이트하고 싶은 경우 부모 클래스인 `Componenet` 클래스에 정의된 `setState` 함수를 사용해야 합니다. 단, `setState` 함수를 사용하기 위해서는 반드시 `super()` 함수를 먼저 호출해야 합니다.

`setTimeout` 함수를 활용해 `setState` 동작을 확인할 수 있습니다.

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
`state`를 업데이트할 때는, 반드시 `setState` 함수를 통해서 업데이트해야 한다. 그렇지 않으면 `state`의 정상적인 업데이트를 보장할 수 없다.

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

`setTimeout` 함수의 콜백으로 `arrow function` 대신 일반 함수로 정의를 하면, 새로운 `this binding`이 발생해 오류가 발생한다.
`this binding`의 위치가 변했기 때문에 `setState` 함수를 인식하지 못한다.
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

## Practice
1. `StatePractice` 컴포넌트 생성하기.
2. `input` and `h3` 태그 및 적절한 이름의 `message state` 정의하기.
3. `h3` 태그의 내용에 정의한 `state` 반영하기.
4. `onFocus` 이벤트가 `input`에 발생했을 때, `they agree to the site terms of service by filling out the form` 값으로 설정하기.
5. `h3` 태그에 `onMouseEnter` 이벤트 추가하기, `h3` 태그에 마우스가 올라갔을 때 `h3` 태그의 내용을 초기화하기.
6. `img` 태그 추가하기, `onLoad` 이벤트 추가하기, `img` 크기가 `100px` 이상이라면, `console.log("Your image is big!")`; 출력하기.

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

Stateful:
- complex and smart
- `state`를 가지고 있습니다.
- `input a != output b` 입력값과 출력값이 같지 않습니다. 내부 로직에 의해서 얼마든지 변경될 수 있습니다.

Stateless:
- simple, dumb, presentational, pure
- `state`를 가지고 있지 않습니다.
- `input a == output b` 입력값과 출력값이 같습니다.

```javascript
// pure function
// 몇 번을 호출하던 인자를 2, 3으로 줬을 때 결과는 5다.
function sum(x, y) {
  return x + y;
};

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
        image: "https://img-c.udemycdn.com/course/240x135/2195280_49b2_2.jpg"
    },
    {
        course: "Apache Kafka Series",
        instructor: "Stephane Maarek",
        image: "https://img-c.udemycdn.com/course/240x135/1075642_b6d2_9.jpg"
    },
    {
        course: "Music Production in Logic Pro X",
        instructor: "Tomas George",
        image: "https://img-c.udemycdn.com/course/240x135/897192_2cee_7.jpg"
 
    },
    {
        course: "Unity Game Development",
        instructor: "Jonathan Weinberger",
        image: "https://img-c.udemycdn.com/course/240x135/1328572_b05d_5.jpg"
    }
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



