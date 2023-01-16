const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

const cards = data.map((course, i) => {
  return <Card key={i} data={course} />;
});

root.render(<div className="row">{cards}</div>);
