class City extends React.Component {
  constructor() {
    super();
    console.log("City constructor");
    console.log("constructor-this: ", this);
  }

  render() {
    console.log("City render");
    console.log("render-this: ", this);

    return (
      <div className="city">
        <img src={this.props.image} />
        <div className="city-name">{this.props.city.name}</div>
        <div className="city-price">{this.props.city.price}</div>
      </div>
    );
  }
}
