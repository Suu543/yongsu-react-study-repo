# Project

## Project Setup
- 이 부분은 다시 작성해야 합니다.
- `Bootstrap CDN` 추가하기
- https://getbootstrap.com/

```css
/* App.css */
.App {
  text-align: center;
  min-height: 100vh; 
}

.card-holder{
  min-height: 300px;
  perspective: 1200px;
}

.nav-card{
  padding: 50px;
  box-shadow: 0 0.125rem 1.25rem 0 rgba(0,0,0,0.24);
  border-radius: 0.3125rem;
  cursor: pointer; 
  max-width: 200px;
}

.card{
  height: 200px;
  box-shadow: 0 0.125rem 1.25rem 0 rgba(0,0,0,0.24);
  border-radius: 0.3125rem;
  transform-style: preserve-3d;
	transition: 1s all;
  cursor: pointer;   
}

.nav-card span{
  display: block;
}

.card-back, .card-front{
	position: absolute;
	top: 0;
	left: 0;
  backface-visibility: hidden;
  height: 100%;
  width: 100%;
  font-size: 30px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.card-front{
	transform: rotateY(180deg);
}

.flip,.tempFlip{
	transform: rotateY(-180deg);
}

.nav-link{
  cursor: pointer;
}

.spinner-wrapper{
  padding-top: 50px;
  min-height: 200px;
}

.option{
  border: 1px solid black;
  width: 80px;
  margin:auto;
}

.overlay{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  opacity: 1;
  background-color: rgba(0,0,0,0.54);
  width: 100vw;
  height: 100vw;

}

.info{
  position: absolute;
  color: black;
  background-color: white;
  border-radius: 5px;
  padding: 30px;
  z-index: 1000;
  width: 500px;
  top: 20%;
  left: 50%;
  margin-top: -100px; /* Negative half of height. */
  margin-left: -250px; /* Negative half of width. */  
}

ul.multi{
  display: block;
  list-style-type: none;
  width: 100%;
}

ul.multi li{
  display: inline;
  padding: 0 5px;
  font-size: 16px;
}
```

## QuizBar + FontAwesome Glyphicons
- react-fontawesome: https://fontawesome.com/v5/docs/web/use-with/react
```javascript
// components/QuizBar.js

// npm i --save @fortawesome/fontawesome-svg-core
// npm install --save @fortawesome/free-solid-svg-icons
// npm install --save @fortawesome/react-fontawesome

import react from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDumbbell,
  faFont,
  faFileAlt,
  faDice,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faDumbbell, faFont, faFileAlt, faDice);

function QuizBar(props) {
  return (
    <div className="quiz-bar">
      <h1>Choose Your Study Type</h1>
      <ul className="nav nav-pills nav-fill">
        <li className="col-sm-3 text-center">
          <div className="nav-card">
            <FontAwesomeIcon icon="dice" size="4x" />
          </div>
        </li>
      </ul>
    </div>
  );
}

export default QuizBar;
```

## QuizType - a component inside QuizBar
<img src="https://cdn-images-1.medium.com/max/800/1*gmnAxFBgpQFIpN0S8VsSCw.png" />
<img src="https://cdn-images-1.medium.com/max/800/1*_rga32JYqS8lQAMUYCo6Hw.png" />

`App` 컴포넌트에서 `cardStyle` state와 `userChoice` 함수를 정의해, 자식 요소인 `QuizBar` 컴포넌트에 전달하고, 이후 생성할 `FlashCard` 컴포넌트의 자식 요소에 똑같이 전달함으로써 `QuizBar` and `FlashCard` 컴포넌트 사이의 싱크를 맞출 수 있습니다.

```javascript
// App.js
import React, { Component } from "react";
import "./App.css";

// Components
import QuizBar from "./components/QuizBar";

class App extends Component {
  constructor() {
    super();
    this.state = {
      cardStyle: "Random",
    };
  }

  userChoice = (cardStyle) => {
    this.setState({
      cardStyle,
    });
  };

  render() {
    console.log(this.state.cardStyle);
    return (
      <div className="App">
        <QuizBar userChoice={this.userChoice} />
      </div>
    );
  }
}

export default App;
```

