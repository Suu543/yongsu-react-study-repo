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

`input` 태그에 입력된 값을 추적할 때, `onChange` 이벤트와 `setState` 함수를 조합해 효과적으로 상태 값을 관리할 수 있습니다.

```javascript
import { useState } from "react";

const StateTutorial = () => {
  const [inputValue, setInputValue] = useState("Yongsu");

  const onChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  return (
    <div>
      <input onChange={onChange} placeholder="입력해주세요..." />
      {inputValue}
    </div>
  );
};

export default StateTutorial;
```

## useReducer

`useReducer`는 2개 이상의 `state(상태)`값을 효과적으로 관리하는 데 사용할 수 있는 `hook(훅)` 중에 하나 입니다

`useReducer`는 여러 상태를 보다 효율적으로 관리하고, 복잡한 상태 로직을 생성하고, 이전 상태를 효과적으로 관리할 수 있게 리엑트에서 제공해주는 `hook(훅)` 중 하나 입니다.

```javascript
import { useState } from "react";

const ReducerTutorial = () => {
  const [count, setCount] = useState(0);
  const [showText, setShowText] = useState(false);

  return (
    <div>
      <h1>{count}</h1>
      <button
        onClick={() => {
          setCount(count + 1);
          setShowText(!showText);
        }}
      >
        Click Here!
      </button>

      {showText && <p>This is a text</p>}
    </div>
  );
};

export default ReducerTutorial;
```

```javascript
import { useState, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1, showText: state.showText };
    case "toggleShowText":
      return { count: state.count, showText: !state.showText };
    default:
      return state;
  }
};

const ReducerTutorial = () => {
  // 모든 state를 담을 수 있는 변수 선언
  // dispatch: 값 변화에 사용함
  // reducer 함수, {}: 초기값
  const [state, dispatch] = useReducer(reducer, { count: 0, showText: true });

  return (
    <div>
      <h1>{state.count}</h1>
      <button
        onClick={() => {
          dispatch({ type: "INCREMENT" });
          dispatch({ type: "toggleShowText" });
        }}
      >
        Click Here!
      </button>

      {state.showText && <p>This is a text</p>}
    </div>
  );
};

export default ReducerTutorial;
```

다수의 상태 값을 동시에 관리하는 상황이 왔을 때, `useReducer` 사용을 고려할 수 있다.

`useReducer`를 사용하여 여러 상태가 데이터에 영향을 미치는 방식을 단순화할 수 있습니다.
다음 예시는, 추가(add), 제거(remove) 및 비우기(clear) 기능 구현 시, 개별 상태를 정의하는 것 대신,
`useReducer`를 사용하여 효과적으로 데이터를 관리할 수 있습니다.

1. `다음 상태(next state)` 값이 `현재 상태(current state)`에 따라 달라지는가요?
2. 관리해야 할 `상태(state)`가 둘 이상인가요?
3. 같은 이벤트로 인해 `여러 상태(multiple states)`를 바꾸는 상황이 있는가요?
4. `현재 상태(current state)`에 따라 동일한 사용자 이벤트가 다르게 처리되는 경우가 있습니까?

이러한 질문에 대해 "예"라고 대답한 경우 `useReducer`를 사용하는 데 적합한 사용 사례가 있을 수 있습니다.

- https://kyleshevlin.com/why-use-use-reducer

`useReducer` use cases

1. Manage multiple states: modify an array

- 여러 상태 관리: 배열 수정 등등

2. Modify complex states, such as arrays or objects: login form

- 배열 또는 객체와 같은 복잡한 상태 수정: 로그인, 회원가입 양식 등등

`First Case`

