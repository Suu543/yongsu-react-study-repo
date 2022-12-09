const Child = ({ name }) => {
  console.log("Child Component is rendered...");

  return (
    <div style={{ border: "2px solid powderblue", padding: "10px" }}>
      <h3>Child</h3>
      <p>FirstName: {name.firstName}</p>
      <p>LastName: {name.lastName}</p>
    </div>
  );
};

export default Child;
