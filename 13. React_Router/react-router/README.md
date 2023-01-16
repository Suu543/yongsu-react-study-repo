# React Router

## Installation

```bash
npm install react-router-dom@6
```

## Usage

```javascript
// src/App.js
export default function App() {
  return (
    <div>
      <h1>Bookkeeper!</h1>
    </div>
  );
}
```

```javascript
// index.js
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

### 1. 생성한 `React` 앱을 브라우저 URL에 연결하기.

- `BrowserRouter` 컴포넌트로 `App` 컴포넌트를 감싸면 앱이 브라우저 URL에 연결됩니다.

```javascript
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

### 2. 링크 추가하기.

- `Link` 컴포넌트를 사용하여 링크를 추가합니다. `React` 버전의 `a태그` 입니다.
- `Link` 컴포넌트는 `Global Navigation`을 추가하는 데 사용할 수 있습니다.
- `a태그`는 `href`로 링크를 정의했지만, `Link` 컴포넌트는 `to` 속성을 활용해 링크를 정의합니다.

```javascript
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
      </nav>
    </div>
  );
}
```

### 3. Routes 추가하기.

- `Link` 컴포넌트로 생성한 링크를 클릭했을 때 실제 렌더링 되는 컴포넌트를 설정합니다.
- `Route` 컴포넌트는 `path` 속성을 활용해 렌더링 될 요소의 주소를 정의합니다.
- `Route` 컴포넌트는 `element` 속성을 활용해 렌더링 될 컴포넌트를 정의합니다.

```javascript
// src/routes/invoices.js
export default function Expenses() {
  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Expenses</h2>
    </main>
  );
}
```

```javascript
// src/routes/expenses.js
export default function Invoices() {
  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Invoices</h2>
    </main>
  );
}
```

생성한 `Expenses` and `Invoices` 컴포넌트를 `Routes` 컴포넌트의 렌더링 요소로 설정합니다.

```javascript
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Expenses from "./routes/expenses";
import Invoices from "./routes/invoices";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="expenses" element={<Expenses />} />
      <Route path="invoices" element={<Invoices />} />
    </Routes>
  </BrowserRouter>
);
```

- `localhost:3000/expenses` 에서는 `expenses` 컴포넌트가 렌더링됩니다.
- `localhost:3000/invoices` 에서는 `Invoices` 컴포넌트가 렌더링됩니다.

### 4. 링크 클릭 시 네비게이션 바와 같은 공통의 컴포넌트가 사라지는 걸 방지하는 방법

1. 중첩 `routes` 이용하기.
2. `Outlet` 컴포넌트 렌더링하기.

```javascript
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Expenses from "./routes/expenses";
import Invoices from "./routes/invoices";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="expenses" element={<Expenses />} />
        <Route path="invoices" element={<Invoices />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
```

- `Routes` 컴포넌트에서 `Route` 컴포넌트를 중첩하여 사용합니다.
- `URLs`의 형태를 보면 `"/" + "expenses"` and `"/" + "invoices"` 와 같이 보일 수 있습니다.
- `App` 컴포넌트에서 `Outlet` 컴포넌트를 활용하면 `App` 컴포넌트는 그대로 렌더링 되어 있는 상태에서 클릭된 링크의 컴포넌트가 렌더링 됩니다.
- 중첩 `params` 라우팅은 `Outlet` 사용 여부에 달려있습니다.

```javascript
// src/App.js
import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
      </nav>
      <Outlet />
    </div>
  );
}
```

### 5. 배열을 활용한 동적 라우터 생성

- 일반적으로 외부 API에서 데이터를 요청하지만, 이 경우 테스트 목적을 위해 배열 하나를 직접 정의해 동적 라우터를 구현해보겠습니다.

```javascript
// src/data.js
let invoices = [
  {
    name: "Santa Monica",
    number: 1995,
    amount: "$10,800",
    due: "12/05/1995",
  },
  {
    name: "Stankonia",
    number: 2000,
    amount: "$8,000",
    due: "10/31/2000",
  },
  {
    name: "Ocean Avenue",
    number: 2003,
    amount: "$9,500",
    due: "07/22/2003",
  },
  {
    name: "Tubthumper",
    number: 1997,
    amount: "$14,000",
    due: "09/01/1997",
  },
  {
    name: "Wide Open Spaces",
    number: 1998,
    amount: "$4,600",
    due: "01/27/1998",
  },
];

export function getInvoices() {
  return invoices;
}
```