```javascript
import { useReducer } from "react";

const reducer = (prevState, action) => {
  let temp = "";

  switch (action.type) {
    case "ADD":
      temp = [...prevState];
      temp.push(action.payload);
      return temp;
    case "REMOVE":
      temp = [...prevState];
      temp.pop();
      return temp;
    case "CLEAR":
      return [];
    default:
      break;
  }
};

const ReducerFirstCase = () => {
  const [state, dispatch] = useReducer(reducer, ["Intitial Value"]);
  console.log(state);

  const addHandler = () => {
    dispatch({ type: "ADD", payload: Math.round(Math.random() * 100 + 100) });
  };
  const removeHandler = () => {
    dispatch({ type: "REMOVE" });
  };
  const clearHandler = () => {
    dispatch({ type: "CLEAR" });
  };

  return (
    <>
      <hr />
      <h2>useReducer use case</h2>
      <h3>Manage multiple states: modify an array</h3>
      <button onClick={addHandler}>[+] 배열에 무작위 값 추가하기</button>
      <button onClick={removeHandler}>[-] 배열 마지막 값 제거하기</button>
      <button onClick={clearHandler}>[X] 배열 비우기</button>
      <p>Shopping Cart Array:</p>
      <p>
        <b>
          {state.length === 0 && "(empty)"}
          {state.join(" - ")}
        </b>
      </p>
    </>
  );
};

export default ReducerFirstCase;
```

`Second Case`

```javascript
import { useReducer } from "react";

async function loginHelper({ username, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "user" && password === "password") {
        resolve();
      } else {
        reject();
      }
    }, 1000);
  });
}

const reducer = (prevState, action) => {
  switch (action.type) {
    case "USERNAME":
      return {
        ...prevState,
        username: action.payload,
      };
    case "PASSWORD":
      return {
        ...prevState,
        password: action.payload,
      };
    case "LOGGED_IN":
      return {
        ...prevState,
        isLoggedIn: true,
      };
    case "LOGGED_OUT":
      return {
        ...prevState,
        isLoggedIn: false,
        username: "",
        password: "",
      };
    case "IS_LOADING":
      return {
        ...prevState,
        isLoading: true,
      };
    case "IS_NOT_LOADING":
      return {
        ...prevState,
        isLoading: false,
      };
    case "ERROR":
      return {
        ...prevState,
        isError: true,
        isLoading: false,
      };

    default:
      break;
  }
};

const initialState = {
  username: "",
  password: "",
  isLoggedIn: false,
  isLoading: false,
  isError: false,
};

const UseCaseComplexStates = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const usernameHandler = (e) => {
    dispatch({ type: "USERNAME", payload: e.target.value });
  };
  const passwordHandler = (e) => {
    dispatch({ type: "PASSWORD", payload: e.target.value });
  };
  const logoutHandler = (e) => {
    dispatch({ type: "LOGGED_OUT" });
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch({ type: "IS_LOADING" });
      await loginHelper({ username: state.username, password: state.password });
      dispatch({ type: "IS_NOT_LOADING" });
      dispatch({ type: "LOGGED_IN" });
    } catch {
      dispatch({ type: "ERROR" });
      alert("🚨 Incorrect username or password");
    }
  };

  return (
    <>
      <hr />
      <h2>useReducer use case</h2>
      <h3>Modify complex states, such as arrays or objects: login form</h3>
      <div>
        {state.isLoggedIn ? (
          <>
            <p>Welcome</p>
            <button onClick={logoutHandler}>Logout</button>
          </>
        ) : (
          <form onSubmit={submitHandler}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                onChange={usernameHandler}
                value={state.username}
                placeholder="user"
              />
            </div>
            <div style={{ margin: "1rem 0" }}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={passwordHandler}
                value={state.password}
                placeholder="password"
              />
            </div>
            <div>
              <button type="submit" disabled={state.isLoading}>
                {state.isLoading ? "Logging you in..." : "Log in"}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default UseCaseComplexStates;
```

결국엔 관리해야 하는 상태 값의 숫자 많아지면, 매번 각 상태 값의 setState 함수를 호출하는 등 코드가 너무 복잡해지고, 일일이 반영하기 번거로우니까
하나의 관리소를 만들어서 내부적으로 효과적으로 관리하는 목적으로 `useReducer`를 사용하는 것 같다.

