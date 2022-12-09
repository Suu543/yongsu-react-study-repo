const Child = ({ name, age }) => {
  console.log("Child Component is rendered...");

  return (
    <div style={{ border: "2px solid powderblue", padding: "10px" }}>
      <h3>Child</h3>
      <p>name: {name}</p>
      <p>age: {age}</p>
    </div>
  );
};

export default Child;