```javascript
// components/QuizType.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDumbbell,
  faFont,
  faFileAlt,
  faDice,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faDumbbell, faFont, faFileAlt, faDice);

function QuizType(props) {
  return (
    <li className="col-sm-3 text-center">
      <div
        className="nav-card"
        onClick={() => {
          props.userChoice(props.quizType);
        }}
      >
        <FontAwesomeIcon icon={props.icon} size="4x" />
        <span>{props.quizType}</span>
      </div>
    </li>
  );
}

export default QuizType;
```

```javascript
// components/QuizBar.js
// npm i --save @fortawesome/fontawesome-svg-core
// npm install --save @fortawesome/free-solid-svg-icons
// npm install --save @fortawesome/react-fontawesome

import React from "react";
import QuizType from "./QuizType";

function QuizBar(props) {
  return (
    <div className="quiz-bar">
      <h1>Choose Your Study Type</h1>
      <ul className="nav nav-pills nav-fill">
        <QuizType icon="dice" quizType="Random" userChoice={props.userChoice} />
        <QuizType
          icon="file-alt"
          quizType="Regular"
          userChoice={props.userChoice}
        />
        <QuizType
          icon="dumbbell"
          quizType="Weighted"
          userChoice={props.userChoice}
        />
        <QuizType icon="font" quizType="Multi" userChoice={props.userChoice} />
      </ul>
    </div>
  );
}

export default QuizBar;
```

## Cleaning up QuizBar
- `QuizType`에 사용 될 속성 값들을 객체로 데이터화 함으로써 코드를 보다 깔끔하게 리펙토링 할 수 있다.
```javascript
// components/QuizBar.js

import React from "react";
import QuizType from "./QuizType";

function QuizBar(props) {
  const quizArray = [
    {
      icon: "dice",
      type: "Random",
    },
    {
      icon: "file-alt",
      type: "Regular",
    },
    {
      icon: "dumbbell",
      type: "Weighted",
    },
    {
      icon: "font",
      type: "Multi",
    },
  ];

  const quizTypes = quizArray.map((qt, i) => {
    return (
      <QuizType
        key={i}
        icon={qt.icon}
        quizType={qt.type}
        userChoice={props.userChoice}
      />
    );
  });

  return (
    <div className="quiz-bar">
      <h1>Choose Your Study Type</h1>
      <ul className="nav nav-pills nav-fill">{quizTypes}</ul>
    </div>
  );
}

export default QuizBar;
```

## FlashCard Component
```javascript
// components/FlashCard.js
import React, { Component } from "react";

// Components
import RandomWeighted from "./RandomWeighted";
import RegularCard from "./RegularCard";
import MultiCard from "./MultiCard";

class FlashCard extends Component {
  constructor() {
    super();
    this.state = {
      flipClass: "",
    };
  }

  flip = (e) => {
    let newFlip = this.state.flipClass === "" ? "flip" : "";
    this.setState({
      flipClass: newFlip,
    });
  };

  render() {
    return (
      <>
        <div className="row align-items-center card-holder">
          <div
            onClick={this.flip}
            className={`col-sm-6 offset-sm-3 card mb-3 ${this.state.flipClass}`}
          >
            <RandomWeighted />
          </div>
        </div>
      </>
    );
  }
}

export default FlashCard;
```

```javascript
// components/RandomWeighted.js
import React from "react";

function RandomWeighted(props) {
  return (
    <>
      <div className="card-back">AWS Service</div>
      <div className="card-front">AWS Category</div>
    </>
  );
}

export default RandomWeighted;
```

```javascript
// components/RegularCard.js
import React from "react";

function RegularCard(props) {
  return (
    <>
      <div className="card-back">AWS Service</div>
      <div className="card-front">
        <div>Description</div>
        <div>Category</div>
      </div>
    </>
  );
}

export default RegularCard;
```

```javascript
// components/MultiCard.js
import React from "react";

function MultiCard(props) {
  return (
    <>
      <div className="card-back">
        <div>AWS Service</div>
        <ul className="multi">options</ul>
      </div>
      <div className="card-front">multiChoice Answer</div>
    </>
  );
}

export default MultiCard;
```

## Getting Data with Axios

