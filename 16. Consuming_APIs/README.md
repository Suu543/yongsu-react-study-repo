# Consuming APIs

<img src="https://i.stack.imgur.com/WHAl0.png" />

마지막 `redux middleware` 함수의 `next`에는 `dispatch` 함수가 전달됩니다. `dispatch` 가 호출되면 다시 `middleware` 처음으로 요청이 들어가는 방식으로 동작합니다.

`reducer` 함수 내부에서 바로 외부 `API` 호출을 하지 않습니다. 왜냐하면 `reducer`의 역할은 현재 상태를 기반으로 새로운 상태를 리턴하는 것이기 때문입니다.
이런 특징이 `reducer` 함수의 테스트를 용이하게 만들어 줍니다.

```javascript
function reducer(state, action) {
  return newState;
}
```

`side effect`를 고려해야 할 부분은 바로 `Action Creator` 부분입니다.

```javascript
function actionCreator() {
  return { type: "..." };
}

// Redux Thunk Middleware 형태
function actionCreator() {
  return function (dispatch, getState) {};
}

function actionCreator() {
  return (dispatch, getState) => {};
}

const actionCreator = () => (dispatch, getState) => {
  // Call API (Ex) axios))
  // Resolved: dispatch(success)
  // Rejected: dispatch(error)
};
```

`Naming Convention`

PAST ==> PRESENT

- bugsRequested ==> GET_BUTS_REQUEST
- bugsReceived ==> GET_BUGS_SUCCESS
- bugsRequestFailed ==> GET_BUGS_FAIL

API 호출 시 해당 패턴이 매번 반복되기 때문에 `middleware` 함수로 작성해 해당 상황을 효과적으로 처리할 수 있습니다.

```javascript
const actionCreator = () => (dispatch, getState) => {
  // Call API (Ex) axios))
  // Resolved: dispatch(success)
  // Rejected: dispatch(error)
};
```

## API Middleware

- bugs-backend 참조

```javascript
// src/store/middleware/api.js
const axios = require("axios");

// Purely Demonstration
const action = {
  type: "apiCallBegan",
  payload: {
    url: "/bugs",
    method: "GET",
    data: {},
    onSuccess: "bugsReceived",
    onError: "apiRequestFailed",
  },
};

const api =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    if (action.type !== "apiCallBegan") return next(action);

    const { url, method, data, onSuccess, onError } = action.payload;

    try {
      const response = await axios.request({
        baseURL: "http://localhost:9001/api",
        url,
        method,
        data,
      });

      dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      dispatch({ type: onError, payload: error.message });
    }
  };
```

## Actions

`Action` 정의 목적은, `apiCallBegan` 등의 하드 코딩이 발생하기 때문에 이와 같은 문제를 해결하고자 별도의 `Action`을 정의했습니다. 앞서 정의했던 `apiCallBegan`, `apiRequestFailed` 등 이름에 일관성이 없으므로 이를 해결하고자, 일관성 있는 이름으로 `actions`을 구성했습니다.

```javascript
// src/store/api.js
const { createAction } = require("@reduxjs/toolkit");

const apiCallBegan = createAction("api/callBegan");
const apiCallSuccess = createAction("api/callSuccess");
const apiCallFailed = createAction("api/callFailed");

module.exports.apis = {
  apiCallBegan,
  apiCallSuccess,
  apiCallFailed,
};
```

```javascript
// src/index.js
const configureBugStore = require("./store/configureStore");
const { apis } = require("./store/api");

// store.dispatch({
//   type: "apiCallBegan",
//   payload: {
//     url: "/bugs",
//     onSuccess: "bugsReceived",
//     onError: "apiRequestFailed",
//   },
// });

// store.dispatch(
//   actions.apiCallBegan({
//     url: "/bugs",
//     onSuccess: "bugsReceived",
//     onError: actions.apiCallFailed.type,
//   });
// );

store.dispatch(
  actions.apiCallBegan({
    url: "/bugs",
    onSuccess: "bugsReceived",
  });
);
```

`Dispatch`가 호출될 때마다 `onError`가 전달되는 것을 비효율적이기 때문에 이를 방지하고자 `api` 미들웨어를 일부 수정했습니다.

