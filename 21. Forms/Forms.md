# Forms

- Building a Bootstrap From + Handling Form Submission
- Refs
- Controlled Elements
- Handling Multiple Inputs
- Common Errors
- Extracting a Reusable Input
- Validation
- A Basic Validation Implementation
- Displaying Validation Errors
- Validation on Change
- Joi + Validating a Form Using Joi
- Joi + Validating a Field Using Joi
- Disabling the Submit Button + Code Review
- Extracting a Reusable Form + Helper Rendering Methods
- Register Form

## Building a Bootstrap Form + Handling Form Submission

- https://react-bootstrap.github.io/forms/overview/

```javascript
// src/components/LoginForm.jsx
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class LoginForm extends Component {
  render() {
    return (
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default LoginForm;
```

```javascript
// src/App.js
import { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Customers from "./components/Customer";
import Rentals from "./components/Rentals";
import NotFound from "./components/NotFound";

import "./App.css";

import Movies from "./components/Movies";
import NavBar from "./components/NavBar";
import MovieForm from "./components/MovieForm";
import LoginForm from "./components/LoginForm";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate replace to="/movies" />} />
          <Route path="movies" element={<Movies />} />
          <Route path=":movieId" element={<MovieForm />} />
          <Route path="customers" element={<Customers />} />
          <Route path="rentals" element={<Rentals />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
```

## Handling Form Submission

`Form` 태그 내부에서 발생한 `submit` 타입의 버튼은 페이지 새로 고침을 유발합니다. 이와 같은 새로 고침은 `Form` 태그의 기본 기능 중 하나이기 때문에 `preventDefault`함수를 호출함으로써, 기본 기능의 동작을 제어할 수 있습니다.

```javascript
// src/components/LoginForm.jsx
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class LoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();

    // Call the server
    console.log("Submitted!");
  };

  render() {
    return (
      <Form className="container" onSubmit={this.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="text" placeholder="Enter Username" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default LoginForm;
```

## Refs

`Vanilla JavaScript`에서는 다음과 같이 `input` 태그에 입력된 값을 추출합니다. 이 방식을 `react`에서 사용하지 않는 이유는 `react` 사용 목적에 있습니다. `react`는 `document or DOM (Document Object Model)`에 관한 모든 것을 추상화 하는 것에 초점을 두고 있습니다.

```javascript
const username = document.getElementById("username").value;
```

`React`는 `DOM` 접근법 대신 `refs(참조 값)`을 활용해 `input` 태그에 입력된 값을 추출할 수 있습니다.
`refs(참조 값)`의 사용은 가능한 최소화해야 합니다. 그 이유는 이 방법 또한 `DOM`에 직접 접근하는 방식의 일종이므로 `animation, 3rd party library`를 제외하고는 사용하지 않는 것이 좋습니다.

- `current` 속성은 `Actual DOM`을 리턴하는 역할을 합니다.

```javascript
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class LoginForm extends Component {
  username = React.createRef();

  componentDidMount = (e) => {
    this.username.current.focus();
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // Call the server
    const username = this.username.current.value;
    console.log("Submitted!");
  };

  render() {
    return (
      <Form className="container" onSubmit={this.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            ref={this.username}
            type="text"
            placeholder="Enter Username"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default LoginForm;
```

`react`에서 제공하는 `autoFocus` 속성을 이용해 위 방식을 간소화 할 수 있습니다.

```javascript
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class LoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();

    // Call the server
    console.log("Submitted!");
  };

  render() {
    return (
      <Form className="container" onSubmit={this.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control autoFocus type="text" placeholder="Enter Username" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default LoginForm;
```

## Controlled Elements

`DOM`에 직접 접근하는 `refs` 방식 대신, 보다 리엑트스러운 방식으로 `input` 태그의 값을 추출하는 방법에 대해 알아보겠습니다.

세 가지 요소를 조합해 이 `input` 태그값을 추출할 수 있습니다.

