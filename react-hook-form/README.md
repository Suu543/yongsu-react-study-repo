# 단일 진실 공급원 (Single Source of Truth)

"신뢰 가능한 단일 출처"를 나타내는 개념은 "단일 상태 소스(Single Source of Truth)"입니다. 이 개념은 애플리케이션 상태를 관리할 때, 정보의 일관성을 유지하고 복잡성을 줄이기 위해 중요한 원칙 중 하나입니다. 이를 표현하면 다음과 같이 말할 수 있습니다:

"신뢰 가능한 단일 출처" 원칙은 하나의 상태가 애플리케이션 내에서 유일하게 존재해야 한다는 원칙을 의미합니다. 이는 상태 정보를 중앙 집중적으로 관리하고 갱신함으로써 애플리케이션의 상태를 일관되게 유지할 수 있게 도와줍니다.

# 제어 컴포넌트와 비제어 컴포넌트

React에서 값이 제어되는 컴포넌트를 "제어 컴포넌트(Controlled Component)"라고 하며, 값이 React에 의해 제어되지 않는 컴포넌트를 "비제어 컴포넌트(Uncontrolled Component)"라고 합니다. 입력 요소와 관련된 태그를 다룰 때, 입력된 값을 상태(state)로 관리하거나 DOM API를 통해 관리할 수 있습니다. 간단하게 설명하면, 상태(state)로 DOM 요소의 값을 조작하는 컴포넌트가 제어 컴포넌트이고, 상태(state)에 의존하지 않고 DOM을 직접 다루는 컴포넌트가 비제어 컴포넌트입니다.

## 제어 컴포넌트(Controlled Component)

<img src="https://cdn-images-1.medium.com/max/800/1*nnsqMQkQQxetbcgBUneOow.png" />

다음 코드는 Input 태그의 값이 바뀔 때 마다 `changeName`을 통해 상태값을 업데이트해주는 제어 컴포넌트입니다.

```javascript
function MyApp() {
  const [name, setName] = useState(null);

  const changeName = (e) => {
    setName(e.current.value);
  };

  return <input onChange={changeName} value={name} />;
}
```

제어 컴포넌트(Controlled Component)는 사용자의 입력을 기반으로 상태값을 관리하고 업데이트하는 동시에, 이러한 업데이트 내용을 화면에 반영하기 위해 재렌더링됩니다. 이 때, Input 태그에 현재 입력된 값이 상태값에 의해 결정되는데, 이를 "Single source of truth(단일 진실의 원천)"이라고 합니다. 다시 말해, 입력된 값과 저장된 값이 실시간으로 동기화되는 상태를 나타냅니다.

### 제어 컴포넌트 문제점

"제어 컴포넌트(Controlled Component)"는 값이 변할 때마다 재렌더링이 발생하기 때문에, 불필요한 재렌더링이나 API 중복 호출과 같은 문제가 발생할 수 있습니다. 이러한 문제를 해결하는 방법으로는 쓰로틀링(Throttling)과 디바운싱(Debouncing)이 있습니다.

```
ㅇ
아
안
안ㄴ
안녀
안녕
안녕ㅎ
안녕하
안녕핫
안녕하
안녕하세
안녕하셍
안녕하세
안녕하세요
```

### 쓰로틀링(Throttling) & 디바운싱(Debouncing)

쓰로틀링(Throttling)과 디바운싱(Debouncing)은 사용자 입력 또는 이벤트 처리와 관련된 비동기 작업을 제어하기 위한 기술입니다. 다음으로 각각의 예시를 보여드리겠습니다.

1. 쓰로틀링(Throttling):

쓰로틀링은 이벤트 발생 주기에 제한을 두어, 일정 간격으로만 이벤트 핸들러를 실행하게 만드는 것입니다. 이로 인해 빈번한 이벤트가 발생할 때, 핸들러가 과도하게 호출되는 것을 방지할 수 있습니다. 예를 들어, 스크롤 이벤트를 쓰로틀링하면 스크롤 이벤트가 빠르게 연속해서 발생하는 경우에도 핸들러는 일정 주기로만 실행됩니다.