```javascript
// src/routes/invoices.js
import { Link } from "react-router-dom";
import { getInvoices } from "../data";

export default function Invoices() {
  let invoices = getInvoices();
  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        {invoices.map((invoice) => (
          <Link
            style={{ display: "block", margin: "1rem 0" }}
            to={`/invoices/${invoice.number}`}
            key={invoice.number}
          >
            {invoice.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
```

- `getInvoices()` 함수를 사용하여 배열을 반환합니다.
- 반환된 배열을 활용해 위와 같이 동적으로 주소를 렌더링합니다.
- 현재 `invoices/${invoice.number}`에 해당되는 `route`가 없으므로 `No Match` 상태가 됩니다. 이렇게 매칭되는 주소가 없는 상황은 다음과 같이 `*`를 활용해 처리할 수 있습니다.

```javascript
<Routes>
  <Route path="/" element={<App />}>
    <Route path="expenses" element={<Expenses />} />
    <Route path="invoices" element={<Invoices />} />
    <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
  </Route>
</Routes>
```

### 6. 인자(Params) 형태로 들어온 URL 읽기

- `invoices/${invoice.number}` 형태의 주소를 처리하는 방법에 대해 알아보겠습니다.
- Ex) `/invoices/1998`, `/invoices/2005` 등

```javascript
// src/routes/invoice.js
function Invoice() {
  return <h2>Invoice #???</h2>;
}

export default Invoice;
```

- `???` 대신에 `/invoices/1998`의 `1998`을 `invoices/2005`의 `2005`를 리턴하도록 구현해 보겠습니다.

1. 중첩 `route` 형태를 통해 `params`에 접근할 수 있도록 `Route`를 구성합니다.

```javascript
<Routes>
  <Route path="/" element={<App />}>
    <Route path="expenses" element={<Expenses />} />
    <Route path="invoices" element={<Invoices />} />
    <Route path="invoices/:invoiceId" element={<Invoice />} />
    <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
  </Route>
</Routes>
```

- 이제 `invoices/:invoiceId`, `/invoices/1998` and `ivoices/2005`에 해당되는 `url`을 처리할 수 있습니다.
- 이 시점에서 관건은 `Invoice` 컴포넌트가 `:invoiceId params`에 접근할 수 있도록 만드는 것입니다.
- 이를 통해 `:invoiceId`에 해당되는 `invoiceId`를 추출할 수 있습니다.
- `react-router-dom` 모듈에서 제공하는 `useParams` 함수를 사용하여 `:invoiceId`를 추출할 수 있습니다.
- `:invoiceId` -> `params.invoiceId`

```javascript
// src/routes/invoice.jsx
import { useParams } from "react-router-dom";

function Invoice() {
  let params = useParams();
  return <h2>Invoice: {params.invoiceId}</h2>;
}

export default Invoice;
```

- `invoiceId` params를 추출하고, 이 데이터를 이용해 `data.js` 파일에 접근해, `invoiceId`에 해당하는, 이름, 숫자 등 세부 `invoice` 데이터를 추출해보겠습니다.

```javascript
// src/data.js
// ...
export function getInvoice(number) {
  return invoices.find((invoice) => invoice.number === number);
}
```

- `params`는 문자열로 간주하기 때문에, 정수로 형 변환을 해야 합니다.

```javascript
// routes/invoice.jsx
import { useParams } from "react-router-dom";
import { getInvoice } from "../data";

export default function Invoice() {
  let params = useParams();
  let invoice = getInvoice(parseInt(params.invoiceId, 10));
  return (
    <main style={{ padding: "1rem" }}>
      <h2>Total Due: {invoice.amount}</h2>
      <p>
        {invoice.name}: {invoice.number}
      </p>
      <p>Due Date: {invoice.due}</p>
    </main>
  );
}
```

### 7. Index Routes

- `invoices` 링크를 클릭하면 해당 페이지로 넘어가고, 화면 오른편은 빈 공백이 됩니다. 이 문제를 `index route`를 통해 해결할 수 있습니다. 현재 페이지로 잘 넘어온 지 확인의 목적으로 `index route`를 사용할 수 있습니다.

```javascript
// src/index.js
<Routes>
  <Route path="/" element={<App />}>
    <Route path="expenses" element={<Expenses />} />
    <Route path="invoices" element={<Invoices />}>
      <Route
        index
        element={
          <main style={{ padding: "1rem" }}>
            <p>Select an invoice</p>
          </main>
        }
      />
      <Route path=":invoiceId" element={<Invoice />} />
    </Route>
    <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
  </Route>
</Routes>
```

- `index route`에는 `path` 대신에 `index` 라는 속성을 추가합니다. 왜냐하면 `index route`는 부모 `route`와 같은 `path`를 가지기 때문입니다.
- Index routes render in the parent routes outlet at the parent route's path.
- Index routes match when a parent route matches but none of the other children match.
- Index routes are the default child route for a parent route.
- Index routes render when the user hasn't clicked one of the items in a navigation list yet.

