# Redux

## Intro

`Redux`: A state management library for JavaScript apps

`Redux`는 장바구니, 로그인 여부 등의 상태를 관리할 때 사용하는 도구입니다. <br />
`Redux`는 다음 사진과 같이 `UI`를 생성하는 `Library or Framework`에 적용이 가능합니다.

<img src="https://camo.githubusercontent.com/a7cdb11b1ef67a12a77526b69b79d5f8cec5a46b99c6bea4e3b7f372a7394a04/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313230302f312a79366a55395f63647058773561556f664462773967512e706e67" />

`Redux`와 같은 `상태 관리 라이브러리(State Management Library`)는 왜 필요할까요?

<img style="display:block; margin: auto;" src="https://cdn-images-1.medium.com/max/800/1*gmnAxFBgpQFIpN0S8VsSCw.png" />

앞서 만들어본 `AWS_Flash_Cards` 프로젝트는 `QuizBar` 혹은 `FlashCard` 컴포넌트에 이벤트 혹은 상태 값에 변화가 생긴경우, 두 컴포넌트의 공통 부모인 `App` 컴포넌트에 그 상황을 전달해 `App` 컴포넌트의 `State and Props`에 갱신을 가한 후, 변경 사항을 두 자식 컴포넌트에 전달하는 방식으로 동작합니다. 이 방식은 2 ~ 3개 정도의 컴포넌트로 구성된 소규모 앱은 컴포넌트 간의 상호작용에 용이하게 사용할 수 있습니다.

<img style="display:block; margin: auto;" src="https://cdn-images-1.medium.com/max/800/1*KJ7Nlcu1L1cCYKySYHzsKQ.png" />

하지만 다음 사진과 같이 앱의 규모가 커지고 복잡해진 상태에서, 왼쪽 밑 두 번째 컴포넌트에 발생한 변화를 오른쪽 밑 세 번째 컴포넌트에 전달해야 하는 경우, 변경 사항을 반영하는데 수십 개의 컴포넌트를 거쳐서 부모 컴포넌트에 반영하는 등 앱 관리 자체가 너무 복잡해서 관리할 수 없는 수준에 도달할 수 있습니다.

`Redux`는 이러한 상황에 앱 관리 복잡도를 기하급수적으로 낮추고, 더욱더 직관적이고 체계적으로 컴포넌트 상태 관리를 할 수 있습니다.

Redux 적용 사항을 요약해 보겠습니다.
<img src="https://camo.githubusercontent.com/c88f56aca2a6c4eb7ec47059a431b9f74be6f583dde1cb244d61a223b8db23d8/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313230302f312a647841434864484474777647384131776e3761672d512e706e67" />

1. UI의 각기 다른 부분의 동기화(Sync)를 맞춰야하는 경우

- 사진에 소개된 앱은 5개의 컴포넌트로 구성되어있습니다. 이 중 하나의 상태가 변경되었을 때, 해당 변경 상태를 다른 컴포넌트에 전달해 갱신해야 하는 상황을 생각해보겠습니다. 모든 부분이 같은 상태 값을 가지도록 구현하기 위해서는 많은 코드를 작성해야 하고, 다음과 같은 수고가 발생함을 예측할 수 있습니다.

  - Where: 어디에서 변경이 발생했는가?
  - How: 어떻게 변경 사항을 반영할 것인가?
  - When: 언제 어느 시점을 기준으로 변화를 반영할 것인가?

- 앱을 제작하는 과정에 위와 같은 질문이 떠오른다면, `Redux`를 사용 할 시점입니다.

## Redux

<img src="https://camo.githubusercontent.com/f78fe6a64eb1093a929c369973cb0a133f1672b932da58aefc1b4cdbc6c7a65f/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313230302f312a2d3257694544796e4238793531396f644258767332672e706e67" />

`Redux`는 `AWS_Flash_Cards`프로젝트에서 사용한 `Prop Drilling (부모 컴포넌트가 자식 컴포넌트에 Props로 데이터를 전달하는 방식)` 대신에, 다음 사진처럼 `중앙 저장소(Central Repository)`에 모든 데이터를 저장해 컴포넌트 간에 데이터를 공유하는 방식으로 동작합니다. 이런 방식을 `Single Source of Truth`라 칭합니다.

컴포넌트가 각자의 `상태(state)`값을 가지는 대신에, `중앙 저장소(Central Repository)`로 부터 데이터에 대한 `CRUD(Create: 생성, Read: 읽기, Update: 갱신, Delete: 삭제)` 요청을 통해 컴포넌트 간의 동기를 맞출 수 있습니다.

결과적으로 다음 사진과 같이 한 곳에서 앱 전체의 상태를 관리하기 때문에, 상태 값에 대한 `how/how/when/where`에 대한 여부를 확실히 파악할 수 있습니다.

<img src="https://camo.githubusercontent.com/d236f007320857d947f4aa1f91577557fece7b54a9f37ae893563e1786e66c35/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313230302f312a424a6a33446458304c6f31516749426e7259514e6c672e706e67" />

**Summary**

- Centralizes application's state
- Makes data flow transparent and predictable

## Functional Programming

Functional Programming:

함수형 프로그래밍은 자료 처리를 수학적 함수의 계산으로 취급하고 상태와 가변 데이터를 멀리하는 프로그래밍 패러다임 중 하나입니다. 입력받은 데이터를 변형하거나 변경하지 않고, 주어진 문제를 가능한 작은 단위로 그리고 재사용 가능한 형태로 분류한다는 특징을 가지고 있습니다.

- 간결하게 코드를 작성할 수 있습니다.
- 쉽게 디버깅과 테스트 코드를 작성할 수 있습니다.
- 코드 확장에 큰 장점을 가지고 있습니다.

### Function as First-Class Citizens (함수는 1등급 시민으로 간주합니다.)

`JavaScript` 언어에서 함수는 1등급 시민으로 간주됩니다.
1등급 시민은 다음과 같은 권한을 가지고 있습니다.

1. 변수에 값처럼 할당할 수 있습니다.
2. 함수의 인자 값으로 값처럼 전달할 수 있습니다.
3. 다른 함수의 리턴 값으로 값처럼 함수를 리턴할 수 있습니다.

---

`Case #1` - 함수를 변수에 할당하는 경우 <br />

`일반 함수(Regular Function)`을 정의하고, 호출하는 것이 아닌, 참조로써 변수에 할당하는 경우입니다 `sayHello` 이름의 함수 정의를 `fn`이라는 변수에 할당함으로써 `sayHello` 함수는 `fn`이라는 이름의 `약어(Alias)`로 호출될 수 있음을 의미합니다.

```javascript
function sayHello() {
  return "Hello World";
}

let fn = sayHello;

fn(); // "Hello World" - An alias for sayHello
sayHello(); // "Hello World"
```

---

`Case #2` - 함수의 인자 값으로 함수를 할당하는 경우 <br />

`일반 함수(Regular Function)`을 정의하고, 함수의 인자 값으로 함수를 받는 경우입니다. `greet` 함수의 인자 값으로 `sayHello` 함수의 참조를 전달하는 경우, `sayHello`를 `fnMessage`라는 이름의 `약어(Alias)`로 호출될 수 있음을 의미합니다.

```javascript
function sayHello() {
  return "Hello World";
}

function greet(fnMessage) {
  console.log(fnMessage());
}

greet(sayHello); // "Hello World"
```

---

`Case #3` - 함수의 리턴 값으로 함수를 리턴하는 경우 <br />

