## Components as Classes

React Classes는 상태 관리 및 이벤트 처리에 유용한 기능을 제공하며, React Hook이 등장하기 전까지는 React에서 가장 일반적인 컴포넌트 작성 방식이었습니다.

그러나 React Hook이 등장한 이후로 React Classes의 사용이 줄어들고 있습니다. React Hook은 React Classes와 같은 기능을 제공하지만, 더 간결하고 직관적인 코드로 작성할 수 있다는 장점이 있습니다.

결론적으로, React Classes는 여전히 사용되고 있지만, React Hook이 등장한 이후로 React Classes의 사용이 줄어들고 있습니다.

그럼이도 React Classes를 공부해야 하는 이유는 다음과 같습니다.

- React Hook이 등장하기 전까지는 React에서 가장 일반적인 컴포넌트 작성 방식이었기 때문에, React Classes에 대한 이해는 React 개발의 기초가 됩니다.
- React Hook은 React Classes와 같은 기능을 제공하지만, React Hook이 등장한 이후에도 React Classes는 여전히 사용되고 있습니다. 따라서 React Classes에 대한 이해는 React 개발에서 여전히 필요합니다.
- React Hook은 React Classes와 비교하여 더 간결하고 직관적인 코드로 작성할 수 있다는 장점이 있지만, React Classes가 제공하는 모든 기능을 제공하지는 않습니다. 따라서 React Hook을 사용하기 전에 React Classes에 대한 이해가 필요합니다.

결론적으로, React Hook이 등장한 이후에도 React Classes에 대한 이해는 React 개발에서 여전히 필요합니다.

---

React에서 클래스 방식으로 컴포넌트를 작성하면, 상태 관리 및 이벤트 처리에 유용한 함수를 사용할 수 있습니다. 이 부분은 생명주기 수업에서 자세히 다루겠지만, 간단하게 소개해보자면,

외부 사이트에서 데이터를 요청하여 화면에 반영하는 시점은 기본적인 HTML이 렌더링 된 이후일 것입니다. 이러한 상황에서 React.Component가 제공하는 함수를 사용하면 정확하게 렌더링이 완료된 시점에 데이터를 가져올 수 있습니다.

이러한 시점을 확실히 보장해주는 등 다양한 기능을 제공해주기 때문에 클래스 방식으로 컴포넌트를 구성합니다.

클래스 기반의 컴포넌트를 통해 JSX를 반환하고 싶은 경우에는 반드시 render 함수의 리턴값에 정의한 값을 반환해야 한다는 규칙을 지켜야 합니다. render 함수는 내부적으로 약속된 함수이기 때문에 이름을 바꾸지 않아도 됩니다. 또한 생성자에서 super() 함수를 호출해야 부모 클래스인 React.Component 클래스의 함수를 사용할 수 있습니다. 생성자는 가장 먼저 호출되는 함수라는 것이 중요합니다.

인자로 받은 값에 접근하는 경우 this.props라는 키워드를 사용해 접근해야 합니다.

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
