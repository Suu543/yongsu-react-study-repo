const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

// Version #1
// root.render(
//   <div className="row">
//     <Card data={data[0]} />
//     <Card data={data[1]} />
//     <Card data={data[2]} />
//     <Card data={data[3]} />
//   </div>
// );

// Version #2

root.render(
  <div className="row">
    {data.map((course, i) => {
      return <Card data={course} key={i} />;
    })}
  </div>
);

// Keys help React identify which items have changed, are added, or are removed.
// [1, 2, 3, 4] ==> [1, 2, 4]

// Version #3
const cards = data.map((course, i) => {
  return <Card key={i} data={course} />;
});

root.render(
  <div className="row">
    {data.map((course, i) => {
      return <Card data={course} key={i} />;
    })}
  </div>
);

root.render(<div className="row">{cards}</div>);
