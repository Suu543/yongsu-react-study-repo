# 10. Styling Components

1. Vanilla CSS
2. CSS Modules
3. CSS-in-JS
4. Inline Styles
5. Popular UI Libraries
6. Adding Icons

`create-react-app`과 `vite` 두 가지 선택지가 존재합니다.
`vite`가 비교적 작은 번들 사이즈를 제공하기 때문에, `vite`를 사용해 프로젝트를 구성해보겠습니다.

```cmd
npm create vite@latest
? Project name: react-app
? Select a framework: React
? Select a variant: TypeScript

cd react-app
npm install
npm run dev
```

## 1. Vanilla CSS

특징:

- CSS 스타일은 React 컴포넌트 파일 내부에 작성됩니다.
- CSS 스타일은 일반적인 CSS와 동일한 방식으로 작성됩니다.
- 스타일 이름을 직접 작성하므로, 클래스 이름이나 ID 이름에 대한 일관성을 유지하기 쉽습니다.

장점:

- 간단하고 직관적인 방식으로 스타일링할 수 있습니다.
- 스타일링 코드가 컴포넌트와 함께 유지보수하기 쉽습니다.
- 컴포넌트의 스타일링에 대한 독립성을 유지할 수 있습니다.

단점:

- 스타일링 코드가 컴포넌트와 함께 유지보수하기 쉽다는 것이 장점이기도 하지만, 큰 규모의 프로젝트에서는 파일 관리가 어려울 수 있습니다.
- 클래스 이름이나 ID 이름에 대한 일관성을 유지하려면 개발자들 간의 약속이 필요합니다.
- 스타일링 코드가 컴포넌트와 함께 있으므로, 스타일링 코드의 재사용성이 떨어질 수 있습니다.

따라서, Vanilla CSS 방식은 작은 규모의 프로젝트나 프로토타입 개발 등에서 유용하게 사용될 수 있지만, 모든 스타일을 처음부터 일일이 작성하는 데 많은 시간이 소요되기 때문에
큰 규모의 프로젝트에서는 CSS 모듈, CSS Frameworks, 혹은 CSS-in-JS와 같은 방식을 사용하는 것이 좋습니다.

```css
/* src/components/ListGroup/ListGroup.css */
.list-group {
  list-style: none;
}
```

```typescript
// src/components/ListGroup/ListGroup.tsx
import "./ListGroup.css";

function ListGroup() {}

export default ListGroup;
```

```typescript
// src/components/ListGroup/index.ts
import ListGroup from "./ListGroup";

export default ListGroup;
```

```typescript
// src/App.tsx

import ListGroup from "./components/ListGroup/ListGroup
```

## 2. CSS Modules

src/App.css`파일에`ListGroup.css`에 정의된 클래스와 같은 이름이 존재한다면 충돌이 발생할 수 있습니다.
`CSS Modules`는 이 문제를 해결할 수 있습니다.

```typescript
// Rename: ListGroup.css => ListGroup.module.css
// src/components/ListGroup/ListGroup.tsx
import styles from "./ListGroup.module.css";

<ul className={styles["list-group"]}></ul>;

// 위와 같은 클래스이름은 가독성에 문제를 주기 때문에, CSS를 Camel Case로 작성해 가독성 문제를 해결할 수 있습니다.
<ul className={styles.listGroup}></ul>;