1. `state`값을 정의하고 `input` 태그의 `value` 값으로 할당합니다.
2. `input` 태그 값 변경 사항 반영에 사용되는 `handleChange` 함수를 직접 정의합니다.
3. `onChange` 이벤트 핸들러 함수로, `handleChange` 함수를 할당합니다.
4. `onChange` 발생 시 `handleChange` 함수의 인자값으로 이벤트를 전달하고, 해당 인자 값으로 부터 입력된 값을 추출해 `state`에 반영하는 방식으로 변경 사항을 추적합니다.

```javascript
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
  };

  handleChange = (e) => {
    const account = { ...this.state.account };
    account.username = e.currentTarget.value;
    this.setState({ account });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // Call the server
    console.log("Submitted!");
  };

  render() {
    return (
      <Form className="container" onSubmit={this.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={this.handleChange}
            value={account.username}
            autoFocus
            type="text"
            name="username"
            placeholder="Enter Username"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={this.handleChange}
            type="password"
            name="password"
            value={account.password}
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default LoginForm;
```

## Handling Multiple Inputs

현재 정의된 `handleChange` 함수는 `username` 값만을 추적할 수 있습니다.
이 방식으로는 `password, address` 등 다른 속성이 왔을 때, 추가된 상태 값 개수만큼 함수를 정의해야 하는 비효율성이 존재합니다. `input` 태그에 정의된 `name` 속성을 통해 이 문제를 해결해 보겠습니다.

`input` 태그에 정의한 `name` 속성을 `currentTarget`에서 추출해 객체에 접근하는 방식으로 업데이트된 `input` 태그값을 알맞은 `state`에 반영할 수 있습니다.

```javascript
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
  };

  //   handleChange = (e) => {
  //     const account = { ...this.state.account };
  //     account[e.currentTarget.name] = e.currentTarget.value;
  //     this.setState({ account });
  //   };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // Call the server
    console.log("Submitted!");
  };

  render() {
    console.log(this.state);
    const { account } = this.state;

    return (
      <Form className="container" onSubmit={this.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={this.handleChange}
            value={account.username}
            autoFocus
            type="text"
            name="username"
            placeholder="Enter Username"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={this.handleChange}
            type="password"
            name="password"
            value={account.password}
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default LoginForm;
```

## Common Errors

`Case 1`

1. 정의하지 않은 상태 값을 업데이트하는 경우 `(username)`.

Warning: A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components

```javascript
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class LoginForm extends Component {
  state = {
    account: { password: "" },
  };
}

export default LoginForm;
```

`Case 2`

2. 상태 값을 `null` 값으로 초기화한 경우.

Warning: `value` prop on `input` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.

- 상태 값을 초기화하는 경우 `rule of thumb`로써 빈 문자열을 사용합니다.

```javascript
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class LoginForm extends Component {
  state = {
    account: { username: null, password: "" },
  };
}

export default LoginForm;
```

## Extracting a Reusable Input

`input` 태그를 보면 `controlId, label, value, onChange, name, type` 값을 제외하고 중복된 형태를 띠는 패턴을 보입니다. 이를 하나의 컴포넌트로 만들고, 가변 속성은 `props`로 받음으로써 재사용성을 높여보겠습니다.

```javascript
// src/components/common/Input.jsx
import React from "react";
import Form from "react-bootstrap/Form";

const Input = ({ controlId, label, value, onChange, name, type }) => {
  return (
    <Form.Group className="mb-3" controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        onChange={onChange}
        value={value}
        autoFocus
        type={type}
        name={name}
        placeholder="Enter Username"
      />
    </Form.Group>
  );
};

export default Input;
```

```javascript
// src/components/LoginForm.jsx
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Input from "./common/Input";
import Form from "react-bootstrap/Form";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // Call the server
    console.log("Submitted!");
  };

  render() {
    console.log(this.state);
    const { account } = this.state;

    return (
      <Form className="container" onSubmit={this.handleSubmit}>
        <Input
          controlId="formBasicUsername"
          label="Username"
          value={account.username}
          type="text"
          name="username"
          onChange={this.handleChange}
        />

        <Input
          controlId="formBasicPassword"
          label="Password"
          value={account.password}
          type="password"
          name="password"
          onChange={this.handleChange}
        />

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default LoginForm;
```

## Validation

