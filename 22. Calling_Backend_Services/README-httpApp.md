# Calling Backend Services

- JSON Placeholder
- HTTP Clients
- Getting Data
- Creating Data
- Updating Data
- Deleting Data
- Optimistic vs Pessimistic Updates
- Expected vs Unexpected Errors
- Handling Unexpected Errors Globally
- Extracting a Reusable HTTP Service
- Extracting a Config Module
- Displaying Toast Notifications
- Logging Errors
- Extracting a Logger Service

## JSON Placeholder

- https://jsonplaceholder.typicode.com/

## HTTP Clients

<img src="https://cdn-images-1.medium.com/max/800/1*Xu6qZorwGwiJuiob1uoiDw.png" />

프론트엔드는 백엔드(서버)에 `HTTP` 요청을 통해 데이터를 받아오거나, 전달하는 역할을 합니다.

<img src="https://cdn-images-1.medium.com/max/800/1*LYi1PEMDARQO-Hu8BOOACA.png" />

`리엑트(react)` `UI(User Interface)` 구축을 위한 경량 라이브러리로써 두 가지 역할을 가지고 있습니다.

1. State: 상태관리
2. View/DOM: 화면 렌더링 및 DOM 관리

<img src="https://cdn-images-1.medium.com/max/800/1*oh8J-9B3RuyeZoYf5nuUig.png" />

`Angular` 프레임워크는 서버와 통신하기 위해 내부적으로 제공하는 `HttpModule`을 사용해야 하는 반면에, `React`는 위에서 소개한 두 가지 기능만을 제공하기 때문에 원하는 `HTTP` 모듈을 선택해 사용할 수 있습니다. <br />

`Angular` 프레임워크의 `HttpModule`은 너무 자주 변경되고, 대안이 없어서 많은 개발자들이 사용에 큰 골칫거리로 생각하고 있습니다.

<img src="https://cdn-images-1.medium.com/max/800/1*OytobTexZV9gbPWhn1L6Kg.png" />

`HTTP` 기능을 제공해주는 도구는 크게 세 개가 존재합니다.

1. Fetch API
2. jQuery AJAX
3. Axios

가장 다운로드 숫자가 많고, 커뮤니티 활성화가 잘되어있는 `Axios` 모듈을 사용하겠습니다.

- https://www.npmjs.com/package/axios

```bash
npm install axios
```

## Getting Data

Starter

```javascript
// src/index.js

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

```javascript
// src/App.js
import { Component } from "react";
import axios from "axios";