// 만약 두 개 이상의 CSS 클래스를 할당하고 싶은 경우
<ul className={[styles.listGroup, styles.container].join(" ")}></ul>;
```

특징:

- CSS 스타일은 각각의 컴포넌트 파일과 함께 존재합니다.
- 클래스 이름은 무작위로 생성되며, 파일명.클래스명.해시코드와 같은 형식으로 지정됩니다.
- 클래스 이름이 자동으로 생성되므로, 스타일링 코드의 중복과 충돌을 방지할 수 있습니다.
- 클래스 이름을 사용하여 스타일링 코드를 참조합니다.

장점:

- 클래스 이름이 자동으로 생성되므로, 중복과 충돌을 방지할 수 있습니다.
- 컴포넌트 내부의 스타일링 코드에 대한 독립성을 유지할 수 있습니다.
- 컴포넌트 파일과 함께 CSS 스타일 파일이 존재하므로, 코드 관리가 용이합니다.

단점:

- 클래스 이름이 자동으로 생성되므로, 클래스 이름에 대한 일관성을 유지하기 어려울 수 있습니다.
- 클래스 이름을 사용하여 스타일링 코드를 참조하기 때문에, 다른 CSS 스타일링 방식보다는 러닝 커브가 존재합니다.

따라서, CSS Module 방식은 중소 규모의 프로젝트에서 유용하게 사용될 수 있으며, CSS 스타일링 코드의 관리와 유지보수 측면에서 이점이 있습니다. 그러나, 큰 규모의 프로젝트에서는 CSS-in-JS와 같은 방식을 사용하는 것이 좋을 수 있습니다.

## 3. CSS-in-JS

이 방법은 개발자들 사이에서 의견이 분분한 방식입니다.

Keywords:

- Scoped styles
- All the CSS & JS/TS code in one place
- Easier to delete a component
- Easier to style based on props/state

Libraries:

- Styled Components (Recommended)
- Emotion
- Polished

특징:

- CSS 스타일은 JavaScript 파일 내부에 작성됩니다.
- JavaScript 코드를 사용하여 스타일링 코드를 작성하므로, 다양한 동적 스타일링이 가능합니다.
- 스타일 객체를 생성하고, 이를 컴포넌트에 전달하여 스타일을 적용합니다.
- 스타일링 코드는 컴포넌트와 함께 작성되며, 모듈화 및 재사용성이 높습니다.

장점:

- JavaScript 코드를 사용하여 스타일링을 작성하므로, 동적 스타일링이 용이합니다.
- 컴포넌트 파일과 함께 스타일링 코드가 작성되므로, 코드 관리가 용이합니다.
- 스타일 객체를 사용하므로, 스타일링 코드의 재사용성이 높습니다.

단점:

- CSS-in-JS 방식은 독자적인 문법을 사용하기 때문에, 다른 스타일링 방식과 비교했을 때 러닝 커브가 큽니다.
- JavaScript 코드를 사용하여 스타일링을 작성하기 때문에, 브라우저에서 스타일링을 해석하는 시간이 늘어날 수 있습니다.
- 컴포넌트 파일과 함께 작성되는 스타일링 코드는 코드량이 많아질 수 있습니다.

따라서, CSS-in-JS 방식은 동적 스타일링이 필요한 경우에 유용하게 사용될 수 있으며, 모듈화 및 재사용성 측면에서 이점이 있습니다. 그러나, 다른 스타일링 방식보다는 러닝 커브가 크고, 브라우저에서 스타일링을 해석하는 시간이 늘어날 수 있으므로, 프로젝트의 크기와 상황에 맞게 선택하여 사용하는 것이 좋습니다.

`Styled Components` 사용해서 `CSS-in-JS`를 학습해보겠습니다.

```bash
npm install styled-components
npm install @types/styled-components
```

```typescript
// src/components/ListGroup/ListGroup.tsx
import styled from "styled-components";

// React Component를 리턴합니다.
const List = styled.ul`
  list-style: none;
  padding: 0;
`;

interface ListItemProps {
  active: boolean;
}

const ListItem = styled.li<ListItemProps>`
  padding: 5px 0;
  background: ${(props) => (props.active ? "blue" : "none")};
`;

// props && state

