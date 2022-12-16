# Filtering

<img src="https://cdn-images-1.medium.com/max/800/1*VHt7WPCHcDm4zGahqXIEIQ.png" />
<img src="https://cdn-images-1.medium.com/max/800/1*CsaL0FWk1N4QBRknUOvvbQ.png" />
<img src='https://cdn-images-1.medium.com/max/800/1*ajFecloGsDEqZNUMPhER7g.png" />

- ListGroup Component in React Bootstrap
- Component Interface
- Displaying Items
- Default Props
- Handling Selection
- Implementing Filtering
- Adding All Genres

## Filtering: ListGroup Component in React Bootstrap

- https://react-bootstrap.netlify.app/components/list-group/#rb-docs-content

```javascript
import ListGroup from "react-bootstrap/ListGroup";

function DefaultExample() {
  return (
    <ListGroup>
      <ListGroup.Item>Cras justo odio</ListGroup.Item>
      <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
      <ListGroup.Item>Morbi leo risus</ListGroup.Item>
      <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
      <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
    </ListGroup>
  );
}

export default DefaultExample;
```

## Filtering: Component Interface

```javascript
// src/components/common/ListGroup.jsx
const ListGroup = () => {
  return null;
};

export default ListGroup;
```

```javascript
// src/components/Movies.jsx
import { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/Like";
import ListGroup from "./common/ListGroup";
import PaginationComp from "./common/PaginationComp";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      genres: [],
      pageSize: 4,
      currentPage: 1,
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

  handlePageChange = (page) => {
    // console.log(page);
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    console.log(genre);
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies } = this.state;

    if (count === 0)
      return <p>모든 영화가 삭제되었습니다 (영화가 존재하지 않습니다).</p>;

    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
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
              {movies.map((movie) => (
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
          <PaginationComp
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
```

1. `Movies` 컴포넌트에 생성한 `ListGroup` 컴포넌트를 자식 요소로 추가했습니다.
2. `ListGroup` 컴포넌트는 `props`로 `items and onItemSelect`가지고 있습니다.
3. `Movies` 상태 값에 `genres` 속성을 추가했습니다. `genres`값을 갱신하기 위해 임시로 생성한 `fakeGenreService` 파일에 생성한 `getGenres` 함수를 사용했습니다.

## Filtering: Displaying Items

1. `ListGroup` 컴포넌트에 두 개의 `props`를 추가했습니다(`valueProperty and textProperty`).
2. `valueProperty and textProperty`는 `_id and name`과 같은 프로퍼티 값을 직접 작성하는 것 대신에, 더욱 의미론적인 접근을 위해 별도의 `props`를 생성했습니다.

```javascript
// src/components/common/ListGroupComp.jsx
import ListGroup from "react-bootstrap/ListGroup";

const ListGroupComp = (props) => {
  const { items, valueProperty, textProperty } = props;

  console.log("items: ", items);

  return (
    <ListGroup>
      {items.map((item) => (
        <ListGroup.Item key={item[valueProperty]}>
          {item[textProperty]}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ListGroupComp;
```

```javascript
// src/components/Movies.jsx
...
<ListGroup
  items={this.state.genres}
  onItemSelect={this.handleGenreSelect}
  textProperty="name"
  valueProperty="_id"
/>
...
```

## Filtering: Default Props

1. `valueProperty and textProperty` 속성은 `ListGroup` 컴포넌트에 한정된 속성이기 때문에, `defaultProps`로 등록할 수 있습니다. `Props` 숫자가 늘어나면 컴포넌트 관리가 힘들어지므로 `defaultProps`로 등록하는 패턴을 활용할 수 있습니다.

```javascript
// src/components/common/ListGroupComp.jsx
import ListGroup from "react-bootstrap/ListGroup";

const ListGroupComp = (props) => {
  const { items, valueProperty, textProperty } = props;

  console.log("items: ", items);

  return (
    <ListGroup>
      {items.map((item) => (
        <ListGroup.Item key={item[valueProperty]}>
          {item[textProperty]}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

ListGroupComp.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroupComp;
```

`props`: `textProperty` and `valueProperty`는 기본값으로 정의했기 때문에 별도의 `props`로 전달하지 않아도 됩니다.

```javascript
<ListGroup items={this.state.genres} onItemSelect={this.handleGenreSelect} />
```

## Filtering: Handling Selection