const apiEndpoint = "https://jsonplaceholder.typicode.com/posts";

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    // pending > resolved (success) or rejected (failure)
    const { data: posts } = await axios.get(apiEndpoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await axios.post(apiEndpoint, obj);
    console.log(post);

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = () => {
    console.log("Update");
  };

  handleDelete = () => {
    console.log("Delete");
  };

  render() {
    return (
      <div className="container mt-5">
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
```

1. `ComponentDidMount`

데이터를 받아오는 데 시간이 소요되기 때문에, 최초 `render` 함수를 통해 기본적인 레이아웃을 렌더하고 이후, 호출되는 `componentDidMount` 함수에 데이터 패치 로직을 실행해 사용자 편의를 높이고, 예상치 못한 오류를 방지할 수 있습니다.

- https://jsonplaceholder.typicode.com/posts

```javascript
// src/App.js
async componentDidMount() {
    // pending > resolved (success) or rejected (failure)
  const { data: posts } = await axios.get(apiEndpoint);
  this.setState({ posts });
}
```

## Creating Data

`jsonplaceholder`는 가상의 API를 제공합니다.

1. `HTTP GET`: 데이터를 리턴해줍니다.
2. `HTTP POST`: 전달한 데이터를 반영한 객체를 리턴해줍니다.
3. `HTTP PATCH` - `url + / + post_id`: 업데이트할 속성을 인자로 전달하면, 해당 `post_id`와 일치하는 요소 업데이트 후 결과를 리턴해줍니다. (특정 요소만 업데이트)
4. `HTTP PUT` - `url + / + post_id`: 요소 전체를 업데이트 후 결과를 리턴해줍니다.
5. `HTTP DELETE` - `url + / + post_id`: 해당 `id`를 삭제하는 역할을 합니다.

- https://jsonplaceholder.typicode.com/posts

```javascript
// src/App.js
handleAdd = async () => {
  const obj = { title: "a", body: "b" };
  const { data: post } = await axios.post(apiEndpoint, obj);
  console.log(post);

  const posts = [post, ...this.state.posts];
  this.setState({ posts });
};
```

1. 서버로 전달할 데이터를 생성합니다.
2. 생성한 데이터를 해당 `url`로 `HTTP POST` 방식으로 전달합니다.
3. 기존의 `posts` 데이터에, `HTTP POST` 방식으로 요청에 응답으로 전달된 데이터를 추가합니다.
4. `setState` 함수로 업데이트된 데이터를 반영합니다.

## Lifecycle of a Request

Request Method: OPTIONS - CROSS DOMAISN

## Updating Data

```javascript
// src/App.js
handleUpdate = async (post) => {
  console.log("Update");
  // PUT (Enter post object) vs PATCH (Update only 1 or 2 properties)
  // const { data } = await axios.patch(apiEndpoint + "/" + post.id, {
  //   title: post.title,
  // });

  post.title = "UPDATED";
  const { data } = await axios.put(apiEndpoint + "/" + post.id, post);

  const posts = [...this.state.posts];
  const index = posts.indexOf(post);

  posts[index] = { ...post };
  this.setState({ posts });
  console.log(data);
};
```

1. 서버로 전달할 데이터를 생성합니다.
2. 생성한 데이터를 `url + post_id`를 조합해, `HTTP PUT OR PATCH` 방식으로 전달합니다.
3. 해당 아이디를 통해 기존의 `posts` 배열에서 업데이트할 포스트를 찾고, 응답으로 받은 업데이트 된 값을 반영합니다.
4. `setState` 함수로 업데이트된 데이터를 반영합니다.

## Deleting Data

```javascript
// src/App.js
handleDelete = async (post) => {
  console.log("Delete");
  await axios.delete(apiEndpoint + "/" + post.id);

  const posts = this.state.posts.filter((p) => p.id !== post.id);
  this.setState({ posts });
};
```

1. 서버에 `HTTP DELETE` 방식으로 삭제할 `post_id`를 전달합니다.
2. 해당 `id` 값을 기존의 `posts` 배열에 `filter` 방식으로 삭제된 데이터를 걸러줍니다.
3. `setState` 함수에 삭제된 데이터를 제외하고 반영합니다.

## Optimistic vs Pessimistic Updates

`Pessimistic Updates`

`post` 업데이트 혹은 삭제 시 어느 정도의 지연이 발생합니다. 그 이유는 현재 정의한 `CRUD` 로직은 `API` 요청 및 응답 이후 전달받은 값을 상태 값에 반영하기 때문입니다. 이 방식은 데이터가 서버에 정상적으로 전달 및 반영됨을 보장할 수 있다는 장점이 있지만, 데이터 전달 및 반영 과정에 상태 반영 등의 코드를 실행할 수 없어, 지연이 발생하는 단점이 있습니다.

`Optimistic Update`

이 방식은 경우 화면에 먼저 변화를 반영하고. 이후 `API` 요청 및 응답을 전달받는 방식으로 동작합니다. 이 경우 서버에 오류가 발생했다면, 화면에 변경한 상황을 이전 상태로 되돌리는 로직을 별도로 작성해야 합니다. 결과를 빨리 반영함으로써 사용자 경험이 좋은 바면, 오류가 발생하면 이전 값으로 돌아가 오류가 발생한 것처럼 보이고, 로직이 복잡해진다는 단점이 있습니다.

```javascript
// src/App.js
handleDelete = async (post) => {
  const originalPost = this.state.posts;

  const posts = this.state.posts.filter((p) => p.id !== post.id);
  this.setState({ posts });

  console.log("Delete");

  try {
    await axios.delete(apiEndpoint + "/" + post.id);
    // throw new Error(""); ==> test prupose
  } catch (ex) {
    // ex = exception
    alert("Something failed while deleting a post!");
    this.setState({ posts: originalPost });
  }
};
```

1. 서버 오류를 대비해 기존 값 복원을 위해 `originalPost`를 생성합니다.
2. 먼저 화면에 변화를 반영합니다.
3. 서버 요청 및 응답을 받습니다.
4. Try ~ Catch 구문을 통해 오류 및 예외를 체크합니다.
5. 오류 및 예외가 발생하면 상태값을 이전 값으로 복원합니다.

## Expected vs Unexpected Errors

오류는 두 종류로 구분됩니다.

1. 예상된 오류 (Expected Error)
2. 예상치 못한 오류 (Unexpected Error)

`예상된 오류(Expected Error)`는 대게 클라이언트가 고칠 수 있는 종류의 에러입니다.
오류의 예는 다음과 같습니다.

1. 404: Not Found
2. 400: Bad Request

`예상치 못한 오류(Unexpected Error)`는 클라이언트가 고킬 수 없는 종류의 에러입니다.
오류의 예는 다음과 같습니다.

1. Network 오류
2. Server 오류
3. Database 오류
4. 버그

`예상된 오류(Expected Error)` 테스트

```javascript
// src/App.js
handleDelete = async (post) => {
  const originalPost = this.state.posts;

  const posts = this.state.posts.filter((p) => p.id !== post.id);
  this.setState({ posts });

  console.log("Delete");

  try {
    // 존재하지 않는 ID값 요청
    await axios.delete(apiEndpoint + "/999");
    throw new Error("");
  } catch (ex) {
    // ex = exception
    // Expected

    if (ex.response && ex.response.status === 404) {
      alert("This post has already been deleted.");
    } else {
      console.log("Logging the error: ", ex);
      alert("An unexpected error occurred");
    }

    this.setState({ posts: originalPost });
  }
};
```

`예상치 못한 오류(Unexpected Error)` 테스트

```javascript
// src/App.js
handleDelete = async (post) => {
  const originalPost = this.state.posts;

  const posts = this.state.posts.filter((p) => p.id !== post.id);
  this.setState({ posts });

  console.log("Delete");

  try {
    // 요청 url 자체가 틀린 경우
    await axios.delete("a" + apiEndpoint + "/" + post.id);
    throw new Error("");
  } catch (ex) {
    // ex = exception
    // Expected

    if (ex.response && ex.response.status === 404) {
      alert("This post has already been deleted.");
    } else {
      console.log("Logging the error: ", ex);
      alert("An unexpected error occurred");
    }

    this.setState({ posts: originalPost });
  }
};
```

## Handling Unexpected Errors Globally

`예상치 못한 오류(Unexpected Error)`를 처리할 때, 클라이언트는 레벨에서 할 수 있는 것이 없으므로 `else` 케이스에 작성된 방식으로 오류를 처리해야 합니다. 이 로직은 특수한 로직이 아닌 반복적으로 예상치 못한 오류를 출력하는 것이기 때문에 `axios` 모듈의 `interceptor` 기능을 통해 자동화할 수 있습니다.

```javascript
// src/App.js
try {
  // 요청 url 자체가 틀린 경우
  await axios.delete("a" + apiEndpoint + "/" + post.id);
  throw new Error("");
} catch (ex) {
  // ex = exception
  // Expected

  if (ex.response && ex.response.status === 404) {
    alert("This post has already been deleted.");
  } else {
    console.log("Logging the error: ", ex);
    alert("An unexpected error occurred");
  }

  this.setState({ posts: originalPost });
}
```

`axios.interceptors.request`

```javascript
// src/App.js
import { Component } from "react";
import axios from "axios";

// args
// 1. success
// 2. fail
axios.interceptors.response.use(null, (error) => {
  console.log("INTERCEPTOR CALLED");
  return Promise.reject(error);
});

const apiEndpoint = "https://jsonplaceholder.typicode.com/posts";

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    // pending > resolved (success) or rejected (failure)
    const { data: posts } = await axios.get(apiEndpoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await axios.post(apiEndpoint, obj);
    console.log(post);

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    console.log("Update");
    // PUT (Enter post object) vs PATCH (Update only 1 or 2 properties)
    // const { data } = await axios.patch(apiEndpoint + "/" + post.id, {
    //   title: post.title,
    // });

    post.title = "UPDATED";
    const { data } = await axios.put(apiEndpoint + "/" + post.id, post);

    const posts = [...this.state.posts];
    const index = posts.indexOf(post);

    posts[index] = { ...post };
    this.setState({ posts });
    console.log(data);
  };

  handleDelete = async (post) => {
    const originalPost = this.state.posts;

    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });

    console.log("Delete");

    try {
      await axios.delete(apiEndpoint + "/" + post.id);
      throw new Error("");
    } catch (ex) {
      console.log("HANDLE DELETE CATCH BLOCK");

      if (ex.response && ex.response.status === 404) {
        alert("This post has already been deleted.");
      } else {
        console.log("Logging the error: ", ex);
        alert("An unexpected error occurred");
      }

      this.setState({ posts: originalPost });
    }
  };

  render() {
    return (
      <div className="container mt-5">
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
```

`HTTP Response`를 처리할 때, `interceptor`는 `response` 과정에 오류가 발생 할 때 해당 오류를 `handleDelete` 메소드의 `try ~ catch` 보다 먼저 오류 및 예외를 처리하고 `Promise.reject`를 리턴합니다. 리턴 값은 `catch` 구문의 인자 값에 전달되어, `interceptor ==> catch` 순서로 동작하게 됩니다.

이번에는 `catch` 구문의 `else` 문에 있는 로직을 `interceptor`로 옮겨보겠습니다.

`Testcase`

1. expected error:

- apiEndpoint + "/999" + post.id

2. unexpected error

- "a" + apiEndpoint + "/" + post.id

```javascript
// src/App.js
import { Component } from "react";
import axios from "axios";

// args
// 1. success
// 2. fail
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Logging the error: ", error);
    alert("An unexpected error occurred");
  }

  return Promise.reject(error);
});

