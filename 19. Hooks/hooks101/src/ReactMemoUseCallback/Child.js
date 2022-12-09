const Child = ({ name, tellMe }) => {
  console.log("Child Component is rendered...");

  return (
    <div style={{ border: "2px solid powderblue", padding: "10px" }}>
      <h3>Child</h3>
      <p>name: {name}</p>
      <button onClick={tellMe}>Do you love me?</button>
    </div>
  );
};

export default Child;
