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

## 1. `useEffect` with no second argument

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

## 2. `useEffect` with an empty array as a second argument

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

## 3. `useEffect` with Promise and Async/Await

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

## 4. `useEffect` with an array as a second argument

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

## 5. `useEffect` return cleanup function

`Mounting`: 컴포넌트가 처음 나타남 <br />
`Updating`: 컴포넌트 내부의 `state` or `props`가 업데이트 됨 <br />
`Unmounting`: 컴포넌트가 사라짐

`useEffect` 함수의 리턴값은 `cleanup` 목적으로 사용할 수 있습니다.

`useEffect` 함수는 한 번 호출되고, 재호출 되기 전, 내부적으로 혹은 직접 정의한 `return` 함수를 호출하고, 다시 `useEffect`를 호출합니다. 구조를 그려보자면, 다음과 같습니다.

1. useEffect 호출
2. useEffect return 함수 호출
3. useEffect 재호출

`useEffect` 함수가 위와 같이 동작하기 때문에, `cleanup` 기능을 정의하기에 적합합니다.

- mount: 컴포넌트가 나타남
- unmount: 컴포넌트가 사라짐

1. `unmounting`시점에 `promise`가 `resolve` 되면 해당 데이터를 받을 곳이 없으므로 오류가 발생할 수 있습니다. `unmounting` 되기 이전 강제로 진행중인 `Promise`를 해제해줌으로써 다음 오류를 방지할 수 있습니다.

<img src="https://cdn-images-1.medium.com/max/800/0*kJp4cTOSlUQbra9v.png" />

## 6. `useEffect` return cleanup function usages

비동기 API 호출, DOM 업데이트, Socket 생성 등의 과정에서 `부작용(side-effect)`이 자주 발생합니다. `useEffect` 함수의 리턴값으로 `cleanup` 함수를 리턴함으로써 이런 `부작용(side-effect)`을 체계적으로 관리할 수 있습니다.

`useEffect` 함수 리턴 값으로 정의하는 `Cleanup` 함수란 더는 실행될 필요가 없는 코드를 제거해주는 역할을 합니다.

- **Example1**: A 컴포넌트가 제품을 가져오기 위해 비동기 API 요청을 보냈고, 이 요청을 처리하기 전 A 컴포넌트가 DOM에서 `제거된다면 (Unmounting)`, 해당 요청을 더는 처리할 필요가 없게 됩니다. 이 상황에 `cleanup` 함수를 이용해 비동기 요청을 강제로 종료할 수 있습니다.

- **Example2**: B 컴포넌트가 웹 소켓을 열어 서버와 데이터를 주고받다가, DOM에서 B 컴포넌트가 `제거된다면(Unmounting)`, 더는 소켓 연결을 유지 할 필요가 없습니다. `cleanup`함수를 이용해 컴포넌트가 `제거되기(Unmounting)`전 소켓 연결을 종료함으로써 부작용을 방지할 수 있습니다.

컴포넌트가 DOM에서 제거되는 시점에 `cleanup` 함수를 정의해야 하는 이유 <br /> (Why should you cleanup when a component unmounts?)

1. 메모리 누수를 방지
2. 앱 사용자에게 최적의 경험
3. 예상치 못한 앱 오류를 방지

### 6-1: 메모리 누수 방지(To avoid memory leaks)

`Memory Leak: 메모리 누수`

메모리 누수는 사용처가 없음에도 메모리 공간을 차지하면 발생합니다. 이후 메모리가 꼭 필요한 상황에 메모리 누수 때문에 메모리 부족 현상 등이 발생할 수 있습니다. 컴포넌트가 `나타난 상태(Mounting)`라면 누수 문제를 걱정하지 않아도 되지만, `제거된 상태(Unmounting)`라면 누수 문제를 걱정해야 합니다. 몇몇 경우 `Garbage Collection`이 메모리 관리를 도와주지만, 이것으로 충분치 않은 경우가 많기 때문 `cleanup` 함수를 통해 직접 관리하는 것이 좋습니다.

## 6-2: 앱 사용자에게 최적의 경험 제공(To optimize our application for a good user experience)

메모리 누수가 발생해도 앱이 정상적으로 동작할 수 있습니다. 하지만 이러한 누수가 중첩되다 보면 앱 렌더링 속도 및 성능에 영향을 미칠 수 있고, 이는 결과적으로 사용자 경험의 악화로 이어질 수 있기 때문에, 메모리 누수 관리를 철저히 하는 것이 중요합니다.

## 6-3: 예상치 못한 앱 오류 방지(To prevent unexpected errors in our applications)

예상치 못한 오류는 대게 비동기 등 시점에 직관적이지 않았을 때 발생합니다.

