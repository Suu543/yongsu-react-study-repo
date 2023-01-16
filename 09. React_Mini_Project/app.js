// Class Based
// ReactDOM.render(
//   <div className="container cities">
//     <CitiesContainer data={data} />
//     <CitiesContainer data={data2} />
//   </div>,
//   document.getElementById("root")
// );

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <div className="container cities">
    <CitiesContainer data={data} />
    <CitiesContainer data={data2} />
  </div>
);
