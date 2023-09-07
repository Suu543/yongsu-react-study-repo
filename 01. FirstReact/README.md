# Introduction

## What is React?

UI는 '사용자 인터페이스'라는 뜻으로, 컴퓨터나 디지털 기기를 사용할 때 사용자와 기기 사이의 상호작용을 가능하게 해주는 모든 요소들을 말합니다. 우리가 스마트폰, 컴퓨터, 태블릿 등을 사용할 때 보이는 버튼, 메뉴, 화면 디자인 등이 UI의 일부입니다.

UI는 사용자가 디지털 기기와 소통하는 방식을 쉽고 편리하게 만들어주는 역할을 합니다. 예를 들어, 스마트폰의 홈 화면에는 앱 아이콘들이 있고, 터치하여 앱을 실행할 수 있습니다. 이런 앱 아이콘들도 UI의 일부입니다.

또한, UI는 사용자가 디지털 기기에서 원하는 작업을 수행할 수 있도록 도와줍니다. 예를 들어, 웹 브라우저에서 주소를 입력하여 웹페이지를 열거나, 온라인 게임에서 키보드와 마우스를 사용하여 캐릭터를 조작하는 것도 UI의 일부입니다.

UI는 사용자 경험(User Experience)을 개선하는 데 중요한 역할을 합니다. 즉, 사용자가 기기를 사용하는 동안 즐겁고 편안한 경험을 제공하기 위해 디자인되어야 합니다. 사용자가 쉽게 이해하고 다룰 수 있는 UI를 제공하면, 사용자는 원하는 작업을 쉽게 수행할 수 있고 기기를 효과적으로 활용할 수 있습니다.

따라서, UI는 사용자와 디지털 기기 사이의 상호작용을 가능하게 해주는 디자인과 기능들의 모음이라고 할 수 있습니다.

1995년: Java, PHP, Ruby, Apache, JavaScript 언어가 탄생한 시기입니다. 이 시기에 Netscape (당시 유일한 브라우저였다)는 웹 개발에 착수했습니다. 당시 웹 사이트는 약 23,000개 정도 있었습니다.

1999년: JavaScript를 제외한 다른 언어는 서버용으로 간주되는 무거운 언어였으며, JavaScript은 가벼운 언어로 간주되었습니다.

2005년: jQuery, AJAX, iOS/Android가 세상에 나오기 시작했습니다. 당시 약 1억 개의 웹사이트가 존재했습니다. 당시 브라우저 간의 제약 사항이 달랐기 때문에 웹 사이트 개발이 어려웠습니다. jQuery를 이용하면 하나의 방식으로 모든 브라우저에서 잘 동작하도록 함으로써 이 문제를 해결해주었습니다.

2010년: V8/Node, Angular/Backbone 등이 출시되기 시작했습니다. 넷플릭스도 초기에 Angular/Backbone을 이용해 개발되었습니다.

2010년: jQuery는 웹사이트를 구현에 필요한 코드를 획기적으로 줄여주었습니다. 그럼에도 웹사이트가 너무 거대해졌을 때, 똑같이 코드 분량이 많아진다는 문제가 발생했습니다. Angular/Backbone이 출시되고 이 문제를 해결하기 시작했습니다.

2013년: React가 출시되었습니다.

### How can we modernize web development?

과거에는 웹 개발이 현대화되기 이전에 화살표를 코드라고 가정했을 때, 다양한 기능의 코드들이 한 곳에 모여있는 것을 확인할 수 있었습니다. 이러한 방식은 유지보수와 관리가 어렵다는 문제점을 가지고 있었습니다.

<img src="https://cdn-images-1.medium.com/max/800/1*lN_PQvO4XRU3BhbyP78ETg.png" />

React와 같은 라이브러리는 이러한 문제를 혁신적으로 해결했습니다. 기능별이나 페이지별로 코드를 분리하고 따로 관리하는 것이 가능해졌으며, 동시에 원하는 경우 코드를 자유롭게 추가, 삭제, 갱신, 수정할 수 있게 되었습니다. 아래의 그림과 같이 코드의 모듈화와 재사용성을 높일 수 있어 개발 과정이 훨씬 간단하고 효율적으로 이루어질 수 있게 되었습니다.