- 쓰로틀링은 이벤트가 자주 발생하는 상황에서 일정 주기마다 이벤트 핸들러를 실행합니다.
- 이렇게 하면 빠르게 반복되는 이벤트가 일정 주기로 제한되어 실행됩니다.
- 주로 스크롤 이벤트나 리사이징 이벤트와 같이 연속적으로 발생하는 이벤트를 다룰 때 사용됩니다.
- 예를 들어, 사용자가 스크롤할 때 스크롤 이벤트가 매 100밀리초마다 한 번씩만 처리되도록 쓰로틀링을 사용할 수 있습니다.

```javascript
function throttle(fn, delay) {
  let lastCalled = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCalled >= delay) {
      fn(...args);
      lastCalled = now;
    }
  };
}

// 사용 예시
const throttledFn = throttle(() => {
  // 여기에 실행하고자 하는 작업을 넣습니다.
}, 1000);

window.addEventListener("scroll", throttledFn);
```

위 코드에서 `throttle` 함수는 주어진 시간(`delay` 매개변수)마다 함수를 호출하도록 합니다.

2. 디바운싱(Debouncing):

디바운싱은 이벤트 발생 후 일정 시간 동안 다른 이벤트가 발생하지 않을 때만 이벤트 핸들러를 실행하는 것입니다. 주로 검색어 입력과 같이 사용자의 연속 입력에 대한 처리에 유용합니다. 예를 들어, 사용자가 검색어를 입력할 때 디바운싱을 적용하면, 사용자가 연속으로 입력하더라도 검색 요청은 입력이 멈춘 뒤에 한 번만 전송됩니다.

- 디바운싱은 이벤트(예: 검색 필드 입력)가 발생할 때, 이벤트의 연속적인 발생을 하나로 묶어서 처리하는 것입니다.
- 디바운싱은 이벤트가 발생한 후 일정 시간 동안 다른 이벤트가 없을 때 이벤트 핸들러를 실행합니다.
- 이렇게 하면 연속적으로 발생하는 이벤트 중 마지막 이벤트만 처리됩니다.
- 주로 검색 입력 필드나 자동완성 검색과 같이 사용자가 입력을 마치고 조금 기다린 후에 처리를 시작하고자 할 때 사용됩니다.
- 예를 들어, 사용자가 검색 필드에 글자를 입력할 때, 입력이 멈추고 500밀리초가 지난 후에 검색 결과를 가져오도록 디바운싱을 사용할 수 있습니다.

```javascript
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

// 사용 예시
const debouncedFn = debounce(() => {
  // 여기에 실행하고자 하는 작업을 넣습니다.
}, 500);

inputElement.addEventListener("input", debouncedFn);
```

위 코드에서 `debounce` 함수는 일정 시간(`delay` 매개변수)동안 입력을 받지 않으면 함수를 호출합니다.

쓰로틀링과 디바운싱은 사용자 경험을 향상시키고 불필요한 리소스 사용을 방지하기 위해 유용한 기술입니다. 어떤 상황에서 사용할지는 상황과 요구사항에 따라 다릅니다.

### 제어 컴포넌트 사용

제어 컴포넌트(Controlled Component)를 사용하는 예시를 다음과 같이 설명하겠습니다:

1. 유효성 검사:

가장 일반적인 제어 컴포넌트의 사용 예시는 폼 유효성 검사입니다. 사용자가 입력한 내용을 실시간으로 검사하고, 올바르지 않은 입력을 표시하는 경우입니다. 예를 들어, 사용자가 이메일 주소를 입력할 때, 이메일 형식이 올바른지를 실시간으로 검사하고, 올바르지 않은 형식일 경우 오류 메시지를 표시할 수 있습니다.

```jsx
import React, { useState } from 'react';

function EmailInput() {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // 이메일 유효성 검사 로직
    const isValidEmail = /* ... */;
    setIsValid(isValidEmail);
  };

  return (
    <div>
      <label>Email 주소:</label>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        className={isValid ? '' : 'error'}
      />
      {!isValid && <p className="error">올바른 이메일 주소를 입력하세요.</p>}
    </div>
  );
}

export default EmailInput;
```

2. 실시간으로 필드를 검사해야 하는 경우:

