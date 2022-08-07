// subclass Card
// superclass Component
// props ==> this
class Card extends React.Component {
  constructor() {
    super(); // In order to use cool stuffs in react components, we need to call super()
    console.log("Constructor Ran");
  }

  render() {
    console.log("Render Ran");

    return (
      <div className="col s2">
        <div className="card hoverable small">
          <div className="card-image">
            <img src={this.props.data.image} />
          </div>
          <div className="card-content">
            <p>{this.props.data.course}</p>
            <p>{this.props.data.instructor}</p>
          </div>
          <div className="card-action">
            <a href="#">$9.99</a>
          </div>
        </div>
      </div>
    );
  }
}