### 8. Active Links

- 사용자가 클릭한 링크를 활성화하고 싶은 경우 `Link` 컴포넌트를 `NavLink` 컴포넌트로 대체하면 됩니다.

1. `Link`를 `NavLink`로 대체합니다.
2. `NavLink` 컴포넌트의 일반 객체 형태의 `style` 속성은 객체를 리턴하는 함수형태로 변경합니다.
3. `isActive` 속성을 활용해 활성화 여부를 확인합니다.

```javascript
import { NavLink, Link, Outlet } from "react-router-dom";
import { getInvoices } from "../data";

function Invoices() {
  let invoices = getInvoices();

  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        {invoices.map((invoice) => (
          <NavLink
            style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : "",
              };
            }}
            to={`/invoices/${invoice.number}`}
            key={invoice.number}
          >
            {invoice.name}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}

export default Invoices;
```

### 9. Search Params

- `/login?success=1` or `/shoes?brand=nike&sort=asc&sortby=price` 등의 파라미터를 활용해 `url` or `path`가 구성되었을 때, `?`로 구분된 값을 추출하는 방법을 알아보겠습니다.

- `useSearchParams` 함수는 활용하면 쉽게 `url` or `path`의 검색 목적의 파라미터를 추출할 수 있습니다. 해당 함수의 리턴값 형태는 `useState`와 유사합니다.

```javascript
import { NavLink, Link, Outlet, useSearchParams } from "react-router-dom";
import { getInvoices } from "../data";

function Invoices() {
  let invoices = getInvoices();
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        <input
          value={searchParams.get("filter") || ""}
          onChange={(e) => {
            let filter = e.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
        {invoices
          .filter((invoice) => {
            let filter = searchParams.get("filter");
            if (!filter) return true;
            let name = invoice.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map((invoice) => (
            <NavLink
              style={({ isActive }) => {
                return {
                  display: "block",
                  margin: "1rem 0",
                  color: isActive ? "red" : "",
                };
              }}
              to={`/invoices/${invoice.number}`}
              key={invoice.number}
            >
              {invoice.name}
            </NavLink>
          ))}
      </nav>
      <Outlet />
    </div>
  );
}

export default Invoices;
```

- `input` 태그에 값을 입력하면, `url` or `path`는 다음과 같이 완성됩니다.
- `abc`를 입력했다 가정했을 때, `/invoices?filter=abc`로 완성됩니다.

### 10. Custom Behavior

- `input` 태그에 `Santa Monica`를 입력하고, 출력되는 결과를 클릭하면 `url` or `path`가 초기화됩니다. 로직에 따라, 이 값이 필요할 수 있습니다. 이런 상황에 대비해 다음과 같이 `Custom Route`를 정의할 수 있습니다.

```javascript
// src/routes/QueryNavLink.jsx
import { useLocation, NavLink } from "react-router-dom";

function QueryNavLink({ to, ...props }) {
  let location = useLocation();
  console.log("location: ", location);
  return <NavLink to={to + location.search} {...props} />;
}

export default QueryNavLink;
```

```javascript
// src/routes/invoices.jsx
import { NavLink, Link, Outlet, useSearchParams } from "react-router-dom";
import { getInvoices } from "../data";
import QueryNavLink from "./queryNavLink";

function Invoices() {
  let invoices = getInvoices();
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        <input
          value={searchParams.get("filter") || ""}
          onChange={(e) => {
            let filter = e.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
        {invoices
          .filter((invoice) => {
            let filter = searchParams.get("filter");
            if (!filter) return true;
            let name = invoice.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map((invoice) => (
            <NavLink
              style={({ isActive }) => {
                return {
                  display: "block",
                  margin: "1rem 0",
                  color: isActive ? "red" : "",
                };
              }}
              to={`/invoices/${invoice.number}`}
              key={invoice.number}
            >
              {invoice.name}
            </NavLink>
          ))}
        <h1>QueryNavLink</h1>
        {invoices
          .filter((invoice) => {
            let filter = searchParams.get("filter");
            if (!filter) return true;
            let name = invoice.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map((invoice) => (
            <QueryNavLink
              style={({ isActive }) => {
                return {
                  display: "block",
                  margin: "1rem 0",
                  color: isActive ? "red" : "",
                };
              }}
              to={`/invoices/${invoice.number}`}
              key={invoice.number}
            >
              {invoice.name}
            </QueryNavLink>
          ))}
      </nav>
      <Outlet />
    </div>
  );
}

export default Invoices;
```