`일반 함수(Regular Function)`을 정의하고, 함수의 리턴 값으로 함수를 리턴하는 경우입니다. 이때 리턴값으로 전달하는 함수에는 이름이 존재하지 않기 때문에 `익명 함수(Anonymous Function)`이라 칭합니다. 이 구조에서는 리턴 값으로 전달된 익명 함수를 `fn` 변수에 할당함으로써, 해당 함수는 `fn`이라는 이름을 가진 함수로 간주합니다. 이후 `fn`함수를 호출했을 때 리턴 값을 `message`라는 변수에 담는 것을 확인할 수 있습니다.

```javascript
function sayBye() {
  return function () {
    return "Hello World";
  };
}

// sayBye 함수를 호출했을 때, 해당 함수는 리턴값으로 함수를 리턴하기 때문에 리턴한 함수를 fn 이름의 변수에 할당합니다.
let fn = sayBye();

// fn이라는 함수명을 가진 함수는 호출하면 "Hello World" 문자열을 리턴하기 때문에, message 변수에는 "Hello World"가 담긴 것을 확인할 수 있습니다.
let message = fn();
```

### Higher-Order Functions

함수의 인자 값 혹은 리턴 값이 함수인 경우 `Higher Order Function`이라 칭합니다.

```javascript
const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

list.map((값, 인덱스, 배열) => 값 * 10);
list.filter((값, 인덱스, 배열) => 값 % 2 === 0);

function paramOuter(inner) {
  return inner();
}

function returnOuter() {
  return function () {
    return "Hello World";
  };
}

setTimeout(() => {
  console.log("Hello World");
}, 1000);
```

### Function Composition

`함수형 프로그래밍(Functional Programming)`은 제시된 문제를 가능한 한 쪼개 하나의 함수가 한 번에 하나의 작업만 처리할 수 있으면서 동시에 재사용 가능형태로 정의해, 이를 병렬적으로 결합하는 방식을 의미합니다.

```javascript
// 1. 다음 코드는 비함수형 스타일의 코드 구조입니다.
let input = "     JavaScript     ";
let output = "<div>" + input.trim() + "</div>";

// 2. 비함수형 스타일 코드 구조를 함수형 코드 구조로 변경해 보겠습니다.
const trim = (str) => str.trim();

// 3. 함수형 스타일로 div 태그로 감싸는 기능을 추가해보겠습니다.
const wrapInDiv = (str) => "<div>" + str + "</div>";
// Template Literal 방식
const wrapInDiv = (str) => `<div>${str}</div>`;

// 4. 인자로 받은 값을 소문자로 변경해보겠습니다.
const toLowerCase = (str) => str.toLowerCase();

// 5. 함수형 프로그래밍 방식으로 함수를 호출시켜 보겠습니다. 이러한 방식을 Function Composition이라 칭합니다.
const result = wrapInDiv(trim(input));
const anotherResult = wrapInDiv(toLowerCase(trim(input)));
```

함수형 방식으로 코드를 정의하고 실행하면 프로그램 동작의 관찰과 테스트에서 큰 이점을 얻을 수 있습니다.
하지만 위와 같은 방식으로 `Composition Function`을 구성할 경우 두 가지 문제점이 발생합니다.

1. 일반적으로 책을 읽을 때 왼쪽에서 오른쪽으로 읽어나가는데 현재 `Composition Function`의 경우 오른쪽에서 왼쪽으로 읽어야 한다는 불편함이 있습니다.
2. `Function Composition`의 종류가 너무 많아졌을 때, 여닫는 소괄호의 반복 때문에 가독성이 좋지 않다는 불편함이 있습니다.

### Composing and Piping

`Composing and Piping` 방식으로 기존의 함수형 방식의 코드의 불편함을 해결할 수 있습니다. 사용할 수 있는 도구의 옵션은 다음과 같습니다.

1. Lodash
2. Currying

---

`Lodash`

```javascript
import { compose, pipe } from "lodash/fp";

// 1. 다음 코드는 비함수형 스타일의 코드 구조입니다.
let input = "     JavaScript     ";
let output = "<div>" + input.trim() + "</div>";

// 2. 비함수형 스타일 코드 구조를 함수형 코드 구조로 변경해 보겠습니다.
const trim = (str) => str.trim();

// 3. 함수형 스타일로 div 태그로 감싸는 기능을 추가해보겠습니다.
const wrapInDiv = (str) => "<div>" + str + "</div>";
// Template Literal 방식
const wrapInDiv = (str) => `<div>${str}</div>`;

// 4. 인자로 받은 값을 소문자로 변경해보겠습니다.
const toLowerCase = (str) => str.toLowerCase();

// 1. Lodash는 소괄호 개수를 최소화할 수 있는 기능을 제공합니다.
// (단, 이 방식은 오른쪽에서 왼쪽 순서로 실행되는 불편함을 해결하지는 못했습니다)
const transform = compose(wrapInDiv, toLowerCase, trim);

// 2. pipe 함수를 사용하면 왼쪽 ==> 오른쪽 순서로 읽어지는 불편함을, 왼쪽 ==> 오른쪽으로 읽어질 수 있도록 구성할 수 있습니다.
const transform = pipe(trim, toLowerCase, wrapInDiv);
transform(input);
```

---

`Currying`
`커링(Currying)`: <br />
N개(2개 이상)의 인자 값을 받는 함수를 마치 하나의 인자만 받는 함수처럼 재정의하는 함수형 프로그래밍패턴 중 하나입니다. (Created By Haskell Curry)

```javascript
import { compose, pipe } from "lodash/fp";

// 다음 정의된 함수를 보면, wrapInDiv 함수와 wrapInSpan 함수가 태그 이름을 제외하고는 같은 형태의 값을 리턴하는 것을 확인할 수 있습니다. 이 부분을 리팩토링해보겠습니다.
const trim = (str) => str.trim();
const toLowerCase = (str) => str.toLowerCase();
const wrapInDiv = (str) => `<div>${str}</div>`;
const wrapInSpan = (str) => `<span>${str}</span>`;

// 리팩토링 버전
const trim = (str) => str.trim();
const toLowerCase = (str) => str.toLowerCase();
const wrap = (type, str) => `<${type}>${str}</${type}>`;

const transform = pipe(trim, toLowerCase, wrap);
```

transform 함수를 호출하면 기대한 값과 다르게 undefined가 출력되는 것을 확인할 수 있습니다. 그 이유는 다음과 같습니다.
<br />=> Pipe 함수는 이름 그대로 Pipeline을 생성해, 순서대로 각 함수의 리턴값은 다음 함수의 인자 값으로 전달합니다.
<br /> ==> 문제는 wrap 함수는 두 개의 인자를 받기 때문에 값을 담당하는 두 번째 인자에는 할당된 값이 없으므로 undefined으로 정의된다는 점입니다.

이를 해결하기 위해 다음과 같이 코드를 실행하면 어떻게 될까요?

```javascript
// Error: Expected a function
const transform = pipe(trim, toLowerCase, wrap("div"));
```

똑같이 오류가 발생합니다 그 이유는 Pipe 함수 인자의 데이터 타입은 함수여야 하는데, 값을 인자로 제공했기 때문입니다. 이 경우에 N 개(2개 이상)개 이상의 인자 값을 받는 함수를 마치 하나의 인자만 받는 함수처럼 재정의하는 방식을 적용할 수 있습니다.

---

`Currying Practice`

