# React-Redux

다음 방식으로 `store`를 전달하는 경우 `Props Drilling` 문제가 발생할 수 있습니다.

```javascript
// src/components/Bugs.js
import { Component } from "react";

class Bugs extends Component {
  render() {
    return <div>Bugs</div>;
  }
}

export default Bugs;
```

```javascript
// src/App.js
import Bugs from "./components/Bugs";
import configureStore from "./store/configureStore";

const store = configureStore();

function App() {
  return <Bugs store={store} />;
}

export default App;
```

`React Context`를 사용하면 `Props Drilling` 문제를 해결할 수 있습니다.

```javascript
// src/contexts/storeContext.js
import { createContext } from "react";

const StoreContext = createContext();

export default StoreContext;
```

## Providing the Store using Context

`React Context`를 활용해 `Props Drilling` 문제를 해결해보겠습니다.

```javascript
// src/App.js
import "./App.css";
import Bugs from "./components/Bugs";
import configureStore from "./store/configureStore";
import StoreContext from "./contexts/storeContext";

const store = configureStore();

// StoreContext 자식에 있는 모든 컴포넌트는 해당 store에 접근할 수 있습니다.
function App() {
  return (
    <StoreContext.Provider value={store}>
      <Bugs />
    </StoreContext.Provider>
  );
}

export default App;
```

```javascript
// src/components/Bugs.js
import { Component } from "react";
import StoreContext from "../contexts/storeContext";

class Bugs extends Component {
  // 인스턴스가 아닌 클래스가 바로 접근할 수 있게 만들기 위함입니다.
  static contextType = StoreContext;

  componentDidMount() {
    console.log(this.context);
  }

  render() {
    return <div>Bugs</div>;
  }
}

// Bugs.contextType = StoreContext;

export default Bugs;
```

## Subscribing and Dispatching

현재 `Bugs` 컴포넌트는 `React Context`를 통해 `Redux Store`에 접근할 수 있습니다. 이 상태에서 `Subscribing and Dispatching`을 구현해보겠습니다.

```javascript
// components/Bugs.js
import { Component } from "react";
import StoreContext from "../contexts/storeContext";
import { loadBugs } from "../store/bugs";

class Bugs extends Component {
  // 인스턴스가 아닌 클래스가 바로 접근할 수 있게 만들기 위함입니다.
  static contextType = StoreContext;

  state = { bugs: [] };

  componentDidMount() {
    // 1. subscribe
    // 2. dispatch(loadBugs)
    const store = this.context;

    this.unsubscribe = store.subscribe(() => {
      const bugsInStore = store.getState().entities.bugs.list;

      if (this.state.bugs !== bugsInStore)
        this.setState({ bugs: store.getState().entities.bugs.list });
    });

    store.dispatch(loadBugs());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    console.log(this.state.bugs);
    return (
      <ul>
        {this.state.bugs.map((bug) => (
          <li key={bug.id}>{bug.description}</li>
        ))}
      </ul>
    );
  }
}

// Bugs.contextType = StoreContext;

export default Bugs;
```

이 방식의 단점은 매번 `unsubscribe` 함수를 `componentWillUnmount` 함수 호출 시점에 호출해야 한다는 점입니다. 만약 `unsubscribe` 호출을 까먹고 하지 않는다면 `메모리 누수(Memory Leak)`이 발생할 수 있습니다. `react-redux`는 이 상황을 더욱 쉽게 관리하도록 유용한 기능을 제공해줍니다.

## Connecting Components Using react-redux

```javascript
npm install react-redux
```

```javascript
// src/components/Bugs.js
import { Component } from "react";
import { connect } from "react-redux";
import { loadBugs } from "../store/bugs";

class Bugs extends Component {
  componentDidMount() {
    this.props.loadBugs();
  }

  render() {
    return (
      <ul>
        {this.props.bugs.map((bug) => (
          <li key={bug.id}>{bug.description}</li>
        ))}
      </ul>
    );
  }
}

// 첫번째 인자: 이 컴포넌트가 어떤 store 값에 관심이 있는가를 정의합니다.
// state.entities.bugs.list
// mapStateToProps 함수의 프로퍼티는 호출하는 컴포넌트의 props의 값으로 붙게됩니다.
const mapStateToProps = (state) => ({
  bugs: state.entities.bugs.list,
});

// 두번째 인자: 이 컴포넌트가 어떤 dispatch 값에 관심이 있는가를 정의합니다.
const mapDispatchToProps = (dispatch) => ({
  loadBugs: () => dispatch(loadBugs()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bugs);
```

`connect 함수 첫 번째 인자`

- `connect` 함수의 첫 번째 인자에는 해당 컴포넌트와 관련짓고 싶은 `redux store`를 정의합니다.
  개발자 간의 약속에 따라 첫번째 인자로 전달한 함수의 이름은 `mapStateToProps` 로 정의합니다.
  `mapStateToProps` 함수는 인자로 `state` 값을 받고, 리턴하는 객체의 프로퍼티는 `this.props`.[프로퍼티]` 방식으로 붙게 됩니다.

`connect 함수 두 번째 인자`

- `connect` 함수의 두 번째 인자는 해당 컴포넌트와 관련짓고 싶은 `redux dispatch`를 정의합니다.
  개발자 간의 약속에 따라 두 번째 인자로 전달한 함수의 이름은 `mapDispatchToProps`로 정의합니다.
  `mapDispatchToProps` 함수는 인자로 `dispatch` 를 받고, 리턴하는 객체의 프로퍼티는 `this.props.[프로퍼티]` 방식으로 붙게 됩니다.
  함수를 바로 호출해 리턴 값을 받는 것이 아닌, 호출하고자 하는 함수 호출이 리턴되는 형태로 전달되어야 한다는 점을 유의해야 합니다.

`connect` 함수는 `Higher-Order-Function(함수를 인자로 받거나 혹은 함수를 리턴하는 함수) 형태를 띱니다. 해당 함수에서 내부적으로 `Subscribing and Unsubscribing`을 관리하기 때문에 이전의 `Context`를 사용했을 때처럼 일일이 관리하지 않아도 됩니다. 가장 중요한 것은 `connect`를 사용했을 때 `state, dispatch, etc`모두`this.props`에 의존하고 있다는 점입니다.