제어 컴포넌트를 사용하여 사용자의 입력을 실시간으로 검사해야 하는 경우도 있습니다. 예를 들어, 비밀번호 확인 필드를 입력할 때, 사용자가 입력한 비밀번호와 일치하는지를 실시간으로 확인하고 일치하지 않을 경우 메시지를 표시할 수 있습니다.

3. 조건에 따른 버튼의 활성화 여부가 바뀌는 경우:

또 다른 예시는 입력 필드에 내용이 입력되었는지 여부에 따라 버튼의 활성화 여부를 제어하는 경우입니다. 예를 들어, 사용자가 어떤 내용을 입력할 때마다 입력 여부를 검사하고, 모든 필수 정보가 입력되었을 때 버튼을 활성화시킬 수 있습니다.

```jsx
import React, { useState } from "react";

function FormExample() {
  const [inputValue, setInputValue] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // 입력값에 따라 버튼 활성화 여부 설정
    setIsButtonEnabled(value.length > 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 폼 제출 논리 구현
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button type="submit" disabled={!isButtonEnabled}>
        제출
      </button>
    </form>
  );
}

export default FormExample;
```

위 예시에서는 입력 필드에 내용이 입력되면 버튼이 활성화되고, 모든 필수 정보가 입력되지 않으면 버튼이 비활성화됩니다. 이것은 제어 컴포넌트를 사용하여 실시간으로 상태를 업데이트하여 버튼의 활성화 여부를 제어하는 예시입니다.

## 비제어 컴포넌트(Uncontrolled Component)

<img src="https://cdn-images-1.medium.com/max/800/1*8BLAPAaBxe9IF3uCUK0lmA.png" />

비제어 컴포넌트는 기존의 바닐라 자바스크립트와 유사한 방식으로 동작합니다. 바닐라 자바스크립트를 사용할 때, 폼을 제출할 때 제출 타입의 버튼을 클릭하고, 이 시점에 내부의 값을 검사하는 것과 유사합니다. 비제어 컴포넌트 역시 이와 유사한 방식으로 동작합니다.

비제어 컴포넌트는 `useState` 훅을 사용하지 않고 대신 `ref` 훅을 활용하여 값을 가져옵니다.

```javascript
// Before
function App() {
  function onSubmit() {
    console.log("Email value: " + window.email.value);
    console.log("Password value: " + window.password.value);
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="email" name="email" id="email" required />
      <input type="password" name="password" id="password" required />
      <input type="submit" value="Submit" />
    </form>
  );
}

// After
import React, { useRef } from "react";

function App() {
  const emailRef = useRef();
  const passwordRef = useRef();

  function onSubmit() {
    console.log("Email value: " + emailRef.current.value);
    console.log("Password value: " + passwordRef.current.value);
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="name" ref={nameRef} required />
      <input type="email" name="email" ref={emailRef} required />
      <input type="submit" value="Submit" />
    </form>
  );
}
```

이 두 코드 부분은 React 컴포넌트에서 폼 입력을 다루는 방식에 대한 차이를 보여주며, `window.email`은 이 코드에서 어떻게 동작하는지를 설명합니다.

Before 코드:

1. Before 코드는 React를 사용하지 않는 일반 JavaScript 코드입니다. React 컴포넌트가 아닙니다.
2. `onSubmit` 함수에서 `window.email.value`와 `window.password.value`를 사용하여 폼 입력 필드의 값을 가져옵니다. 이는 전역 `window` 객체에서 직접 DOM 엘리먼트를 찾아서 값을 얻는 방식입니다.

After 코드:

1. After 코드는 React 컴포넌트입니다. React의 `useRef` 훅을 사용하여 DOM 엘리먼트에 참조를 생성합니다.
2. `onSubmit` 함수 내에서 `emailRef`와 `passwordRef`를 사용하여 폼 입력 필드의 값을 가져옵니다. 이것은 React에서 DOM 엘리먼트에 접근하는 방식으로, React가 관리하는 방식입니다.

차이점:

