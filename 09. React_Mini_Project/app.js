// Class Based
// ReactDOM.render(
//   <div className="container cities">
//     <CitiesContainer data={data} />
//     <CitiesContainer data={data2} />
//   </div>,
//   document.getElementById("root")
// );

ReactDOM.render(
  <div className="container cities">
    <CitiesContainerFunc data={data} />
    <CitiesContainerFunc data={data2} />
  </div>,
  document.getElementById("root")
);
