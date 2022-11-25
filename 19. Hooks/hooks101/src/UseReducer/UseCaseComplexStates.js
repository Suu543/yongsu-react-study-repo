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