`validate` 함수와 `errors` 상태 값을 정의하고, `Form` 태그 제출 이벤트 발생 시, 제출 요건에 맞는지 확인하고, 부합하는 경우에만 서버로 데이터를 전달하는 등의 로직을 실행하고, 그렇지 않으면 오류를 출력하도록 구현해보겠습니다.

```javascript
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Input from "./common/Input";
import Form from "react-bootstrap/Form";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  validate = () => {
    return {
      username: "Username is required.",
    };
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors });

    if (errors) return;

    // Call the server
    console.log("Submitted!");
  };

  render() {
    console.log(this.state);
    const { account } = this.state;

    return (
      <Form className="container" onSubmit={this.handleSubmit}>
        <Input
          controlId="formBasicUsername"
          label="Username"
          value={account.username}
          type="text"
          name="username"
          onChange={this.handleChange}
        />

        <Input
          controlId="formBasicPassword"
          label="Password"
          value={account.password}
          type="password"
          name="password"
          onChange={this.handleChange}
        />

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default LoginForm;
```

## A Basic Validation Implementation

`validate` 함수와 `errors` 상태 값을 정의하고, `Form` 태그 제출 이벤트 발생 시, 제출 요건에 맞는지 확인하고, 맞는 경우에만 서버로 데이터를 전달하는 등의 로직을 실행하고, 그렇지 않으면 오류를 출력하도록 구현해보겠습니다.

기본 제출 요건은 다음과 같습니다.

1. `username`이 한 글자 이상인지 아닌지.
2. `password`가 한 글자 이상인지 아닌지.

```javascript
// src/components/LoginForm.jsx
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Input from "./common/Input";
import Form from "react-bootstrap/Form";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  validate = () => {
    const errors = {};
    const { account } = this.state;

    if (account.username.trim() === "")
      errors.username = "Username is required...";
    if (account.password.trim() === "")
      errors.password = "Password is required...";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    console.log("errors: ", errors);
    this.setState({ errors });

    if (errors) return;

    // Call the server
    console.log("Submitted!");
  };

  render() {
    console.log(this.state);
    const { account } = this.state;

    return (
      <Form className="container" onSubmit={this.handleSubmit}>
        <Input
          controlId="formBasicUsername"
          label="Username"
          value={account.username}
          type="text"
          name="username"
          onChange={this.handleChange}
        />

        <Input
          controlId="formBasicPassword"
          label="Password"
          value={account.password}
          type="password"
          name="password"
          onChange={this.handleChange}
        />

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default LoginForm;
```

## Displaying Validation Errors

`React Bootstrap`에서 제공하는 `Alert` 컴포넌트를 활용해 제출 요건에 맞지 않는 경우 오류를 출력할 수 있습니다. 구현 로직은 다음과 같습니다.

1. `Input` 컴포넌트의 `props`로 `error` 속성을 추가합니다.
2. `error` 속성이 존재하는 경우에만 `Alert` 컴포넌트 렌더링을 위해 삼항 연산자 방식을 사용합니다.
3. `LoginForm` 컴포넌트에서 `errors` 상태 값 설정 시, `null` 값을 방지하기 위해 `or` 연산자를 사용해 에러가 존재하지 않는 경우 빈 객체를 리턴합니다.

```javascript
// src/components/LoginForm.jsx
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Input from "./common/Input";
import Form from "react-bootstrap/Form";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  validate = () => {
    const errors = {};
    const { account } = this.state;

    if (account.username.trim() === "")
      errors.username = "Username is required...";
    if (account.password.trim() === "")
      errors.password = "Password is required...";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    console.log("errors: ", errors);
    // null값 방지를 위해 state 값은 null 값이 되면 안 됩니다.
    this.setState({ errors: errors || {} });

    if (errors) return;

    // Call the server
    console.log("Submitted!");
  };

  render() {
    console.log(this.state);
    const { account, errors } = this.state;

    return (
      <Form className="container" onSubmit={this.handleSubmit}>
        <Input
          controlId="formBasicUsername"
          label="Username"
          value={account.username}
          type="text"
          name="username"
          onChange={this.handleChange}
          error={errors.username}
        />

        <Input
          controlId="formBasicPassword"
          label="Password"
          value={account.password}
          type="password"
          name="password"
          onChange={this.handleChange}
          error={errors.password}
        />

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default LoginForm;
```

