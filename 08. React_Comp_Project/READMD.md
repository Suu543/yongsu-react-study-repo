## Props Drilling

React에서 부모 자식 관계가 형성되면 부모 컴포넌트는 자식 컴포넌트에게 props를 전달할 수 있습니다. props는 자식 컴포넌트에게 전달되는 데이터입니다. 자식 컴포넌트는 props를 사용하여 화면에 표시할 내용을 결정합니다.

props는 일방향으로 전달됩니다. 즉, 부모 컴포넌트는 자식 컴포넌트에게 props를 전달할 수 있지만, 자식 컴포넌트는 부모 컴포넌트에게 props를 전달할 수 없습니다.

props는 readonly로 전달됩니다. 즉, 자식 컴포넌트는 props를 수정할 수 없습니다.

props는 글로벌(최상위 부모) 단에서 데이터를 전달할 때는 노출되어도 상관없는 데이터를 전달해야 합니다.

예를 들어, 다음은 부모 컴포넌트가 자식 컴포넌트에게 props를 전달하는 예입니다.

```
function ParentComponent() {
  return (
    <div>
      <ChildComponent name="John Doe" />
    </div>
  );
}

function ChildComponent(props) {
  const name = props.name;

  return (
    <div>
      Hello, {name}!
    </div>
  );
}
```

이 코드에서 ParentComponent 컴포넌트는 ChildComponent 컴포넌트에게 name props를 전달합니다. ChildComponent 컴포넌트는 name props를 사용하여 화면에 "Hello, John Doe!"라는 텍스트를 표시합니다.

props는 React에서 데이터를 전달하는 데 중요한 개념입니다. props를 사용하여 컴포넌트 간에 데이터를 전달할 수 있습니다.