```javascript
// App.js
// FlashCard 컴포넌트에 cardStyle 인자 전달
import React, { Component } from "react";
import "./App.css";

// Components
import QuizBar from "./components/QuizBar";
import FlashCard from "./components/FlashCard";

class App extends Component {
  constructor() {
    super();
    this.state = {
      cardStyle: "Random",
    };
  }

  userChoice = (cardStyle) => {
    this.setState({
      cardStyle,
    });
  };

  render() {
    console.log(this.state.cardStyle);
    return (
      <div className="App align-items-center d-flex">
        <div className="container">
          <QuizBar userChoice={this.userChoice} />
          <FlashCard cardStyle={this.state.cardStyle} />
        </div>
      </div>
    );
  }
}

export default App;
```

```javascript
// components/FlashCard.js
import React, { Component } from "react";
import axios from "axios";

// Components
import RandomWeighted from "./RandomWeighted";
import RegularCard from "./RegularCard";
import MultiCard from "./MultiCard";

class FlashCard extends Component {
  constructor() {
    super();
    this.apiHostRoot = `https://aws-services.robertbunch.dev/services`;
    this.state = {
      flipClass: "",
      questionData: "",
    };
  }

  componentDidMount() {
    this.newCard();
  }

  flip = (e) => {
    let newFlip = this.state.flipClass === "" ? "flip" : "";
    this.setState({
      flipClass: newFlip,
    });
  };

  newCard = () => {
    let path;
    // console.log(this.props.cardStyle);
    const cardStyle = this.props.cardStyle;

    if (cardStyle === "Random" || cardStyle === "Regular") {
      path = this.apiHostRoot + "/all";
      console.log("Random or Regular");
    } else if (cardStyle === "Weighted") {
      path = this.apiHostRoot + "/weighted";
      console.log("Weighted");
    } else {
      path = this.apiHostRoot + "/multi";
      console.log("Multi");
    }

    axios.get(path).then((res) => {
      //   console.log(res.data);
      this.setState({
        questionData: res.data,
      });
    });
  };

  render() {
    return (
      <>
        <div className="row align-items-center card-holder">
          <div
            onClick={this.flip}
            className={`col-sm-6 offset-sm-3 card mb-3 ${this.state.flipClass}`}
          >
            <RegularCard questionData={this.state.questionData} />
          </div>
        </div>
        <button onClick={this.newCard} className="btn btn-primary btn-lg">
          Next Question
        </button>
      </>
    );
  }
}

export default FlashCard;
```

```javascript
// components/RegularCard.js
import React from "react";

function RegularCard(props) {
  //   console.log(props.questionData);
  const question = props.questionData;

  return (
    <>
      <div className="card-back">{question.service}</div>
      <div className="card-front">
        <div>{question.desc}</div>
        <div>{question.cat}</div>
      </div>
    </>
  );
}

export default RegularCard;
```
- `cardStyle`을 변경해도, `newCard` 함수가 호출되지 않는 것을 확인할 수 있습니다.

## Adding a Spinner
```javascript
import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

// Components
import RandomWeighted from "./RandomWeighted";
import RegularCard from "./RegularCard";
import MultiCard from "./MultiCard";

library.add(faSpinner);

class FlashCard extends Component {
  constructor() {
    super();
    this.apiHostRoot = `https://aws-services.robertbunch.dev/services`;
    this.state = {
      flipClass: "",
      questionData: "",
      ready: false,
    };
  }

  componentDidMount() {
    // this.newCard();
  }

  flip = (e) => {
    let newFlip = this.state.flipClass === "" ? "flip" : "";
    this.setState({
      flipClass: newFlip,
    });
  };

  newCard = () => {
    let path;
    // console.log(this.props.cardStyle);
    const cardStyle = this.props.cardStyle;

    if (cardStyle === "Random" || cardStyle === "Regular") {
      path = this.apiHostRoot + "/all";
      console.log("Random or Regular");
    } else if (cardStyle === "Weighted") {
      path = this.apiHostRoot + "/weighted";
      console.log("Weighted");
    } else {
      path = this.apiHostRoot + "/multi";
      console.log("Multi");
    }

    axios.get(path).then((res) => {
      //   console.log(res.data);
      this.setState({
        questionData: res.data,
        ready: true,
      });
    });
  };