```javascript
// src/components/common/Input.jsx
import React from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const Input = ({ controlId, label, value, error, onChange, name, type }) => {
  return (
    <Form.Group className="mb-3" controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        onChange={onChange}
        value={value}
        autoFocus
        type={type}
        name={name}
        placeholder="Enter Username"
      />
      {error && <Alert variant="danger">{error}</Alert>}
    </Form.Group>
  );
};

export default Input;
```

## Validation on Change

`Input` 태그에 입력된 값이 변경되고, 제출 제약 사항을 위반하지 않게 되면 자동으로 오류 메시지가 사라지도록 구현해보겠습니다.

1. `Input` 태그에 값이 입력될 때마다 호출되는 `handleChange` 함수에 업데이트된 입력 값을 반영하기 전, 오류 여부를 검사하는 `validateProperty` 함수를 추가했습니다.
2. `validateProperty` 함수는 기존에 오류 상태값을 읽어오고, 제약 사항에 업데이트된 입력 값이 맞는다면, 기존의 에러 메시지를 제거하고, 그렇지 않다면 오류 메시지를 유지하는 방식으로 동작합니다.

```javascript
// src/components/LoginForm.jsx
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Input from "./common/Input";
import Form from "react-bootstrap/Form";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  validate = () => {
    const errors = {};
    const { account } = this.state;

    if (account.username.trim() === "")
      errors.username = "Username is required...";
    if (account.password.trim() === "")
      errors.password = "Password is required...";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  validateProperty = ({ name, value }) => {
    if (name === "username") {
      if (value.trim() === "") return "Username is required...";
      // ...
    }

    if (name === "password") {
      if (value.trim() === "") return "Password is required...";
      // ...
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    console.log("errors: ", errors);
    // null값 방지를 위해 state 값은 null 값이 되면 안 됩니다.
    this.setState({ errors: errors || {} });

    if (errors) return;

    // Call the server
    console.log("Submitted!");
  };

  render() {
    console.log(this.state);
    const { account, errors } = this.state;

    return (
      <Form className="container" onSubmit={this.handleSubmit}>
        <Input
          controlId="formBasicUsername"
          label="Username"
          value={account.username}
          type="text"
          name="username"
          onChange={this.handleChange}
          error={errors.username}
        />

        <Input
          controlId="formBasicPassword"
          label="Password"
          value={account.password}
          type="password"
          name="password"
          onChange={this.handleChange}
          error={errors.password}
        />

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default LoginForm;
```

## Joi

모든 제약 사항을 직접 작성할 수 있지만, 이는 정말 번거로운 작업입니다. `Joi` 모듈은 이 제약 사항을 강력하고 손쉽게 작성하는 데 큰 도움을 주는 모듈입니다.

```cmd
npm install joi
```

`Joi` 사용 순서는 다음과 같습니다.

1. `Joi.object` 메소드를 통해 `schema`를 정의합니다.
2. 정의한 `schema` 객체의 `validate` 메소드를 통해 `state.account` 상태 값을 인자 값으로 전달합니다.
3. `abortEarly` 속성은 기본값은 `true` 입니다. `abortEarly: true`로 설정한 경우 `username and password` 속성 둘 다 제약사항에 맞지 않음에도, 최초로 제약사항이 맞지 않는 요소가 나타났을 때 바로 오류를 출력하는 방식으로 동작합니다. 하지만 지금 로직은 존재하는 모든 `account` 상태 값이 제약사항에 맞는지 확인해야 하므로 `abortEarly: false`로 설정하는 것이 좋습니다.