function ListGroup() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <List>
      <ListItem active={index === selectedIndex}>Value</ListItem>
    </List>
  );
}
```

## 4. Inline Styles

코드 가독성을 떨어트리고, 유지보수가 힘들기 때문에 사용을 추천하지 않습니다.

```typescript
<ul className={{ backgroundColor: "yellow" }}></ul>
```

## 5. Popular UI Libraries

- Bootstrap
- Material UI
- Tailwind CSS: Utility First CSS Library

UI Libraries는 사용자 인터페이스(UI)를 개발하는 데 도움이 되는 라이브러리 혹은 프레임워크입니다. 주로 웹 개발에서 사용되며, UI 컴포넌트들을 제공하고, 이를 빠르게 구현하고 스타일링할 수 있도록 도와줍니다. 이러한 UI Libraries를 사용하면 개발자는 기능 구현에 집중할 수 있으며, 코드의 재사용성과 일관성을 높일 수 있습니다.

React, Vue.js, Angular와 같은 프론트엔드 프레임워크는 모두 UI Libraries의 개념을 포함합니다. 이러한 프레임워크는 사용자 인터페이스 개발을 더 쉽고 효율적으로 만들어주며, 일관된 코드를 작성할 수 있도록 도와줍니다.

그 외에도 다양한 UI Libraries들이 존재합니다. 예를 들어, Bootstrap은 HTML, CSS, JavaScript로 구성된 프론트엔드 UI 라이브러리로, 다양한 디자인 요소들을 제공합니다. Material-UI는 React 기반의 UI 라이브러리로, Google의 Material Design을 기반으로 디자인 된 컴포넌트들을 제공합니다. Tailwind CSS는 CSS 라이브러리로, CSS를 더 쉽게 작성할 수 있도록 클래스 기반의 스타일링을 제공합니다.

이러한 UI Libraries들은 개발자들이 디자인과 구현에 더욱 집중할 수 있도록 도와주는 중요한 도구입니다.

## 6. Adding Icons

- https://react-icons.github.io/react-icons/

```bash
npm install react-icons
```

```typescript
import { BsFillCalendarFill } from "react-icons/bs";

function App() {
  return (
    <div>
      <BsFillCalendarFill color="red" size="40" />
    </div>
  );
}
```

## Separation of Concerns

Divide a program into distinct sections where each section handles a specific functionality, rather than having everything in one place.

- Modular
- Easier to understand
- Easier to maintain
- Easier to modify

Separation of Concerns(책임의 분리)은 소프트웨어 개발에서 중요한 개념 중 하나로, 서로 다른 기능과 관심사를 가진 코드를 분리하여 유지 보수성을 높이고 코드의 가독성을 향상시키는 방법론입니다.

예를 들어, 웹 애플리케이션을 개발하는 경우, HTML, CSS, JavaScript와 같은 다양한 기술들을 사용하여 프론트엔드 개발을 합니다. 이 때, Separation of Concerns를 적용한다면, HTML은 문서 구조를 작성하는데에 집중하고, CSS는 디자인을 담당하며, JavaScript는 동적인 기능을 구현하는데에 집중합니다. 이렇게 각각의 코드들이 서로 다른 책임을 가지고 동작함으로써, 코드의 가독성과 유지 보수성을 높일 수 있습니다.

또 다른 예시로, 백엔드 개발에서 Separation of Concerns를 적용한다면, 데이터베이스 접근 코드와 비즈니스 로직 코드를 분리하여 작성할 수 있습니다. 이를 통해, 데이터베이스 접근 코드와 비즈니스 로직 코드가 서로 혼재되지 않도록 하여 코드의 가독성을 높이고, 유지 보수성을 향상시킬 수 있습니다.

최종적으로, Separation of Concerns는 프로그램의 모듈화를 촉진하며, 코드의 재사용성을 높이고, 유지 보수성을 향상시키는 중요한 방법론입니다.

## Understanding the State Hook

1. React updates state asynchronously.

- 성능 관점에서 재랜더링을 방지하기 위해서

리엑트가 비동기로 상태값을 업데이트 이유는 다음과 같습니다.
아래 작성된 `handleClick` 이벤트 핸들러 함수를 보면 내부에 `isVisible` 상태값을 갱신하는 코드 이후에 값을 출력하면 업데이트 된 값이 아닌, 이전 값이 적용된 것을 확인할 수 있습니다.
그 이유는 다음과 같습니다. `set[상태값]` 관련된 함수가 호출되면 재런더링이 발생하게 됩니다. 만약 `handleClick` 이벤트 핸들러 함수 내부에 수십개의 `set[상태값]` 관련된 함수가 호출되면 불필요한 렌더링과 예상치 못한 오류가 발생할 수 있습니다. 이렇게 비용이 큰 동작을 방지하고자, `This Point+`라고 주석을 달아놓은 지점에 벗어났을 때 한 번에 상태값 갱신이 순차적으로 발생해 재랜더링 횟수를 최소화 하는 방식으로 동작합니다.

```typescript
function App() {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(true);
    // setName("su");
    console.log(isVisible);
  }; // --> This Point+

  return (
    <div>
      <button onClick={handleClick}>Show</button>
    </div>
  );
}
```

2. State is stored outside of components.

- 지역 스코프에 정의되어 업데이트 한 내용이 사라지는 걸 방지하기위함

`JS`에서 함수안에 정의된 변수는 `지역 스코프(Local Scope)`으로써, 함수 실행이 끝나는 시점에 메모리에서 제거됩니다. 그렇기 때문에 다음 코드의 `handleClick` 이벤트 핸들러 함수 내부의 `count++`를 한 내용은, `App` 컴포넌트가 재렌더링되는 시점에 `count` 값은 0으로 초기화됩니다. 결과적으로 `handleClick` 함수 내부에서 실행된 `count` 값 업데이트는 반영되지 않게됩니다. `useState Hook` 함수는 컴포넌트함수 내부가 아닌 외부에 값을 저장해 업데이트하는 방식으로 동작하기 때문에 이 문제를 해결할 수 있습니다.

```typescript
function App() {
  const [isVisible, setIsVisible] = useState(false);
  let count = 0;

  const handleClick = () => {
    setIsVisible(true);
    count++;
    console.log(isVisible);
  }; // --> This Point+

  return (
    <div>
      <button onClick={handleClick}>Show</button>
    </div>
  );
}
```

3. Use hooks at the top level of your component

- `useState`가 내부적으로 배열에 정의한 순서대로 담는 방식이기 때문에, 이러한 방식에 예상치 못한 경우의 수를 방지하기 위함

겉보기에는 `React`가 `isVisible and isApproved` 이름을 인식하는 것 같아 보이지만, `React`는 다음 `key`값으로 다음 내용을 인식하는대신, `useState` 함수를 사용한 순서대로 배열에 담는 방식으로 동작합니다. 아래 코드를 예시로 들면 `[false, true]` 형태로 순서에 맞춰 상태값을 저장합니다. 그렇기 때문에 `useState` 함수를 `for, if, nested function`등에 정의하게 된다면, 순서가 예상하지 못한 방식으로 구성될 수 있습니다. 이러한 문제를 방지하고자 `useState` 함수를 통해 상태값을 정의할 때는 항상 컴포넌트의 최상단, 쉽게 말해서 컴포넌트의 Global Scope 위치에 정의해야합니다.

```typescript
function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [isApproved, setIsApproved] = useState(true);

  const handleClick = () => {
    setIsVisible(true);
    console.log(isVisible);
  }; // --> This Point+

  return (
    <div>
      <button onClick={handleClick}>Show</button>
    </div>
  );
}
```

## Choosing the State Structure

1. 기존의 `state` 값으로 충분히 구현할 수 있는 내용을, 별도의 변수를 통해 구현하는 것을 피하는 것이 좋습니다.

- Avoid redundant state variables

```typescript
import { useState } from "react";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const fullName = firstName + " " + lastName;

  return <div>{fullName}</div>;
}

