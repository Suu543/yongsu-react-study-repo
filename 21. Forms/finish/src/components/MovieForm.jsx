import React from "react";
import FormComp from "./common/FormComp";
import withRouter from "../hoc/withRouter";
import Form from "react-bootstrap/Form";
import Joi from "joi";
import { getGenres } from "../services/fakeGenreService";
import { saveMovie, getMovie } from "../services/fakeMovieService";

class MovieForm extends FormComp {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    errors: {},
    genres: [],
  };

  schema = Joi.object({
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate"),
  });

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const { movieId } = this.props.params;
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.navigate("/movies");
  };

  render() {
    return (
      <div className="container">
        <h1>Movie Form</h1>
        <Form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title", "formBasicTitle", "text")}
          {this.renderSelect(
            "genreId",
            "Genre",
            "formBasicGenre",
            this.state.genres
          )}
          {this.renderInput(
            "numberInStock",
            "Number In Stock",
            "formBasicNumberInStock",
            "number"
          )}
          {this.renderInput(
            "dailyRentalRate",
            "Rate",
            "formBasicRate",
            "number"
          )}
          {this.renderButton("Save")}
        </Form>
      </div>
    );
  }
}

export default withRouter(MovieForm);