```javascript
// src/components/LoginForm.jsx
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Input from "./common/Input";
import Form from "react-bootstrap/Form";
import Joi from "joi";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  validate = () => {
    const result = this.schema.validate(this.state.account, {
      abortEarly: false,
    });
    console.log(result);

    const errors = {};
    const { account } = this.state;

    if (account.username.trim() === "")
      errors.username = "Username is required...";
    if (account.password.trim() === "")
      errors.password = "Password is required...";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  validateProperty = ({ name, value }) => {
    if (name === "username") {
      if (value.trim() === "") return "Username is required...";
      // ...
    }

    if (name === "password") {
      if (value.trim() === "") return "Password is required...";
      // ...
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    console.log("errors: ", errors);
    // null값 방지를 위해 state 값은 null 값이 되면 안 됩니다.
    this.setState({ errors: errors || {} });

    if (errors) return;

    // Call the server
    console.log("Submitted!");
  };

  render() {
    console.log(this.state);
    const { account, errors } = this.state;

    return (
      <Form className="container" onSubmit={this.handleSubmit}>
        <Input
          controlId="formBasicUsername"
          label="Username"
          value={account.username}
          type="text"
          name="username"
          onChange={this.handleChange}
          error={errors.username}
        />

        <Input
          controlId="formBasicPassword"
          label="Password"
          value={account.password}
          type="password"
          name="password"
          onChange={this.handleChange}
          error={errors.password}
        />

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default LoginForm;
```

## Validating a Form Using Joi

`validate` 함수에 기존에 정의한 로직 대신, `Joi` 모듈을 활용하면 제약사항을 보다 강력하고 손쉽게 처리할 수 있습니다.

```javascript
// src/components/LoginForm.jsx
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Input from "./common/Input";
import Form from "react-bootstrap/Form";
import Joi from "joi";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  schema = Joi.object({
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  });

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  validate = () => {
    const options = { abortEarly: false };
    const result = this.schema.validate(this.state.account, options);

    if (!result.error) return null;

    const errors = {};

    for (let item of result.error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    if (name === "username") {
      if (value.trim() === "") return "Username is required...";
      // ...
    }

    if (name === "password") {
      if (value.trim() === "") return "Password is required...";
      // ...
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    console.log("errors: ", errors);
    // null값 방지를 위해 state 값은 null 값이 되면 안 됩니다.
    this.setState({ errors: errors || {} });

    if (errors) return;

    // Call the server
    console.log("Submitted!");
  };

  render() {
    console.log(this.state);
    const { account, errors } = this.state;

    return (
      <Form className="container" onSubmit={this.handleSubmit}>
        <Input
          controlId="formBasicUsername"
          label="Username"
          value={account.username}
          type="text"
          name="username"
          onChange={this.handleChange}
          error={errors.username}
        />

        <Input
          controlId="formBasicPassword"
          label="Password"
          value={account.password}
          type="password"
          name="password"
          onChange={this.handleChange}
          error={errors.password}
        />

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default LoginForm;
```

## Validating a Field Using Joi

`Form` 제출 버튼을 눌렀을 때 실행되는 제약 사항 검사가 아닌, `Input` 태그 입력값이 변할 때마다 동적으로 변경 사항을 추측하고 반영하는 로직을 `Joi` 모듈을 통해 구현해 보겠습니다.

1. `validateProperty` 함수로 전달 된 인자값을 통해 기존에 정의한 `schema`에서 단일 값을 추출합니다

- 여기서 주의 할 점은 `Joi`는 `this.schema.username or this.schema.password` 등 `schema` 프로퍼티에 직접적인 접근을 허용하지 않습니다. 대신에, `extract` 메소드를 이용해 단일 `schema` 프로퍼티를 추출할 수 있습니다.

2. `extract` 메소드를 이용해 각 `input` 태그에 해당하는 `schema` 프로퍼티를 추출합니다.
3. 추출한 `schema` 프로퍼티를 이용해 새로운 `Joi.object`를 생성합니다.
4. `validate` 메소드를 통해 제약 사항을 검사하고, `error` 프로퍼티가 존재한다면 해당 에러를 리턴하고, 그렇지 않다면 `null`을 리턴합니다.