1. 현재 장르를 추적하고자 `selectedGenre` 상태 값을 추가했습니다.
2. `handleGenreSelect` 함수가 호출되는 경우 클릭 된 `selectedGenre`를 업데이트했습니다.
3. `ListGroup` 컴포넌트의 `props`로 `selectedItem`을 추가했습니다. 해당 `props` 값을 통해 현재 선택된 장르 항목을 클릭 되지 않은 항목과 구분할 수 있는 색을 적용할 수 있습니다.

```javascript
import { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/Like";
import ListGroup from "./common/ListGroupComp";
import PaginationComp from "./common/PaginationComp";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      genres: [],
      pageSize: 4,
      currentPage: 1,
      selectedGenre: "",
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

  handlePageChange = (page) => {
    // console.log(page);
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    console.log(genre);
    this.setState({ selectedGenre: genre });
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      genres,
    } = this.state;

    if (count === 0)
      return <p>모든 영화가 삭제되었습니다 (영화가 존재하지 않습니다).</p>;

    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
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
              {movies.map((movie) => (
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
          <PaginationComp
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
```

```javascript
// src/components/src/commom/ListGroupComp
import ListGroup from "react-bootstrap/ListGroup";

const ListGroupComp = (props) => {
  const { items, valueProperty, textProperty, onItemSelect, selectedItem } =
    props;

  // console.log("items: ", items);

  return (
    <ListGroup>
      {items.map((item) => (
        <ListGroup.Item
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          active={item === selectedItem}
        >
          {item[textProperty]}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

ListGroupComp.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroupComp;
```

## Filtering: Implementing Filtering

기존에는 모든 영화에 대한 `Pagination`을 구현했습니다. 이번에는 특정 장르에 해당하는 영화만을 추출한 후, `Pagination`을 적용하겠습니다.

1. `movies` 상태 값 배열에 `filter` 함수를 통해 현재 선택된 장르에 해당하는 영화만을 분류합니다. 만약 어떠한 것도 선택되지 않았다면 모든 영화를 그대로 리턴합니다.
2. 필터링 된 데이터를 `paginate` 함수에 전달함으로써, `pagination`을 구현합니다.

```javascript
import { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/Like";
import ListGroup from "./common/ListGroupComp";
import PaginationComp from "./common/PaginationComp";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      genres: [],
      pageSize: 4,
      currentPage: 1,
      selectedGenre: "",
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

  handlePageChange = (page) => {
    // console.log(page);
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    console.log(genre);
    this.setState({ selectedGenre: genre });
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      genres,
    } = this.state;

    if (count === 0)
      return <p>모든 영화가 삭제되었습니다 (영화가 존재하지 않습니다).</p>;

    const filtered = selectedGenre
      ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
      : allMovies;

    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>현재 {filtered.length}개 영화가 존재합니다.</p>
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
              {movies.map((movie) => (
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
          <PaginationComp
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
```

## Filtering: Adding All Genres

장르 선택이 되지 않았을 때 어떠한 장르 버튼도 클릭 되지 않은 채로 남아있습니다. 하지만 이는 페이지를 처음 보는 사람에게 낯설 수 있기 때문에, 직관적으로 사이트를 이해할 수 있도록 돕고자, 기본값으로 `All Moives` 장르 항목을 추가해보겠습니다.

1. `componentDidMount` 라이프사이클을 활용해, API를 통해 받아온 장르에 더해 `name: "All Genres"`를 추가해서 `genres` 상태 값을 갱신했습니다.
2. `All Genres` 장르가 기본값이 되게 하기 위해, `componentDidMount` 함수 내에서 `selectedGenre` 상태 값을 설정했습니다.
3. 장르가 변경되었을 때, 변경된 장르에 해당하는 데이터의 첫 번째 페이지를 보여줄 수 있도록 구현하기 위해, `handleGenreSelect` 함수가 호출되면 장르와 함께 `currentPage` 값 또한 `1`로 갱신했습니다.

```javascript
import { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/Like";
import ListGroup from "./common/ListGroupComp";
import PaginationComp from "./common/PaginationComp";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      genres: [],
      pageSize: 4,
      currentPage: 1,
      selectedGenre: "",
    };
  }

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
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
    console.log(genre);
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      genres,
    } = this.state;

    if (count === 0)
      return <p>모든 영화가 삭제되었습니다 (영화가 존재하지 않습니다).</p>;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>현재 {filtered.length}개 영화가 존재합니다.</p>
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
              {movies.map((movie) => (
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
          <PaginationComp
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
```
