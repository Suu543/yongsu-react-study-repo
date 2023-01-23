# Authentication and Authorization

- JSON Web Tokens
- Calling Protected APIs
- Showing/Hiding Elements
- Protecting Routes

## Registering a New User

```javascript
POST: http://localhost:3001/api/users

{
    "email": "aaa5555@gmail.com",
    "password: "123456789",
    "name: "abc"
}
```

```javascript
// src/services/userService.js
import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.email,
    password: user.password,
    name: user.name,
  });
}
```

```javascript
// src/components/RegisterForm.jsx
import React from "react";
import Form from "react-bootstrap/Form";
import FormComp from "./common/FormComp";
import Joi from "joi";
import * as userService from "../services/userService";

class RegisterForm extends FormComp {
  state = {
    data: { email: "", password: "", name: "" },
    errors: {},
  };

  schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().min(5).required().label("Name"),
  });

  doSubmit = async () => {
    try {
      await userService.register(this.state.data);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="container">
        <h1>Register</h1>
        <Form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Username", "formBasicEmail", "email")}
          {this.renderInput(
            "password",
            "Password",
            "formBasicPassword",
            "password"
          )}
          {this.renderInput("name", "Name", "formBasicName", "text")}
          {this.renderButton("Register")}
        </Form>
      </div>
    );
  }
}

export default RegisterForm;
```

## Logging in a User

```javascript
POST: http://localhost:3001/api/auth

{
    "email": "email",
    "password: "password"
}
```

```javascript
// src/services/authService.js
import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/auth";

export function login(email, password) {
  http.post(apiEndpoint, { email, password });
}
```

```javascript
// src/components/LoginForm.jsx
import React from "react";
import Form from "react-bootstrap/Form";
import Joi from "joi";
import FormComp from "./common/FormComp";
import { login } from "../services/authService";

class LoginForm extends FormComp {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(5).required().label("Password"),
  });

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await login(data.email, data.password);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    console.log(this.state);

    return (
      <div className="container">
        <h1>Login</h1>
        <Form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "formBasicEmail", "email")}
          {this.renderInput(
            "password",
            "Password",
            "formBasicPassword",
            "password"
          )}
          {this.renderButton("Login")}
        </Form>
      </div>
    );
  }
}

export default LoginForm;
```

- 유효한 이메일과 패스워드를 입력한 경우, `Network` 탭의 응답 결과로 `JWT` 토큰이 전달됩니다.

## Storing the JWT

1. 로그인 성공 시 응답으로 받은 `JWT`를 `localStorage`에 저장해보겠습니다.
2. 로그인 성공 시 바로 홈페이지로 페이지 전환을 구현해보겠습니다.

```javascript
// src/components/LoginForm.jsx

import React from "react";
import Form from "react-bootstrap/Form";
import Joi from "joi";
import FormComp from "./common/FormComp";
import withRouter from "../hoc/withRouter";
import { login } from "../services/authService";

class LoginForm extends FormComp {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = Joi.object({
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { data: jwt } = await login(data.email, data.password);
      // console.log(jwt);
      localStorage.setItem("token", jwt);
      this.props.navigate("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    console.log(this.state);

    return (
      <div className="container">
        <h1>Login</h1>
        <Form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "formBasicEmail", "email")}
          {this.renderInput(
            "password",
            "Password",
            "formBasicPassword",
            "password"
          )}
          {this.renderButton("Login")}
        </Form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
```

## Logging in the User upon Registration

회원가입에 성공하면 서버에서 응답과 함께 `HTTP Header`에 `x-auth-token`을 추가해 전달해줍니다. 해당 속성을 이용해 `JWT` 값을 `LocalStorage`에 저장하고, 홈페이지로 전환을 구현해보겠습니다.

- (왜 x-auth-token을 사용하는지 node.js 강의로 알아보기)
- https://www.inflearn.com/questions/178947/auth-js-gt-line-6-quot-x-auth-token-quot-%EA%B4%80%EB%A0%A8-%EC%A7%88%EB%AC%B8

