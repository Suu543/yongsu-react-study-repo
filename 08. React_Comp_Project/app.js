// Function Version
// ReactDOM.render(<NavLinks data={data} />, document.getElementById("root"));

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

// Class Version
root.render(<CatNav data={data} />);
