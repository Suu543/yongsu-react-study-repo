import { Component } from "react";
import axios from "axios";
import Headers from "./Header";
import Modal from "./Modal";

class App extends Component {
  constructor() {
    super();
    this.state = {
      temp: "",
      cityName: "",
      weather: "",
      high: "",
      low: "",
      icon: "",
      isRaining: "",
      showModal: true,
    };

    this.searchCity = this.searchCity.bind(this);
  }

  componentDidMount() {
    this.getCityWeather("London");
    let elems = document.querySelectorAll(".modal");
    let instances = window.M.Modal.init(elems);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.weather !== prevState.weather) {
      const isRaining = this.state.weather.includes("rain");

      if (isRaining) {
        this.setState({
          isRaining: "Rain rain go away!!",
        });
      }
    }
  }

  getCityWeather = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=e312dbeb8840e51f92334498a261ca1d`;
    axios.get(url).then((resp) => {
      console.log("resp: ", resp);

      this.setState({
        temp: resp.data.main.temp,
        cityName: resp.data.main.name,
        weather: resp.data.weather[0].description,
        high: resp.data.main.temp_max,
        low: resp.data.main.temp_min,
        icon: resp.data.weather[0].icon,
      });
    });
  };

  searchCity = (e) => {
    e.preventDefault();
    const city = document.getElementById("city").value;
    this.getCityWeather(city);
  };

  removeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const iconUrl = `http://openweathermap.org/img/w/${this.state.icon}.png`;

    return (
      <div className="App">
        <div className="row">
          <div className="col s6 offset-s3">
            <button onClick={this.removeModal} className="btn">
              Remove From DOM
            </button>
            <Headers temp={this.state.temp} isRaining={this.state.isRaining} />
            <a
              className="waves-effect waves-light btn modal-trigger"
              href="#modal1"
            >
              Modal
            </a>
            <form onSubmit={this.searchCity}>
              <input id="city" type="text" placeholder="Enter a City Name" />
              <input type="submit" />
            </form>
          </div>
        </div>
        {this.state.showModal ? (
          <Modal
            cityName={this.state.cityName}
            high={this.state.high}
            low={this.state.low}
            weather={this.state.weather}
            icon={iconUrl}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default App;