```javascript
function add(a, b) {
  return a + b;
}

function curryingAdd(a) {
  return function (b) {
    return a + b;
  };
}

const curryingArrowAdd = (a) => (b) => a + b;

add(1, 5);
curryingAdd(1)(5); // add(1, 5)와 동일한 결과를 얻을 수 있습니다.
curryingArrowAdd(1)(5);
```

---

`Refactoring with Currying`

```javascript
import { compose, pipe } from "lodash/fp";

const trim = (str = str.trim());
const wrap = (type) => (str) => `<${type}>${str}</${type}>`;
const toLowerCase = (str = str.toLowerCase());

const result1 = pipe(trim, toLowerCase, wrap("div"));
const result2 = pipe(trim, toLowerCase, wrap("span"));
```

위 방식으로 `currying`을 적용해 코드를 구성하면 함수가 함수를 리턴하기 때문에 Pipe 규칙을 지키면서 동시에 두 개의 인자를 전달할 수 있는 형태가 되기 때문에 정상 동작하는 것을 확인할 수 있습니다.

`Currying`: `N Arguments` ==> `Single Argument`

### Pure Function

`Pure Function`: 같은 인자 값에 항상 같은 결과를 리턴하는 함수를 의미합니다.

- 함수의 리턴 값으로 무작위 값이 발생하지 않습니다.
- 현재의 시간/날짜를 기반으로 하지 않습니다
- 함수 내부에서 전역 범위(DOM, DB, etc)에 접근하지 않습니다.
- 함수 내부에서 인자 값에 변경이 없습니다.

---

다음 함수는 같은 값을 인자로 전달해도 매번 다른 결과 값이 리턴되기 때문에 `Pure Function`이라 칭할 수 없습니다.

```javascript
// No Pure Function
function myFunc(num) {
  return num * Math.random();
}
```

---

다음 함수는 같은 값을 인자로 전달하면 매번 똑같은 결과를 리턴하기 때문에 `Pure Function`이라 칭할 수 있습니다.

```javascript
// Yes Pure Function
function myFunc(num) {
  return num * 2;
}
```

---

다음 함수는 `minAge` 인자가 전역 범위에 정의된 변수의 값을 참조하고 있습니다. 전역 범위의 변수값이 변경되지 않음을 보장할 수 없으므로 해당 함수는 `Pure Function`이라 칭할 수 없습니다.

```javascript
// No Pure Function
function isEligible(age) {
  return age > minAge;
}
```

---

`minAge`를 함수의 인자로 재정의함에 의해 `isEligible` 함수를 `Pure Function` 으로 재구성할 수 있습니다.

```javascript
// Pure Function
function isEligible(age, minAge) {
  return age > minAge;
}
```

---

`Pure Function`의 장점

- Self-Documenting (쉽게 읽을 수 있음을 의미합니다.)
- Easily Testable (쉽게 테스트 할 수 있음을 의미합니다.)
- Concurrency (외부에 의존하지 않기 때문에 다른 프로그램과 동시에 실행할 수 있음을 의미합니다.)
- Cacheable (결과 값이 예측할 수 있기 때문에 컴퓨팅 파워를 많이 요구하는 계산을 하는 경우 한 번 계산한 값을 저장해두고 이후 사용할 수 있습니다.)

### Immutability

`Immutability(불변성)`: 한 번 생성되면, 이후 변경이 불가능함을 의미합니다.

`문자열(String)` 데이터 타입은 `JavaScript`를 포함해 대부분의 프로그래밍 언어에서 불변성의 특징을 가지고 있습니다.

```javascript
let name = "Yongsu";
// name 변수에 담겨 있는 값을 변경시킨 것이 아닌, 복사본을 하나 만들어 새로 생성했기 때문에 기존의 이름에는 어떠한 영향도 발생하지 않습니다.
let newName = name.toUpperCase();
```

반면에 `JavaScript`에서 `Object and Array(객체와 배열)`은 불변성이 아닌 가변성의 특징을 띕니다. `JavaScript` 언어가 완전한 함수형 프로그래밍 언어가 아니므로 이 같은 방식으로 동작하게 됩니다.

```javascript
const book = {};
book.title = "Hello World";

// 단 새로운 주소를 할당하는 다음 코드는 재할당이기 때문에 오류가 발생합니다.
book = {};
```

### Why Immutability?

<img src="https://cdn-images-1.medium.com/max/800/1*eNKGAqhkZIPv5mnxaC_55A.png" />

`React`는 `상태값(state)` 변화를 빠르게 감지하기 위해 불변성의 특징을 이용합니다. 예를 들어, 최초 정의한 `const book = {}` 코드가 메모리 위치상 `#100`에 위치한다 가정해보겠습니다.
불변성의 특징을 그대로 유지한다면 `#100`에 정의된 객체에 새로운 프로퍼티를 추가한다면, `#100`번에 있는 객체의 복사본을 만들고, 그 복사본을 `#200`에 할당하고 이후 새로운 프로퍼티를 추가하는 방식으로 동작하게 됩니다. 이 방식을 이용해 `React`는 변경된 객체의 위치와 이전 위치를 비교하고 다르다면 다시 렌더링을 하게 됩니다. 만약 `React`가 불변성 방식을 이용하지 않는다면 `React`의 모든 프로퍼티를 일일이 비교해야 하는 상황이 발생합니다.

---

`Pros (장점)`

1. Predictability: `state` or `memory` 변경을 명확히 예측할 수 있기 때문에 사전에 발생할 수 있는 오류의 경우의 수를 예측할 수 있습니다.
2. Faster Change Detection: 전체를 확인하는 것이 아닌 변경된 부분만 확인할 수 있는 특징이 있기 때문에 빠르게 변경 사항을 발견할 수 있습니다.
3. Concurrency: 한 함수가 데이터를 변화/변경하지 않는다는 무결성이 보장되기 때문에 병렬로 함수를 실행시켜도 다른 함수에 미치는 영향이 없음을 보장할 수 있습니다.

---

`Cons (단점)`

1. Performance: 무결성을 보장한다는 것은 한 번 할당된 메모리에 재할당이 불가능함을 의미합니다. 그러므로 수천 개의 객체에 새로운 프로퍼티가 추가되었다면, 변경된 모든 객체를 복사해 새로운 메모리를 할당하기 때문에 성능상에 문제가 생길 수 있습니다.

---

`Redux` 는 불변성의 특징을 이용해 상태 관리를 하므로, 예측 가능한 상태 관리 및 변경 사항 발생 시 빠르게 이를 빠르게 포착할 수 있고, 순수 함수(Pure Function) 방식으로 동작하기 때문에 일정한 결과 값을 예측할 수 있는 장점이 있습니다.

### Updating Arrays

```javascript
const nums = [1, 2, 3];
const index = nums.indexOf(2);

// slice 메소드는 새로운 배열을 리턴합니다.
const added = [...nums.slice(0, index), 4, ...nums.slice(index)]; // [1, 4, 2, 3]

// map 메소드는 새로운 배열을 리턴합니다.
const updated = nums.map((n) => (n === 2 ? 20 : n));
console.log(updated);

// filter 메소드는 새로운 배열을 리턴합니다.
const removed = nums.filter((n) => n !== 2);
console.log(removed);
```

### Updating Objects

`Object.assign` 메소드를 이용한 방식은 해당 데이터가 저장될 수 있는 메모리를 먼저 할당하고, 할당된 메모리에 객체와 프로퍼티를 복사하는 방식으로 동작하기 때문에 무결성을 보장할 수 있습니다.

```javascript
const person = { name: "Yongsu" };
Object.assign({}, person);
Object.assign({}, person, { name: "Jeong", age: 26 });
```

