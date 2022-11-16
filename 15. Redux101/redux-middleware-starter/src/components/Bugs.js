import { Component } from "react";
import { connect } from "react-redux";
import { getUnresolvedBugs, loadBugs, resolveBug } from "../store/bugs";

class Bugs extends Component {
  componentDidMount() {
    this.props.loadBugs();
  }

  render() {
    return (
      <ul>
        {this.props.bugs.map((bug) => (
          <div key={bug.id}>
            <li>{bug.description}</li>
            <button onClick={() => this.props.resolveBug(bug.id)}>
              Resolve
            </button>
          </div>
        ))}
      </ul>
    );
  }
}

// 첫번째 인자: 이 컴포넌트가 어떤 store 값에 관심이 있는가를 정의합니다.
// state.entities.bugs.list
// mapStateToProps 함수의 프로퍼티는 호출하는 컴포넌트의 props의 값으로 붙게됩니다.
// const mapStateToProps = (state) => ({
//   bugs: state.entities.bugs.list,
// });

const mapStateToProps = (state) => ({
  bugs: getUnresolvedBugs(state),
});

// 두번째 인자: 이 컴포넌트가 어떤 dispatch 값에 관심이 있는가를 정의합니다.
const mapDispatchToProps = (dispatch) => ({
  loadBugs: () => dispatch(loadBugs()),
  resolveBug: (id) => dispatch(resolveBug(id)),
});

// connect 함수는 higher-order-function 형태를 띕니다. 함수를 인자로 받고, 함수를 리턴하는 함수입니다.
// Higher-Order-Function 방식으로 동작했을 때, 내부적으로 subscribing and unsubscribing을 관리하기 때문에
// 이전이 Context를 사용했을 때 처럼 일일이 관리해주지 않아도됩니다.
// 모든 것은 this.props에 의존하고 있음을 알 수 있습니다.

// Container Component
// Wraps Presentation Component (Bugs)
// 개발자 도구를 통해 Components 탭에 들어가면
// Bugs 컴포넌트가 (React-Redux에 의해 생성된)ReactRedux.Provider 컴포넌트의 자식 요소로 위치해 있고,
// 그리고 ReactRedux.Provider 컴포넌트는 ConnectFunction 이라 불리는 컴포넌트를 리턴합니다.
export default connect(mapStateToProps, mapDispatchToProps)(Bugs);