<img src="https://cdn-images-1.medium.com/max/800/1*joH4WBOH427k6eALZZRSyw.png" />

React 도입 이전과 현재의 웹 개발의 차이점을 자동차에 비유하여 설명해드리겠습니다.

이전에는 웹 개발은 수동 변속기를 가진 옛날 자동차와 유사했습니다. 모든 작업은 개발자의 수동 조작과 관리에 의해 이루어져야 했습니다. 개발자는 매번 모든 코드를 일일이 작성하고 관리해야 했으며, 새로운 요구사항이나 변경사항이 있을 때마다 모든 부분을 직접 수정해야 했습니다. 이는 개발 과정에서 많은 시간과 노력을 요구하며, 버그가 발생할 가능성도 높았습니다. 마치 수동 변속의 자동차처럼 개발자가 모든 것을 직접 제어해야 하는 상황이었습니다.

하지만 React 도입 이후에는 자동 변속기를 갖춘 현대 자동차로 비유할 수 있습니다. React는 개발자에게 자동화된 기능을 제공하여 개발 프로세스를 훨씬 효율적으로 만들어줍니다. React 컴포넌트를 사용하면 개발자는 코드를 작은 단위로 분리하고, 재사용 가능한 컴포넌트로 구성할 수 있습니다. 이렇게 모듈화된 컴포넌트는 개발자가 필요에 따라 자유롭게 조합하고 구성할 수 있습니다. 즉, 마치 자동 변속의 자동차처럼 개발자는 기능별로 코드를 선택하고 조합함으로써 웹 애플리케이션을 구축할 수 있습니다.

또한, React의 가상 DOM은 변경된 부분만을 업데이트하는 최적화된 방식을 제공합니다. 이는 자동차의 스마트한 엔진과 비슷한 개념으로, 필요한 부분만 빠르게 업데이트하여 성능을 향상시킵니다. 이로써 웹 애플리케이션은 빠르고 반응적인 사용자 경험을 제공할 수 있습니다.

따라서, React 도입 이전과 현재의 웹 개발은 개발자가 모든 것을 수동으로 조작해야 하는 상황에서 자동화된 기능을 갖춘 현대 자동차로 전환되었습니다. 이는 개발 프로세스를 효율적으로 만들어주고, 유지보수성을 향상시켜 개발자들이 더욱 효과적으로 웹 애플리케이션을 개발할 수 있게 해줍니다.

---

React는 웹 개발을 현대화하는 데 많은 영향을 미쳤습니다. 다음은 React가 웹 개발에 어떻게 현대화를 가져왔는지 알려드리겠습니다:

1. **컴포넌트 기반 개발**: React는 UI를 작은 독립적인 컴포넌트로 분리하여 개발하는 컴포넌트 기반 아키텍처를 제공합니다. 이로써 재사용 가능하고 모듈화된 컴포넌트를 구성할 수 있으며, 개발자는 각 컴포넌트를 독립적으로 관리하고 업데이트할 수 있습니다. 이는 코드의 가독성과 유지보수성을 향상시키며 개발 생산성을 높입니다. 예를 들어, 웹 애플리케이션에서 헤더, 사이드바, 본문, 푸터 등 각각의 구성 요소를 독립적인 컴포넌트로 만들 수 있습니다. 이러한 컴포넌트들은 재사용 가능하며, 필요한 곳에서 쉽게 조합하여 사용할 수 있습니다.

2. **가상 DOM (Virtual DOM)**: React는 가상 DOM을 사용하여 업데이트를 최적화합니다. 가상 DOM은 메모리에 존재하는 가상의 DOM 트리로써, 변경된 부분만을 실제 DOM에 적용합니다. 이를 통해 불필요한 DOM 조작을 줄이고 성능을 향상시킵니다. React의 가상 DOM은 실제 DOM과 동기화되어 브라우저에 효율적으로 업데이트됩니다. 데이터 변경 시, React는 가상 DOM에서 변경된 부분만을 실제 DOM에 적용하여 불필요한 DOM 조작을 최소화합니다.