`Spread Operator`를 활용하면 위 방식보다 훨씬 더 간편하게 객체를 복사할 수 있습니다. <br />이미 존재하는 프로퍼티 값이 있다면 `덮어쓰기(Overwrite)` 방식으로 동작합니다.

```javascript
const person = { name: "Yongsu" };
const updated = { ...person, name: "Jeong" };
```

객체의 깊이가 깊은 경우 `Shallow Copy`가 되는 것을 주의해야 합니다.

```javascript
const person = {
  name: "Yongsu",
  address: {
    country: "Korea",
    city: "Daegu",
  },
};

const updated = { ...person, name: "Jeong" };
updated.address.city = "New York";
console.log(person);
```

결과를 출력해보면 `person` 변수에 담긴 객체의 `city` 또한 `New York`으로 변경된 것을 확인할 수 있습니다. 그 이유는 `Spread Operator`는 `Shallow Copy` (중첩된 객체는 복사 불가) 방식으로 동작하기 때문에 다음과 같이 명확하게 복사할 부분에는 모두 `Spread Operator`를 명시해야 합니다.

```javascript
const updated = {
  ...person,
  address: {
    ...person.address,
    city: "New York",
  },
  name: "Jeong",
};
```

문제는 중첩이 심해질수록 지나치게 많은 `Spread Operator`가 사용되어야 하기 때문에 가독성이 좋지 않은 현상이 발생합니다. 이러한 상황을 `Verbose`하다 표현합니다. 이 문제를 해결해 줄 수 있는 몇 가지 도구를 이어서 소개하겠습니다.

### Enforcing Immutability

`JavaScript` 언어는 완전한 함수형 프로그래밍 언어가 아니므로 `객체 복제(Object Mutation`을 막지 않습니다. 완전한 불변성을 보장하고 싶은 경우 다음 도구를 사용할 수 있습니다.

- Immutable
- Immer
- Mori

```javascript
let book = { title: "Harry Potter" };

function publish(book) {
  book.isPublished = true;
}

publish(book);
console.log(book);
```

`Immutable` 모듈은 `JavaScript` 객체와 함께 사용하기에는 좋지 않습니다.
사용하시게 된다면 둘 중 하나만 사용하시는 것을 추천해 드립니다.

```javascript
import { Map } from "immutable";

// Map or HashMap (Key: Value Pair (Immutable))
let book = Map({ title: "Harry Potter" });
console.log(book.title); // 오류 발생, get 메소드를 이용해서 접근해야 합니다.
console.log(book.get("title")); // 프로퍼티에 직접적인 접근을 막기 위한 목적입니다.

function publish(book) {
  // 불변성 보장을 위해, 기존의 객체에 어떠한 영향도 미치지 않고, 새로운 객체를 리턴해 줍니다.
  book.set("isPublished", true);
}

book = publish(book);

console.log(book.toJS());
```

최종적으로 `JS Object`로 변환하는 과정이 필요합니다. 이러한 번거로움 때문에 `immutable` 대신 `immer` 사용을 추천해 드립니다.

---

`immer`

```javascript
import { produce } from "immer";

let book = { title: "Harry Potter" };

function publish(book) {
  return produce(book, (draftBook) => {
    draftBook.isPublished = true;
  });
}

let updated = publish(book);

console.log(book);
console.log(updated);
```

기존의 객체에는 어떠한 영향도 주지 않습니다. 대신 `draftBook`은 일종의 `Proxy`로써 기존의 객체에 준 변화를 기록하고 이후 새로운 메모리를 할당해 변경된 사항을 반영해 리턴하는 방식으로 동작합니다. 이렇듯 가독성과 사용성 측면에서 쉽기 때문에 `immer`를 더 많이 사용합니다.

## Redux and React

<img src="https://cdn-images-1.medium.com/max/800/1*-fWEe25VRjO-esU3XAh6XA.png" />

```javascript
npx create-react-app redux101
```

`redux`와 `react`는 서로의 존재를 알지 못합니다. 그러므로 둘 사이를 연결할 중재자가 필요합니다. `react-redux` 모듈이 바로 이 중재자 역할을 해줍니다.
`react-redux`에는 대표적으로 두 개의 요소가 존재합니다.

- Provider
- Connect

좌측 아래의 그림을 중앙 저장소(store)로 , 우측 아래 그림을 리엑트 앱으로 간주하겠습니다.
이 시나리오의 목표는 리엑트 컴포넌트가 좌측에 있는 중앙 저장소(store)와 의사소통할 수 있게 하는 것을 의미합니다.
이 목표를 달성하는 과정에 `Provider` 컴포넌트를 활용할 수 있습니다.
`Provider` 컴포넌트는 두 가지 역할을 합니다.

1. 중앙 저장소(store)에 접근할 수 있습니다.
2. `Provider` 컴포넌트는 리엑트 앱을 감싸줌으로써 부모 역할을 할 수 있습니다.

이 개념을 잘 숙지한 체로 계속해서 `redux` 학습을 진행해보겠습니다.

## How Redux Works

<img src="https://d33wubrfki0l68.cloudfront.net/01cc198232551a7e180f4e9e327b5ab22d9d14e7/b33f4/assets/images/reduxdataflowdiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif" />

`redux`는 해당 영상에 나오는 것을 포함해 크게 4가지로 구성됩니다.

1. Store (직접 정의)
2. Action Creators (직접 정의)
3. Actions (직접 정의)
4. Dispatch (Redux 제공)
5. Reducer (직접 정의)

`redux` 저장소에 저장된 데이터를 직접 변경하는 것은 불가능합니다. 그러므로 `redux`는 다음 순서로 동작하게 됩니다.

1. **Store**: `Store (중앙 저장소)`에서 최초 정의한 상태 값을 리턴합니다.
2. **Action Creators**: 리턴 받은 상태값 변경이 되는 시나리오를 분류해 `Action Creators`를 정의합니다.
3. **Actions** `Action Creators`는 변경할 상태값 상태를 의미하는 `type`과, 변경할 상태값 데이터를 의미하는 `payload`가 담긴 `Action` 객체를 리턴합니다.
4. **Dispatch**: 리턴된 `Action` 객체는 `Redux`에서 제공하는 `Dispatch` 함수를 통해 `Store (중앙 저장소)`로 전달됩니다.
5. **Reducer**: 사전에 정의해 둔 `Reducers` 함수 중 전달받은 `Action` 객체를 처리할 수 있는 로직이 있는 경우 전달받은 `Payload`를 저장소에 반영합니다. 그렇지 않은 경우라도 `Dispatch` 함수가 호출된 기록은 남깁니다.

## Redux Architecture

<img src="https://camo.githubusercontent.com/f78fe6a64eb1093a929c369973cb0a133f1672b932da58aefc1b4cdbc6c7a65f/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313230302f312a2d3257694544796e4238793531396f644258767332672e706e67" />

`Redux`는 앱의 상태 값을 객체 형태로 `중앙 저장소(Store)`에 저장합니다. 대신 `Rdux`는 저장된 데이터가 카테고리, 쇼핑카트, 유저 정보 인지 등의 구분 없이, `arrays, object, numbers, boolean` 등의 데이터 타입 중 하나라고 인식합니다.

```javascript
{
    categories: [],
    products: [],
    cart: {},
    user: {}
}
```