```javascript
import { useState, useEffect } from "react";

function RandomChild() {
  const [state, setState] = useState(0);

  useEffect(() => {
    console.log("Got Here");

    setTimeout(() => {
      setState(1);
    }, 3000);
  }, []);

  return <>RandomChild</>;
}

function RandomParent() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 1000);
  }, []);

  return <div>{show && <RandomChild />}</div>;
}

export default RandomParent;
```

코드를 보면 `RandomParent` 컴포넌트의 상태값 `show = true`이 설정되어있습니다. `화면에 렌더링 되는(Mounting)` 시점에 `App` 컴포넌트의 `useEffect body`의 `setTimeout` 함수 내부에서 1초 이후에 `show = false`값으로 상태를 업데이트 하게 되고, 그 결과 `RandomChild` 컴포넌트는 `사라집니다(Unmounting)`.

`RandomChild` 컴포넌트가 `사라졌음에도(Unmounting)` `useEffect body`의 `setTimeout` 함수 내부에서 3초 이후에 `setState = 1`로 업데이트하는 동작이 발생합니다. 이는 존재하지 않는 컴포넌트 상태 값에 갱신을 하는 것이기 때문에 메모리 누수가 발생해 다음과 오류가 발생합니다.

<img src="https://cdn-images-1.medium.com/max/800/0*lVoD0uQ6Vl52zrlB.png" />

`useEffect` 함수의 리턴값으로 `cleanup` 함수를 정의해 위와 같은 오류를 방지할 수 있습니다.

### How to Cleanup side effects in React

`cleanup` 함수 실제 용례를 알아보겠습니다.

The syntax of `useEffect`:

```javascript
useEffect(callbackFunction, dependencies);
```

The syntax of `useEffect cleanup` is:

```javascript
useEffect(() => {
  return () => {
    // cleanup logic here
  };
}, dependencies);
```

`cleanup` 함수 호출 조건:

1. `componentWillUnmount`
2. `componentDidUpdate`

## 1. Cleaning up API requests on unmount

`AbortController` 클래스를 이용해 `fetch` or `axios` 요청을 취소할 수 있습니다.

`컴포넌트가 제거된 상태(unmounting)`에서 `fetch` 요청이 완료되지 않았다면 해당 요청을 취소할 수 있습니다.

```javascript
import { useState, useEffect } from "react";

const Request = () => {
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      const response = await fetch("api...", { signal });
      // do something with response
    };

    fetchData();

    return () => controller.abort();
  }, []);

  return <h2>Cleaning up API requests on unmount</h2>;
};

export default Request;
```

## 2. Cleaning up WebSocket connections

컴포넌트가 사라지기 전, `socket` 통신을 끊을 수 있습니다.

```javascript
import { useEffect } from "react";

const Socket = () => {
  useEffect(() => {
    const protocols = "";
    const socket = new WebSocket("url...", protocols);

    return () => socket.close();
  }, []);

  return <h2>Socket</h2>;
};

export default Socket;
```

## 3. Cleaning up timeouts

컴포넌트가 사라지기 전, `setTimeout`함수 콜백이 처리되고 있다면, 해당 `setTimeout` 함수를 취소할 수 있습니다.

```javascript
import { useEffect } from "react";

const Time = () => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // do something in the timeout
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);
};

export default Time;
```

## useRef vs Refs

`useRef` 함수는 `초기 값(initial value)`으로 하나의 인자를 받고, 참조 값을 리턴합니다 (ref). 이 참조 값에는 `current`라는 프로퍼티가 존재합니다.

```javascript
import { useRef } from "react";

const MyComponent = () => {
  const reference = useRef(null);

  const refHandler = () => {
    const newValue = "";
    // ref 값에 접근하고 싶은 경우
    const value = reference.current;

    // ref 값을 갱신하고 싶은 경우
    value.current = newValue;
  };
};

export default MyComponent;
```

`reference.current`를 통해 참조 값에 접근할 수 있고, `reference.current = newValue` 방식으로 참조 값을 갱신할 수 있습니다.

```javascript
----------------------------
   Object: Reference        |
----------------------------
   current = referenceValue |
----------------------------
```

1. `useRef` 함수를 활용해 생성한 참조 값은 `재렌더링(Re-rendering)`이 발생해도 그 값이 변함없이 유지됩니다.
2. `useRef` 함수를 활용해 생성한 참조 값이 변경되어도 `재렌더링(Re-rendering)`이 발생하지 않습니다.

### Use Case #1: Logging Button Clicks

```javascript
import { useRef } from "react";

const LogButtonClicks = () => {
  const countRef = useRef(0);

  const handleCount = () => {
    countRef.current++;
    console.log(`Clicked ${countRef.current} times`);
  };

  console.log("I rendered!");

  return <button onClick={handleCount}>Click Me</button>;
};

export default LogButtonClicks;
```

