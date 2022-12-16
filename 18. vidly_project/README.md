# Vidly Movie Project

1. Setup

```cmd
npx create-react-app vidly
cd vidly
npm install react-bootstrap bootstrap
npm install --save @fortawesome/fontawesome-svg-core
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/react-fontawesome
```

```javascript
// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

```javascript
// App.js
import "./App.css";
import { Component } from "react";

class App extends Component {
  render() {
    return (
      <main className="container">
        <h1>Vidly App</h1>
      </main>
    );
  }
}

export default App;
```

```javascript
// src/services/fakeGenreService.js
export const genres = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
];

export function getGenres() {
  return genres.filter((g) => g);
}
```

```javascript
// src/services/fakeMovieService.js
import * as genresAPI from "./fakeGenreService";

const movies = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "Terminator",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publishDate: "2018-01-03T19:04:28.809Z",
    liked: true,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "Die Hard",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    numberInStock: 5,
    dailyRentalRate: 2.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "Get Out",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    numberInStock: 8,
    dailyRentalRate: 3.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    title: "Trip to Italy",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    numberInStock: 7,
    dailyRentalRate: 3.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    title: "Airplane",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    numberInStock: 7,
    dailyRentalRate: 3.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    title: "Wedding Crashers",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    numberInStock: 7,
    dailyRentalRate: 3.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    title: "Gone Girl",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    numberInStock: 7,
    dailyRentalRate: 4.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    title: "The Sixth Sense",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    numberInStock: 4,
    dailyRentalRate: 3.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    title: "The Avengers",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    numberInStock: 7,
    dailyRentalRate: 3.5,
  },
];

export function getMovies() {
  return movies;
}

export function getMovie(id) {
  return movies.find((m) => m._id === id);
}

export function saveMovie(movie) {
  let movieInDb = movies.find((m) => m._id === movie._id) || {};
  movieInDb.name = movie.name;
  movieInDb.genre = genresAPI.genres.find((g) => g._id === movie.genreId);
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;

  if (!movieInDb._id) {
    movieInDb._id = Date.now();
    movies.push(movieInDb);
  }

  return movieInDb;
}

export function deleteMovie(id) {
  let movieInDb = movies.find((m) => m._id === id);
  movies.splice(movies.indexOf(movieInDb), 1);
  return movieInDb;
}
```

## Building the Movies Component and Get & Render Movies (Exercise1)

<img src="https://cdn-images-1.medium.com/max/800/1*JeCWDJcEBckoW8mSplRt5Q.png" />

임시로 생성한 API를 통해 영화를 읽어오고 화면에 렌더링해보겠습니다.

1. `Movies Component` 정의하기

```javascript
// src/components/Movies.jsx
// imrc + tab
import { Component } from "react";

// ccc + tab
class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <h2>Movies Component</h2>;
  }
}

export default Movies;
```

```javascript
// src/components/App.js
import { Component } from "react";
import "./App.css";

import Movies from "./components/Movies";

class App extends Component {
  render() {
    return (
      <main className="container">
        <Movies />
      </main>
    );
  }
}

export default App;
```

2. `Movies` 컴포넌트가 정상 렌더링 되는 경우

- 1. `services/fakeMovieService` 파일에서 `getMovies` 함수 받아오기
- 2. 해당 함수를 통해 영화를 추출하고, 화면에 렌더링하기.

```javascript
import { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    this.setState({ movies: getMovies() });
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Stock</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {this.state.movies.map((movie) => (
            <tr>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Movies;
```

## Deleting a Movie (Exercise 2)

<img src="https://cdn-images-1.medium.com/max/800/1*Etu-18SwAvzOmmDmje2vig.png" />

영화 삭제 기능을 추가해보겠습니다.

```javascript
import { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
  }

  // this binding 문제를 방지하기 위해 Arrow Function 사용
  handleDelete = (movie) => {
    // console.log(movie);
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  componentDidMount() {
    this.setState({ movies: getMovies() });
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Stock</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {this.state.movies.map((movie) => (
            <tr>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <button
                  onClick={() => this.handleDelete(movie)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Movies;
```

## Conditional Rendering (Exercise 3)

<img src="https://cdn-images-1.medium.com/max/800/1*wk2UQ1XMvKisJzVnw9oGUA.png" />
<img src="https://cdn-images-1.medium.com/max/800/1*48YNXd8iR72SCuHnRRwwYg.png" />

영화 개수를 화면에 출력하고, 영화가 존재하지 않는 경우 다음 메시지를 출력해주세요.

- 메세지: 모든 영화가 삭제되었습니다 (영화가 존재하지 않습니다).

```javascript
import { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
  }

  handleDelete = (movie) => {
    // console.log(movie);
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  componentDidMount() {
    this.setState({ movies: getMovies() });
  }

  render() {
    const { length: count } = this.state.movies;

    if (count === 0)
      return <p>모든 영화가 삭제되었습니다 (영화가 존재하지 않습니다).</p>;

    return (
      <>
        <p>현재 {count}개 영화가 존재합니다.</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default Movies;
```

## Like Component

<img src="https://cdn-images-1.medium.com/max/800/1*jQC3pAYqp6yWG_ufqaR56g.png" />

1. `Like` 컴포넌트를 생성하고, `Movies` 컴포넌트 테이블에 추가해주세요.
2. 하트 클릭 시 좋아요 기능으로 동작하도록 구현해주세요.

```javascript
// src/components/common/Like.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";

// Input: liked: boolean
// Output: onClick

const Like = (props) => {
  let icon = props.liked ? fullHeart : emptyHeart;
  return (
    <FontAwesomeIcon
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      icon={icon}
    />
  );
};

export default Like;
```

```javascript
import { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "../common/Like";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
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

  componentDidMount() {
    this.setState({ movies: getMovies() });
  }

  render() {
    const { length: count } = this.state.movies;

    if (count === 0)
      return <p>모든 영화가 삭제되었습니다 (영화가 존재하지 않습니다).</p>;

    return (
      <>
        <p>현재 {count}개 영화가 존재합니다.</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    onClick={() => this.handleLike(movie)}
                    liked={movie.liked}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default Movies;
```