- `useLocation` 함수는 다음과 같은 객체를 리턴합니다.
- `QueryNavLink`는 `location.search`을 사용하여 `to`를 설정합니다.

```javascript
{
  pathname: "/invoices",
  search: "?filter=sa",
  hash: "",
  state: null,
  key: "ae4cz2j"
}
```

위 경우와 달리 아래와 같은 링크는 어떻게 처리할 수 있을까요?

```javascript
<Link to="/shoes?brand=nike">Nike</Link>
<Link to="/shoes?brand=vans">Vans</Link>
```

위 링크는 마치 원래 존재했던 `url` or `path` 형태 처럼 보입니다. 이런 상황의 경우 아래와 같이 처리할 수 있습니다.

```javascript
// routes/brandLink.jsx
import { Link, useSearchParams } from "react-router-dom";

function BrandLink({ brand, ...props }) {
  let [params] = useSearchParams();
  let isActive = params.getAll("brand").includes(brand);

  return (
    <Link
      style={{ color: isActive ? "red" : "" }}
      to={`/brands/${brand}=${brand}`}
      {...props}
    />
  );
}

export default BrandLink;
```

- `BrandLink` 컴포넌트의 문제점은 `/shose?brand=nike` and `/shoes?brand=nike&brand=vans`와 같이 두 개의 `brand` 파라미터가 있어도 `active` 방식으로 처리한다는 점입니다. 아래 코드와 같이 제약사항을 추가해 이 문제를 해결할 수 있습니다.

```javascript
// routes/brandLink.jsx
function BrandLink({ brand, ...props }) {
  let [params] = useSearchParams();
  let brands = params.getAll("brand");
  let isActive = brands.includes(brand) && brands.length === 1;
}
// ...
```

- `Nike`를 클릭하고 `Vans`를 클릭했을 때, 기존의 브랜드를 대체하는 방식 대신 두 브랜드를 모두 추가하는 방식으로 구현하고 싶은 경우 다음과 같이 처리할 수 있습니다.

```javascript
import { Link, useSearchParams } from "react-router-dom";

function BrandLink({ brand, ...props }) {
  let [params] = useSearchParams();
  let isActive = params.getAll("brand").includes(brand);

  if (!isActive) {
    params.append("brand", brand);
  }

  return (
    <Link
      style={{ color: isActive ? "red" : "" }}
      to={`/shoes?${params.toString()}`}
      {...props}
    />
  );
}

export default BrandLink;
```

- 마지막으로 토클 방식으로 없다면 추가하고, 있다면 제거하는 방식으로 구현하고 싶은 경우 다음과 같이 처리할 수 있습니다.

```javascript
import { Link, useSearchParams } from "react-router-dom";

function BrandLink({ brand, ...props }) {
  let [params] = useSearchParams();
  let isActive = params.getAll("brand").includes(brand);

  if (!isActive) {
    params.append("brand", brand);
  } else {
    params = new URLSearchParams(
      Array.from(params).filter(
        ([key, value]) => key !== "brand" || !value.includes(brand)
      )
    );
  }

  return (
    <Link
      style={{ color: isActive ? "red" : "" }}
      to={`/shoes?${params.toString()}`}
      {...props}
    />
  );
}

export default BrandLink;
```

### 11. Navigating Programmatically

- 삭제 버튼을 눌렀을 때, 해당 `invoice`를 삭제하는 로직을 구현해보겠습니다.

```javascript
// src/routes/data.js
export function deleteInvoice(number) {
  return (invoices = invoices.filter((invoice) => invoice.number !== number));
}
```

```javascript
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getInvoice, deleteInvoice } from "../data";

export default function Invoice() {
  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();
  let invoice = getInvoice(parseInt(params.invoiceId, 10));

  return (
    <main style={{ padding: "1rem" }}>
      <h2>Total Due: {invoice.amount}</h2>
      <p>
        {invoice.name}: {invoice.number}
      </p>
      <p>Due Date: {invoice.due}</p>
      <p>
        <button
          onClick={() => {
            deleteInvoice(invoice.number);
            console.log("location.search: ", location.search);
            navigate("/invoices" + location.search);
          }}
        >
          Delete
        </button>
      </p>
    </main>
  );
}
```

- `location.search`는 검색 시 파라미터로 붙는 값에 대한 추출인데, 검색 시 사용된 쿼리 문을 그대로 반영하는 `queryNavLink`에 사용은 적절하지 않다. `location.search` 값을 삭제 버튼을 눌러도 그대로 유지하고 있기 때문입니다.

### References

- https://reactrouter.com/