`Redux`는 `함수형 프로그래밍(Functional Programming)` 원칙에 기반을 두고 작성되었기 때문에, 저장소 내의 값에 대한 변경이 불가능합니다. 이러한 특징을 `불변성(Immutability)`이라 칭합니다. 이러한 특정 때문에 `reducer` 함수 호출을 통해서만 저장소 값을 변경(갱신)할 수 있습니다. 갱신하는 과정은 다음과 같습니다.

저장소를 복사하고 갱신하는 과정에는 두 가지 방식을 사용할 수 있습니다.

1. `Spread Operator`
2. `Immer.js`

```javascript
const store = { name: "yongsu" };

function reducer(store) {
  const updated = { ...store };
}
```

정의된 `reducer` 함수를 보면 저장소를 받는 인자가 하나만 존재하는 것을 확인할 수 있습니다. 이 말은 다음과 같은 디테일한 갱신은 불가능한 상황임을 알 수 있습니다.

- 쇼핑카트를 갱신
- 카테고리를 갱신

디테일한 갱신을 위해서는 이 정보를 명시해주는 `action` 이라는 두 번째 인자가 필요합니다.

```javascript
function reducer(store, action) {}
```

전달받은 `action`인자에 정의된 데이터에 적합한 `reducer`가 정의되어 있는 경우, 해당 `reducer`를 호출해 저장소를 갱신하는 방식으로 동작합니다.

`reducer`가 하나밖에 정의되지 않았는데 어떻게 여러 종류의 `action`을 처리할 수 있는가 의문이 들 수 있습니다. `Redux`는 둘 이상의 `reducer`를 정의할 수 있습니다. 이를 비유하자면 다수의 부서가 존재하는 조직을 생각해보겠습니다. 각 팀은 팀장이 있고, 이 팀장은 자기가 속한 팀에 책임을 지지, 다른 팀이 하는 행동에는 책임을 지지 않습니다. 이처럼 다음 코드와 같이 네 가지 종류의 데이터가 존재할 때, 각각의 데이터를 처리하는 `reducer`가 존재하게 됩니다.

```javascript
{
    categories: [],
    products: [],
    cart: {},
    user: {}
}
```

<img src="https://cdn-images-1.medium.com/max/800/1*_-zwNkG2QNNNB_y6Sd7U-A.png" />

`redux`를 요약해보자면 `Action`은 클릭과 같은 이벤트라 생각할 수 있고, 해당 이벤트가 발생하면 이를 `store`에 전달하는 게 `dispatch` 함수의 역할이고, 이후 전달받은 이벤트를 처리하고, 그 결과를 `store`에 반영하는 역할을 하는 것이 `reducer` 함수의 역할입니다. (`reducer` 함수를 `store`를 거치지 않고 바로 호출할 수 없음을 주의해야 합니다.)

<img src="https://cdn-images-1.medium.com/max/800/1*iBPBxTxRjSKZzZrpK33MaA.png" />
`Dispatch` 함수는 `Redux Store`로 출입하는 입구의 역할이라 할 수 있습니다. 모든 `Action`은 같은 입구를 통해 저장소에 접근하기 때문에, 빈틈없이 모든 요청을 기록할 수 있습니다. 식당에서 음식을 주문하는 순서를 생각하면 이해에 도움이 될 수 있습니다. <br />

`손님 ==> 직원 ==> 포스기 ==> 요리사`

`손님 ==> 직원`의 단계까지가 `Action or Event` 단계입니다.
만약 이후 포스기를 사용하지 않고 직원이 요리사에게 바로 주문을 전달하게 되면 두 가지 문제가 발생합니다.

1. 기록 없이 말로 전달했기 때문에 직원의 주문이 틀릴 가능성이 있습니다.
2. 기록 없이 말로 전달했기 때문에 직원과 요리사 모두 주문 내용을 기억하지 못하는 경우 요리에 문제가 생길 수 있습니다.

이러한 상황을 방지하기 위해 포스기를 설치하게 되면 직원과 요리사 사이 정확한 의사소통을 보장할 수 있습니다.
이러한 포스기의 역할이 바로 `Redux`의 `Dispatch` 함수의 역할이라 생각할 수 있습니다.

### First Redux App

`redux` 다음 순서로 구성됩니다.

1. `저장소(store)` 정의
2. `이벤트(actions)` 정의
3. `이벤트 핸들러(reducer)` 정의
4. `저장소(store)` 초기화
5. `이벤트 전송 (dispatching actions)` 정의
6. `재사용 가능한 이벤트 (actions)` 정의

```javascript
npm install redux
```

1. `저장소(store)` 정의:

`저장소(store)`를 정의하는 방식은 많지만, 일반적으로 사용하는 방식은 다음과 같습니다.

```javascript
{
    bugs: [
	{
        id: 1,
        description: "",
        resolved: false
    	}
    ],
    currentUser: {}
}
```

`저장소(store)`에는 `bugs`와 `currentUser` 두 종류의 속성값이 존재합니다. `Redux`에서는 이러한 속성값을 `slice`라 명칭 합니다. 현재 두 개의 `slice`가 존재하기 때문에 최소 두 개의 `reducer`가 필요함을 유추할 수 있습니다.

2. `이벤트(actions)` 정의

`Bug`는 크게 세 가지 경우의 수로 분류됩니다.

1. `버그 추가(Add a Bug)`
2. `버그 해결(Mark as Resolved)`
3. `버그 삭제(Delete a Bug)`

```javascript
{
  type: "ADD_BUG",
  description: "..."
}
```

위와 같이 `Action`을 정의할 수 있지만, `Redux`는 공식 문서에서는 `Action` 정의할 때 다음 규격을 따릅니다.

1. type: `Action`의 이름
2. payload: `Action` 설명 등의 세부 내용

이 규격에 맞춰 다시 `Action`을 정의하면 다음과 같습니다.

```javascript
{
  type: "bugAdded",
  payload: {
    description: "..."
  }
}

{
  type: "bugResolved",
  payload: {
    description: "..."
  }
}

{
  type: "bugRemoved",
  payload: {
    description: "..."
  }
}
```

3. `이벤트 핸들러(reducer)` 정의

앞서 소개한 것 처럼 `reducer`는 두 개의 인자를 받습니다.

1. `상태값(state)`
2. `이벤트(action)`

이 규칙에 맞춰 `reducer`를 정의하면 다음과 같습니다.

```javascript
let lastId = 0;

// If 버전
function reducer(state = [], action) {
  if (action.type === "bugAdded") {
    return [
      ...state,
      {
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      },
    ];
  } else if (action.type === "bugRemoved") {
    return state.filter((bug) => bug.id !== action.payload.id);
  }

  return state;
}

// Switch 버전
function reducer(state = [], action) {
  switch (action.type) {
    case "bugAdded":
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];
    case "bugRemoved":
      return state.filter((bug) => bug.id !== action.payload.id);
    default:
      return state;
  }
}
```

4. `저장소(store)` 초기화

`redux` 모듈을 통해 `저장소(store)`를 생성해보겠습니다.

```javascript
import { createStore } from "redux";
import reducer from "./reducer";

// createStore is another higher order functon
const store = createStore(reducer);

export default store;
```

5. `이벤트 전송 (dispatching actions)` 정의

이 단계에서는 정의한 `action`을 `redux`에서 제공하는 `dispatch` 함수를 통해 `저장소(store)`에 전달하는 단계입니다.

`subscribe` 함수는 상태 값에 변경이 발생하면 (reducer 함수가 호출되면) 매번 호출되는 함수입니다. 해당 함수는 인자로 콜백을 받고, 해당 콜백을 호출하는 방식으로 동작합니다.