```javascript
// src/components/LoginForm.jsx
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Input from "./common/Input";
import Form from "react-bootstrap/Form";
import Joi from "joi";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  schema = Joi.object({
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  });

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  validate = () => {
    const options = { abortEarly: false };
    const result = this.schema.validate(this.state.account, options);

    if (!result.error) return null;

    const errors = {};

    for (let item of result.error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    // console.log("test", this.schema.extract(name));
    const propertySchema = Joi.object({ [name]: this.schema.extract(name) });
    const { error } = propertySchema.validate({ [name]: value });
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    console.log("errors: ", errors);
    // null값 방지를 위해 state 값은 null 값이 되면 안 됩니다.
    this.setState({ errors: errors || {} });

    if (errors) return;

    // Call the server
    console.log("Submitted!");
  };

  render() {
    console.log(this.state);
    const { account, errors } = this.state;

    return (
      <Form className="container" onSubmit={this.handleSubmit}>
        <Input
          controlId="formBasicUsername"
          label="Username"
          value={account.username}
          type="text"
          name="username"
          onChange={this.handleChange}
          error={errors.username}
        />

        <Input
          controlId="formBasicPassword"
          label="Password"
          value={account.password}
          type="password"
          name="password"
          onChange={this.handleChange}
          error={errors.password}
        />

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default LoginForm;
```

## Disabling the Submit Button

제출 버튼의 `disabled` 프로퍼티는 `true`가 설정된 경우 클릭이 불가능하고, `false`가 설정된 경우 클릭이 가능합니다. 이를 구현하고자 `validate` 함수가 리턴한 값을 `disabled` 프로퍼티에 함으로써, 모든 제약 사항을 만족했을 때, 제출이 가능하도록 버튼을 설정할 수 있습니다.

```javascript
// src/components/LoginForm.jsx
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Input from "./common/Input";
import Form from "react-bootstrap/Form";
import Joi from "joi";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  schema = Joi.object({
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  });

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  validate = () => {
    const options = { abortEarly: false };
    const result = this.schema.validate(this.state.account, options);
    console.log("validate result: ", result);

    if (!result.error) return null;

    const errors = {};

    for (let item of result.error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const propertySchema = Joi.object({ [name]: this.schema.extract(name) });
    const { error } = propertySchema.validate({ [name]: value });
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    console.log("errors: ", errors);
    // null값 방지를 위해 state 값은 null 값이 되면 안 됩니다.
    this.setState({ errors: errors || {} });

    if (errors) return;

    // Call the server
    console.log("Submitted!");
  };

  render() {
    console.log(this.state);
    const { account, errors } = this.state;

    return (
      <Form className="container" onSubmit={this.handleSubmit}>
        <Input
          controlId="formBasicUsername"
          label="Username"
          value={account.username}
          type="text"
          name="username"
          onChange={this.handleChange}
          error={errors.username}
        />

        <Input
          controlId="formBasicPassword"
          label="Password"
          value={account.password}
          type="password"
          name="password"
          onChange={this.handleChange}
          error={errors.password}
        />

        <Button disabled={this.validate()} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default LoginForm;
```

## Extracting a Reusable Form

상속을 이용해 재사용 가능한 `Form` 컴포넌트를 생성해 보겠습니다.

1. `Form` 컴포넌트 재사용 목적을 위해 `account` 상태값을 `data`로 변경했습니다.
2. `handleChange` 메소드는 그대로 사용 가능하므로 `account ==> data`를 제외한 별도의 코드 수정을 가하지 않았습니다.
3. `validate` 메소드드 또한 그대로 사용 가능하므로 `account ==> data`를 제외한 별도의 코드 수정을 가하지 않았습니다.
4. `validateProperty` 메소드는 별도의 코드 수정을 가하지 않았습니다.
5. `handleSubmit` 메소드는 서버와 통신하는 로직을 제외하고는 별도의 코드 수정이 필요 없으므로, `doSubmit` 메소드를 별도로 생성해 각 컴포넌트의 서버 통신 로직을 실행하는 방식으로 코드 수정을 가했습니다.
6. `schema`는 각 컴포넌트에 한정되는 객체이므로 별도의 코드 수정을 가하지 않았습니다.

