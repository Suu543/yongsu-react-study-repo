import React, { Component } from "react";
import axios from "axios";
import config from "./config";
import withRouter from "./withRouter";

class Movie extends Component {
  constructor() {
    super();
    this.state = {
      movie: {},
    };
  }

  componentDidMount() {
    const mid = this.props.params.movieId;
    const singleMovieUrl = `https://api.themoviedb.org/3/movie/${mid}?api_key=${config.api_key}`;
    axios.get(singleMovieUrl).then((res) => {
      this.setState({ movie: res.data });
    });
  }

  render() {
    if (this.state.movie.title === undefined) {
      return <h1>Loading...</h1>;
    }

    const movie = this.state.movie;
    const imageUrl = `http://image.tmdb.org/t/p/w300${movie.poster_path}`;
    return (
      <div>
        <img src={imageUrl} alt="Not Found" />
        <p>{movie.title}</p>
        <p>Budget: {movie.budget}</p>
        <p>Tagline: {movie.tagline}</p>
        <p>Overview: {movie.overview}</p>
      </div>
    );
  }
}

export default withRouter(Movie);
