# Connecting to the Effect Hook

<img src="https://cdn-images-1.medium.com/max/800/1*BAdnmTmG_Zz2Bds0OrvKXg.png" />

리엑트 컴포넌트는 `Pure Function`의 구조를 유지하는 게 이상적입니다.
여기서 말하는 `Pure Function`이란 `Side Effects`가 없고, 컴포넌트를 함수라고 간주했을 때, 같은 값의 인자를 받았을 때, 항상 같은 값을 리턴하는 함수를 의미합니다.

`To keep components pure, keep changes out of the render phase`

하지만 `Side Effects`발생이 불가피한 몇몇 상황이 있습니다.

1. Store data in local storage
2. Call the server to fetch/save data
3. Manually modify the DOM

컴포넌트를 `Pure Function`의 구조를 유지하면서, 불가피한 상황을 처리하는 목적으로 `React`는 `useEffect Hook`을 제공합니다.

- 꼭 기억해야 할 점은 `useEffect`는 `Side Effects`를 체계적으로 처리하고자, 항상 컴포넌트가 렌더링 된 시점을 체크하고, 이 시점에 `Side Effects`와 관련된 코드를 실행합니다.
  (To execute a piece of code after a component is rendered)

`useEffect` 이름이 실제 제공하는 기능과 일치하지 않아 이해가 어려울 수 있습니다. 이해를 돕고자 `useEffect => afterRender or afterEachRender`라는 이름으로 생각하면 이해가 쉬울 것 같습니다.

아래 코드와 같이 `useEffect`가 여러 개 있을 때, `React`는 정의된 순서대로 해당 함수를 호출합니다.
그리고 아래 코드 처럼 `useEffect`가 여러 개 있는 것을 보고 영어로 `Seperate Responsibility`라고 합니다.

```typescript
import { useEffect, useRef } from "react";

function App() {
  const ref = useRef<HTMLInputElement>(null);

  // afterRender
  useEffect(() => {
    // Side Effect (Change something outside of component)
    if (ref.current) ref.current.focus();
  }, []);

  // // Side Effect (Change something outside of component)
  // if (ref.current) ref.current.focus();

  // Separate Responsibility
  useEffect(() => {
    document.title = "My App";
  }, []);

  return (
    <div>
      <input ref={ref} type="text" className="form-control" />
    </div>
  );
}

export default App;
```

## Effect Dependencies

다음 코드를 App 컴포넌트에서 실행하면 무한루프가 발생합니다.
그 이유는 `useEffect(afterRender)` 함수는 매 렌더링마다 호출되는 함수입니다. `useState Hook`의 `setState` 함수가 호출되면 재렌더링(Re-Render)이 발생합니다.

다음과 같은 순서로 함수가 호출되면서 무한루프가 발생하게됩니다.

- render ==> useEffect ==> setProducts ==> re-render ==> useEffect ==> setProducts ==> ...

무한루프를 해결하는 방법은 두 가지가 있습니다.

1. 최초 렌더링이 완료된 후에만 `useEffect` 함수를 호출
2. 최초 렌더링이 완료된 후 + 특정 상태값이 변경되었을 때 만 `useEffect` 함수를 호출

```typescript
// src/components/ProductList.tsx
import { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState<string[]>([]);

  useEffect(() => {
    console.log("Fetching Products");
    setProducts(["Clothing", "Household"]);
  });

  return <div>ProductList</div>;
};

export default ProductList;
```

해결방법을 적용하기 위해서는 `useEffect` 함수의 두번째 인자로 함수 호출 조건을 정의해야합니다.

- `useEffect` 함수의 두번째 인자에 값을 정의하는 것을 의존성 부여(Effect Dependencies)라고 합니다.

1. 최초 렌더링이 완료된 후에만 `useEffect` 함수를 호출

- 다음과 같이 코드를 수정하고, 위 코드를 실행하면 최로 렌더링이 완료된 후에만 `useEffect` 함수가 호출되는 것을 확인할 수 있습니다.
- 결과값에 `Fetching Products` 로그가 두 번 출력된 이유는 `React.StrictMode`를 사용하고 있기 때문입니다.

```typescript
useEffect(() => {}, []);
```