3. **단방향 데이터 흐름**: React는 단방향 데이터 흐름을 사용하여 데이터의 일관성과 예측 가능성을 높입니다. 컴포넌트 간에 데이터를 전달할 때는 상위 컴포넌트에서 하위 컴포넌트로만 전달하며, 데이터의 변경은 상위 컴포넌트에서 관리됩니다. 이로써 데이터의 흐름을 추적하기 쉽고 버그를 줄일 수 있습니다. 예를 들어, 부모 컴포넌트에서 상태(state)를 관리하고 이를 하위 컴포넌트에 props로 전달하는 방식을 사용합니다. 하위 컴포넌트에서는 전달받은 props를 읽기만 하고, 데이터 변경은 부모 컴포넌트에서 처리합니다. 이를 통해 데이터의 일관성과 예측 가능성을 유지할 수 있습니다.

4. **재사용 가능한 UI 컴포넌트**: React는 재사용 가능한 UI 컴포넌트를 구축하기에 적합합니다. 컴포넌트의 재사용성은 개발 생산성을 높이고 코드의 일관성을 유지하는 데 도움이 됩니다. React의 컴포넌트 생태계는 다양한 UI 라이브러리와 컴포넌트를 제공하며, 이를 활용하여 개발 시간을 단축시킬 수 있습니다. 예를 들어, 버튼, 입력 필드, 모달 창 등과 같은 UI 요소들을 컴포넌트로 작성하고, 필요한 곳에서 재사용할 수 있습니다. 이를 통해 개발 시간을 단축하고 일관성 있는 UI를 유지할 수 있습니다.

5. **생태계와 커뮤니티**: React는 활발하고 성숙한 개발자 커뮤니티와 함께 발전하고 있습니다. 많은 개발자들이 React를 사용하며, React와 관련된 다양한 라이브러리, 도구, 문서, 튜토리얼 등이 제공되어 개발자들의 지원과 협업을 촉진합니다. 예를 들어, Material-UI, React Router, Redux 등 다양한 라이브러리와 도구들이 React 생태계에 속해 있으며, 개발자들은 이러한 자원들을 활용하여 웹 개발을 보다 쉽고 효율적으로 수행할 수 있습니다.

React의 위의 특징들은 웹 개발을 보다 효율적이고 유지보수가 용이한 방향으로 현대화시키는 데 큰 도움을 주었습니다.

### React Keywords

- JSX
- ES6
  - Babel
  - Webpack/node
- VirtualDOM

---

#### DOM vs VirtualDOM

DOM(Document Object Model)은 HTML 문서의 계층 구조를 나타내는 객체 모델입니다. HTML 문서의 각 요소들은 DOM의 노드로 표현되며, 이 노드들은 트리 구조로 연결되어 있습니다. DOM은 웹 페이지의 구조를 표현하고, JavaScript를 사용하여 해당 요소들을 조작하고 업데이트할 수 있게 해줍니다.

하지만 DOM을 직접 조작할 때에는 성능 이슈가 발생할 수 있습니다. 왜냐하면 실제 DOM은 웹 페이지의 모든 요소를 표현하기 위해 메모리에 로드되기 때문에, DOM을 업데이트할 때마다 많은 자원과 시간이 소비될 수 있습니다. 특히 웹 페이지가 복잡하고 대규모일수록 DOM 조작은 느려지고 비효율적일 수 있습니다.

이에 반해, VirtualDOM은 메모리에 가상으로 구현된 DOM 트리입니다. VirtualDOM은 실제 DOM의 가벼운 복사본이라고 생각할 수 있습니다. 웹 페이지의 변경사항을 VirtualDOM에 적용하여 업데이트한 후, 실제 DOM과 비교하여 변경된 부분만 실제 DOM에 적용합니다. 이를 통해 실제 DOM 조작을 최소화하고, 효율적인 업데이트를 할 수 있습니다.