https://kyleshevlin.com/why-use-use-reducer

## useEffect

```javascript
import { useEffect } from "react";
import axios from "axios";

// state 값이 변할 때마다 매번 호출됩니다.

const EffectTutorial = () => {
  useEffect(() => {
    console.log("hello world");
  });

  return <h1>UseEffect Tutorial</h1>;
};

export default EffectTutorial;
```

### 1. `useEffect` with no second argument

`useEffect` 함수의 두번째 인자로 어떠한 값도 할당하지 않았을 때. 내부적으로 `null` or `undefined`를 할당합니다.
이 경우 두 가지 경우의 수가 존재합니다.

- a. `useEffect` 내부에서 `setState` 함수를 호출했음에도, 이전 `state`와 같은 경우
- b. `useEffect` 내부에서 `setState` 함수를 호출할때마다, 이전 `state`와 달라지는 경우

`Case A`

```javascript
import { useState, useEffect } from "react";
import axios from "axios";

const EffectTutorialFirst = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/comments").then((res) => {
      //   console.log(res.data);
      setData(res.data[0].email);
      console.log("API WAS CALLED");
    });
  });

  return (
    <div>
      <h1>UseEffect Tutorial</h1>
      <h2>{data}</h2>
    </div>
  );
};

export default EffectTutorialFirst;
```

1. 최초 `render` 함수가 호출되면서 컴포넌트가 화면에 그려집니다`(mounting)`.
2. `컴포넌트 마운팅(Compount Mounting)` 이후에 `useEffect` 함수가 호출됩니다.
3. `useEffect` 함수는 `setState` 함수를 통해 상태 값이 변경되면 재호출됩니다. 단, `setState` 함수를 호출했음에도 이전 상태 값과 비교했을 때 상태값에 변화가 없다면 `재렌더링(re-render)`하지 않습니다.

`Case B`

```javascript
import { useState, useEffect } from "react";
import axios from "axios";

const EffectTutorialSecond = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/comments").then((res) => {
      //   console.log(res.data);
      let ranNum = Math.floor(Math.random() * 499) + 1;
      setData(res.data[ranNum].email);
      console.log("API WAS CALLED");
    });
  });

  return (
    <div>
      <h1>UseEffect Tutorial</h1>
      <h2>{data}</h2>
    </div>
  );
};

export default EffectTutorialSecond;
```

1. 최초 `render` 함수가 호출되면서 컴포넌트가 화면에 그려집니다`(mounting)`
2. `컴포넌트 마운팅(Component Mounting)` 이후에 `useEffect` 함수가 호출됩니다.
3. `useEffect` 함수를 호출했을 때, `useEffect Body`에 `setState` 함수가 호출되고, 매번 상태값이 변경됨을 확인할 수 있습니다.
4. 상태 값에 변경이 발생했음으로, `재렌더링(re-render)`이 발생합니다.
5. 결과적으로 `무한 루트(Infinite Loop)`에 빠지게 됩니다.

if your state is a primitive value(number, string, boolean, ...), then setting the same value using setState hook won't trigger a rerender. If your state is an Object or Array then it will behave differently.

https://overreacted.io/how-are-function-components-different-from-classes/
https://dmitripavlutin.com/value-vs-reference-javascript/
https://stackoverflow.com/questions/59489959/set-state-with-same-value-using-hooks-will-cause-a-rerender

### 2. `useEffect` with an empty array as a second argument

`useEffect`의 두 번째 인자 값으로 `빈 배열([])`을 전달하면 최초 `render` 함수가 호출되고, 이후 단 한 번만 호출되는 방식으로 동작합니다. 클래스 컴포넌트의 `componentDidMount` 함수와 똑같이 동작한다 생각할 수 있습니다.

And to cover all the use cases, there is the one with an empty dependencies array as the second argument, where the callback gets executed only on the first render:

