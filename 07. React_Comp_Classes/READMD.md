## Components as Classes

`react`를 클래스 방식으로 변경해 `React.Component` 클래스를 상속하면, 상태 관리 및 이벤트 처리에 유용한 함수를 사용할 수 있습니다. 이 부분은 `lifecycle` 수업에서 이어서 하겠지만, 간단하게 소개해보자면, <br />

외부 사이트에서 데이터를 요청해 화면에 반영하는 시점은, 기본적인 `HTML`이 렌더링 된 이후 일 것입니다. 이러한 상황에 `React.Component`가 제공하는 함수를 사용하면 정확히 렌더링이 완료된 시점에 데이터를 받아 올 수 있습니다.
이러한 시점을 확실히 보장해주는 등 다양한 기능을 제공해주기 때문에 `class` 방식으로 `component`를 구성합니다.

하나 반드시 기억해야 할 점은 `class` 기반의 `component`를 통해 `jsx`를 리턴하고 싶은 경우에는 반드시 `render` 함수의 리턴값에 정의한 값을 `return` 해야 한다는 규칙을 지켜야 합니다. `render` 함수는 내부적으로 약속된 함수이기 때문에 이름을 바꾸지 않아도 됩니다. 또한 `constructor`에서 `super` 함수를 호출해야 부모 클래스인 `React.Component` 클래스의 함수를 사용할 수 있습니다. `constructor`는 가장 먼저 호출되는 함수라는 것이 중요합니다.
<br /><br />
인자로 받은 값에 접근하는 경우 `this.props`라는 키워드를 사용해 접근해야 합니다.
```javascript
// subclass Card
// superclass Component
// props ==> this
class Card extends React.Component {
  constructor() {
    super(); // In order to use cool stuffs in react components, we need to call super()
    console.log("Constructor Ran");
  }

  render() {
    console.log("Render Ran");

    return (
      <div className="col s2">
        <div className="card hoverable small">
          <div className="card-image">
            <img src={this.props.data.image} />
          </div>
          <div className="card-content">
            <p>{this.props.data.course}</p>
            <p>{this.props.data.instructor}</p>
          </div>
          <div className="card-action">
            <a href="#">$9.99</a>
          </div>
        </div>
      </div>
    );
  }
}
```