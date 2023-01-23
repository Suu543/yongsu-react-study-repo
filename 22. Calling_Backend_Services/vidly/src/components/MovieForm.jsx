import React from "react";
import FormComp from "./common/FormComp";
import withRouter from "../hoc/withRouter";
import Form from "react-bootstrap/Form";
import Joi from "joi";
// import { getGenres } from "../services/fakeGenreService";
// import { saveMovie, getMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/genreService";
import { saveMovie, getMovie } from "../services/movieService";

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

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const { movieId } = this.props.params;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        return this.props.history.replace("/not-found");
      }
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
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

  doSubmit = async () => {
    await saveMovie(this.state.data);
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