- Before 코드는 React를 사용하지 않으며, React의 가상 DOM 및 컴포넌트 라이프사이클을 활용하지 않습니다. 이 코드는 React의 이점을 활용하지 않습니다.
- After 코드는 React 컴포넌트를 사용하므로 React의 장점을 활용할 수 있습니다. React의 `useRef`를 통해 DOM 엘리먼트를 참조하고, 이를 통해 React가 DOM 조작을 관리하고 업데이트를 처리할 수 있습니다.

`window.email`은 Before 코드에서 사용되며, 이 코드에서는 전역 `window` 객체를 통해 `email`이라는 아이디(ID)를 가진 DOM 엘리먼트를 찾아 해당 엘리먼트의 `value` 속성을 읽어옵니다. 이는 React의 원리와는 상관없는 일반적인 JavaScript 접근 방식입니다.

After 코드에서는 React 컴포넌트가 사용되며, `useRef`를 사용하여 `emailRef`와 `passwordRef`라는 React 참조가 생성됩니다. 이 참조를 통해 React가 DOM 엘리먼트를 관리하고 값을 읽거나 설정할 수 있습니다. 이 방식은 React의 컴포넌트 기반 접근 방식에 따르며, React가 상태 관리 및 업데이트를 수행하는데 도움을 줍니다.

---

`emailRef.current.value`와 `window.email.value`는 동일한 DOM 엘리먼트의 값을 나타내며, 두 가지 표기법의 주요 차이는 범위(scope)와 동작 방식입니다.

1. `emailRef.current.value`:

   - `emailRef`는 React 컴포넌트 내부에서 생성된 참조(reference)입니다. 즉, 해당 참조는 컴포넌트의 스코프(scope) 내에서만 유효합니다.
   - `emailRef.current`를 통해 현재 참조하고 있는 DOM 엘리먼트에 접근할 수 있으며, `.value`를 통해 그 엘리먼트의 값에 접근합니다.
   - React 컴포넌트의 지역 스코프에 속하므로 해당 컴포넌트 내에서만 사용 가능합니다.

2. `window.email.value`:
   - `window` 객체는 전역 스코프(global scope)에서 사용되며, 브라우저의 전역 범위에 속합니다.
   - `window.email`은 `id`가 "email"인 DOM 엘리먼트를 가리키며, `.value`를 통해 그 엘리먼트의 값에 접근합니다.
   - 전역 스코프에 속하므로 어느 곳에서나 접근할 수 있습니다.

두 표기법은 실제로 동일한 값을 가리키지만 범위(scope)와 스코프(scope)에 따라 사용 방식이 다릅니다. React 컴포넌트에서는 컴포넌트 내부에서 상태 관리와 DOM 조작을 추천하므로 `emailRef.current.value`와 같이 React 스타일을 사용하는 것이 일반적입니다. 이렇게 하면 React가 컴포넌트 렌더링 및 업데이트를 효율적으로 관리할 수 있습니다.

---

비제어 컴포넌트는 값이 실시간으로 동기화되지 않습니다. 예를 들어, 컴포넌트 A와 B가 있을 때, A의 변화가 발생하면 즉각적으로 B에 영향을 미치게 하려면 비제어 컴포넌트를 사용하는 것은 적절하지 않습니다.

반면에 제어 컴포넌트는 사용자가 입력을 할 때마다 리렌더링을 발생시킵니다. 이와 달리, 비제어 컴포넌트는 사용자가 직접 트리거하기 전까지 리렌더링을 발생시키지 않으며 값을 동기화하지 않습니다.

`useRef()`를 사용하는 이유와 왜 `useRef`가 리렌더링을 발생시키지 않는지에 대한 설명은 다음과 같습니다:

1. 참조 목적: `useRef`는 주로 DOM 요소나 다른 컴포넌트의 인스턴스를 참조하기 위한 목적으로 사용됩니다. 이는 리액트의 렌더링과 관련이 없는 데이터를 저장하고 전달하기 위한 것입니다.

2. 렌더링과 무관한 데이터: `useRef`는 리액트의 컴포넌트 렌더링과 무관하게 데이터를 저장하고, 변경사항을 감지하지 않습니다. 이는 주로 컴포넌트의 렌더링 결과에 영향을 주지 않고 컴포넌트 내부에서 데이터를 유지하려는 경우에 유용합니다.

