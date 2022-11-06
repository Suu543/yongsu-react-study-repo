## Writing Clean Redux Code

- https://dev.to/bhupendra1011/understanding-redux-without-react-223n

```
src/
- actions.js
- actionTypes.js
- reducer.js
- store.js
- index.js

// -----------------------------------
src/
    store/
    	auth/
			actions.js
			actionTypes.js
			reducer.js
		bugs/
        projects/

// -----------------------------------
// 다음과 같은 폴더 구성 방식을 Ducks Pattern이라 칭합니다.
src/
    store/
		auth.js
            actions.js
            actionTypes.js
            reducer.js
		bugs.js
		projects.js
```

- `redux` 이름으로 폴더명을 짓는 것 대신 해당 폴더와 파일이 하는 기능에 관련한 주제로 이름을 작성하는 것을 추천합니다. (Name the artifacts based on their role.)

## Ducks Pattern

이전 방식의 코드 베이스에서 `action` 변경을 원하는 경우 `actions.js`, `actionType.js`, `reducer.js` 파일 세 개 모두를 수정해야 합니다.

`Ducks` 패턴을 사용하면 이러한 번거로움을 방지할 수 있습니다.
생성할 `redux`의 주제에 맞게 파일명을 작성하고
`actions + actionType + reducer`를 모두 한 파일에 작성해 관리하는 방식입니다.
이처럼 파일을 구성하면 유지보수 등에서 큰 장점을 얻을 수 있습니다.

```javascript
src / store / auth.js;
bugs.js;
projects.js;
```

```javascript
// src/store/bugs.js
// Action Types
const BUG_ADDED = "bugAdded";
const BUG_REMOVED = "bugRemoved";
const BUG_RESOLVED = "bugResolved";

// Actions
const bugAdded = (description) => ({
  type: BUG_ADDED,
  payload: {
    description,
  },
});

const bugRemoved = (id) => ({
  type: BUG_REMOVED,
  payload: {
    id,
  },
});

const bugResolved = (id) => ({
  type: BUG_RESOLVED,
  payload: {
    id,
  },
});

// Reducer
let lastId = 0;

function reducer(state = [], action) {
  switch (action.type) {
    case BUG_ADDED:
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];

    case BUG_REMOVED:
      return state.filter((bug) => bug.id !== action.payload.id);

    case BUG_RESOLVED:
      return state.map((bug) =>
        bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
      );

    default:
      return state;
  }
}

module.exports = {
  bugAdded,
  bugRemoved,
  bugResolved,
  reducer,
};
```

```javascript
// src/store/configureStore.js
const { createStore } = require("redux");
const { reducer } = require("./bugs");

function configureStore() {
  const store = createStore(reducer);
  console.log("store: ", store);
  return store;
}

module.exports = configureStore;
```

```javascript
// src/index.js
const configureStore = require("./store/configureStore");
const { bugAdded, bugRemoved, bugResolved } = require("./store/bugs");

const store = configureStore();

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(bugAdded("Bug1"));
store.dispatch(bugResolved(1));
store.dispatch(bugRemoved(1));
```