  render() {
    if (!this.state.ready) {
      this.newCard();
      return (
        <div className="spinner-wrapper">
          <FontAwesomeIcon icon="spinner" size="6x" spin />
        </div>
      );
    }

    return (
      <>
        <div className="row align-items-center card-holder">
          <div
            onClick={this.flip}
            className={`col-sm-6 offset-sm-3 card mb-3 ${this.state.flipClass}`}
          >
            <RegularCard questionData={this.state.questionData} />
          </div>
        </div>
        <button onClick={this.newCard} className="btn btn-primary btn-lg">
          Next Question
        </button>
      </>
    );
  }
}

export default FlashCard;
```

## Adding FlashCard Component Logic
```javascript
// components/FlashCard.js
import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

// Components
import RandomWeighted from "./RandomWeighted";
import RegularCard from "./RegularCard";
import MultiCard from "./MultiCard";

library.add(faSpinner);

class FlashCard extends Component {
  constructor() {
    super();
    this.apiHostRoot = `https://aws-services.robertbunch.dev/services`;
    this.state = {
      flipClass: "",
      questionData: "",
      ready: false,
    };
  }

  componentDidMount() {
    // this.newCard();
  }

  flip = (e) => {
    let newFlip = this.state.flipClass === "" ? "flip" : "";
    this.setState({
      flipClass: newFlip,
    });
  };

  newCard = () => {
    let path;
    // console.log(this.props.cardStyle);
    const cardStyle = this.props.cardStyle;

    if (cardStyle === "Random" || cardStyle === "Regular") {
      path = this.apiHostRoot + "/all";
      console.log("Random or Regular");
    } else if (cardStyle === "Weighted") {
      path = this.apiHostRoot + "/weighted";
      console.log("Weighted");
    } else {
      path = this.apiHostRoot + "/multi";
      console.log("Multi");
    }

    axios.get(path).then((res) => {
      //   console.log(res.data);
      this.setState({
        questionData: res.data,
        ready: true,
      });
    });
  };

  render() {
    if (!this.state.ready) {
      this.newCard();
      return (
        <div className="spinner-wrapper">
          <FontAwesomeIcon icon="spinner" size="6x" spin />
        </div>
      );
    }

    const cardStyle = this.props.cardStyle;
    let card;
    if (cardStyle === "Multi") {
      card = <MultiCard questionData={this.state.questionData} />;
    } else if (cardStyle === "Regular") {
      card = <RegularCard questionData={this.state.questionData} />;
    } else {
      card = <RandomWeighted questionData={this.state.questionData} />;
    }

    return (
      <>
        <div className="row align-items-center card-holder">
          <div
            onClick={this.flip}
            className={`col-sm-6 offset-sm-3 card mb-3 ${this.state.flipClass}`}
          >
            {card}
          </div>
        </div>
        <button onClick={this.newCard} className="btn btn-primary btn-lg">
          Next Question
        </button>
      </>
    );
  }
}

export default FlashCard;
```
```javascript
// components/RandomWeighted.js
import React from "react";

function RandomWeighted(props) {
  const question = props.questionData;
  return (
    <>
      <div className="card-back">
        <div>{question.service}</div>
        <div className="commonality">{question.common}</div>
      </div>
      <div className="card-front">
        <div>{question.cat}</div>
      </div>
    </>
  );
}

export default RandomWeighted;
```

- `MultiCard` 컴포넌트의 `options` 부분에서 오류가 발생한다. 그 이유는 이전에 있었던 값이 제대로 갱신되지 않았기 때문이다.
- `MultiCard`의 `ready` state가 `cardStyle`이 변경되어도 계속해서 `true` 상태로 남아있어, 값 갱신이 되지 않은 상태에서, 배열 요소의 데이터를 가진 `MultiCard` 컴포넌트에 갱신되지 않은 값을 적용 시 오류가 발생한다. 이 문제를 해결할 좋은 방법은 `ready` state를 부모 요소로 전달하고, `ready` state를 갱신하는 별도의 함수를 하나 더 생성해 주는 것입니다.
```javascript
// components/MultiCard.js
import React from "react";