- 이 경우에는 빈 배열을 `useEffect` 함수의 두번째 인자에 할당함으로써 구현할 수 있습니다.

2. 최초 렌더링 완료된 후 + 특정 상태값이 변경되었을 때 만 `useEffect` 함수를 호출

```typescript
useEffect(() => {}, [category]);
```

- 이 경우는 빈 배열이 아닌, 특정 상태값을 배열에 담아 `useEffect` 함수의 두번째 인자에 할당함으로써 구현할 수 있습니다.
- 두번째 인자에 할당하는 값 개수는 제한이 없지만, 성능 측면을 고려했을 때 그 수를 최소화하는 것이 중요합니다.

2번 해결책을 구현하면 다음과 같습니다.

```typescript
// src/App.tsx
import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";

function App() {
  const [category, setCategory] = useState("");

  return (
    <div>
      <select onChange={(event) => setCategory(event.target.value)}>
        <option value=""></option>
        <option value="Clothing">Clothing</option>
        <option value="Household">Household</option>
      </select>
      <ProductList category={category} />
    </div>
  );
}

export default App;
```

```typescript
// components/ProductList.tsx
import { useEffect, useState } from "react";

const ProductList = ({ category }: { category: string }) => {
  const [products, setProducts] = useState<string[]>([]);

  // useEffect의 두번째 인자를 빈배열로 할당하면 select 태그를 통해 값이 변경되어도 변경이 반영되지 않습니다.
  // 하지만 category를 할당하면, category값이 변경될 때마다 useEffect 함수가 재호출됩니다.
  useEffect(() => {
    console.log("Fetching Products in ", category);
    setProducts(["Clothing", "Household"]);
  }, [category]);

  return <div>ProductList</div>;
};

export default ProductList;
```

## Effect CleanUp

다음과 같은 코드는 항시 적용되는 것이기 때문에 별도로 삭제해 줄 필요가 없습니다.
하지만 채팅 봇과 같이 특정 시점에 연결을 끊어야합니다.

```typescript
function App() {
  useEffect(() => {
    document.title = "My App";
  });

  return <div></div>;
}
```

특정 시점에 연결을 끊어야하는 상황을 구현해보겠습니다.

```typescript
import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";

const connect = () => console.log("Connecting");
const disconnect = () => console.log("Disconnecting");

function App() {
  useEffect(() => {
    connect();

    // Clean Up 코드는 항상 필요하지는 않습니다.
    // Clean Up을 통해 일회성 동작, 자료, 이벤트를 관리할 수 있습니다.
    return () => disconnect();
  });

  return <div></div>;
}

export default App;
```

결과는 다음과 같이 출력됩니다.
그 이유는 `React.StrictMode`가 먼저 해당 컴포넌트를 렌더링(mounting)하고 문제를 검증하고, 문제가 없다면, 해당 컴포넌트를 다시 렌더링하는 방식으로 동작하기 때문입니다.
`React.StrictMode`를 통해 렌더링된 컴포넌트는 화면에서 사라졌기 때문에 `Disconnecting` 결과가 출력된 반면, 실제 렌더링 된 컴포넌트는 아직 화면에 그대로 있기 때문에 `Disconnecting`이 출력되지 않았습니다. 이렇게 화면에서 사라지는 단계는 `Unmounting`이라 칭합니다.

```bash
Connecting
Disconnecting
Connecting
```

## Fetching Data

- fecth()
- axios

```bash
npm install axios
```

```typescript
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users");
  }, []);

  return <div></div>;
}

export default App;
```

`axios.get`은 `Promise`를 리턴합니다.

- Promise: An object that holds the eventual result or failure of an asynchronous(long running) operation.

`asynchronous operation`은 간단하게 오랜 작업이 걸리는 동작으로 이해할 수 있습니다.