const apiEndpoint = "https://jsonplaceholder.typicode.com/posts";

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    // pending > resolved (success) or rejected (failure)
    const { data: posts } = await axios.get(apiEndpoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await axios.post(apiEndpoint, obj);
    console.log(post);

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    console.log("Update");
    // PUT (Enter post object) vs PATCH (Update only 1 or 2 properties)
    // const { data } = await axios.patch(apiEndpoint + "/" + post.id, {
    //   title: post.title,
    // });

    post.title = "UPDATED";
    const { data } = await axios.put(apiEndpoint + "/" + post.id, post);

    const posts = [...this.state.posts];
    const index = posts.indexOf(post);

    posts[index] = { ...post };
    this.setState({ posts });
    console.log(data);
  };

  handleDelete = async (post) => {
    const originalPost = this.state.posts;

    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });

    console.log("Delete");

    try {
      await axios.delete(apiEndpoint + "/" + post.id);
      throw new Error("");
    } catch (ex) {
      console.log("HANDLE DELETE CATCH BLOCK");

      // Specific Error
      if (ex.response && ex.response.status === 404) {
        alert("This post has already been deleted.");
      }

      this.setState({ posts: originalPost });
    }
  };

  render() {
    return (
      <div className="container mt-5">
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
```

1. `axios.interceptors` 객체에 `예상된 오류(expected error)`를 정의해서 `예상치 못한 오류(unexpected error)` 구분해 처리할 수 있습니다.
2. `handleDelete` 메소드에 작성한 `catch` 구문의 오류 처리 로직은 상태 번호 `404`만을 처리하는 특별 경우이기 때문에 별도로 정의했습니다.

## Extracting a Reusable HTTP Service

`interceptors` 로직은 구현 세부 정보임에도, `App.js` 정의되어 코드 간의 일관성을 해치고 있습니다. 파일을 새로 만들고 요청응답을 처리하는 코드를 다른 컴포넌트에서 재사용할 수 있도록 코드를 구성해보겠습니다.

```javascript
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Logging the error: ", error);
    alert("An unexpected error occurred");
  }

  return Promise.reject(error);
});
```

`interceptors`가 설정된 `axios`를 재사용하고자 다음과 같이 `interceptors`가 설정된 `get, post, put, delete`를 리턴했습니다.

```javascript
// src/services/httpService.js
import axios from "axios";