3. 성능 최적화: `useRef`를 사용하면 리렌더링을 발생시키지 않기 때문에, 렌더링 성능을 최적화할 때 유용합니다. 컴포넌트의 렌더링이 불필요하게 반복되는 것을 방지하고, 리렌더링이 필요한 경우에만 컴포넌트를 업데이트할 수 있습니다.

4. 값의 변경 감지 X: `useRef`로 참조된 객체의 값이 변경되어도 리렌더링을 발생시키지 않습니다. 이는 참조 객체의 동일성(identity)을 유지하기 때문입니다. 따라서 `useRef`로 참조한 객체의 값이 변경되더라도 리액트는 해당 컴포넌트를 리렌더링하지 않습니다.

요약하면, `useRef`는 주로 렌더링과 관련 없는 데이터를 저장하고 컴포넌트의 성능을 최적화하기 위한 목적으로 사용됩니다. 값의 변경을 감지하지 않고, 참조 객체의 동일성을 유지하기 때문에 리렌더링을 발생시키지 않습니다.

### 비제어 컴포넌트 사용

React에서 비제어 컴포넌트를 사용하는 장점:

React의 장점 중 하나는 다양한 기능을 제공한다는 점입니다. React는 주로 뷰(View) 라이브러리에 가깝습니다. 그래서 React는 비제어 컴포넌트를 사용하는 뷰(View) 접근 방식과 제어 컴포넌트를 사용하는 모델-뷰 접근 방식을 모두 제공하는 것으로, 이러한 이유로 React는 가장 인기 있는 프론트엔드 라이브러리 중 하나입니다. React의 특징 중 하나는 DOM API로부터 더 높은 수준의 추상화를 제공한다는 것입니다. 어떤 접근 방식을 어디에 적용할지는 사용 사례에 따라 다릅니다.

그렇다면 왜 React 프레임워크에서 비제어 컴포넌트를 제공할까요?

개발자가 React와 다른 라이브러리를 통합할 수 있도록 돕기 위해서입니다. 비제어 컴포넌트를 사용하면 React는 가장 기본적인 웹 API에 액세스할 수 있어서 무엇이든 개발할 수 있게 됩니다.

### 제어 컴포넌트 vs 비제어 컴포넌트 (Image)

제어 컴포넌트(Controlled Component)

<img src="https://cdn-images-1.medium.com/max/800/0*d1FQqQJAP5aOVQcM.gif" />

비제어 컴포넌트 (Uncontrolled Component)

<img src="https://cdn-images-1.medium.com/max/800/0*VTG_9XMRYPybZHUj.gif" />

제어 컴포넌트와 비제어 컴포넌트는 웹 애플리케이션 또는 소프트웨어 개발에서 사용되는 UI(사용자 인터페이스) 요소를 설명하는 데 사용되는 개념입니다. 이 두 가지 컴포넌트 유형은 사용자 입력 처리와 관련이 있으며 동작 방식에 차이가 있습니다.

1. 제어 컴포넌트(Controlled Component):

   - 제어 컴포넌트는 React 또는 기타 프론트엔드 라이브러리/프레임워크에서 주로 사용됩니다.
   - 값의 상태를 컴포넌트의 상태(state)로 관리합니다. 즉, 컴포넌트의 상태(state)가 해당 값을 유지하고 업데이트합니다.
   - 새로운 값이 입력되거나 변경될 때마다 컴포넌트의 상태가 업데이트되므로 UI와 데이터가 항상 동기화됩니다.
   - 주로 제어 컴포넌트는 "onChange" 또는 "onInput"과 같은 이벤트 핸들러를 사용하여 값을 업데이트하고 반응적으로 UI를 갱신합니다.

2. 비제어 컴포넌트(Uncontrolled Component):
   - 비제어 컴포넌트는 주로 순수한 HTML 폼 요소에서 사용됩니다.
   - 값의 상태를 컴포넌트의 상태(state)로 관리하지 않고, 사용자 입력에 의해서만 값이 변경됩니다.
   - 값을 업데이트하거나 변경사항을 확인하기 위해서는 트리거(예: 전송 버튼 클릭)가 필요합니다.
   - 주로 ref나 DOM API를 사용하여 값을 가져오거나 변경합니다. React에서는 useRef hook 또는 DOM 요소를 직접 조작하는 것과 관련이 있을 수 있습니다.