```javascript
// src/components/common/FormComp.jsx
import { Component } from "react";
import Joi from "joi";

class FormComp extends Component {
  state = {
    data: {},
    errors: {},
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  validate = () => {
    const options = { abortEarly: false };
    const result = this.schema.validate(this.state.data, options);
    console.log("validate result: ", result);

    if (!result.error) return null;

    const errors = {};

    for (let item of result.error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const propertySchema = Joi.object({ [name]: this.schema.extract(name) });
    const { error } = propertySchema.validate({ [name]: value });
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    console.log("errors: ", errors);
    this.setState({ errors: errors || {} });

    if (errors) return;

    this.doSubmit();
  };
}

export default FormComp;
```

```javascript
// src/components/LoginForm.jsx
import React from "react";
import Button from "react-bootstrap/Button";
import Input from "./common/Input";
import Form from "react-bootstrap/Form";
import Joi from "joi";
import FormComp from "./common/FormComp";

class LoginForm extends FormComp {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = Joi.object({
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  });

  doSubmit = () => {
    // Call the server
    console.log("Submitted!");
  };

  render() {
    console.log(this.state);
    const { account, errors } = this.state;

    return (
      <Form className="container" onSubmit={this.handleSubmit}>
        <Input
          controlId="formBasicUsername"
          label="Username"
          value={account.username}
          type="text"
          name="username"
          onChange={this.handleChange}
          error={errors.username}
        />

        <Input
          controlId="formBasicPassword"
          label="Password"
          value={account.password}
          type="password"
          name="password"
          onChange={this.handleChange}
          error={errors.password}
        />

        <Button disabled={this.validate()} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default LoginForm;
```

## Extracting Helper Rendering Method

`renderButton` and `renderInput` 메소드를 `Form` 컴포넌트에 생성해 재사용성을 높일 수 있습니다.

1. `renderButton` 메소드는 `label`을 인자 값으로 받아, 로그인, 회원가입 등 여러 상황에 사용할 수 있도록 재사용성을 높였습니다.
2. `renderInput` 메소드는 `name, label, controlId, type`을 인자 값으로 받아 코드를 보다 간소화하고, `handleChange` and `error` 등의 속성 등에 추상화를 적용할 수 있습니다.

```javascript
// src/components/common/FormComp.jsx
import { Component } from "react";
import Button from "react-bootstrap/Button";
import Joi from "joi";
import Input from "./Input";

class FormComp extends Component {
  state = {
    data: {},
    errors: {},
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  validate = () => {
    const options = { abortEarly: false };
    const result = this.schema.validate(this.state.data, options);
    console.log("validate result: ", result);

    if (!result.error) return null;

    const errors = {};

    for (let item of result.error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const propertySchema = Joi.object({ [name]: this.schema.extract(name) });
    const { error } = propertySchema.validate({ [name]: value });
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    console.log("errors: ", errors);
    this.setState({ errors: errors || {} });

    if (errors) return;

    this.doSubmit();
  };

  renderButton(label) {
    <Button disabled={this.validate()} variant="primary" type="submit">
      {label}
    </Button>;
  }

  renderInput(name, label, controlId, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        controlId={controlId}
        label={label}
        value={data[name]}
        type={type}
        name={name}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default FormComp;
```

마지막으로 `Rest Operator`를 할용해 `Input` 컴포넌트를 보다 간소화할 수 있습니다. 저는 개인적으로 모든 내용을 명시하는 것을 선호합니다.

```javascript
// src/components/common/Input.jsx

import React from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

// Version #1
const Input = ({ controlId, label, value, error, onChange, name, type }) => {
  return (
    <Form.Group className="mb-3" controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        onChange={onChange}
        value={value}
        autoFocus
        type={type}
        name={name}
        placeholder="Enter Username"
      />
      {error && <Alert variant="danger">{error}</Alert>}
    </Form.Group>
  );
};

// Version #2
const Input = ({ controlId, label, error, ...rest }) => {
  return (
    <Form.Group className="mb-3" controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control {...rest} autoFocus placeholder="Enter Username" />
      {error && <Alert variant="danger">{error}</Alert>}
    </Form.Group>
  );
};

export default Input;
```

## Exercise and Solution - Register Form

## Exercise and Solution - Movie Form

## Exercise and Solution - Search Movies