`x-auth-token`은 `custom-header`이기 때문에 다음과 같이 콘솔을 출력해도 추출할 수 없습니다. 그러므로 `Standard HTTP-Header` 중 하나인 `header("access-control-expose-headers", "x-auth-token")`를 서버 `routes/users.js`에 정의해, 콘솔에서 `x-auth-token`에 접근할 수 있도록 설정할 수 있습니다.

```javascript
// src/components/RegisterForm.jsx

doSubmit = async () => {
  try {
    const response = await userService.register(this.state.data);
    console.log("response: ", response);
  } catch (ex) {
    if (ex.response && ex.response.status === 400) {
      const errors = { ...this.state.errors };
      errors.username = ex.response.data;
      this.setState({ errors });
    }
  }
};
```

```javascript
// src/components/RegisterForm.jsx

doSubmit = async () => {
  try {
    const response = await userService.register(this.state.data);
    // console.log("response: ", response);
    localStorage.setItem("token", response.headers["x-auth-token"]);
    this.props.navigate("/");
  } catch (ex) {
    if (ex.response && ex.response.status === 400) {
      const errors = { ...this.state.errors };
      errors.username = ex.response.data;
      this.setState({ errors });
    }
  }
};
```

- https://jwt.io/

## Getting the Current User

```javascript
npm i jwt-decode
```

```javascript
// src/App.js
import { Component } from "react";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Customers from "./components/Customer";
import Rentals from "./components/Rentals";
import NotFound from "./components/NotFound";
import Movies from "./components/Movies";
import NavBar from "./components/NavBar";
import MovieForm from "./components/MovieForm";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      // console.log(user);
      this.setState({ user });
    } catch (ex) {}
  }

  render() {
    return (
      <BrowserRouter>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <Routes>
          <Route path="/" element={<Navigate replace to="/movies" />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieForm />} />
          <Route path="customers" element={<Customers />} />
          <Route path="rentals" element={<Rentals />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
```

## Displaying the Current User on NavBar

```javascript
// src/components/NavBar.jsx
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

// Prevent Refreshing
import { LinkContainer } from "react-router-bootstrap";

const NavBar = ({ user }) => {
  return (
    <>
      <Navbar bg="light" variant="light" className="mb-4">
        <Container>
          <Navbar.Brand href="#home">Vidly Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/movies">
              <Nav.Link>Movies</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/customers">
              <Nav.Link>Customers</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/rentals">
              <Nav.Link>Rentals</Nav.Link>
            </LinkContainer>
            {!user && (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </>
            )}

            {user && (
              <>
                <LinkContainer to="/profile">
                  <Nav.Link>{user.name}</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/logout">
                  <Nav.Link>Logout</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
```

여기서 발생한 문제는, `navigate` 함수는 새로 고침 없이 페이지 전환을 호출합니다. `App` 컴포넌트는 최초 렌더링 이후에 `componentDidMount` 함수에서 토큰을 추적해 상태 값을 갱신합니다. 이로인해 최초 렌더링 이후 로그인 혹은 회원가입시 새로고침 없이 페이지 전환이 발생해, 직접 새로 고침을 누르지 않는 한, 네비게이션 바에 현재 상태가 반영되지 않습니다. 이를 방지하고자 화면 전환 시 `Full Reloading`을 지원하는 `window.href` 속성에 전환 페이지를 정의함으로써 이 문제를 해결할 수 있습니다.

```javascript
// src/components/LoginForm.jsx
doSubmit = async () => {
  try {
    const { data } = this.state;
    const { data: jwt } = await login(data.email, data.password);
    // console.log(jwt);
    localStorage.setItem("token", jwt);
    // this.props.navigate("/");

    // Full Reload Application
    window.location = "/";
  } catch (ex) {
    if (ex.response && ex.response.status === 400) {
      const errors = { ...this.state.errors };
      errors.email = ex.response.data;
      this.setState({ errors });
    }
  }
};
```

