import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Headers from "./Headers";
import Modal from "./Modal";

class App extends Component {
  constructor() {
    console.log("Constructor is running...");
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
  }

  componentDidMount() {
    console.log("ComponentDidMount is running...");
    this.getCityWeather("London");
    // M = materialize
    let elems = document.querySelectorAll(".modal");
    let instances = window.M.Modal.init(elems);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("ComponentDidUpdate is running...");
    // console.log(prevProps);
    // console.log(prevState);
    // console.log(snapshot);

    if (this.state.weather !== prevState.weather) {
      const isRaining = this.state.weather.includes("rain");
      if (isRaining) {
        this.setState({
          isRaining: "Rain rain go away!!!",
        });
      }
    }
  }

  searchCity = (e) => {
    e.preventDefault();
    // console.log("Form Submitted!!!");
    const city = document.getElementById("city").value;
    this.getCityWeather(city);
  };

  getCityWeather = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=e312dbeb8840e51f92334498a261ca1d`;
    console.log(city);
    axios.get(url).then((res) => {
      this.setState({
        temp: res.data.main.temp,
        cityName: res.data.name,
        weather: res.data.weather[0].main,
        high: res.data.main.temp_max,
        low: res.data.main.temp_min,
        icon: res.data.weather[0].icon,
        showModal: true,
      });
    });
  };

  removeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    console.log("render is running...");
    const iconUrl = `http://openweathermap.org/img/wn/${this.state.icon}.png`;

    return (
      <div className="App">
        <div className="row">
          <div className="col s6 offset-s3">
            <button onClick={this.removeModal} className="btn">
              Remove from DOM!!
            </button>
            <Headers temp={this.state.temp} isRaining={this.state.isRaining} />
            <a
              className="waves-effect waves-light btn modal-trigger"
              href="#modal1"
            >
              Details
            </a>
            <form onSubmit={this.searchCity}>
              <input id="city" type="text" placeholder="Enter a city name" />
            </form>
          </div>
        </div>

        {this.state.showModal ? (
          <Modal
            iconUrl={iconUrl}
            weather={this.state.weather}
            cityName={this.state.cityName}
            low={this.state.low}
            high={this.state.high}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default App;