```typescript
import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data));
  }, []);

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

## Understanding HTTP Requests

HTTP(Hypertext Transfer Protocol)

- HTTP는 간단하게 인터넷에서 데이터를 주고 받을 때 사용하는 일종의 약속된 양식(프로토콜)이라 이해할 수 있습니다.
- 개발자 도구를 통해 HTTP Request/Response를 검토해보겠습니다.

모든 HTTP Request/Response는 다음 사진과 같은 구조를 가집니다.

- Metadata는 제목, 시간, 경로, 파일종류 등의 속성값을 의미합니다.
- Data는 실제 렌더링에 사용되는 데이터를 의미합니다.

<img src="https://cdn-images-1.medium.com/max/800/1*EJk0A7ps0XPTTSLwJaxtwQ.png" />

## Handling Errors

만약 `HTTP Request`을 보내고 응답을 받는 과정에 문제가 발생했다면, 어떻게 오류를 처리하는 방법에 대해 학습해보겠습니다.
다음과 같이 잘못된 주소에 요청을 보낸 경우, `axios`는 `Promise`를 리턴하기때문에, `Promise`에서 제공하는 `catch` 메소드를 통해 오류를 처리할 수 있습니다.

1. `error`를 담당하는 `state`를 하나 생성합니다.
2. `Promise`에서 제공하는 `catch` 메소드를 통해 오류를 포착합니다.
3. 포착한 오류를 `setError` 메소드에 추가합니다.
4. 조건부 렌더링을 통해 오류가 있는 경우에 오류를 화면에 출력합니다.

```typescript
import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/xusers")
      .then((res) => setUsers(res.data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <>
      {error && <p>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
```

## Working with Async and Await

`Promise`에서 제공하는 `catch` 방식 대신에, `async/await` 방식을 선호하는 분들이있습니다. 이번에는 `async/await` 방식으로 오류 처리하는 방법에 대해서 알아보겠습니다.

`useEffect` 함수의 콜백에 `async`는 정의하면 오류가 발생합니다. 그 이유는 `React Hook`의 콜백함수로 `async/await` 함수 할당을 허용하지 않기 때문입니다.

```typescript
useEffect(async () => {});
```

이 문제를 해결하기 위해서는, `useEffect` 콜백 함수 내부에 `async/await` 함수를 정의하고, 해당 함수를 호출하는 방법으로 이 문제를 해결할 수 있습니다.
`try ~ catch` 구문은 `type` 정의를 허용하지 않기 때문에 `as` 구문을 통해 타입을 정의할 수 있습니다.

개인적으로 `async/await` 방식의 경우 타입 정의, try ~ catch 구문 등 코드가 더 복잡해지기 때문에 `Promise` 방식을 선호합니다.

```typescript
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // get -> (await) promise -> res / err ->

    const fetchUser = async () => {
      try {
        const res = await axios.get<User[]>(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(res.data);
      } catch (err) {
        setError((err as AxiosError).message);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      {error && <p>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
```

## Cancelling a Fetch Request

불필요한 요청을 취소하는 방법에 대해서 알아보겠습니다.
요청을 보낸 상태에서, 사용자가 페이지를 종료하거나 혹은 요청한 데이터가 더 이상 필요없는 경우 요청을 취소하면 불필요한 자원 낭비를 줄일 수 있습니다.

`AbortController` 클래스를 활용해 불필요한 요청을 취소해보겠습니다.
`AbortController`는 브라우저에서 제공해주는 기능으로, `fetch` 등과 같은 비동기 동작을 강제로 종료하는 등의 작업에 유용하게 사용할 수 있습니다.

`Axios`에서는 요청이 완료되지 않은 채 취소되면 `CanceledError`를 발생시킵니다. 이 경우에는 응답으로 부터 오는 오류와는 관련이 없기 때문에,
`setError`에 오류를 반영하는 대신, `return`을 호출해 함수를 종료시키고, `useEffect` 함수의 콜백의 리턴함수를 통해 요청을 강제종료 하는 방법으로 불필요한 요청을 취소할 수 있습니다.

```typescript
import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then((res) => setUsers(res.data))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, []);

  return (
    <>
      {error && <p>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
```

## Showing a Loading Indicator

데이터를 받아오는 과정은 비동기 이기 때문에 다음 위치에 `setLoading` 함수를 정의하면 원하는 방식으로 동작하지 않습니다.

```typescript
const [isLoading, setLoading] = useState(false);

useEffect(() => {
  const controller = new AbortController();

  axios
    .get<User[]>("https://jsonplaceholder.typicode.com/users", {
      signal: controller.signal,
    })
    .then((res) => setUsers(res.data))
    .catch((err) => {
      if (err instanceof CanceledError) return;
      setError(err.message);
    });

  setLoading(false);

  return () => controller.abort();
}, []);
```

위 방식 대신에, `HTTP Response`를 처리하는 `then` 함수 내부에 `setLoading` 함수를 정의함으로써 원하는 방식으로 동작하게 구현할 수 있습니다.
`Throttling` 기능을 통해 렌더링 속도를 늦춰 `loading` 문구를 확인할 수 있습니다.

```typescript
import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <div>loading</div>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
```

## Deleting Data

업데이트 방식에는 두 종류가 존재합니다.

Optimistic Update:

- 이 방식은 UI를 먼저 업데이트하고 이후 서버를 호출합니다 (Update the UI Call the Server)
- 속도가 빠르지만, 자칫하면 화면의 결과와 서버 데이터가 일치하지 않을 수 있습니다. 그래서 이 문제를 해결하고자 이전 상태의 값을 저장해두고, 오류 발생시 이전 데이터를 다시 화면에 반영합니다.
- 이 방식이 일반적으로 선호되는 방식입니다.

Pessimistic Update:

- 이 방식은 서버를 호출하고, 이후 결과값을 UI에 반영합니다.
- Call the server Update the UI
- 속도가 느리지만, 확실한 결과를 보장할 수 있습니다.

Optimistic Update 방식으로 데이터 삭제를 구현해보겠습니다.

```typescript
import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users];

    setUsers(users.filter((u) => u.id !== user.id));
    axios
      .delete("https://jsonplaceholder.typicode.com/users/" + user.id)
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <div>loading</div>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => deleteUser(user)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
```

## Creating Data

요청 링크를 수정해 오류를 출력해낼 수 있습니다. 본래는 `input` 태그를 작성해 구현해야하지만, 서버와 소통하는 방식을 보는 파트이기 때문에 임시로 데이터를 생성했습니다.

```typescript
import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users];

    setUsers(users.filter((u) => u.id !== user.id));
    axios
      .delete("https://jsonplaceholder.typicode.com/users/" + user.id)
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "yongsu" };
    setUsers([...users, newUser]);

    // axios에서 새로 추가된 사용자에게, 새로운 id 값을 할당하기 때문에 다음과 같이 setUsers 함수를 재호출했습니다.
    axios
      .post("https://jsonplaceholder.typicode.com/users", newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <div>loading</div>}
      <button onClick={addUser}>Add</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => deleteUser(user)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
```

## Updating Data

본래는 `input` 태그를 작성해 구현해야하지만, 서버와 소통하는 방식을 보는 파트이기 때문에 임시로 데이터를 업데이트했습니다.

```typescript
import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users];

    setUsers(users.filter((u) => u.id !== user.id));
    axios
      .delete("https://jsonplaceholder.typicode.com/users/" + user.id)
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "yongsu" };
    setUsers([...users, newUser]);

    // axios에서 새로 추가된 사용자에게, 새로운 id 값을 할당하기 때문에 다음과 같이 setUsers 함수를 재호출했습니다.
    axios
      .post("https://jsonplaceholder.typicode.com/users", newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    // put(replace all) vs patch(update one or two (more) properties)
    // 단일 속성 업데이트이기 때문에 patch 사용
    axios
      .patch(
        "https://jsonplaceholder.typicode.com/users/" + user.id,
        updatedUser
      )
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <div>loading</div>}
      <button onClick={addUser}>Add</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            <div>
              <button onClick={() => updateUser(user)}>Update</button>
              <button onClick={() => deleteUser(user)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
```

## Extracting a Reusable API Client

서버에 요청을 보내는 `url`이 반복해서 사용되는 것을 확인할 수 있습니다.
별도의 `api-client` 파일을 생성해 반복되는 부분을 개선해보겠습니다.
`CanceledError` 클래스 또한 `api-client`에 관련된 속성이기 때문에 한 곳에 모아서 관리할 수 있도록 정의했습니다.

```typescript
// services/api-client.ts
import axios, { CanceledError } from "axios";

export default axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export { CanceledError };
```

```typescript
// src/App.tsx
import { useEffect, useState } from "react";
import apiClient, { CanceledError } from "./services/api-client";

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    apiClient
      .get<User[]>("/users", {
        signal: controller.signal,
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users];

    setUsers(users.filter((u) => u.id !== user.id));
    apiClient.delete("/users/" + user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "yongsu" };
    setUsers([...users, newUser]);

    // axios에서 새로 추가된 사용자에게, 새로운 id 값을 할당하기 때문에 다음과 같이 setUsers 함수를 재호출했습니다.
    apiClient
      .post("/users", newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    // put(replace all) vs patch(update one or two (more) properties)
    // 단일 속성 업데이트이기 때문에 patch 사용
    apiClient
      .patch(
        "https://jsonplaceholder.typicode.com/users/" + user.id,
        updatedUser
      )
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <div>loading</div>}
      <button onClick={addUser}>Add</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            <div>
              <button onClick={() => updateUser(user)}>Update</button>
              <button onClick={() => deleteUser(user)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
```

## Extracting the User Service

`App` 컴포넌트의 역할은 화면에 데이터를 렌더링하고, 상태값이 업데이트되었을 때 재렌더링 하는 것입니다. 하지만 현재 `App` 컴포넌트에는 `HTTP Request`, `AbortController` 등 실행 디테일이 포함되어있습니다. 그래서 이러한 실행 디테일은 가능한 추상화해서 재사용 가능한 형태로 리펙토링해보겠습니다.

```typescript
import apiClient from "./api-client";

export interface User {
  id: number;
  name: string;
}

class UserService {
  getAllUsers() {
    const controller = new AbortController();
    const request = apiClient.get<User[]>("/users", {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  deleteUser(id: number) {
    return apiClient.delete("/users/" + id);
  }

  createUser(user: User) {
    return apiClient.post("/users", user);
  }

  updateUser(user: User) {
    return apiClient.patch("/users/" + user.id, user);
  }
}

export default new UserService();
```

리펙토링 전

```typescript
import { useEffect, useState } from "react";
import apiClient, { CanceledError } from "./services/api-client";

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    apiClient
      .get<User[]>("/users", {
        signal: controller.signal,
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users];

    setUsers(users.filter((u) => u.id !== user.id));
    apiClient.delete("/users/" + user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "yongsu" };
    setUsers([...users, newUser]);

    // axios에서 새로 추가된 사용자에게, 새로운 id 값을 할당하기 때문에 다음과 같이 setUsers 함수를 재호출했습니다.
    apiClient
      .post("/users", newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    // put(replace all) vs patch(update one or two (more) properties)
    // 단일 속성 업데이트이기 때문에 patch 사용
    apiClient
      .patch(
        "https://jsonplaceholder.typicode.com/users/" + user.id,
        updatedUser
      )
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <div>loading</div>}
      <button onClick={addUser}>Add</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            <div>
              <button onClick={() => updateUser(user)}>Update</button>
              <button onClick={() => deleteUser(user)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
```

리펙토링 후

```typescript
// src/App.tsx

import { useEffect, useState } from "react";
import { CanceledError } from "./services/api-client";
import userService, { User } from "./services/userService";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const { request, cancel } = userService.getAllUsers();
    request
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => cancel();
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users];

    setUsers(users.filter((u) => u.id !== user.id));

    userService.deleteUser(user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "yongsu" };
    setUsers([...users, newUser]);

    // axios에서 새로 추가된 사용자에게, 새로운 id 값을 할당하기 때문에 다음과 같이 setUsers 함수를 재호출했습니다.
    userService
      .createUser(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    userService.updateUser(updatedUser).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <div>loading</div>}
      <button onClick={addUser}>Add</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            <div>
              <button onClick={() => updateUser(user)}>Update</button>
              <button onClick={() => deleteUser(user)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
```

## Creating a Generic HTTP Service

앞서 생성한 `user-service`는 특정 `api`에 한정된 방식으로 동작합니다.
하지만 `url` 차이만 있고 `api` 호출 방식에 차이가 없다면 해당 코드를 재사용할 수 있습니다. 이번에는 `Typescript Generics`을 적용해 `user-service`를 보다 재사용성이 좋은 코드로 리펙토링해보겠습니다.

```typescript
// src/services/http-service.ts
import apiClient from "./api-client";

// T = Type
interface Entity {
  id: number;
}

class HttpService {
  constructor(public endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll<T>() {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  delete(id: number) {
    return apiClient.delete(this.endpoint + "/" + id);
  }

  create<T>(entity: T) {
    return apiClient.post(this.endpoint, entity);
  }

  updateUser<T extends Entity>(entity: T) {
    return apiClient.patch(this.endpoint + entity.id, entity);
  }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;
```

```typescript
// src/services/userService.ts

import create from "./http-service";

export interface User {
  id: number;
  name: string;
}

export default create("/users");

// import apiClient from "./api-client";

// export interface User {
//   id: number;
//   name: string;
// }

// class UserService {
//   getAllUsers() {
//     const controller = new AbortController();
//     const request = apiClient.get<User[]>("/users", {
//       signal: controller.signal,
//     });

//     return { request, cancel: () => controller.abort() };
//   }

//   deleteUser(id: number) {
//     return apiClient.delete("/users/" + id);
//   }

//   createUser(user: User) {
//     return apiClient.post("/users", user);
//   }

//   updateUser(user: User) {
//     return apiClient.patch("/users/" + user.id, user);
//   }
// }

// export default new UserService();
```

```typescript
// src/App.tsx

import { useEffect, useState } from "react";
import { CanceledError } from "./services/api-client";
import userService, { User } from "./services/userService";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const { request, cancel } = userService.getAll<User>();
    request
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => cancel();
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users];

    setUsers(users.filter((u) => u.id !== user.id));

    userService.delete(user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "yongsu" };
    setUsers([...users, newUser]);

    // axios에서 새로 추가된 사용자에게, 새로운 id 값을 할당하기 때문에 다음과 같이 setUsers 함수를 재호출했습니다.
    userService
      .create<User>(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    userService.update<User>(updatedUser).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <div>loading</div>}
      <button onClick={addUser}>Add</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            <div>
              <button onClick={() => updateUser(user)}>Update</button>
              <button onClick={() => deleteUser(user)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
```

## Creating a Custom Data

만약 App 컴포넌트를 제외한, 다른 컴포넌트도 사용자 정보가 필요한 경우를 생각해보겠습니다. 그렇다면 아래 사용자 정보를 호출하는 모든 부분을 다시 재작성해야하는 문제가 번거로움이 발생합니다. `Custom Hook`을 생성해 이 문제를 해결할 수 있습니다.

```typescript
const [users, setUsers] = useState<User[]>([]);
const [error, setError] = useState("");
const [isLoading, setLoading] = useState(false);

useEffect(() => {
  const { request, cancel } = userService.getAll<User>();
  request
    .then((res) => {
      setUsers(res.data);
      setLoading(false);
    })
    .catch((err) => {
      if (err instanceof CanceledError) return;
      setError(err.message);
      setLoading(false);
    });

  return () => cancel();
}, []);
```

모든 `Hook`은 `use`로 시작하는 규칙이있습니다.
다음과 같이 `useUsers Hook`을 정의하면, 이후 사용자 정보가 필요할 때 추가적인 코드 작성없이, 미리 작성해둔 사용자 정보, 오류, 로딩 로직을 쉽게 적용할 수 있습니다.

```typescript
// src/hooks/useUsers.ts
import { useState, useEffect } from "react";
import userService, { User } from "../services/userService";
import { CanceledError } from "../services/api-client";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const { request, cancel } = userService.getAll<User>();
    request
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => cancel();
  }, []);

  return { users, error, isLoading, setUsers, setError };
};

export default useUsers;
```

```typescript
// src/App.tsx
import useUsers from "./hooks/useUsers";
import userService, { User } from "./services/userService";

function App() {
  const { users, error, isLoading, setUsers, setError } = useUsers();

  const deleteUser = (user: User) => {
    const originalUsers = [...users];

    setUsers(users.filter((u) => u.id !== user.id));

    userService.delete(user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "yongsu" };
    setUsers([...users, newUser]);

    userService
      .create<User>(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    userService.update<User>(updatedUser).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <div>loading</div>}
      <button onClick={addUser}>Add</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            <div>
              <button onClick={() => updateUser(user)}>Update</button>
              <button onClick={() => deleteUser(user)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
```