```javascript
// src/components/RegisterForm.jsx
doSubmit = async () => {
  try {
    const response = await userService.register(this.state.data);
    // console.log("response: ", response);
    localStorage.setItem("token", response.headers["x-auth-token"]);
    // this.props.navigate("/");
    window.location = "/";
  } catch (ex) {
    if (ex.response && ex.response.status === 400) {
      const errors = { ...this.state.errors };
      errors.username = ex.response.data;
      this.setState({ errors });
    }
  }
};
```

## Logging Out a User

`localstorage`에서 `token` 값을 저장하는 요소를 삭제함으로써 로그아웃을 구현할 수 있습니다.

```javascript
// src/Logout.jsx
import { Component } from "react";

class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("token");
    window.location = "/";
  }

  render() {
    return null;
  }
}

export default Logout;
```

- `Logout` 라우터 추가

```javascript
// src/App.jsx
import { Component } from "react";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Customers from "./components/Customer";
import Rentals from "./components/Rentals";
import NotFound from "./components/NotFound";
import Movies from "./components/Movies";
import NavBar from "./components/NavBar";
import MovieForm from "./components/MovieForm";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Logout from "./components/Logout";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      // console.log(user);
      this.setState({ user });
    } catch (ex) {}
  }

  render() {
    return (
      <BrowserRouter>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <Routes>
          <Route path="/" element={<Navigate replace to="/movies" />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieForm />} />
          <Route path="customers" element={<Customers />} />
          <Route path="rentals" element={<Rentals />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="logout" element={<Logout />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
```

## Refactoring

```javascript
// src/services/authService.js
import http from "./httpService";
import config from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint = config.apiUrl + "/auth";
const tokenKey = "token";

async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {}
}

function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}

const auth = {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};

export default auth;
```

```javascript
// src/components/LoginForm.jsx
import auth from "../services/authService";

doSubmit = async () => {
  try {
    const { data } = this.state;
    await auth.login(data.email, data.password);
    window.location = "/";
  } catch (ex) {
    if (ex.response && ex.response.status === 400) {
      const errors = { ...this.state.errors };
      errors.email = ex.response.data;
      this.setState({ errors });
    }
  }
};
```

```javascript
// src/components/Logout.jsx
import { Component } from "react";
import auth from "../services/authService";

class Logout extends Component {
  componentDidMount() {
    auth.logout();
    window.location = "/";
  }

  render() {
    return null;
  }
}

export default Logout;
```

```javascript
// src/App.js
import auth from "./services/authService";

componentDidMount() {
        const user = auth.getCurrentUser();
    this.setState({ user });
}

```

```javascript
// src/components/RegiserForm.jsx
doSubmit = async () => {
  try {
    const response = await userService.register(this.state.data);
    auth.loginWithJwt(response.headers["x-auth-token"]);
    window.location = "/";
  } catch (ex) {
    if (ex.response && ex.response.status === 400) {
      const errors = { ...this.state.errors };
      errors.username = ex.response.data;
      this.setState({ errors });
    }
  }
};
```

## Calling Protected API Endpoints

`requiresAuth` 환경 변수를 `true`로 변경해줍니다.

```javascript
requiresAuth = true;
```

로그인 하지 않은 상태에서 영화 정보를 수정하고 `Save` 버튼을 누르면 오류가 발생합니다. 그 이유는 서버에 정의된 `Auth` 미들웨어가 `HTTP` 요청시 유효한 `JWT` 토큰을 보유하고 있지 않은 경우, 접근 권한이 없는 것으로 간주해 오류를 출력하기 때문입니다.

`axios` 설정을 통해 이 문제를 해결할 수 있습니다.

- `axios.defaults.headers.common` 모든 `HTTP Verbs`를 처리할 수 있는 로직입니다.
- `axios` 모듈을 사용해 서버로 요청을 보낼 때 마다, `localStorage`에 있는 `JWT`를 추출해 함께 요청을 보냅니다.