```javascript
// store/middleware/api.js+
const axios = require("axios");
const { apis } = require("../api");

// apis.action으로 리펙토링했습니다.
const api =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    if (action.type !== "api/callBegan") return next(action);

    const { url, method, data, onSuccess, onError } = action.payload;

    try {
      const response = await axios.request({
        baseURL: "http://localhost:9001/api",
        url,
        method,
        data,
      });

      // General
      dispatch(apis.apiCallSuccess(response.data));
      // Specific - onSuccess 프로퍼티가 있는 경우
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      // GeneralError Action
      dispatch(apis.apiCallFailed(error.message));
      // Specific - onError 프로퍼티가 있는 경우
      if (onError) dispatch({ type: onError, payload: error.message });
    }
  };

module.exports = api;
```

## Restructuring the Store

`bugs` 스토어의 `initialState`를 일부 수정해보겠습니다.

```javascript
const { createSlice, createSelector } = require("@reduxjs/toolkit");

let lastId = 0;

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },

  reducers: {
    bugAssignedToUser: (bugs, action) => {
      const { bugId, userId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].userId = userId;
    },

    bugAdded: (bugs, action) => {
      bugs.list.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },

    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },

    bugRemoved: (bugs, action) => {
      bugs.list.filter((bug) => bug.id !== action.payload.id);
    },
  },
});

const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.filter((bug) => !bug.resolved)
);

const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );

module.exports = {
  bugsReducer: slice.reducer,
  bugsActions: slice.actions,
  bugsSelectors: {
    getUnresolvedBugs,
    getBugsByUser,
  },
};
```

## Getting Data from the Server

서버로부터 데이터를 받아와 `bugs`에 반영하는 시나리오를 구현해보겠습니다.

- `bugsReceived` 리듀서를 추가했습니다.

```javascript
// src/store/bugs.js
const { createSlice, createSelector } = require("@reduxjs/toolkit");

let lastId = 0;

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    // bugs/bugsReceived
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
    },

    bugAssignedToUser: (bugs, action) => {
      const { bugId, userId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].userId = userId;
    },

    bugAdded: (bugs, action) => {
      bugs.list.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },

    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },

    bugRemoved: (bugs, action) => {
      bugs.list.filter((bug) => bug.id !== action.payload.id);
    },
  },
});

const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.filter((bug) => !bug.resolved)
);

const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );

module.exports = {
  bugsReducer: slice.reducer,
  bugsActions: slice.actions,
  bugsSelectors: {
    getUnresolvedBugs,
    getBugsByUser,
  },
};
```

요청 `url` 혼동을 피하고자 `bugsReceived` ==> `bugs/bugsReceived`로 수정했습니다.

```javascript
// // Purely for Demonstration
// const action = {
//   type: "apiCallBegan", // apiRequest,
//   payload: {
//     url: "/bugs",
//     method: "get",
//     data: {},
//     onSuccess: "bugsReceived",
//     onError: "apiRequestFailed",
//   },
// };

const { bugsActions, bugsSelectors } = require("./store/bugs");
const { projectsActions } = require("./store/projects");
const { usersActions } = require("./store/users");
const configureBugStore = require("./store/configureStore");
const { apis } = require("./store/api");

const store = configureBugStore();

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(
  apis.apiCallBegan({
    url: "/bugs",
    onSuccess: "bugs/bugsReceived",
  })
);
```

위 코드는 잘 동작하지만 `UI Layer`에 디테일이 포함된 문제를 확인할 수 있습니다.

```javascript
const { bugsActions, bugsSelectors, loadBugs } = require("./store/bugs");
const { projectsActions } = require("./store/projects");
const { usersActions } = require("./store/users");
const configureBugStore = require("./store/configureStore");
const { apis } = require("./store/api");

const store = configureBugStore();

store.subscribe(() => {
  console.log(store.getState());
});

// 수정전
// 코드는 잘 동작하지만 `UI Layer`에 디테일이 포함된 문제를 확인할 수 있습니다.
// store.dispatch(
//   apis.apiCallBegan({
//     url: "/bugs",
//     onSuccess: "bugs/bugsReceived",
//     onError: apis.apiCallFailed.type,
//   })
// );

// 수정후
// 다음과 같은 형태가 디테일을 감추고, 보다 UI Layer에 어울리는 방식으로 요청을 보낼 수 있습니다. (Encapsulation)
store.dispatch(loadBugs());
```