```javascript
import { useState, useEffect } from "react";
import axios from "axios";

const EffectTutorialThird = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/comments").then((res) => {
      //   console.log(res.data);
      let ranNum = Math.floor(Math.random() * 499) + 1;
      setData(res.data[ranNum].email);
      console.log("API WAS CALLED");
    });
  }, []);

  return (
    <div>
      <h1>UseEffect Tutorial</h1>
      <h2>{data}</h2>
    </div>
  );
};

export default EffectTutorialThird;
```

### 3. `useEffect` with Promise and Async/Await

`useEffect` 함수의 첫 번째 인자에 다음 코드와 같이 `async/await`을 적용하는 경우 경고 문구가 출력됩니다. `useEffect` 함수의 리턴값은 `cleanup`로써 아무것도 반환하지 않거나 Clean up 함수를 반환합니다. 하지만 `async/await`의 경우 `Promise`를 리턴하기 때문에 경고 문구가 출력됩니다.

```javascript
import { useState, useEffect } from "react";
import axios from "axios";

const EffectTutorialFourthError = () => {
  const [data, setData] = useState("");

  useEffect(async () => {
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );
    setData(res.data[0].email);
  }, []);

  return (
    <div>
      <h1>UseEffect Tutorial</h1>
      <h2>{data}</h2>
    </div>
  );
};

export default EffectTutorialFourthError;
```

`Promise` 리턴 문제를 해결하는 방법은 다음과 같습니다.

1. 비동기 함수를 `useEffect Hook` 내부에 정의 후 `useEffect Hook`에서 호출
2. 비동기 함수를 `useEffect Hook` 외부에 정의 후 `useEffect Hook`에서 호출
3. IIFE - 함수가 정의되자마자 실행되는 JS 기술

```javascript
import { useState, useEffect } from "react";
import axios from "axios";

const EffectTutorialFourth = () => {
  const [data, setData] = useState("");

  const getEmailOutside = async () => {
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );

    setData(res.data[0].email);
    console.log("API WAS CALLED Second");
  };

  // Solution #1: 비동기 함수를 useEffect Hook 내부에 정의 후 useEffect Hook에서 호출
  useEffect(() => {
    const getEmail = async () => {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/comments"
      );

      setData(res.data[0].email);
      console.log("API WAS CALLED First");
    };

    getEmail();
  }, []);

  // Solution #2: 비동기 함수를 useEffect Hook 외부에 정의 후 useEffect Hook에서 호출
  useEffect(() => {
    getEmailOutside();
  }, []);

  // Solution #3: IIFE - 함수가 정의되자마자 실행되는 JS 기술
  useEffect(() => {
    (async () => {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/comments"
      );

      setData(res.data[0].email);
      console.log("API WAS CALLED Third");
    })();
  }, []);

  return (
    <div>
      <h1>UseEffect Tutorial</h1>
      <h2>{data}</h2>
    </div>
  );
};

export default EffectTutorialFourth;
```

### 4. `useEffect` with an array as a second argument

`useEffect` 함수의 두 번째 인자 값으로 배열을 정의하고, 배열의 요소로써 정의한 상태 값을 할당하면, 최초 렌더링 이후에 한 번 호출되고, 배열 요소에 정의된 상태 값이 변경이 발생했을 때만 `useEffect body` 부분이 재호출합니다.

다음 코드의 경우 `name, email` 두 개의 상태 값이 배열에 할당되어 있기 때문에, 최초 렌더링이 완료된 후, `name` or `email`에 해당하는 `setState` 함수가 호출되는 경우에 `useEffect` 함수가 호출됩니다. 이 동작은 클래스 컴포넌트 라이프사이클의 `componentDidUpdate` 함수와 같습니다.

- componentDidMount + componentDidUpdate

```javascript
import { useState, useEffect } from "react";

const EffectTutorialFifth = () => {
  const [name, setName] = useState("name");
  const [email, setEmail] = useState("email");

  useEffect(() => {
    console.log("useEffect` with an array as a second argument");
  }, [name, email]);

  const changeName = () => setName(name + "new");
  const changeEmail = () => setEmail(email + "/new");

  return (
    <>
      <button onClick={changeName}>Name</button>
      <button onClick={changeEmail}>Email</button>
      <div>
        Name: {name}, Email: {email}
      </div>
    </>
  );
};