```javascript
import store from "./store";

// redux에서 제공하는 현재 상태 값을 읽어오는 메소드입니다.
store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({
  type: "bugAdded",
  payload: {
    description: "Bug1",
  },
});

console.log(store.getState());

store.dispatch({
  type: "bugRemoved",
  payload: {
    id: 1,
  },
});

console.log(store.getState());
```

6. `재사용 가능한 이벤트 (actions)` 정의

코드를 작성함에 재사용성은 반드시 고려해야 할 사항입니다.
내일 다음과 같이 이름 변경이 필요한 상황을 생각해보겠습니다.

- Rename: `bugAdded` ==> `bugCreated`

```javascript
import store from "./store";

store.dispatch({
  type: "bugAdded",
  payload: {
    description: "Bug1",
  },
});

console.log(store.getState());
```

이 경우 기존에 정의해둔 `store`, `reducer` 모두 변경해야 하는 상황이 발생합니다. 이런 상황에 대비해 `actionType` 파일을 따로 생성함으로써 보다 유지 보수하기 좋은 코드를 작성할 수 있습니다. 예시를 통해 알아보겠습니다.

```javascript
// dataTypes.js
export const BUG_ADDED = "bugAdded";
export const BUG_REMOVED = "bugRemoved";

// reducer.js
// import { BUG_ADDED, BUG_REMOVED } from "./actionTypes"; or
import * as actions from "./actionTypes";

let lastId = 0;

// Switch Cases Usage Version
export default function reducer(state = [], action) {
  switch (actions.BUG_ADDED) {
    case "bugAdded":
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];
    case actions.BUG_REMOVED:
      return state.filter((bug) => bug.id !== action.payload.id);
    default:
      return state;
  }
}

// index.js
import store from "./store";

store.dispatch({
  type: "bugAdded",
  payload: {
    description: "Bug1",
  },
});

console.log(store.getState());
```

개선된 코드에도 여전히 한 가지 문제가 존재합니다.

1. `action`을 여러 곳에 사용하는 경우 `state` 객체를 여러 번 작성해야 합니다.

`action creator` 함수를 따로 생성해서 이 문제를 해결할 수 있습니다.

```javascript
// actions.js
import * as actions from "./actionTypes";

export const bugAdded = (description) => ({
  type: actions.BUG_ADDED,
  payload: {
    description,
  },
});

// index.js
import store from "./store";
import { bugAdded } from "./actions";

store.dispatch(bugAdded("Bug1"));

console.log(store.getState());
```

### bugResolved - Practice

1. Store
2. Action
3. Action Creator
4. Dispatch
5. Reducer

```javascript
// 1. actionsTypes.js
// BUG_RESOLVED 추가
export const BUG_RESOLVED = "bugResolved";

// 2. actions.js
export const bugResolved = (id) => ({
  type: actions.BUG_RESOLVED,
  payload: {
    id,
  },
});

// 3. reducer.js
import * as actions from "./actionTypes";

let lastId = 0;

export default function reducer(state = [], action) {
  switch (actions.BUG_ADDED) {
    case "bugAdded":
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];

    case actions.BUG_REMOVED:
      return state.filter((bug) => bug.id !== action.payload.id);

    case actions.BUG_RESOLVED:
      return state.map((bug) =>
        bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
      );

    default:
      return state;
  }
}

// index.js
import store from "./store";
import { bugAdded, bugResolved } from "./actions";

store.dispatch(bugAdded("Bug1"));

console.log(store.getState());

store.dispatch(bugResolved(1));

console.log(store.getState());
```

## Wiring Up Redux

```javascript
npx create-react-app redux101
npm install redux
```

```javascript
// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// 1. Redux와 React 연결을 위해 Provider 컴포넌트를 가져왔습니다.
import { Provider } from "react-redux";

// 2. Redux 저장소를 만들기 위해 createStore 함수를 가져왔습니다.
import { createStore } from "redux";

// 3. Reducer는 src/reducers 폴더 생성 ==> rootReducer.js 생성했습니다.

// 4. 해당 파일에 reducer를 정의했습니다.
import rootReducer from "./reducers/rootReducer";

// 5. 생성한 reducers를 인자로 전달해 저장소를 생성했습니다.
const theStore = createStore(rootReducer);

// 6. Redux와 React가 연결될 수 있도록 Provider 컴포넌트로 App 컴포넌트를 감싸고, 생성한 store를 할당했습니다.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={theStore}>
    <App />
  </Provider>
);
```

```javascript
// src/reducers/rootReducer.js

// rootReducer로서 모든 reducer를 관리하는 역할을 합니다.
// rootReducer를 생성하기 위해서는 combineReducers라는 함수를 사용해야 합니다.
import { combineReducers } from "redux";
import frozenReducer from "./frozen";

// 별도로 생성한 reducer를 combineReducers 함수의 인자로 알맞은 키값과 함께 전달하면 됩니다.
const rootReducer = combineReducers({
  frozen: frozenReducer,
});

export default rootReducer;

// src/reducers/frozen.js
// 모든 reducer는 두 개의 인자를 받습니다.
// 1. 상태값(state)
// 2. 이벤트(action)

export default (state = [], action) => {
  return state;
};

// function frozen(state = [], action) {
//   return state;
// }

// export default frozen;
```

## Building Redux from Scratch

`Redux`를 보다 더 자세히 이해하기 위해 `redux` 일부 기능을 직접 구현해보겠습니다.

```javascript
import store from "./store";
import { bugAdded, bugResolved } from "./actions";

console.log(store);
// { dispatchL f, subscribe: f, getState: f, replaceReducer: f, Symbol(observable): f }
// dispatch: f dispatch(action)
// subscribe: f subscribe(listener)
// getState: f getState()
// replaceReducer: f replaceReducer(nextReducer)
// Symbol(observable): f observable()
// __proto__: Object

store.dispatch(bugAdded("Bug 1"));
store.dispatch(bugResolved(1));

console.log(store.getState());
```

1. Private Properties

```javascript
// src/customStore.js
function createStore() {
  let state;

  function getState() {
    return state;
  }

  return {
    getState,
  };
}

export default createStore();

// src/index.js
import store from "./customStore";
store.state = 1;

console.log(store.getState());
```

2. Dispatching Actions

```javascript
// src/customStore.js
import reducer from "./reducer";

function createStore(reducer) {
  let state;

  function dispatch(action) {
    state = reducer(state, action);
  }

  function getState() {
    return state;
  }

  return {
    dispatch,
    getState,
  };
}

export default createStore(reducer);

// src/index.js
import store from "./customStore";
import * as actions from "./actions";

store.dispatch(actions.bugAdded("Bug 1"));

console.log(store.getState());
```

3. Subscribing to the Store

```javascript
// src/customStore.js
import reducer from "./reducer";

function createStore(reducer) {
  let state;
  let listeners = [];

  function subscribe(listener) {
    listeners.push(listener);
  }

  function dispatch(action) {
    state = reducer(state, action);

    for (let i = 0; i < listeners.length; i++) {
      listeners[i]();
    }
  }

  function getState() {
    return state;
  }

  return {
    subscribe,
    dispatch,
    getState,
  };
}

export default createStore(reducer);

// src/index.js
import store from "./customStore";
import * as actions from "./actions";

store.subscribe(() => {
  console.log("Store Changed!");
});
store.dispatch(actions.bugAdded("Bug 1"));

console.log(store.getState());
```

## Debugging Redux Application

1. `Redux DevTools` 설치