VirtualDOM은 변경사항을 일괄적으로 처리하기 때문에, DOM 조작이나 업데이트 과정에서 생기는 성능 저하를 줄일 수 있습니다. 또한, VirtualDOM은 업데이트할 부분을 효율적으로 찾아내기 때문에 DOM 조작에 필요한 연산을 최적화할 수 있습니다.

JSX는 VirtualDOM과 함께 사용되는 개념으로, JavaScript와 HTML을 결합한 문법입니다. JSX를 사용하면 JavaScript 코드 안에서 HTML 요소를 직접 작성할 수 있습니다. JSX 코드는 컴파일러를 통해 JavaScript 코드로 변환되어 실행됩니다. 이를 통해 JSX는 VirtualDOM과 함께 사용되어 효율적인 웹 개발을 가능하게 합니다.

따라서, VirtualDOM은 실제 DOM 조작의 효율성을 개선하고, JSX는 JavaScript와 HTML을 통합하여 웹 개발을 용이하게 합니다.

---

DOM과 Virtual DOM의 차이를 실생활에 비유하여 설명해드리겠습니다.

DOM은 실제로 존재하는 가구와 집의 구조라고 생각해볼 수 있습니다. 가구와 집의 구조는 실제로 존재하며, 우리는 집 안의 가구를 조작하고 배치할 수 있습니다. 이는 웹 페이지의 구조를 나타내는 객체 모델로, 실제 HTML 요소를 트리 구조로 표현합니다.

반면에 Virtual DOM은 가구와 집의 구조를 복제한 가벼운 모형이라고 생각할 수 있습니다. 가구와 집의 복제 모형은 실제로는 집안의 가구와 동일한 모양이지만, 조금 더 가볍고 쉽게 조작할 수 있습니다. 이는 React와 같은 라이브러리에서 사용되며, 실제 DOM과 동기화되어 변경 사항을 효율적으로 업데이트합니다.

실제 DOM을 조작하려면 많은 비용과 시간이 소요되지만, Virtual DOM은 가벼우며 빠르게 조작할 수 있습니다. 가구와 집의 복제 모형은 변경 사항을 일괄적으로 적용하므로, 실제 가구와 집을 조작하는 것보다 효율적입니다. 마치 집 안의 가구를 변경할 때 실제로는 가구를 한 번에 업데이트하는 것이 아니라, 복제된 모형을 업데이트한 후 한 번에 실제 가구에 적용하는 것과 비슷합니다.

이렇게 실생활에서의 비유를 통해 설명하면, DOM은 실제 가구와 집의 구조에 해당하고, Virtual DOM은 가구와 집의 복제 모형에 해당한다는 것을 이해할 수 있습니다. Virtual DOM을 사용하면 변경 사항을 효율적으로 처리하여 웹 애플리케이션의 성능을 향상시킬 수 있습니다.

---

메모리에 로드되는 것은 컴퓨터의 작업 공간인 메모리(RAM)에 데이터를 저장하는 것을 의미합니다. 메모리는 컴퓨터가 프로그램을 실행하고 작업을 처리하는 동안 필요한 데이터와 명령을 일시적으로 저장하는 공간입니다.

웹 페이지를 로드할 때, 브라우저는 HTML, CSS, JavaScript 코드 등의 데이터를 메모리에 로드합니다. 이렇게 로드된 데이터는 컴퓨터의 메모리에 저장되어, 웹 페이지를 표시하고 동작시키는 데 필요한 정보들을 가지고 있습니다.

예를 들어, 웹 페이지의 HTML 코드는 웹 브라우저가 이해하고 표시할 수 있는 형식으로 메모리에 로드됩니다. 이렇게 로드된 HTML 코드는 브라우저가 페이지를 렌더링하고 화면에 표시할 때 사용됩니다. 마찬가지로, CSS 스타일시트도 메모리에 로드되어 웹 페이지의 디자인을 지정하고 JavaScript 코드는 웹 페이지의 동작을 제어하는 데 사용됩니다.