1. `countRef` 변수에 `useRef`로 생성한 참 조값이 할당됩니다. (초기값 = 0).
2. 버튼을 클릭 시 `handleCount` 함수가 호출되면서, `countRef.current` 참조 값이 1증가 합니다.
3. `countRef.current` 값이 1증가 했음에도, 재렌더링은 발생하지 않습니다. `console.log("I rendered!");`가 1회 출력된다는 점에서 이를 확인할 수 있습니다.

### The difference between Reference and State

`참조 값(Reference)`과 `상태 값(State)`은 어떤 차이가 있을까요?

```javascript
import { useRef, useState } from "react";

const UseRefThird = () => {
  const [count, setCount] = useState(0);

  const handle = () => {
    const updatedCount = count + 1;
    console.log(`Clicked ${updatedCount} times`);
    setCount(updatedCount);
  };

  console.log("I rendered!");

  return <button onClick={handle}>Click Me</button>;
};

export default UseRefThird;
```

버튼을 클릭할 때마다 `I rendered` 메세지가 출력됩니다. 이는 매번 재렌더링이 발생함을 확인할 수 있습니다.

주요한 차이는 다음과 같습니다.

1. `참조값(reference)`은 재렌더링을 발생시키지 않습니다. 반면에 `상태 값(state)`은 재렌더링을 발생시킵니다.
2. `참조값(reference)`은 값 갱신시 동기적으로 바로 갱신됩니다. 반면에 `상태 값(state)`은 재렌더링 이후 비동기적으로 갱신됩니다.

## useRef: Implementing a stopwatch

`React` 컴포넌트는 `상태(state)`가 변할 때 마다 `렌더링(rendering)`되는 방식으로 동작합니다. 예를 들면, 다음 `Counter` 컴포넌트에서 증가 버튼을 5번 클릭하면 5번 `렌더링`이 발생합니다.

컴포넌트 함수가 다시 호출된다는 것은, 함수 내부의 변수들이 초기화되어, 내부 함수 로직이 실행됨을 의미합니다.

```javascript
import { useState } from "react";

const RefIntro = () => {
  const [count, setCount] = useState(0);
  console.log(`렌더링... count: ${count}`);

  return (
    <>
      <h1>{count}번 클릭했습니다!</h1>
      <button onClick={() => setCount(count + 1)}>클릭</button>
    </>
  );
};

export default RefIntro;
```

다시 렌더링 되어도 동일한 참조값을 유지하고 싶은 경우가 있습니다.

위와 같이 클릭 시 `count` 값이 변할 때마다, `React` 컴포넌트 함수가 재호출되어 화면이 갱신되기를 바랍니다. 하지만 이에 따른 부작용으로 기존에 정의해둔 변수값들이 초기화되거나, 갱신된 값으로 설정됩니다. 특정 로직에는 컴포넌트 내의 값이 그대로 보존되어야 하는 경우가 있습니다.

앞으로 사용할 예시에 등장하는 `setInterval()` 함수는 `clearTimeout` 함수를 이용해 타이머를 제때 삭제하지 않는 경우 메모리 누수로 이어질 수 있기 때문에 주의가 필요합니다.

```javascript
import { useState, useEffect } from "react";

const RefAutoCounter = () => {
  const [count, setCount] = useState(0);
  console.log(`렌더링... count: ${count}`);

  useEffect(() => {
    const intervalId = setInterval(() => setCount((count) => count + 1), 1000);
    return () => clearInterval(intervalId);
  }, []);

  return <p>Auto Counter: {count}</p>;
};

export default RefAutoCounter;
```

만약 카운트를 자동으로 시작하지 않고 버튼을 이용하여 시작하고, 정지하고 싶은 경우에 다음과 같이 코드를 작성할 수 있습니다.

```javascript
import { useState } from "react";

const RefAutoCounterProblem = () => {
  const [count, setCount] = useState(0);

  let intervalId;

  const startCounter = () => {
    intervalId = setInterval(() => setCount((count) => count + 1), 1000);
  };

  const stopCounter = () => {
    clearInterval(intervalId);
  };

  return (
    <>
      <p>자동 카운트: {count}</p>
      <button onClick={startCounter}>시작</button>
      <button onClick={stopCounter}>정지</button>
    </>
  );
};

export default RefAutoCounterProblem;
```

여기서 가장 큰 문제는 `startCounter` 함수와, `stopCounter` 함수가 `intervalId` 변수에 접근할 수 있도록 해야 한다는점 입니다. 이렇게 하려면 `intervalId` 변수를 두 함수 밖의 위치에 선언해야 하는 데, `count` 값이 바뀔 때마다 컴포넌트 함수가 호출되어 `intervalId` 값도 매번 새로운 값으로 바뀔 것입니다. 브라우저 메모리에는 아직 정리되지 못한 `intervalId` 값이 1초에 하나씩 쌓여가는 문제가 발생합니다. `useRef` 훅을 사용하면 이러한 문제를 효과적으로 해결할 수 있습니다.