비제어 컴포넌트는 제어 컴포넌트에 비해 덜 예측 가능하고 상태 관리가 어려울 수 있지만, 특정 상황에서는 유용할 수 있습니다. 예를 들어, 외부 라이브러리와 통합할 때나 빠른 프로토타이핑 시에는 비제어 컴포넌트가 편리할 수 있습니다. 반면에, 제어 컴포넌트는 복잡한 상태 관리와 데이터 동기화에 더 적합하며 React와 같은 라이브러리/프레임워크에서 일반적으로 권장됩니다.

### 요약

<img src="https://cdn-images-1.medium.com/max/800/1*NYn75ej5BGlfePt9WfwSMQ.png" />

- 실시간으로 값을 업데이트하고 즉각적인 피드백이 필요한 경우, 제어 컴포넌트를 사용하세요.
- 즉각적인 피드백이 필요하지 않고 사용자가 입력을 완료하고 제출할 때만 값이 필요하며, 렌더링 및 값 동기화를 최소화하려는 경우, 비제어 컴포넌트를 사용하세요.

| Controlled Component (제어 컴포넌트)                             | Uncontrolled Component (무제어 컴포넌트)                                           |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| 부모 컴포넌트가 폼 데이터를 관리합니다.                          | DOM 자체가 데이터를 관리합니다.                                                    |
| 내부 상태를 유지하지 않습니다.                                   | 내부 상태를 유지합니다.                                                            |
| 유효성 검사(Validation)를 수행할 수 있습니다.                    | 유효성 검사를 수행하기 어렵습니다.                                                 |
| 현재 값은 프롭스(Props)의 형태로 저장됩니다.                     | 현재 값을 React ref를 사용하여 저장합니다.                                         |
| 폼 데이터에 대한 더 나은 제어를 제공합니다.                      | 폼 데이터에 대한 제어가 제한적입니다.                                              |
| 컴포넌트가 모든 단계에서 폼 데이터를 처리하므로 예측 가능합니다. | 예측하기 어려우며, 컴포넌트 라이프사이클 동안 외부 요소의 영향을 받을 수 있습니다. |

## React-Hook-Form

`react-hook-form`은 React 애플리케이션에서 폼 관련 로직을 관리하기 위한 JavaScript 라이브러리입니다. 이 라이브러리는 React Hooks를 기반으로 하며, 폼을 빠르고 간단하게 만들고 제어하기 위한 많은 기능을 제공합니다.

`react-hook-form`을 사용하면 다음과 같은 주요 기능을 활용할 수 있습니다:

1. 간단한 API: `useForm` Hook을 사용하여 간단한 방식으로 폼 상태를 초기화하고 관리할 수 있습니다.

2. 빠른 렌더링: `react-hook-form`은 최소한의 리렌더링을 보장하므로 성능이 향상됩니다.

3. 입력 유효성 검사: 다양한 유효성 검사 규칙을 정의하고 검사할 수 있습니다. 예를 들어 필수 입력 필드, 패턴 일치, 길이 검사 등을 쉽게 구현할 수 있습니다.

4. 폼 상태 관리: 입력 필드의 값, 에러 메시지, 터치 상태 등을 관리하고 이에 따른 렌더링을 처리합니다.

5. 커스텀 훅 생성: 필요에 따라 커스텀 훅을 작성하여 재사용 가능한 폼 로직을 추상화하고 단순화할 수 있습니다.

6. 서버 제출 처리: 폼을 제출할 때 HTTP 요청을 보내고, 서버로부터의 응답을 처리하는 기능을 지원합니다.

`react-hook-form`은 React 애플리케이션에서 폼 관련 로직을 관리하고 더 나은 사용자 경험을 제공하는데 도움을 주는 강력한 도구 중 하나입니다. 이 라이브러리를 사용하면 코드를 더 간결하게 유지하고 유지 보수를 쉽게 할 수 있으며, 폼 구현을 단순화할 수 있습니다.