메모리에 데이터를 로드하는 것은 해당 데이터를 컴퓨터가 실제로 활용할 수 있도록 준비하는 과정이라고 생각할 수 있습니다. 로드된 데이터는 컴퓨터가 필요한 시점에 접근하여 처리하고, 웹 페이지를 구성하고 제어하는 데 사용됩니다.

DOM과 VirtualDOM 둘 다 메모리에 로드됨에도 VirtualDOM 성능이 더 좋은 이유는 다음과 같습니다.

VirtualDOM이 성능이 더 좋은 이유는 다음과 같습니다:

1. **업데이트 최적화**: VirtualDOM은 변경된 부분만을 감지하고 업데이트합니다. 실제 DOM은 모든 요소를 다루기 때문에, 한 요소를 업데이트할 때에도 전체 DOM을 다시 검사해야 합니다. 반면에 VirtualDOM은 가상의 복사본을 사용하여 변경된 부분을 효율적으로 찾아내고 업데이트할 수 있습니다. 이는 실제 DOM보다 더 빠른 업데이트를 가능하게 합니다.

2. **배치와 렌더링 최적화**: 실제 DOM에 변경사항이 발생하면, 브라우저는 다시 배치(layout)와 렌더링(rendering)을 수행해야 합니다. 이는 웹 페이지의 구성 요소를 재배치하고 다시 그리는 과정을 의미합니다. VirtualDOM은 업데이트된 요소들을 가상으로 처리하고, 최적의 배치와 렌더링을 계획적으로 수행할 수 있습니다. 이는 실제 DOM 조작보다 효율적인 렌더링을 가능하게 합니다.

3. **일괄 처리**: VirtualDOM은 변경사항을 일괄 처리합니다. 여러 번의 DOM 조작을 하나의 업데이트로 묶어서 처리할 수 있습니다. 이는 불필요한 렌더링을 줄이고 성능을 향상시킵니다. 실제 DOM은 개별적인 조작에 따라 여러 번의 렌더링이 발생할 수 있습니다.

4. **가상 처리**: VirtualDOM은 실제 DOM이 아닌 메모리 상의 가상 객체로 동작하기 때문에, 브라우저의 실제 DOM 조작에 비해 상대적으로 빠릅니다. 가상 객체는 JavaScript의 객체로써 처리되기 때문에, JavaScript의 빠른 처리 속도를 활용할 수 있습니다.

이러한 이유로 VirtualDOM은 변경사항을 효율적으로 처리하고 DOM 조작의 비용을 줄여 성능을 개선할 수 있습니다. 하지만 가장 효율적인 방법은 실제 사용 환경에서 측정하고 비교하는 것이므로, 개발자는 실제 프로젝트에 적용해보고 성능을 평가해야 합니다.

#### JSX & VirtualDOM

VirtualDOM은 웹 개발에서 사용되는 개념 중 하나로, 웹 페이지를 만들 때 사용되는 HTML 요소들을 컴퓨터 내부에서 효율적으로 관리하기 위한 방법입니다. 웹 페이지는 보통 많은 수의 HTML 요소로 이루어져 있기 때문에, 이를 관리하고 업데이트하는 작업은 복잡할 수 있습니다. VirtualDOM은 이러한 문제를 해결하기 위해 만들어진 개념입니다.

VirtualDOM은 웹 페이지의 실제 DOM(문서 객체 모델)을 메모리 상에 가상으로 만들어서 관리합니다. 실제 DOM은 HTML 요소들의 계층 구조를 나타내는 트리 형태로 되어 있습니다. VirtualDOM은 이 트리 구조를 가상으로 생성하여, 웹 페이지의 변경사항을 효율적으로 계산하고 업데이트합니다.

JSX는 JavaScript와 HTML을 결합한 문법입니다. JSX를 사용하면 JavaScript 코드 안에서 HTML 요소를 직접 작성할 수 있습니다. 이렇게 작성된 JSX 코드는 컴파일러를 통해 JavaScript 코드로 변환되어 실행됩니다.