수정한 코드가 잘 동작할 수 있도록`bugs slice`를 수정해보겠습니다.

```javascript
const { createSlice, createSelector } = require("@reduxjs/toolkit");
const { apis } = require("./api");

let lastId = 0;

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    // bugs/bugsReceived
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
    },

    bugAssignedToUser: (bugs, action) => {
      const { bugId, userId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].userId = userId;
    },

    bugAdded: (bugs, action) => {
      bugs.list.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },

    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },

    bugRemoved: (bugs, action) => {
      bugs.list.filter((bug) => bug.id !== action.payload.id);
    },
  },
});

const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.filter((bug) => !bug.resolved)
);

const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );

// 매번 작성할 수 없고, 이후에 url이 변경되는 경우 한 곳만 수정하면 되도록 구현하기 위해 변수에 담았습니다.
const url = "/bugs";

// Action Creators - 수정 코드
const loadBugs = () =>
  apis.apiCallBegan({
    url,
    onSuccess: slice.actions.bugsReceived.type,
  });

module.exports = {
  bugsReducer: slice.reducer,
  bugsActions: slice.actions,
  bugsSelectors: {
    getUnresolvedBugs,
    getBugsByUser,
  },
  loadBugs,
};
```

## Loading Indicators

1. action: bugsRequested
2. reducer: loading = true
3. middleware: dispatch new action

`Workflow`

1. bugs/bugsRequested: loading: false
2. api/callBegan
3. api/callSuccess:
4. bugs/bugsReceived: loading: true

`bugsRequested`, `bugsReceived`, `bugsRequestFailed` 리듀서를 추가했습니다. 이후 시작 시점을 추적하기 위해 `onStart` 프로퍼티 `loadBugs` 함수에 추가했습니다.

- `bugsRequested`: loading: false
- `bugsReceived` : loading: true
- `bugsRequestFailed`: loading: false

```javascript
const { createSlice, createSelector } = require("@reduxjs/toolkit");
const { apis } = require("./api");

let lastId = 0;

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },

    // bugs/bugsReceived
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
    },

    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },

    bugAssignedToUser: (bugs, action) => {
      const { bugId, userId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].userId = userId;
    },

    bugAdded: (bugs, action) => {
      bugs.list.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },

    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },

    bugRemoved: (bugs, action) => {
      bugs.list.filter((bug) => bug.id !== action.payload.id);
    },
  },
});

const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.filter((bug) => !bug.resolved)
);

const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );

const url = "/bugs";

// Action Creators
const loadBugs = () =>
  apis.apiCallBegan({
    url,
    onStart: slice.actions.bugsRequested.type,
    onSuccess: slice.actions.bugsReceived.type,
    onError: slice.actions.bugsRequestFailed.type,
  });

module.exports = {
  bugsReducer: slice.reducer,
  bugsActions: slice.actions,
  bugsSelectors: {
    getUnresolvedBugs,
    getBugsByUser,
  },
  loadBugs,
};
```

<img src="https://i.stack.imgur.com/WHAl0.png" />

마지막 `redux middleware` 함수의 `next`에는 `dispatch` 함수가 전달됩니다. `dispatch` 가 호출되면 다시 `middleware` 처음으로 요청이 들어가는 방식으로 동작합니다.

`onStart`를 추가로 추출했습니다.

```javascript
// src/store/middleware/api.js
const axios = require("axios");
const { apis } = require("../api");

const api =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    if (action.type !== "api/callBegan") return next(action);
    const { url, method, data, onStart, onSuccess, onError } = action.payload;

    if (onStart) dispatch({ type: onStart });

    console.log("next(action):", action);
    next(action);

    try {
      const response = await axios.request({
        baseURL: "http://localhost:9001/api",
        url,
        method,
        data,
      });

      // console.log("데이터: ", response.data);

      // General
      dispatch(apis.apiCallSuccess(response.data));
      // Specific
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      // General
      dispatch(apis.apiCallFailed(error.message));
      // Specific
      if (onError) dispatch({ type: onError, payload: error.message });
    }
  };

module.exports = api;
```