`Additional Info`

Container Component > Presentation Component (Bugs)

- `Connect` 함수를 사용하는 경우 `Bugs` 컴포넌트는 `Presentation Component`로 간주합니다. 이를 확인하는 방법은 개발자 도구의 `Components` 탭에 들어가면
  `Bugs` 컴포넌트가 `React-Redux`에 의해 생성되는 `ReactRedux.Provider` 컴포넌트의 자식 요소로 있고, `ReactRedux.Provider` 컴포넌트가 리턴하는 `ConnectionFunction` 컴포넌트의 자식 요소로 있는 것을 확인할 수 있습니다.

`connect(Container Component)`를 이용하는 모든 컴포넌트는 전적으로 `this.props`에 의존합니다.

## Hooks

`함수형 컴포넌트(Function Component)` 형식으로 `Redux`를 구성하는 경우보다 더 손쉽게 `Redux`와 `React`가 상호작용할 수 있게 만들 수 있습니다.

`클래스 컴포넌트(Class Component)`와 달리 함수형으로 컴포넌트를 구성하는 경우, `react-redux` 모듈에서는 간편하게 `redux` 함수를 호출할 수 있는 `useDispatch`함수를 제공합니다. `react` 컴포넌트의 상태 값을 추적하는 경우 `state`를 사용할 수 있습니다. 이처럼 `redux` 값을 추적하는 경우 `useSelector` 함수를 사용하면 `redux` 상태 값에 쉽게 접근할 수 있습니다.

`useSelector`는 `state`가 변경되었다면 함수형 컴포넌트가 렌더링 된 이후에 실행됩니다.

`useSelector` 함수는 렌더링 이후에 실행되기 때문에 `componentDidMount` 시점에 변경되는 것을 확인할 수 있습니다. 그래서 `useEffect`를 사용하면 손쉽게 값에 접근할 수 있습니다.

```javascript
// src/components/BugsList.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBugs, getUnresolvedBugs } from "../store/bugs";

const BugsList = () => {
  const dispatch = useDispatch();
  const bugs = useSelector(getUnresolvedBugs);

  useEffect(() => {
    dispatch(loadBugs());
  }, []);

  return (
    <ul>
      {bugs.map((bug) => (
        <li key={bug.id}>{bug.description}</li>
      ))}
    </ul>
  );
};

export default BugsList;
```

```javascript
// src/App.js
import "./App.css";
import Bugs from "./components/Bugs";
import BugsList from "./components/BugsList";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <BugsList />
    </Provider>
  );
}

export default App;
```

<!-- https://levelup.gitconnected.com/react-redux-hooks-useselector-and-usedispatch-f7d8c7f75cdd -->

## Connect One or Many Components

One of the common questions a lot of people have is: "Should I connect a top-level component or many small components to the Redux store?"

If you connect a top-level component to the store, that component and all its children will get re-rendered every time the store gets updated.

Let's say App component has two children: Bugs and Projects.

If you connect App component to the store, it gets notified every time the list of bugs or projects is modified. So if you add a bug, App component gets notified and the list of bugs as well as the list of projects will be re-rendered. This is unnecessary and can cause a performance penalty.

So, as a best practice, each component should independently subscribe to a small slice of the store it is interested in. This way it won't be re-rendered if other slices of the store are updated.

## Practice

각각의 버그마다 `Resolve` 버튼을 생성해, 이를 클릭하면 `resolve: true`가 되도록 설정해주세요.

`Class Component Version`

```javascript
import { Component } from "react";
import { connect } from "react-redux";
import { getUnresolvedBugs, loadBugs, resolveBug } from "../store/bugs";

class Bugs extends Component {
  componentDidMount() {
    this.props.loadBugs();
  }

  render() {
    return (
      <ul>
        {this.props.bugs.map((bug) => (
          <div key={bug.id}>
            <li>{bug.description}</li>
            <button onClick={() => this.props.resolveBug(bug.id)}>
              Resolve
            </button>
          </div>
        ))}
      </ul>
    );
  }
}

// 첫번째 인자: 이 컴포넌트가 어떤 store 값에 관심이 있는가를 정의합니다.
// state.entities.bugs.list
// mapStateToProps 함수의 프로퍼티는 호출하는 컴포넌트의 props의 값으로 붙게됩니다.
// const mapStateToProps = (state) => ({
//   bugs: state.entities.bugs.list,
// });

const mapStateToProps = (state) => ({
  bugs: getUnresolvedBugs(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadBugs: () => dispatch(loadBugs()),
  resolveBug: (id) => dispatch(resolveBug(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bugs);
```

`Functional Component Version`

```javascript
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBugs, getUnresolvedBugs, resolveBug } from "../store/bugs";

const BugsList = () => {
  const dispatch = useDispatch();
  const bugs = useSelector(getUnresolvedBugs);
  console.log("bugs: ", bugs);

  useEffect(() => {
    dispatch(loadBugs());
  }, []);

  return (
    <ul>
      {bugs.map((bug) => (
        <div key={bug.id}>
          <li>{bug.description}</li>
          <button onClick={() => dispatch(resolveBug(bug.id))}>Resolve</button>
        </div>
      ))}
    </ul>
  );
};

export default BugsList;
```