function MultiCard(props) {
  const question = props.questionData;
  console.log(question);

  const choices = ["a", "b", "c", "d"];
  const options = question.options.map((option, i) => {
    return (
      <li key={i}>
        {choices[i]}. {option}
      </li>
    );
  });

  return (
    <>
      <div className="card-back">
        <div>AWS Service</div>
        <ul className="multi">{options}</ul>
      </div>
      <div className="card-front">multiChoice Answer</div>
    </>
  );
}

export default MultiCard;
```

## Moving State Up
```javascript
// App.js
import React, { Component } from "react";
import "./App.css";

// Components
import QuizBar from "./components/QuizBar";
import FlashCard from "./components/FlashCard";

class App extends Component {
  constructor() {
    super();
    this.state = {
      cardStyle: "Random",
      ready: false,
    };
  }

  // 데이터가 서버로부터 불러와 졌음을 보장할 수 없으므로 false
  userChoice = (cardStyle) => {
    this.setState({
      cardStyle,
      ready: false,
    });
  };

  nowReady = () => {
    this.setState({
      ready: true,
    });
  };

  render() {
    console.log(this.state.cardStyle);
    return (
      <div className="App align-items-center d-flex">
        <div className="container">
          <QuizBar userChoice={this.userChoice} />
          <FlashCard
            cardStyle={this.state.cardStyle}
            nowReady={this.nowReady}
            ready={this.state.ready}
          />
        </div>
      </div>
    );
  }
}

export default App;
```

```javascript
// components/FlashCard.js
import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

// Components
import RandomWeighted from "./RandomWeighted";
import RegularCard from "./RegularCard";
import MultiCard from "./MultiCard";

library.add(faSpinner);

class FlashCard extends Component {
  constructor() {
    super();
    this.apiHostRoot = `https://aws-services.robertbunch.dev/services`;
    this.state = {
      flipClass: "",
      questionData: "",
    };
  }

  componentDidMount() {
    // this.newCard();
  }

  flip = (e) => {
    let newFlip = this.state.flipClass === "" ? "flip" : "";
    this.setState({
      flipClass: newFlip,
    });
  };

  newCard = () => {
    let path;
    // console.log(this.props.cardStyle);
    const cardStyle = this.props.cardStyle;

    if (cardStyle === "Random" || cardStyle === "Regular") {
      path = this.apiHostRoot + "/all";
      console.log("Random or Regular");
    } else if (cardStyle === "Weighted") {
      path = this.apiHostRoot + "/weighted";
      console.log("Weighted");
    } else {
      path = this.apiHostRoot + "/multi";
      console.log("Multi");
    }

    axios.get(path).then((res) => {
      //   console.log(res.data);
      this.setState({
        questionData: res.data,
      });
      this.props.nowReady();
    });
  };

  render() {
    if (!this.props.ready) {
      this.newCard();
      return (
        <div className="spinner-wrapper">
          <FontAwesomeIcon icon="spinner" size="6x" spin />
        </div>
      );
    }

    const cardStyle = this.props.cardStyle;
    let card;
    if (cardStyle === "Multi") {
      card = <MultiCard questionData={this.state.questionData} />;
    } else if (cardStyle === "Regular") {
      card = <RegularCard questionData={this.state.questionData} />;
    } else {
      card = <RandomWeighted questionData={this.state.questionData} />;
    }

    return (
      <>
        <div className="row align-items-center card-holder">
          <div
            onClick={this.flip}
            className={`col-sm-6 offset-sm-3 card mb-3 ${this.state.flipClass}`}
          >
            {card}
          </div>
        </div>
        <button onClick={this.newCard} className="btn btn-primary btn-lg">
          Next Question
        </button>
      </>
    );
  }
}

export default FlashCard;
```

```javascript
// components/MultiCard.js
import React from "react";

function MultiCard(props) {
  const question = props.questionData;
  console.log(question);

  const choices = ["a", "b", "c", "d"];
  const options = question.options.map((option, i) => {
    return (
      <li key={i}>
        {choices[i]}. {option}
      </li>
    );
  });

  const answerIndex = question.options.indexOf(question.answer);
  const answerLetter = choices[answerIndex];

  return (
    <>
      <div className="card-back">
        <div>{question.service}</div>
        <ul className="multi">{options}</ul>
      </div>
      <div className="card-front">
        {answerLetter}. {question.answer}
      </div>
    </>
  );
}

export default MultiCard;
```