## Caching

똑같은 `url`에 두 번 요청을 방지하기 위한 패턴으로 `Caching` 기술을 활용할 수 있습니다.
이번에는 간단하게 10분에 한 `url`에 한 번 이상의 요청 발생을 방지하도록 코드를 구성해보겠습니다.

2초 후에 `loadBugs()` 함수를 한 번 더 호출해보겠습니다.

```javascript
// src/index.js
const { bugsActions, bugsSelectors, loadBugs } = require("./store/bugs");
const { projectsActions } = require("./store/projects");
const { usersActions } = require("./store/users");
const configureBugStore = require("./store/configureStore");
const { apis } = require("./store/api");

const store = configureBugStore();
store.dispatch(loadBugs());

setTimeout(() => {
  store.dispatch(loadBugs());
}, 2000);
```

1. `bugReceived` 함수 호출이 끝나는 시점에 `lastFetch` 프로퍼티에 끝나는 시간을 할당했습니다.
2. `loadBugs` 함수에서 `lastFetch` 프로퍼티를 추출했습니다.
3. 추출한 시간을 `moment` 모듈을 활용해 요청 이후 10분이 지났는지를 검사하고, 지났다면 재요청을, 그렇지 않다면 바로 리턴을 통해 이 중 요청을 방지할 수 있습니다.

```javascript
// src/store/bugs.js
const { createSlice, createSelector } = require("@reduxjs/toolkit");
const moment = require("moment");
const { apis } = require("./api");

let lastId = 0;

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },

    // bugs/bugsReceived
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },

    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },

    bugAssignedToUser: (bugs, action) => {
      const { bugId, userId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].userId = userId;
    },

    bugAdded: (bugs, action) => {
      bugs.list.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },

    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },

    bugRemoved: (bugs, action) => {
      bugs.list.filter((bug) => bug.id !== action.payload.id);
    },
  },
});

const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.filter((bug) => !bug.resolved)
);

const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );

const url = "/bugs";

// Action Creators
// () => fn(dispatch, getState)

const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

  // console.log(lastFetch);
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");

  if (diffInMinutes < 10) return;

  dispatch(
    apis.apiCallBegan({
      url,
      onStart: slice.actions.bugsRequested.type,
      onSuccess: slice.actions.bugsReceived.type,
      onError: slice.actions.bugsRequestFailed.type,
    })
  );
};

module.exports = {
  bugsReducer: slice.reducer,
  bugsActions: slice.actions,
  bugsSelectors: {
    getUnresolvedBugs,
    getBugsByUser,
  },
  loadBugs,
};
```

## Saving Data to the Server

1. Make an API Call
2. Promise Resolved ==> dispatch(success)
3. Promise Rejected ==> dispatch(error)

- 1. `addBug` 함수 생성하고, `post` 방식으로 인자로 받은 데이터와 함께 서버에 요청을 보냅니다.
- 2. `onSuccess` 프로퍼티에는 앞서 정의한 `bugAdded` 리듀서 타입을 전달합니다.
- 3. 이전에는 직접 `id` 값을 갱신해 `bugAdded` 리듀서를 실행했다면, 이 경우 모든 데이터를 서버에서 처리하기 때문에 별도의 로직 대신, 응답으로 받은 데이터를 `action.payload`에 전달하는 방식으로 `bugAdded`가 구현됩니다.