export default App;
```

2. 관련성있는 `state`는 객체를 통해 하나로 묶어주는 것이 좋습니다.

- Group related variables inside an object
- Avoide deeply nested structures
- Prefer to use a flat structure
- 주의 할 점은 객체의 깊이가 3 ~ 4개 이상으로 깊어지면 코드 관리가 힘들기 때문에, 가능한 1 ~ 2개 사이로 설정하는 것이 좋습니다.

```typescript
import { useState } from "react";

function App() {
  const [person, setPerson] = useState({
    firstName: "",
    lastName: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  return <div></div>;
}

export default App;
```

## Keeping Components Pure

Pure Function

- Given the same input, always returns the same result.

리엑트 컴포넌트는 같은 입력값(props, state)이 주어졌을 때 항상 같은 렌더링 결과를 출력해야합니다. <br />
이러한 규칙을 지키지 않는다면 같은 (props, state)가 입력값으로 주어졌을 때, 불필요한 렌더링이 발생하는 등
앱 성능과 메모리 사용의 비효율성이 커지기 때문입니다.

- To keep components pure: keep changes out of the render phase
- same props => skip re-rendering => JSX

```typescript
let count = 0;

const Message = () => {
  count++;
  return <div>Message {count}</div>;
};

export default Message;
```

```typescript
// App.tsx
import Message from "./components/Message";

function App() {
  return (
    <div>
      <Message />
      <Message />
      <Message />
    </div>
  );
}

export default App;
```

위 코드를 실행하면 예상치 못한 결과가 출력됩니다. 그 이유는 컴포넌트 내부에 변수를 정의하는 것이 아닌, 외부에 정의했기 때문에 예상치 못한 결과가 출력됩니다.
이러한 형태의 함수를 보고 `Impure Component`라 칭할 수 있습니다.

위 코드를 `Pure Component`로 바꾸는 방법은 다음과 같습니다. 변경 이후에는 항상 같은 값이 출력되는 것을 확인할 수 있습니다.

```typescript
const Message = () => {
  let count = 0;
  count++;
  return <div>Message {count}</div>;
};

export default Message;
```

## Understanding the Strict Mode

다음 예시의 `Impure Function`을 호출하면, 예상값은 `Message 1, 2 ,3`가 출력되는 것인데, 예상과는 달리 `Message 2, 4, 6`가 출력됩니다. 그 이유는 `Strict Mode`가 활성화되어 있기 때문입니다.

`main.tsx`에 이동해보면 `React.StrictMode` 컴포넌트 자식에 `App` 컴포넌트가 배치된 것을 확인할 수 있습니다. 아래 사진을 보면 `Message` 컴포넌트 당 두번씩 렌더링 되는 것을 확인할 수 있습니다. 그 이유는 첫번째 렌더링은 코드 검토 및 잠재적 문제를 찾는 데 이용하고, 두번째 렌더링은 실제 UI를 업데이트 하는 데 사용됩니다. 이러한 이유로 `Message 1, 3, 5`가 아닌 `Message 2, 4, 6`가 출력되는 것을 이해할 수 있습니다 (두번째 렌더링 되는 내용만 실제 화면에 업데이트됩니다).

<img src="https://cdn-images-1.medium.com/max/800/1*59pAT9pNkqEiwsmpP0YNtA.png" />
<img src="https://cdn-images-1.medium.com/max/800/1*jQglJL9mB9bdRSRga-SaCw.png" />

```typescript
let count = 0;

const Message = () => {
  count++;
  return <div>Message {count}</div>;
};

export default Message;
```

```typescript
// App.tsx
import Message from "./components/Message";

function App() {
  return (
    <div>
      <Message />
      <Message />
      <Message />
    </div>
  );
}

export default App;
```

`Strict Mode`를 더 자세히 확인하고 싶은 경우 다음과 같이 코드를 작성할 수 있습니다. 이와 같은 방식으로 컴포넌트가 `Pure or Impure`인지 판단할 수 있습니다.
하지만 `개발 모드(Development Mode)` 에서는 `Strict Mode`를 활성화 하는 것이 개발에 용이하지만, `상품 모드(Production Mode)`에서는 `Strict Mode`를 제거하고, 한 번에 한번의 렌더링만 발생하도록 코드를 구성해야합니다.

```typescript
let count = 0;

const Message = () => {
  console.log("Message called", count);
  count++;
  return <div>Message {count}</div>;
};

export default Message;
```

```typescript
// App.tsx
import Message from "./components/Message";

function App() {
  return (
    <div>
      <Message />
    </div>
  );
}

export default App;
```

## Updating Objects

`state` 값에 직접적으로 접근해 값을 변경해서는 안됩니다. 모든 `state` 값은 불변성의 특징을 가지고 있기 때문에, 새로운 `state` 값을 설정할 때는 항상 기존의 내용의 값만 복사해 업데이트 한 내용을 전달하는 방식으로 내용을 구성해야합니다.

새로운 객체를 생성하고, 업데이트가 필요한 값만 갱신하고, 나머지는 기존의 `state` 값을 복사해서 사용하는 방식으로 `state` 값을 업데이트해야합니다.
이 과정에 `Spread Operator`를 사용하면 손쉽게 값을 업데이트 할 수 있습니다. 일일이 하나씩 값을 업데이트 하는 경우도 있지만, 프로퍼티 갯수가 10개, 20개 등 많아지면 굉장히 비효율적인 방법으로 동작할 수 있기 때문에, `Spread Operator`를 적극 활용해 효율성과 시간을 아낄 수 있습니다.

```typescript
import { useState } from "react";

function App() {
  const [drink, setDrink] = useState({
    title: "Americano",
    price: 5,
  });

  const handleCheck = () => {
    // 절대 값에 직접적으로 접근해 값을 변경해서는 안됩니다.
    // 모든 state 값은 불변성의 특징을 가지기 때문에,
    // 새로운 state 값을 설정할 때는 항상 기존의 내용의 값만 복사해 업데이트 한 내용을 전달하는 방식으로 내용을 구성해야합니다.

    // drink.price = 6;
    // const newDrink = {
    //   title: drink.title,
    //   price: 6,
    // };

    // 위 방식은 프로퍼티가 1 ~ 2개 정도 있을 때는 괜찮지만, 그 이상인 경우 많은 시간이 소요됩니다.
    // Spread Operator를 사용하면 위 문제를 쉽게 해결할 수 있습니다.
    // const newDrink = {
    //   ...drink,
    //   price: 6,
    // };

    // 바로 setState에 적용할 수 있습니다.
    setDrink({ ...drink, price: 6 });
  };

  return (
    <div>
      {drink.price}
      <button onClick={handleCheck}>Click Me</button>
    </div>
  );
}
```

## Updating Nested Objects

`Spread Operator`는 `Shallow Copy`로 동작하기 때문에, `name` 값과 `address` 객체의 주소만을 복사합니다. 그렇기 때문에 중첩으로 정의된 내용을 복사하지 못하는 문제가 발생합니다. 또한, `state` 값을 업데이트 할 때는 기존의 값을 복사하지만, 주소값을 복사한다는 것은 같은 메모리를 참조하고 있다는 의미이기 때문에 불변성 규칙에 위배됩니다. (Completely independent of the existing state objects)

```typescript
import { useState } from "react";

function App() {
  const [customer, setCustomer] = useState({
    name: "John",
    address: {
      city: "San Francisco",
      zipCode: 94111,
    },
  });

  const handleCheck = () => {
    setCustomer({
      ...customer,
      address: { ...customer.address, zipCode: 94112 },
    });
  };

  return (
    <div>
      <button onClick={handleCheck}>Click Me</button>
    </div>
  );
}

export default App;
```

해결책은 다음과 같습니다. 이렇게 되면 기존의 객체에 완전히 독립적인 객체를 생성해 내용을 업데이트 할 수 있습니다. 이렇게 중첩의 객체를 `state` 값으로 정의하는 경우 고려해야 할 내용이 많고, 빼먹을 수 있는 내용이 많기 때문에, 객체를 `state` 값으로 사용하는 경우 가능한 `Flat(비중첩)` 형태로 사용하는 것을 권장드립니다.

```typescript
import { useState } from "react";

function App() {
  const [customer, setCustomer] = useState({
    name: "John",
    address: {
      city: "San Francisco",
      zipCode: 94111,
    },
  });

  const handleCheck = () => {
    setCustomer({
      ...customer,
      address: { ...customer.address, zipCode: 94112 },
    });
  };

  return (
    <div>
      <button onClick={handleCheck}>Click Me</button>
    </div>
  );
}

export default App;
```

## Updating Arrays

배열 또한 객체와 똑같이 값을 업데이트 할 수 있습니다. 배열은 새로운 배열을 리턴하는 `map, filter, reducer`를 활용하면 이전의 `state`값과 완전히 독립된 새로운 값으로 `state` 값을 업데이트 할 수 있습니다.

```typescript
import { useState } from "react";

function App() {
  const [tags, setTags] = useState(["happy", "cheerful"]);

  const handleCheck = () => {
    // Add
    setTags([...tags]);

    // Remove
    setTags(tags.filter((tag) => tag !== "happy"));

    // Update
    setTags(tags.map((tag) => (tag === "happy" ? "happiness" : tag)));
  };

  return (
    <div>
      <button onClick={handleCheck}>Click Me</button>
    </div>
  );
}

export default App;
```

## Updating Array of Objects

다음 사진과 같이 배열 내의 객체 형식으로 데이터가 구성된 경우, `Map`을 사용해 업데이트가 필요한 부분에 대한 새로운 객체를 생성하는 방식으로 내용을 업데이트 할 수 있습니다. 이 방식을 사용하면 모든 객체의 새로운 버전을 만드는대신 업데이트가 불필요한 객체는 기존 객체의 주소값을 그대로 사용하고, 업데이트가 필요한 객체에 대해서만 업데이트를 함으로써, 메모리를 절약할 수 있습니다.

<img src="https://cdn-images-1.medium.com/max/800/1*r3dUXl5es1BTvrBXWeagxg.png" />

```typescript
import { useState } from "react";

function App() {
  const [bugs, setBugs] = useState([
    { id: 1, title: "Bug1", fixed: false },
    { id: 2, title: "Bug2", fixed: false },
  ]);

  const handleCheck = () => {
    setBugs(bugs.map((bug) => (bug.id === 1 ? { ...bug, fixed: true } : bug)));
  };

  return (
    <div>
      <button onClick={handleCheck}>Click Me</button>
    </div>
  );
}

export default App;
```

## Simplifying Update Logic with Immer

앞서 `State` 값을 객체와 배열로 설정한 경우 업데이트 하는 방법에 대해서 알아봤습니다.
대부분의 방법이 복사본을 만들어 `setState` 함수를 이용해 반영하는 방식으로 구현했습니다.
이 방식은 반복적임과 동시에 여러 코드베이스에 사용하는 경우 코드가 깨끗하지 않은 형태임을 확인할 수 있습니다.
이렇게 객체와 배열 형태의 `State` 업데이트 로직을 이해했다면, `Immer` 모듈을 이용해 손쉽게 업데이트를 구현할 수 있습니다.

`Immer` 모듈의 특징은 `draft`라는 복사 배열을 만들어 원본의 값 변경 여부를 걱정 할 필요없이 작업을 할 수 있다는 장점이 있습니다. 하지만 이 방식이 사람에 따라 불편할 수 있기 때문에 어떤 방법을 선택하든 자유입니다.

```bash
npm install immer
```

```typescript
import { useState } from "react";
import produce from "immer";

interface Bug {
  id: number;
  title: string;
  fixed: boolean;
}

function App() {
  const [bugs, setBugs] = useState([
    { id: 1, title: "Bug1", fixed: false },
    { id: 2, title: "Bug2", fixed: false },
  ]);

  const handleCheck = () => {
    // setBugs(bugs.map((bug) => (bug.id === 1 ? { ...bug, fixed: true } : bug)));
    setBugs(
      produce((draft: Array<Bug>) => {
        const bug = draft.find((bug) => bug.id === 1);
        if (bug) bug.fixed = true;
      })
    );
  };

  return (
    <div>
      {bugs.map((bug) => (
        <p key={bug.id}>
          {bug.title} {bug.fixed ? "Fixed" : "new"}
        </p>
      ))}
      <button onClick={handleCheck}>Click Me</button>
    </div>
  );
}

export default App;
```

## Sharing State Between Components

컴포넌트 간에 `State` 값을 공유해야 할 상황이 존재합니다. 다음 사진과 같이 네비게이션바 컴포넌트와 쇼핑카트 컴포넌트간의 관계가 이 예시가 될 수 있습니다.
사용자가 쇼핑카트에 물품을 담으면 네비게이션바의 쇼핑카트 아이콘의 숫자가 증가하고, 반대의 경우 감소하는 방식으로 동작합니다.

<img src="https://cdn-images-1.medium.com/max/800/1*grBeG-YB6FcoOXljiOthmg.png" />

컴포넌트 간에 `State` 값을 공유하는 상황을 다음 사진을 통해 확인해 보겠습니다.
첫번째 사진과 같이 `Nabvar`와 `Cart` 컴포넌트의 공통 부모인 `App` 컴포넌트에 두 자식 컴포넌트가 공통으로 사용할 수 있는 `State` 값을 정의합니다. 이후 `Props`를 통해 해당 `State` 값을 자식 요소에게 전달하는 방식으로 `State` 값을 공유할 수 있습니다.

<img src="https://cdn-images-1.medium.com/max/800/1*vR3IUP5yE4Y40Qk1tmS2iA.png" />
<img src="https://cdn-images-1.medium.com/max/800/1*jQSw2rxronuRaVQ7oHGbFQ.png" />

위 사진의 상황을 코드로 구현해보겠습니다.

```typescript
// src/components/Cart.tsx
interface Props {
  cartItems: string[];
  onClear: () => void;
}

const Cart = ({ cartItems, onClear }: Props) => {
  return (
    <>
      <div>Cart</div>
      <ul>
        {cartItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button onClick={onClear}>Clear</button>
    </>
  );
};

export default Cart;
```

```typescript
// src/components/Navbar.tsx

interface Props {
  cartItemsCount: number;
}

const Navbar = ({ cartItemsCount }: Props) => {
  return <div>Navbar: {cartItemsCount}</div>;
};

export default Navbar;
```

```typescript
// src/App.tsx
import { useState } from "react";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";

function App() {
  const [cartItems, setCartItems] = useState(["Product1", "Product2"]);

  return (
    <div>
      <Navbar cartItemsCount={cartItems.length} />
      <Cart cartItems={cartItems} onClear={() => setCartItems([])} />
    </div>
  );
}

export default App;
```

### Exercise1

버튼을 생성하고 해당 버튼을 클릭했을 때, 이름을 `Bob`으로 업데이트해주세요.

```typescript
import { useState } from "react";

function App() {
  const [game, setGame] = useState({
    id: 1,
    player: {
      name: "John",
    },
  });

  const handleClick = () => {};

  return <div>{game.player.name}</div>;
}

export default App;
```

#### Exercise1 - Solution

```typescript
import { useState } from "react";

function App() {
  const [game, setGame] = useState({
    id: 1,
    player: {
      name: "John",
    },
  });

  const handleClick = () => {
    setGame({ ...game, player: { ...game.player, name: "Bob" } });
  };

  return (
    <div>
      {game.player.name}
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default App;
```

### Exercise2

버튼을 클릭했을 때, toppings에 cheese를 추가해주세요.

```typescript
import { useState } from "react";

function App() {
  const [pizza, setPizza] = useState({
    name: "Spicy Pepperoni",
    toppings: ["Mushroom"],
  });

  const handleClick = () => {};

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default App;
```

### Solution2

```typescript
import { useState } from "react";

function App() {
  const [pizza, setPizza] = useState({
    name: "Spicy Pepperoni",
    toppings: ["Mushroom"],
  });

  const handleClick = () => {
    setPizza({
      ...pizza,
      toppings: [...pizza.toppings, "cheese"],
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default App;
```

### Exercise3

버튼을 클릭하면 `id: 1` 항목의 `quantity` 값을 1 증가 시켜주세요.

```typescript
import { useState } from "react";

function App() {
  const [cart, setCart] = useState({
    discount: 0.1,
    items: [
      { id: 1, title: "Product 1", quantity: 1 },
      { id: 2, title: "Product 2", quantity: 1 },
    ],
  });

  const handleClick = () => {};

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default App;
```

### Solution3

```typescript
import { useState } from "react";

function App() {
  const [cart, setCart] = useState({
    discount: 0.1,
    items: [
      { id: 1, title: "Product 1", quantity: 1 },
      { id: 2, title: "Product 2", quantity: 1 },
    ],
  });

  const handleClick = () => {
    setCart({
      ...cart,
      items: cart.items.map((item) =>
        item.id === 1 ? { ...item, quantity: item.quantity + 1 } : { ...item }
      ),
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default App;
```

### Exercise4

```typescript
import ExpandableText from "./components/ExpandableText";

function App() {
  return (
    <div>
      <ExpandableText>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
        facilis dolorem sunt quas iure quos amet tenetur maxime tempora
        sapiente. Ab asperiores cupiditate sunt rem debitis enim praesentium
        ipsum dicta.
      </ExpandableText>
    </div>
  );
}

export default App;
```

```typescript
import { useState } from "react";

interface Props {
  children: string;
  maxChars?: number;
}

const ExpandableText = ({ children, maxChars = 100 }: Props) => {
  const [isExpandable, setIsExpandable] = useState(false);

  if (children.length <= maxChars) return <p>{children}</p>;

  const text = isExpandable ? children : children.substring(0, maxChars);

  return (
    <p>
      {text}...
      <button onClick={() => setIsExpandable(!isExpandable)}>
        {isExpandable ? "Less" : "More"}
      </button>
    </p>
  );
};

export default ExpandableText;
```