예를 들어, JSX로 작성된 코드에서 `<div>`는 HTML의 `<div>` 요소를 나타내며, JavaScript 코드 안에서 변수나 함수를 사용할 수도 있습니다. JSX를 사용하면 HTML과 JavaScript를 함께 작성하고, 이를 효율적으로 변환하여 사용할 수 있게 됩니다.

이렇게 VirtualDOM과 JSX는 웹 개발에서 사용되는 중요한 개념입니다. VirtualDOM은 웹 페이지의 효율적인 업데이트를 도와주고, JSX는 JavaScript와 HTML을 쉽게 결합할 수 있게 해줍니다.

```javascript
// npm init -y
// npm install express
```

- React-CDN: https://reactjs.org/docs/cdn-links.html
- babel-standalone: https://cdnjs.com/libraries/babel-standalone
  - minified 버전 사용하기

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script
      crossorigin
      src="https://unpkg.com/react@18/umd/react.production.min.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
    ></script>
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"
      integrity="sha512-kp7YHLxuJDJcOzStgd6vtpxr4ZU9kjn77e6dBsivSz+pUuAuMlE2UTdKB7jjsWT84qbS8kdCWHPETnP/ctrFsA=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    ></script>
  </head>
  <body>
    <div id="root"></div>

    /* HTML과 JS를 섞어서 사용하고 있는 것을 볼 수 있습니다. */
    <script type="text/babel">
      const container = document.getElementById("root");
      const root = ReactDOM.createRoot(container);
      const SanityComp = <h1>Sanity Check</h1>;
      root.render(<h1>Hello World</h1>);
    </script>
  </body>
</html>
```

- 서버를 실행하고 localhost:3000에 접속했을 때 화면이 표시되지 않는 경우, 폴더이름/index.html에 접속하면 화면이 표시됩니다.

## What Just Happened?

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>

    /* 1. react */
    <script
      crossorigin
      src="https://unpkg.com/react@18/umd/react.production.min.js"
    ></script>

    /* 2. react-dom => ReactDOM.render() 함수를 사용하게 해줍니다. */
    <script
      crossorigin
      src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
    ></script>

    /* 3. Babel */
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"
      integrity="sha512-kp7YHLxuJDJcOzStgd6vtpxr4ZU9kjn77e6dBsivSz+pUuAuMlE2UTdKB7jjsWT84qbS8kdCWHPETnP/ctrFsA=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    ></script>
  </head>
  <body>
    <div id="root"></div>

    <script type="text/babel">
      /* 4. render의 인자 값으로 작성한 값은 JSX로 작성한 값입니다. */
      const container = document.getElementById("root");
      const root = ReactDOM.createRoot(container);
      const SanityComp = <h1>Sanity Check</h1>;
      root.render(<h1>Hello World</h1>);
    </script>
  </body>
</html>
```

1. `babel`을 먼저 이해해보자

- Babel은 모든 브라우저가 이해할 수 있도록 ES6 JavaScript 코드를 컴파일해주는 도구입니다.
- https://babeljs.io/

```javascript
// Put in next-gen JavaScript
() => 2

// Get Browser-Compatible JavaScript Out
(function () {
    return 2;
});

// ---------------------------
// Babel => Try it out
() => <h2>Sanity Check</h2>

// "use strict";

() => /*#__PURE__*/React.createElement("h1", null, "Sanity Check");
```

요약:

1. `babel`은 `text/babel` 형식으로 컴파일을 수행합니다.
2. `React.DOM` 함수는 두 번째 CDN (react-dom)에서 찾아 호출됩니다.
3. `<h1></h1>` 형태인 첫 번째 인자는 `babel` 컴파일러를 통해 `React.createElement()`로 컴파일됩니다.
4. `React.createElement` 함수는 첫 번째 CDN (react)에서 찾아 호출됩니다.
5. `JSX`가 반환되고 React의 방식에 따라 실행됩니다.

- https://reactjs.org/docs/react-api.html#createelement
- https://www.freecodecamp.org/news/jsx-in-react-introduction/
