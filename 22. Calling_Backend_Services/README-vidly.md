# Vidly - Connect Frontend to the Backend

## Adding HTTP and Log Services

```javascript
// src/services/httpService.js
import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

// args
// 1. success
// 2. fail
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    // console.log("Logging the error: ", error);
    logger.log(error);
    toast("An unexpected error occurred");
  }

  return Promise.reject(error);
});

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default http;
```

```javascript
// services/logService.js
export function init() {}
export function log(error) {
  console.error(error);
}
```

```cmd
npm install react-toastify
```

```javascript
// App.js
import { Component } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Customers from "./components/Customer";
import Rentals from "./components/Rentals";
import NotFound from "./components/NotFound";
import Movies from "./components/Movies";
import NavBar from "./components/NavBar";
import MovieForm from "./components/MovieForm";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ToastContainer />
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate replace to="/movies" />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieForm />} />
          <Route path="customers" element={<Customers />} />
          <Route path="rentals" element={<Rentals />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
```

## Replacing FakeGenreService

```javascript
// src/services/genreService.js
import http from "./httpService";

export function getGenres() {
  return http.get("http://localhost:3001/api/genres");
}
```

```javascript
// src/components/Movies.jsx
import { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
// import { getGenres } from "../services/fakeGenreService";
import { getGenres } from "../services/genreService";
import ListGroup from "./common/ListGroupComp";
import PaginationComp from "./common/PaginationComp";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import MoviesTable from "./MoviesTable";
import SearchBox from "./common/SearchBox";
import _ from "lodash";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      genres: [],
      pageSize: 4,
      currentPage: 1,
      selectedGenre: "",
      searchQuery: "",
      sortColumn: { path: "title", order: "asc" },
    };
  }

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    this.setState({ movies: getMovies(), genres, selectedGenre: genres[0] });
  }

  handleLike = (movie) => {
    // console.log("Like");
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
  };

  handleDelete = (movie) => {
    // console.log(movie);
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    // console.log(page);
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    // console.log(genre);
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    // console.log(path)
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      selectedGenre,
      pageSize,
      sortColumn,
      currentPage,
      movies: allMovies,
      searchQuery,
    } = this.state;

    // 검색 로직
    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      selectedGenre,
      genres,
      sortColumn,
      searchQuery,
    } = this.state;

    if (count === 0)
      return <p>모든 영화가 삭제되었습니다 (영화가 존재하지 않습니다).</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="container mt-2">
        <div className="row">
          <div className="col-2">
            <ListGroup
              items={genres}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <Link
              className="btn btn-primary"
              to="/movies/new"
              style={{ marginBottom: "20px" }}
            >
              New Movie
            </Link>
            <p>현재 {totalCount}개 영화가 존재합니다.</p>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <MoviesTable
              movies={movies}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <PaginationComp
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
```

## Replacing FakeMovieService

```javascript
// src/services/movieService.js
import http from "./httpService";

const apiEndpoint = "http://localhost:3001/api/movies";

export function getMovies() {
  return http.get(apiEndpoint);
}

export function deleteMovie(movieId) {
  return http.delete(apiEndpoint + "/" + movieId);
}
```

```javascript
// src/components/Movies.jsx
import { Component } from "react";
import { toast } from "react-toastify";
// import { getMovies } from "../services/fakeMovieService";
import { getMovies, deleteMovie } from "../services/movieService";
// import { getGenres } from "../services/fakeGenreService";
import { getGenres } from "../services/genreService";
import ListGroup from "./common/ListGroupComp";
import PaginationComp from "./common/PaginationComp";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import MoviesTable from "./MoviesTable";
import SearchBox from "./common/SearchBox";
import _ from "lodash";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      genres: [],
      pageSize: 4,
      currentPage: 1,
      selectedGenre: "",
      searchQuery: "",
      sortColumn: { path: "title", order: "asc" },
    };
  }

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();
    this.setState({ movies, genres, selectedGenre: genres[0] });
  }

  handleLike = (movie) => {
    // console.log("Like");
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
  };

  handleDelete = async (movie) => {
    // console.log(movie);
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has already been deleted");
        this.setState({ movies: originalMovies });
      }
    }
  };

  handlePageChange = (page) => {
    // console.log(page);
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    // console.log(genre);
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    // console.log(path)
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      selectedGenre,
      pageSize,
      sortColumn,
      currentPage,
      movies: allMovies,
      searchQuery,
    } = this.state;

    // 검색 로직
    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      selectedGenre,
      genres,
      sortColumn,
      searchQuery,
    } = this.state;

    if (count === 0)
      return <p>모든 영화가 삭제되었습니다 (영화가 존재하지 않습니다).</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="container mt-2">
        <div className="row">
          <div className="col-2">
            <ListGroup
              items={genres}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <Link
              className="btn btn-primary"
              to="/movies/new"
              style={{ marginBottom: "20px" }}
            >
              New Movie
            </Link>
            <p>현재 {totalCount}개 영화가 존재합니다.</p>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <MoviesTable
              movies={movies}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <PaginationComp
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
```

- 두 개의 탭에서 같은 화면을 렌더링합니다. 이후 특정 영화에 `delete` 버튼을 클릭하고, 다른 탭에 `delete` 버튼을 클릭했을 때 다음 부분의 코드가 실행되어 오류를 처리할 수 있습니다.

```javascript
handleDelete = async (movie) => {
  // console.log(movie);
  const originalMovies = this.state.movies;
  const movies = originalMovies.filter((m) => m._id !== movie._id);
  this.setState({ movies });

  try {
    await deleteMovie(movie._id);
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      toast.error("This movie has already been deleted");
      this.setState({ movies: originalMovies });
    }
  }
};
```

## Extracting a Config File

```javascript
// src/config.json
{
  "apiUrl": "http://localhost:3001/api"
}

```

```javascript
// src/services/movieService.js
import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/movies";

export function getMovies() {
  return http.get(apiEndpoint);
}

export function deleteMovie(movieId) {
  return http.delete(apiEndpoint + "/" + movieId);
}
```

```javascript
// src/services/genreService.js
import http from "./httpService";
import config from "../config.json";

export function getGenres() {
  return http.get(config.apiUrl + "/genres");
}
```

## Populating the Form

```javascript
// src/services/movieService.js

export function getMovie(movieId) {
  return http.get(apiEndpoint + "/" + movieId);
}
```

```javascript
// src/components/MovieForm.jsx
async componentDidMount() {
  const { data: genres } = await getGenres();
  this.setState({ genres });

  const { movieId } = this.props.params;
  if (movieId === "new") return;

  try {
    const { data: movie } = await getMovie(movieId);
    this.setState({ data: this.mapToViewModel(movie) });
  } catch (ex) {
    if (ex.response && ex.response.status === 400) {
      return this.props.history.replace("/not-found");
    }
  }
}
```

## Refactoring

```javascript
// src/components/MovieForm.jsx
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
```

## Saving the Movie

```javascript
// src/services/movieService.js
export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(apiEndpoint + "/" + movie._id, body);
  }

  return http.post(apiEndpoint, movie);
}
```

```javascript
// src/components/MovieForm.jsx

doSubmit = async () => {
  await saveMovie(this.state.data);
  this.props.navigate("/movies");
};
```

## Refactoring

```javascript
// src/services/movieService.js
import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/movies";

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl);
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }

  return http.post(apiEndpoint, movie);
}
```