```javascript
// src/services/httpService.js

import axios from "axios";
import { toast } from "react-toastify";
import auth from "./authService";

axios.defaults.headers.common["x-auth-token"] = auth.getJwt();
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
    console.log(error);
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

## Fixing Bi-directional Dependencies

<img style="width: 100vw;" src="https://cdn-images-1.medium.com/max/800/1*daTt-DzV_r3YWnyeOnHhsA.png" />

`httpService`는 `authService`에 의존하고 있고, `authService`는 `httpService`에 의존하는 방식으로 동작하고 있습니다.
이는 차후에 문제가 발생했을 때 서로 의존하고 있는 형태라 오류 파악이 힘들어질 수 있습니다. 그러므로 이러한 상호 관계를 제거해줘야 합니다.

<img style="width: 100vw;" src="https://cdn-images-1.medium.com/max/800/1*rfScKFuxIOOMsLE-KUlJ1w.png" />

`authService`에게 `getJWT` 함수를 호출하는 대신에, `setJWT`를 해달라고 요청을 보내는 방식으로 이 문제를 해결할 수 있습니다.

```javascript
// src/services/httpService.js
import axios from "axios";
import { toast } from "react-toastify";

// Protected API Ends
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
    console.log(error);
    toast("An unexpected error occurred");
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};

export default http;
```

```javascript
// src/services/authService.js
import http from "./httpService";
import config from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint = config.apiUrl + "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {}
}

function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}

const auth = {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};