// args
// 1. success
// 2. fail
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Logging the error: ", error);
    alert("An unexpected error occurred");
  }

  return Promise.reject(error);
});

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default http;
```

```javascript
// src/App.js
import { Component } from "react";
import http from "./services/httpService";

const apiEndpoint = "https://jsonplaceholder.typicode.com/posts";

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    // pending > resolved (success) or rejected (failure)
    const { data: posts } = await http.get(apiEndpoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await http.post(apiEndpoint, obj);
    console.log(post);

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    console.log("Update");
    // PUT (Enter post object) vs PATCH (Update only 1 or 2 properties)
    // const { data } = await axios.patch(apiEndpoint + "/" + post.id, {
    //   title: post.title,
    // });

    post.title = "UPDATED";
    const { data } = await http.put(apiEndpoint + "/" + post.id, post);

    const posts = [...this.state.posts];
    const index = posts.indexOf(post);

    posts[index] = { ...post };
    this.setState({ posts });
    console.log(data);
  };

  handleDelete = async (post) => {
    const originalPost = this.state.posts;

    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });

    console.log("Delete");

    try {
      await http.delete(apiEndpoint + "/" + post.id);
      throw new Error("");
    } catch (ex) {
      console.log("HANDLE DELETE CATCH BLOCK");

      if (ex.response && ex.response.status === 404) {
        alert("This post has already been deleted.");
      }

      this.setState({ posts: originalPost });
    }
  };

  render() {
    return (
      <div className="container mt-5">
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
```

## Extracting a Config Module

`apiEndpoint`를 `App.js` 파일 위에 정의하는 것 대신, 별도의 `config.json` 파일을 생성하고, 해당 파일을 통해 `url`을 추출해보겠습니다.

```javascript
// src/config.json
{
  "apiEndpoint": "https://jsonplaceholder.typicode.com/posts"
}
```

```javascript
// src/App.js
import { Component } from "react";
import http from "./services/httpService";
import config from "./config.json";

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    // pending > resolved (success) or rejected (failure)
    const { data: posts } = await http.get(config.apiEndpoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await http.post(config.apiEndpoint, obj);
    console.log(post);

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    console.log("Update");
    // PUT (Enter post object) vs PATCH (Update only 1 or 2 properties)
    // const { data } = await axios.patch(apiEndpoint + "/" + post.id, {
    //   title: post.title,
    // });

    post.title = "UPDATED";
    const { data } = await http.put(config.apiEndpoint + "/" + post.id, post);

    const posts = [...this.state.posts];
    const index = posts.indexOf(post);

    posts[index] = { ...post };
    this.setState({ posts });
    console.log(data);
  };

  handleDelete = async (post) => {
    const originalPost = this.state.posts;

    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });

    console.log("Delete");

    try {
      await http.delete(config.apiEndpoint + "/" + post.id);
      throw new Error("");
    } catch (ex) {
      console.log("HANDLE DELETE CATCH BLOCK");

      if (ex.response && ex.response.status === 404) {
        alert("This post has already been deleted.");
      }

      this.setState({ posts: originalPost });
    }
  };

  render() {
    return (
      <div className="container mt-5">
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
```

## Displaying Toast Notifications

상태 값 변화를 알림으로 받고 싶은 경우 `react-toastify` 모듈을 사용할 수 있습니다.

```bash
npm install react-toastify
```

```javascript
// src/App.js
import { Component } from "react";
import http from "./services/httpService";
import { ToastContainer, toast } from "react-toastify";
import config from "./config.json";

class App extends Component {
  // 로직들...

  handleDelete = async (post) => {
    const originalPost = this.state.posts;

    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });

    console.log("Delete");

    try {
      await http.delete(config.apiEndpoint + "/" + post.id);
      throw new Error("");
    } catch (ex) {
      console.log("HANDLE DELETE CATCH BLOCK");

      if (ex.response && ex.response.status === 404) {
        toast("This post has already been deleted.");
      }

      this.setState({ posts: originalPost });
    }
  };

  render() {
    return (
      <div className="container mt-5">
        <ToastContainer />
        {/* 요소들 */}
      </div>
    );
  }
}