- <a href="https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en">다운로드</a>
- <a href="https://github.com/reduxjs/redux-devtools/tree/main/extension#installation">적용 방법</a>

```javascript
// src/store.js
import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
```

## Connecting Redux and React + Adding an Action Creator and Action

1. `reducers` 정의

```javascript
// src/reducers/frozenReducer.js
// reducer is just a function
// All reducers have 2 params:
// 1. Current State, usually provide a default state
// 2. Info that came from any action

const seedData = [
  {
    food: "TV Dinners",
    quantity: 10,
  },

  {
    food: "Frozen Veggies",
    quantity: 21,
  },

  {
    food: "Frozen Pizzas",
    quantity: 25,
  },
];

export default (state = seedData, action) => {
  return state;
};

// function frozen(state = [], action) {
//   return state;
// }

// export default frozen;

// ---------------------------------------------------------------
// src/reducers/produceReducer.js
// reducer is just a function
// All reducers have 2 params:
// 1. Current State, usually provide a default state
// 2. Info that came from any action

const seedData = [
  {
    food: "Lettuce",
    quantity: 10,
  },

  {
    food: "Turnips",
    quantity: 21,
  },

  {
    food: "Apples",
    quantity: 25,
  },
];

export default (state = seedData, action) => {
  return state;
};

// function frozen(state = [], action) {
//   return state;
// }

// export default frozen;


// ---------------------------------------------------------------
// src/reducers/meatReducer.js

// reducer is just a function
// All reducers have 2 params:
// 1. Current State, usually provide a default state
// 2. Info that came from any action

const seedData = [
  {
    food: "Chicken Breast",
    quantity: 10,
  },

  {
    food: "Bacon",
    quantity: 21,
  },

  {
    food: "Mahi Mahi",
    quantity: 25,
  },

  {
    food: "Salmon",
    quantity: 25,
  },
];

export default (state = seedData, action) => {
  return state;
};

// function frozen(state = [], action) {
//   return state;
// }

// export default frozen;
```

2. `FrozenDept` 컴포넌트 정의

```javascript
import React, { Component } from "react";

// We want this component to know about redux
// to do that, we need some help... or some glue
// the glue is react-redux! We need connect function!
import { connect } from "react-redux";

class FrozenDept extends Component {
  render() {
    console.log(this.props.meatData);
    const frozenInventory = this.props.frozenData.map((item, i) => {
      return (
        <li key={i}>
          {item.food} : {item.quantity}
        </li>
      );
    });

    // #3
    // console.log(this.props.frozenData);
    return (
      <div>
        <h1>The Frozen Food Department</h1>
        <ul>{frozenInventory}</ul>
      </div>
    );
  }
}

console.log(connect);
// mapStateToPROPS takes 1 args, "state" and that is the rootReducer/state
// #1
function mapStateToProps(state) {
  // mapStateToProps returns an object, with:
  // property is the local prop name to this component
  // value will be the property in the root reducer... ie, a piece of the store
  return {
    frozenData: state.frozen,
    produceData: state.produce,
    meatData: state.meat,
  };
}

// #2
// Connect takes 2 args, the first one is a function that is going to map
// a piece of redux state to this components props
export default connect(mapStateToProps)(FrozenDept);
```

3. `App.js` 컴포넌트 수정

```javascript
import "./App.css";
import FrozenDept from "./components/FrozenDept";

function App() {
  return (
    <div className="App">
      <FrozenDept />
    </div>
  );
}

export default App;
```

4. `index.js` 수정

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// 1. In order to wire up a redux/react app, we need react-redux
// 2. We need the Provider Component, to be around everything!
import { Provider } from "react-redux";

// 3. Create the redux store, so that redux exists, and the provider has a store
import { createStore } from "redux";

// 4. Reducers to populate the store
// 4a. We always start with a rootReducer
// src/reducers 폴더 생성 ==> rootReducer.js 생성

// 5. Make individual reducers to hand to the rootReducer
import rootReducer from "./reducers/rootReducer";

// 6. Create the store by passing it the rootReducer, which is made up of the reducers
const theStore = createStore(rootReducer);

// Provider is the glue between react and redux, Give it the store!
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={theStore}>
    <App />
  </Provider>
);
```

## Adding an action creator and action

```javascript
// src/actions/frozenInvUpdate.js
export default () => {
  return {
    type: "updateMeat",
  };
};

// src/actions/meatInvUpdate.js
export default () => {
  return {
    type: "updateFrozen",
  };
};

// src/actions/produceInvUpdate.js
export default () => {
  console.log("Updating produce inventory!!!");
  return {
    type: "produceMeat",
  };
};
```

```javascript
// src/components/FrozenDept.js
import React, { Component } from "react";
import { connect } from "react-redux";
import updateFrozen from "../actions/frozenInvUpdate";

class FrozenDept extends Component {
  increment = (operation, index) => {
    if (operation === "+") {
      console.log(updateFrozen());
    } else if (operation === "-") {
    }
  };

  render() {
    console.log(this.props.meatData);
    const frozenInventory = this.props.frozenData.map((item, i) => {
      return (
        <div>
          <li key={i}>
            {item.food} : {item.quantity}
          </li>
          <input
            type="button"
            onClick={() => this.increment("+", i)}
            value="+"
          />
          <input
            type="button"
            onClick={() => this.increment("-", i)}
            value="-"
          />
        </div>
      );
    });

    return (
      <div>
        <h1>The Frozen Food Department</h1>
        <ul>{frozenInventory}</ul>
      </div>
    );
  }
}

console.log(connect);

function mapStateToProps(state) {

  return {
    frozenData: state.frozen,
  };
}

export default connect(mapStateToProps)(FrozenDept);

// src/components/MeatDept.js
import React, { Component } from "react";

import { connect } from "react-redux";
import updateMeat from "../actions/meatInvUpdate";

class MeatDept extends Component {
  increment = (operation, index) => {
    if (operation === "+") {
      console.log(updateMeat());
    } else if (operation === "-") {
    }
  };

  render() {
    console.log(this.props.meatData);
    const meatInventory = this.props.meatData.map((item, i) => {
      return (
        <div>
          <li key={i}>
            {item.food} : {item.quantity}
          </li>
          <input
            type="button"
            onClick={() => this.increment("+", i)}
            value="+"
          />
          <input
            type="button"
            onClick={() => this.increment("-", i)}
            value="-"
          />
        </div>
      );
    });

    return (
      <div>
        <h1>The meat Food Department</h1>
        <ul>{meatInventory}</ul>
      </div>
    );
  }
}

console.log(connect);

function mapStateToProps(state) {

  return {
    meatData: state.meat,
  };
}

export default connect(mapStateToProps)(MeatDept);

// src/components/ProduceDept.js
import React, { Component } from "react";

import { connect } from "react-redux";
import updateProduce from "../actions/produceInvUpdate";

class ProduceDept extends Component {
  increment = (operation, index) => {
    if (operation === "+") {
      console.log(updateProduce());
    } else if (operation === "-") {
    }
  };

  render() {
    console.log(this.props.produceData);
    const produceInventory = this.props.produceData.map((item, i) => {
      return (
        <div>
          <li key={i}>
            {item.food} : {item.quantity}
          </li>
          <input
            type="button"
            onClick={() => this.increment("+", i)}
            value="+"
          />
          <input
            type="button"
            onClick={() => this.increment("-", i)}
            value="-"
          />
        </div>
      );
    });

    return (
      <div>
        <h1>The produce Food Department</h1>
        <ul>{produceInventory}</ul>
      </div>
    );
  }
}