export default EffectTutorialFifth;
```

### 5. `useEffect` return cleanup function

`useEffect` 함수의 리턴값은 `cleanup` 목적으로 사용할 수 있습니다.

And finally, the one that calls the callback on the first render and every time some state in the dependencies array changes:

- https://stackoverflow.com/questions/72767464/what-happens-for-an-useeffect-with-no-second-argument-or-one-equal-to-null-or-un
- https://stackoverflow.com/questions/53070970/infinite-loop-in-useeffect
- https://stackoverflow.com/questions/72767464/what-happens-for-an-useeffect-with-no-second-argument-or-one-equal-to-null-or-un
- https://stackoverflow.com/questions/59489959/set-state-with-same-value-using-hooks-will-cause-a-rerender

- https://dev.to/colocodes/6-use-cases-of-the-useeffect-reactjs-hook-282o

마운트 : 처음 나타남
언마운트 : 사라짐

- https://blog.logrocket.com/understanding-react-useeffect-cleanup-function/
- https://dillionmegida.com/p/why-you-should-cleanup-when-component-unmounts/

## useRef

`React`는 `VirtualDOM`으로 동작합니다. `document.getElement[...]`등 `DOM`에 직접 접근하는 코드를 사용하지 않습니다. 그럼에도 `DOM` 요소에 직접 접근해야 하는 상황이 발생할 때가 있습니다. 이 경우 `useRef` 함수를 사용하면 `VirtualDOM`을 통해 렌더링함에도 `DOM` 요소에 접근할 수 있게 됩니다.

버튼을 클릭 시, `input` 태그에 포커스(값 입력 부분이 깜빡거림)되도록 구현해보겠습니다.

`DOM`에서 클릭 된 요소 접근시, `event.target` 프로퍼티를 통해 접근합니다. `useRef`시, `useRef`함수를 호출에 리턴값을 변수에 담고, 이를 태그 `ref` 프로퍼티에 할당합니다. 클릭 이벤트 등이 발생했을 때 클릭 된 요소에 직접 접근할 때는 `current` 프로퍼티를 이용할 수 있습니다.

- DOM: `event.target`
- useRef: `current`

`input` 값을 가져오고 싶은 경우 `value` 프로퍼티를 이용할 수 있습니다.

- DOM: `event.target.value`
- useRef: `current.value`

`input` 태그에 포커스 효과를 주고 싶은 경우 `focus()` 프로퍼티 함수를 호출하면 됩니다.

- DOM: `event.target.focus()`
- useRef: `current.focus()`

```javascript
import { useRef } from "react";

const RefTutorial = () => {
  const inputRef = useRef(null);
  const onClick = () => {
    console.log(inputRef.current);
    console.log(inputRef.current.value);
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  return (
    <div>
      <h1>useRef Tutorial</h1>
      <input type="text" placeholder="Enter Text..." ref={inputRef} />
      <button onClick={onClick}>Change Name</button>
    </div>
  );
};

export default RefTutorial;
```

`useRef` 함수를 사용하는 예시 중 하나는 `Todolist`가 될 수 있습니다. `Todolist` 생성 과정은 다음과 같습니다.

1. 항목 추가를 위해 `input` 태그에 값을 입력합니다.
2. 입력한 값을, `Todolist`에 붙여줍니다.
3. `input` 태그를 비워줍니다.

`useState`를 사용해 3번 과정을 구현할 수 있지만, `useRef`를 통해서도 쉽게 구현할 수 있습니다. `DOM` 요소에 직접 접근해야 하는 경우 각자의 상황에 맞게 `useRef` 훅을 이용할 수 있습니다.

- DOM: `event.target.value = ""`
- useRef: `current.value = ""`

### useRef Exercise

- https://www.daleseo.com/react-hooks-use-ref/
