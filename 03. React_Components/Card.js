function Card(props) {
  return (
    <div className="row">
      <div className="col s2">
        <div className="card hoverable small">
          <div className="card-image">
            <img src="http://lorempixel.com/400/400/nature/" />
          </div>
          <div className="card-content">
            <p>{props.title}</p>
            <p>{props.name}</p>
          </div>
          <div className="card-action">
            <a href="#">${props.price}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