export default auth;
```

## Authorization

`Admin`만 영화를 삭제할 수 있도록 설정해보겠습니다.

## Showing or Hiding Elements based on the User

`New Movie` 버튼과 `Delete` 버튼은 관리자만 접근할 수 있기 때문에, 관리자 권한이 없는 사용자 화면에는 나타나지 않도록 구현해보겠습니다.

```javascript
// src/App.js
// ...
render() {
    return (
        <BrowserRouter>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <Routes>
            <Route path="/movies" element={<Movies user={this.state.user} />} />
        </Routes>
        </BrowserRouter>
    );
}
```

```javascript
// src/components/Movies.jsx
render() {
    const { length: count } = this.state.movies;
    const {
        pageSize,
        currentPage,
        selectedGenre,
        genres,
        sortColumn,
        searchQuery,
    } = this.state;
    const { user } = this.props;

    if (count === 0)
        return <p>모든 영화가 삭제되었습니다 (영화가 존재하지 않습니다).</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
        <div className="col">
        {user && (
            <Link
            className="btn btn-primary"
            to="/movies/new"
            style={{ marginBottom: "20px" }}
            >
            New Movie
            </Link>
        )}
    );
}
```

## Protecting Routes

현재 로그인하지 않아도, `url: localhost:3000/movies/new`을 입력하면, 해당 페이지에 접근할 수 있습니다. 이처럼 권한이 없는 사람 혹은 로그인하지 않은 사람은 접근할 수 없도록 `Protected Route`를 구현해보겠습니다.

```javascript
// src/App.js
import { Component } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Customers from "./components/Customer";
import Rentals from "./components/Rentals";
import NotFound from "./components/NotFound";
import Movies from "./components/Movies";
import NavBar from "./components/NavBar";
import MovieForm from "./components/MovieForm";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Logout from "./components/Logout";
import auth from "./services/authService";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <BrowserRouter>
        <ToastContainer />
        <NavBar user={user} />
        <Routes>
          <Route path="/" element={<Navigate replace to="/movies" />} />
          <Route path="/movies" element={<Movies user={user} />} />
          <Route
            path="/movies/:movieId"
            element={
              auth.getCurrentUser() ? (
                <MovieForm />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route path="customers" element={<Customers />} />
          <Route path="rentals" element={<Rentals />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="logout" element={<Logout />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
```

## Extracting ProtectedRoute

다음 로직을 `ProtectedRoute` 컴포넌트로 만들어 재사용성을 높여보겠습니다.

```javascript
<Route
  path="/movies/:movieId"
  element={
    auth.getCurrentUser() ? <MovieForm /> : <Navigate replace to="/login" />
  }
/>
```

```javascript
// src/components/common/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import auth from "../../services/authService";

const ProtectedRoute = ({ children }) => {
  return auth.getCurrentUser() ? children : <Navigate replace to="/login" />;
};

export default ProtectedRoute;
```

- `ProtectedRoute`를 적용해 보겠습니다.

```javascript
// src/App.js
import ProtectedRoute from "./components/common/ProtectedRoute";

<Route
  path="/movies/:movieId"
  element={
    <ProtectedRoute>
      <MovieForm />
    </ProtectedRoute>
  }
/>;
```

## Redirecting after Login

이전에 클릭한 링크를 기억하고, 로그인 성공 시 해당 링크로 리다이렉트 해줍니다.

1. 로그인하지 않은 상태에서 영화 수정 링크를 클릭합니다.
2. 로그인 페이지로 리다이렉트 됩니다.
3. 로그인이 완료되면 바로 이전에 눌렀던 영화 수정 링크로 페이지가 전환됩니다.

Ex)

- 영화 수정 링크 ==> 로그인 ==> 영화 수정 링크
- 홈페이지 ==> 로그인 ==> 홈페이지

- `window.location` 객체의 `state` 프로퍼티의 값으로 리다이렉트 컴포넌트가 호출된 주소 값을 전달합니다. 해당 주소 값은 리다이렉트된 목적지로 전달되고, 해당 예시는 영화 수정 링크를 클릭하면 로그인 페이지로 리다이렉트 되고, 이때 로그인 페이지는 이전에 어떤 주소로부터 리다이렉트가 발생했는지를 `state` 프로퍼티로 부터 확인하고, 로그인 성공시 `state` 정의된 주소로 페이지를 전환해줍니다.

- 이미 로그인된 사람은 로그인 페이지 접속 시, 홈페이지로 리다이렉트 해줍니다.

```javascript
// src/components/common/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import withRouter from "../../hoc/withRouter";
import auth from "../../services/authService";

const ProtectedRoute = ({ children, location }) => {
  return auth.getCurrentUser() ? (
    children
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default withRouter(ProtectedRoute);
```

```javascript
// src/components/LoginForm.jsx
import React from "react";
import Form from "react-bootstrap/Form";
import Joi from "joi";
import FormComp from "./common/FormComp";
import { Navigate } from "react-router-dom";
import withRouter from "../hoc/withRouter";
import auth from "../services/authService";

class LoginForm extends FormComp {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = Joi.object({
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.email, data.password);

      const { state } = this.props.location;

      // 리다이텍트된 주소로부터 전달된 값의 존재 여부를 확인하고, 로그인 성공시 페이지 전환을 해줍니다.

      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    // 이미 로그인된 사람은 로그인 페이지 접속 시, 홈페이지로 리다이렉트 해줍니다.
    if (auth.getCurrentUser()) return <Navigate replace to="/" />;

    return (
      <div className="container">
        <h1>Login</h1>
        <Form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "formBasicEmail", "email")}
          {this.renderInput(
            "password",
            "Password",
            "formBasicPassword",
            "password"
          )}
          {this.renderButton("Login")}
        </Form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
```

## Hiding the Delete Column

`columns` 배열에서 `delete`에 해당하는 요소를 따로 빼 `deleteColumn`에 할당하고, `constructor` 함수 내부에서 로그인된 사용자가 있고 동시에 관리자 권한이 있는지 확인하고, 두 조건에 충족하면 `deleteColumn` 변수에 할당된 객체를 `columns` 배열에 추가하고, 그렇지 않으면 `delete`가 빠진 배열을 렌더링함으로써 관리자만 요소를 삭제할 수 있도록 구현할 수 있습니다.

```javascript
// src/components/LoginForm.jsx
import { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import Like from "./common/Like";
import Table from "./common/Table";

class MoviesTable extends Component {
  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
    }
  }

  deleteColumn = {
    key: "delete",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like onClick={() => this.props.onLike(movie)} liked={movie.liked} />
      ),
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
```