```javascript
// src/store/bugs.js
const { createSlice, createSelector } = require("@reduxjs/toolkit");
const moment = require("moment");
const { apis } = require("./api");

// let lastId = 0;

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },

    // bugs/bugsReceived
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },

    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },

    bugAssignedToUser: (bugs, action) => {
      const { bugId, userId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].userId = userId;
    },

    // bugAdded: (bugs, action) => {
    //   bugs.list.push({
    //     id: ++lastId,
    //     description: action.payload.description,
    //     resolved: false,
    //   });
    // },

    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
    },

    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },

    bugRemoved: (bugs, action) => {
      bugs.list.filter((bug) => bug.id !== action.payload.id);
    },
  },
});

const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.filter((bug) => !bug.resolved)
);

const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );

const url = "/bugs";

// Action Creators
// () => fn(dispatch, getState)

const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

  // console.log(lastFetch);
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");

  if (diffInMinutes < 10) return;

  dispatch(
    apis.apiCallBegan({
      url,
      onStart: slice.actions.bugsRequested.type,
      onSuccess: slice.actions.bugsReceived.type,
      onError: slice.actions.bugsRequestFailed.type,
    })
  );
};

const addBug = (bug) =>
  apis.apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: slice.actions.bugAdded.type,
  });

module.exports = {
  bugsReducer: slice.reducer,
  bugsActions: slice.actions,
  bugsSelectors: {
    getUnresolvedBugs,
    getBugsByUser,
  },
  loadBugs,
  addBug,
};
```

```javascript
// src/index.js
const {
  bugsActions,
  bugsSelectors,
  loadBugs,
  addBug,
} = require("./store/bugs");
const { projectsActions } = require("./store/projects");
const { usersActions } = require("./store/users");
const configureBugStore = require("./store/configureStore");
const { apis } = require("./store/api");

const store = configureBugStore();

// store.subscribe(() => {
//   console.log(store.getState());
// });

// store.dispatch(loadBugs());
store.dispatch(addBug({ description: "a" }));

// setTimeout(() => {
//   store.dispatch(loadBugs());
// }, 2000);
```

## Exercise

- Save the data when:
  - Assigning a bug to a user
  - Resolving a bug

```javascript
// src/store/bugs.js
const { createSlice, createSelector } = require("@reduxjs/toolkit");
const moment = require("moment");
const { apis } = require("./api");

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },

    // bugs/bugsReceived
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },

    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },

    bugAssignedToUser: (bugs, action) => {
      const { id: bugId, userId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].userId = userId;
    },

    // command - event
    // addBug - bugAdded
    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
    },

    // resolveBug (command) -  bugResolved (event)
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index] = action.payload;
    },

    bugRemoved: (bugs, action) => {
      bugs.list.filter((bug) => bug.id !== action.payload.id);
    },
  },
});

const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.filter((bug) => !bug.resolved)
);

const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );

const url = "/bugs";

const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

  // console.log(lastFetch);
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");

  if (diffInMinutes < 10) return;

  dispatch(
    apis.apiCallBegan({
      url,
      onStart: slice.actions.bugsRequested.type,
      onSuccess: slice.actions.bugsReceived.type,
      onError: slice.actions.bugsRequestFailed.type,
    })
  );
};

const addBug = (bug) =>
  apis.apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: slice.actions.bugAdded.type,
  });

const resolveBug = (id) =>
  apis.apiCallBegan({
    // /bugs
    // PATCH /bugs/:id
    url: url + "/" + id,
    method: "patch",
    data: { resolved: true },
    onSuccess: slice.actions.bugResolved.type,
  });

const assignBugToUser = (bugId, userId) =>
  apis.apiCallBegan({
    url: url + "/" + bugId,
    method: "patch",
    data: { userId },
    onSuccess: slice.actions.bugAssignedToUser.type,
  });

module.exports = {
  bugsReducer: slice.reducer,
  bugsActions: slice.actions,
  bugsSelectors: {
    getUnresolvedBugs,
    getBugsByUser,
  },
  loadBugs,
  addBug,
  resolveBug,
};
```

```javascript
const {
  bugsActions,
  bugsSelectors,
  loadBugs,
  addBug,
  resolveBug,
} = require("./store/bugs");
const { projectsActions } = require("./store/projects");
const { usersActions } = require("./store/users");
const configureBugStore = require("./store/configureStore");
const { apis } = require("./store/api");

const store = configureBugStore();

store.subscribe(() => {
  console.log("bugs: ", store.getState().entities.bugs.list);
});

store.dispatch(loadBugs());
setTimeout(() => store.dispatch(resolveBug(1)), 2000);
// setTimeout(() => store.dispatch(assignBugToUser(1, 4)), 2000);
```

## Reducing Coupling

## Cohesion
