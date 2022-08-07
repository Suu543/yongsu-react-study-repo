class CitiesContainer extends React.Component {
  constructor() {
    super();
    console.log("CitiesContainer constructor");
    console.log("CitiesContainer-this: ", this);
  }

  render() {
    console.log("CitiesContainer render");
    console.log("CitiesContainer-this: ", this);

    const cities = this.props.data.map((city, i) => {
      const image = "https://loremflickr.com/400/300";
      return <Cite key={i} city={city} image={image} />;
    });

    return (
      <div className="row">
        <div className="cities center-align">{cities}</div>
      </div>
    );
  }
}