export default App;
```

```javascript
// src/services/httpService.js
import axios from "axios";
import { toast } from "react-toastify";

// args
// 1. success
// 2. fail
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Logging the error: ", error);
    toast("An unexpected error occurred");
  }

  return Promise.reject(error);
});

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default http;
```

1. `ToastContainer` 컴포넌트를 `App` 컴포넌트의 자식으로 등록합니다.
2. `toast` 함수를 호출하면, `ToastContainer` 컴포넌트에 알림이 출력됩니다.

## Logging Errors

앱을 배포할 때 콘솔을 통해 오류를 추적하는 것은 쉽지 않습니다. 오류 추적을 체계적으로 하고자 `Sentry` 같은 도구를 활용할 수 있습니다.

- https://sentry.io/welcome/

```bash
npm install --save @sentry/react @sentry/tracing
```

```javascript
import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import App from "./App";

Sentry.init({
  dsn: "",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(<App />, document.getElementById("root"));
```

```javascript
// src/services/httpService.js
import axios from "axios";
import { toast } from "react-toastify";
import * as Sentry from "@sentry/react";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    // console.log("Logging the error: ", error);
    Sentry.captureException(error);
    toast("An unexpected error occurred");
  }

  return Promise.reject(error);
});

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default http;
```

## Extracting a Logger Service

`Sentry` 대신 다른 `logger` 도구를 사용할 경우를 대비해 다음과 리팩토링 했습니다.

```javascript
// src/services/logService.js
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

function init() {
  Sentry.init({
    dsn: "",
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

function log(error) {
  Sentry.captureException(error);
}

const logger = {
  init,
  log,
};

export default logger;
```

```javascript
// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import logger from "./services/logService";

logger.init();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

```javascript
// src/services/httpService.js
import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

// args
// 1. success
// 2. fail
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    // console.log("Logging the error: ", error);
    logger.log(error);
    toast("An unexpected error occurred");
  }

  return Promise.reject(error);
});

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default http;
```