클래스 컴포넌트는 `constructor`를 이용해 인스턴스를 생성하기 때문에 이와 같은 문제를 손쉽게 해결할 수 있지만, 함수형 컴포넌트는 `useRef`를 사용해 이 문제를 해결할 수 있습니다.

```javascript
import { useState, useRef } from "react";

const RefAutoCounterSolution = () => {
  const [count, setCount] = useState(0);
  const intervalId = useRef(null);
  console.log(`렌더링... count: ${count}`);

  const startCounter = () => {
    intervalId.current = setInterval(
      () => setCount((count) => count + 1),
      1000
    );
    console.log(`시작... intervalId: ${intervalId.current}`);
  };

  const stopCounter = () => {
    clearInterval(intervalId.current);
    console.log(`정지... intervalId: ${intervalId.current}`);
  };

  return (
    <>
      <p>자동 카운트: {count}</p>
      <button onClick={startCounter}>시작</button>
      <button onClick={stopCounter}>정지</button>
    </>
  );
};

export default RefAutoCounterSolution;
```

`useRef` 함수를 사용해 카운터 앱을 구현 시 새로운 렌더링이 발생해도 값이 초기화되거나, 메모리 누수가 발생하지 않습니다. 시작 버튼을 누르면 새로운 `intervalId`가 생성되고, 원하는 시점에 정비 버튼을 누르면 기존 `intervalId`가 정리되는 것을 확인할 수 있습니다.

## useRef: Accessing DOM Element

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

## Ref is null on initial rendering

초기 렌더링 동안, `DOM` 요소를 포함하고 있는 참조 값에는 `null` 값이 할당됩니다.

```javascript
import { useRef, useEffect } from "react";

function UseRefFourth() {
  const inputRef = useRef();

  useEffect(() => {
    // Logs `HTMLInputElement`
    console.log(inputRef.current);
    inputRef.current.focus();
  }, []);

  // Logs `undefined` during initial rendering
  console.log(inputRef.current);

  return <input ref={inputRef} type="text" />;
}

export default UseRefFourth;
```

초기 렌더링 과정에는 `DOM` 구조가 형성되지 않았기 때문에, `inputRef.current` 값은 `undefined`이 할당됩니다. `useEffect`는 화면이 그려지는(mounting) 단계 이후에 호출되기 때문에, 이 시점에는 `DOM` 구조가 형성되어 있기 때문에 `inputRef.current` 값이 할당됨을 확인할 수 있습니다.

`useRef` 함수를 사용해 `DOM` 요소에 접근하고 싶은 경우, 최초 호출되는 `useEffect body` 코드를 작성하면, 확실히 요소를 읽어왔음을 보장할 수 있습니다.

## Updating references restriction

함수형 컴포넌트의 함수 범위(함수 내의 전역)는 결과를 계산하거나, 함수를 호출할 때 이용합니다. 이 관점에서, 참조 값 혹은 상태 값 갱신은 함수 범위가 아닌, 핸들러 함수 혹은 콜백 함수 범위에서 이뤄져야 합니다. 참조 값의 경우 반드시 `useEffect body` 혹은 정의한 핸들러 함수(event handler, timer handlers, etc) 내부에서 이뤄져야 합니다.

```javascript
import { useRef, useEffect } from "react";

function UseRefFifth({ prop }) {
  const myRef = useRef(0);

  useEffect(() => {
    myRef.current++; // Good!
    setTimeout(() => {
      myRef.current++; // Good!
    }, 1000);
  }, []);

  const handler = () => {
    myRef.current++; // Good!
  };
  myRef.current++; // Bad!

  if (prop) {
    myRef.current++; // Bad!
  }

  return <button onClick={handler}>My button</button>;
}

export default UseRefFifth;
```

## Summary

1. `const reference = useRef(초기값)` 방식으로 참조 값을 생성합니다.
2. `useRef`를 활용해 생성한 참조 값에는 `reference` 프로퍼티가 존재합니다. `current` 프로퍼티에 렌더링에 영향을 받지 않는 값을 정의하고, `reference.current = newValue` 방식으로 값을 갱신합니다.
3. `참조값(reference)` 갱신에는 재렌더링이 발생하지 않지만, `상태값(state)` 갱신에는 재렌더링이 발생합니다.
4. `참조값(refernce`)을 `DOM` 요소의 `ref` 속성으로 할당하면, 최초 렌더링 이후 `reference.current` 프로퍼티를 통해 접근할 수 있습니다. 이는 `e.target`과 같은 기능이 있습니다.
