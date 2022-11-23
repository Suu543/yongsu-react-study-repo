# Hooks

- https://reactjs.org/docs/hooks-intro.html

## Before Hooks

```javascript
import { Component } from "react";
import "./App.css";

class App extends Component {
  state = { counter: 0 };

  updateCounter = () => {
    this.setState({ counter: this.state.counter + 1 });
  };

  render() {
    return (
      <div>
        <div>Counter: ${this.state.counter}</div>
        <div>
          <button onClick={this.updateCounter}>Add 1!</button>
        </div>
      </div>
    );
  }
}

export default App;
```

```javascript
import { useState } from "react";
import "./App.css";

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <div>Counter: ${counter}</div>
      <div>
        <button onClick={() => setCounter(counter + 1)}>Add 1!</button>
      </div>
    </div>
  );
}

export default App;
```

## OOP vs. Functional Programming

`Classes`

- Object Oriented Programming (Mutate)
- Encapsulation: Setter and Getter
- Abstraction: App ==> Props ==> Counter
- Inheritance
- Polymorphism

`Hooks`

- Functional Programming (Pure)
- Purity (Do not mutate state)
- Immutability

## Paradigm Chart

<img src="https://cdn-images-1.medium.com/max/800/1*6M9E2JPVMIx0B-VTJI1z0w.png" />

Imperative:

- Imperative Programming means that with regard to state management you simply mutate state if you want to change the value of a variable. There is no shared state. You make a variable and then you change it whenever you need to this. It is awesome when you have a small problem you can just simply get work done.

Functional:

- We have shared state.

Procedural:

- There is no association between the data and the methods.

## State

다음 코드는 버튼이 클릭 되었음에도, 콘솔에는 갱신된 `counter` 값이 출력되는 반면에,
`HTML`에는 반영되지 않는 것을 확인할 수 있습니다.

이러한 문제가 발생한 이유는, 함수형 컴포넌트는 `return` 함수를 호출해야만 갱신된 값이 반영되는데,
`counter` 변수의 값 증가는 `return` 함수를 호출하지 않기 때문에 갱신된 값이 반영되지 않습니다.

`react`에서 제공하는 `useState hook`을 사용하면 값이 갱신될 때마다 `return` 함수를 호출하도록 동작해
갱신된 값이 화면에 반영됩니다.

```javascript
const StateTutorial = () => {
  let counter = 0;

  const increment = () => {
    counter = counter + 1;
    console.log(counter);
  };

  return (
    <div>
      {counter}
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default StateTutorial;
```

## useState

다음 코드를 실행하면 오류가 발생합니다.
`useState`를 사용할 때 꼭 지켜야 하는 규칙이 있습니다.

`state` 값을 갱신할 때는 반드시 두번째 인자인 `setCounter` 함수를 사용해야 한다는 점입니다.

```javascript
import { useState } from "react";

const StateTutorial = () => {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    counter = counter + 1;
    console.log(counter);
  };

  return (
    <div>
      {counter}
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default StateTutorial;
```

`setCounter` 사용

```javascript
import { useState } from "react";

const StateTutorial = () => {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  };

  return (
    <div>
      {counter}
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default StateTutorial;
```

`state` 갱신에 반드시 `setState` 함수 내부에는 값 갱신을 포착하고, 화면을 다시 랜더링 해주는 기능을 제공합니다. 그러므로 함수형 컴포넌트를 사용할 때 동적으로 갱신되는 값을 사용하고 싶은 경우, `useState` 함수를 통해 `state` 값을 정의하고, `setState` 함수를 통해 상태 값을 갱신해야 합니다.