console.log(connect);

function mapStateToProps(state) {

  return {
    produceData: state.produce,
  };
}

export default connect(mapStateToProps)(ProduceDept);
```

```javascript
// App.js
import "./App.css";
import FrozenDept from "./components/FrozenDept";
import MeatDept from "./components/MeatDept";
import ProduceDept from "./components/ProduceDept";

function App() {
  return (
    <div className="App">
      <FrozenDept />
      <MeatDept />
      <ProduceDept />
    </div>
  );
}

export default App;
```

## Adding the Dispatcher + Adding Meat and Produce

<img src="https://cdn-images-1.medium.com/max/800/1*muDlY0EP3xjgw_yJPIf7Xg.png" />

```javascript
// ----------------------------------------------------------------------------------------------
// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";

const theStore = createStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={theStore}>
    <App />
  </Provider>
);

// ----------------------------------------------------------------------------------------------
// App.js
import "./App.css";
import FrozenDept from "./components/FrozenDept";
import MeatDept from "./components/MeatDept";
import ProduceDept from "./components/ProduceDept";

function App() {
  return (
    <div className="App">
      <FrozenDept />
      <MeatDept />
      <ProduceDept />
    </div>
  );
}

export default App;

// ----------------------------------------------------------------------------------------------
// src/actions/frozenInvUpdate.js
export default (operation, index) => {
  console.log(operation, index);

  return {
    type: "updateFrozen",
    payload: {
      operation,
      index,
    },
  };
};

// ----------------------------------------------------------------------------------------------
// src/actions/meatInvUpdate.js
export default (qChange, index) => {
  return {
    type: "updateMeat",
    payload: {
      qChange,
      index,
    },
  };
};

// ----------------------------------------------------------------------------------------------
// src/actions/produceInvUpdate.js
export default (qChange, index) => {
  console.log("Updating produce inventory!!!");
  return {
    type: "updateProduce",
    payload: {
      qChange,
      index,
    },
  };
};

// ----------------------------------------------------------------------------------------------
// src/reducers/frozenReducer.js
const seedData = [
  {
    food: "TV Dinners",
    quantity: 10,
  },

  {
    food: "Frozen Veggies",
    quantity: 21,
  },

  {
    food: "Frozen Pizzas",
    quantity: 25,
  },
];

export default (state = seedData, action) => {
  console.log("Frozen Reducer is running!");
  console.log(action);

  if (action.type === "updateFrozen") {
    console.log("I care about this action!");
    // We make a copy of state, because we never ever ever mutate state...
    let newState = [...state];
    if (action.payload.operation === "+") {
      newState[action.payload.index].quantity++;
    } else if (action.payload.operation === "-") {
      newState[action.payload.index].quantity--;
    }
    return newState;
  } else {
    return state;
  }
};

// ----------------------------------------------------------------------------------------------
// src/reducers/meatReducer.js
const seedData = [
  {
    food: "Chicken Breast",
    quantity: 10,
  },

  {
    food: "Bacon",
    quantity: 21,
  },

  {
    food: "Mahi Mahi",
    quantity: 25,
  },

  {
    food: "Salmon",
    quantity: 25,
  },
];

export default (state = seedData, action) => {
  console.log("Meat Reducer is running!");

  if (action.type === "updateMeat") {
    const newState = [...state];
    const payload = action.payload;
    newState[payload.index].quantity += payload.qChange;
    return newState;
  } else {
    return state;
  }
};

// ----------------------------------------------------------------------------------------------
// src/reducers/produceReducer.js
const seedData = [
  {
    food: "Lettuce",
    quantity: 10,
  },

  {
    food: "Turnips",
    quantity: 21,
  },

  {
    food: "Apples",
    quantity: 25,
  },
];

export default (state = seedData, action) => {
  console.log("Producer Reducer is running!");

  if (action.type === "updateProduce") {
    const payload = action.payload;
    const newState = [...state];
    newState[payload.index].quantity += payload.qChange;
    return newState;
  } else {
    return state;
  }
};

// ----------------------------------------------------------------------------------------------
// src/reducers/rootReducer.js
import { combineReducers } from "redux";

import frozenReducer from "./frozenReducer";
import produceReducer from "./produceReducer";
import meatReducer from "./meatReducer";

const rootReducer = combineReducers({
  frozen: frozenReducer,
  produce: produceReducer,
  meat: meatReducer,
});

export default rootReducer;

// ----------------------------------------------------------------------------------------------
// src/components/FrozenDept.js
import React, { Component } from "react";
import { connect } from "react-redux";
import updateFrozen from "../actions/frozenInvUpdate";
import { bindActionCreators } from "redux";

class FrozenDept extends Component {

  increment = (operation, index) => {
    this.props.updateFrozen(operation, index);
  };

  render() {
    console.log(this.props.meatData);
    const frozenInventory = this.props.frozenData.map((item, i) => {
      return (
        <div key={i}>
          <li>
            {item.food} : {item.quantity}
          </li>
          <input
            className="add-button"
            type="button"
            onClick={() => {
              this.increment("+", i);
            }}
            value="+"
          />
          <input
            className="subtract-button"
            type="button"
            onClick={() => {
              this.increment("-", i);
            }}
            value="-"
          />
        </div>
      );
    });

    return (
      <div>
        <h1>The Frozen Food Department</h1>
        <ul>{frozenInventory}</ul>
      </div>
    );
  }
}

console.log(connect);

function mapStateToProps(state) {

  return {
    frozenData: state.frozen,
  };
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators(
    {
      updateFrozen: updateFrozen,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FrozenDept);

// ----------------------------------------------------------------------------------------------
// src/components/MeatDept.js
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import updateMeat from "../actions/meatInvUpdate";

class MeatDept extends Component {
  increment = (qChanage, index) => {
    this.props.updateMeat(qChanage, index);
  };

  render() {
    console.log(this.props.meatData);
    const meatInventory = this.props.meatData.map((item, i) => {
      return (
        <div key={i}>
          <li>
            {item.food} : {item.quantity}
          </li>
          <input type="button" onClick={() => this.increment(1, i)} value="+" />
          <input
            type="button"
            onClick={() => this.increment(-1, i)}
            value="-"
          />
        </div>
      );
    });

    return (
      <div>
        <h1>The meat Food Department</h1>
        <ul>{meatInventory}</ul>
      </div>
    );
  }
}

console.log(connect);

function mapStateToProps(state) {

  return {
    meatData: state.meat,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateMeat: updateMeat,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MeatDept);

// ----------------------------------------------------------------------------------------------
// src/components/ProduceDept.js
import React, { Component } from "react";
import { connect } from "react-redux";
import updateProduce from "../actions/produceInvUpdate";
import { bindActionCreators } from "redux";

class ProduceDept extends Component {
  increment = (qChange, index) => {
    this.props.updateProduce(qChange, index);
  };

  render() {
    console.log(this.props.produceData);
    const produceInventory = this.props.produceData.map((item, i) => {
      return (
        <div key={i}>
          <li>
            {item.food} : {item.quantity}
          </li>
          <input type="button" onClick={() => this.increment(1, i)} value="+" />
          <input
            type="button"
            onClick={() => this.increment(-1, i)}
            value="-"
          />
        </div>
      );
    });

    return (
      <div>
        <h1>The produce Food Department</h1>
        <ul>{produceInventory}</ul>
      </div>
    );
  }
}

console.log(connect);

function mapStateToProps(state) {

  return {
    produceData: state.produce,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateProduce: updateProduce,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProduceDept);
```
