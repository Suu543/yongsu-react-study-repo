# Sorting

<img src="https://cdn-images-1.medium.com/max/800/1*NaaheofOo0kI_C6Cop_ybg.png" />
<img src="https://cdn-images-1.medium.com/max/800/1*qkHY79TyqU7ias5HP1u4fg.png" />

- Extracting MoviesTable
- Raising the Sort Event
- Implementing Sorting
- Moving Responsibility
- Extracting TableHeader
- Extracting TableBody
- Rendering Cell Content
- Unique Keys - Final
- Adding the Sort Icon
- Extracting Tables
- Extracting a Method

## Sorting: Extracting MoviesTable

`Movies` 컴포넌트에는 데이터를 출력하는 `Table` 컴포넌트 로직이 일일이 다 작성되어 있습니다. 이와 같은 로직은 추상화되어야 하고, 또한 별도의 컴포넌트로 분류했을 때 관리가 용이합니다. 이러한 목적을 달성하고자 `MoviesTable` 컴포넌트를 별도로 생성해 `Table` 로직을 추상화할 수 있습니다.

`Extracting(추출) MoviesTable Logic`

1. `table` 부분을 추출합니다. `table`을 구성하는 데 세 가지 요소가 필요합니다.

- 1. `movies`: 영화 데이터
- 2. `<Like />`: `<Like />` 컴포넌트
- 3. `handleLike and handleDelete` 함수

2. `MoviesTable` 파일을 생성하고, 해당 컴포넌트의 `props`로 `movies, onDelete(handleDelete), onLike(handleLike)`를 전달합니다.
3. 전달한 `props`를 활용해 `MoviesTable` 컴포넌트를 재구성합니다.

```javascript
// src/components/MoviesTable.jsx
import Like from "./common/Like";

const MoviesTable = (props) => {
  const { movies, onDelete, onLike } = props;

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
        {movies.map((movie) => (
          <tr>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <Like onClick={() => onLike(movie)} liked={movie.liked} />
            </td>
            <td>
              <button
                onClick={() => onDelete(movie)}
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
};

export default MoviesTable;
```

```javascript
// src/components/Movies.jsx
import { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/ListGroupComp";
import PaginationComp from "./common/PaginationComp";
import { paginate } from "../utils/paginate";
import MoviesTable from "./MoviesTable";

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
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
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
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
          />
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

## Sorting: Raising the Sort Event

분류 기준은 제목(title), 장르(genre), 재고수(stock), 등급(rate)이 될 수 있습니다. 이를 구현하고자 `Movies` 컴포넌트에 분류 로직을 담당하는 함수를 정의하고 해당 함수를 `MoviesTable` 함수의 `props`으로 전달합니다. 전달 때 사용될 이름은 `onSort` 입니다.

1. 부모 컴포넌트인 `Movies`에 `handleSort` 함수를 정의합니다.
2. `handleSort` 함수는 `MoviesTable` 컴포넌트에 `onSort`라는 이름으로 전달합니다.
3. `MoviesTable` 컴포넌트에서 `onSort` 함수를 호출할 때 인자 값으로 기준 열을 전달합니다.

- `title`
- `genre.name`
- `numberInStock`
- `dailyRentalRate`

```javascript
// src/components/Movies.jsx
import { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/ListGroupComp";
import PaginationComp from "./common/PaginationComp";
import { paginate } from "../utils/paginate";
import MoviesTable from "./MoviesTable";

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
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
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

  handleSort = (path) => {
    console.log(path);
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
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
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

```javascript
// src/components/MoviesTable.jsx
import Like from "./common/Like";

const MoviesTable = (props) => {
  const { movies, onDelete, onLike, onSort } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => onSort("title")}>Title</th>
          <th onClick={() => onSort("genre.name")}>Genre</th>
          <th onClick={() => onSort("numberInStock")}>Stock</th>
          <th onClick={() => onSort("dailyRentalRate")}>Rate</th>
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
              <Like onClick={() => onLike(movie)} liked={movie.liked} />
            </td>
            <td>
              <button
                onClick={() => onDelete(movie)}
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
};

export default MoviesTable;
```

## Sorting: Implementing Sorting

`loadsh` 모듈에서 제공하는 `orderBy` 함수를 통해 정렬을 구현할 수 있습니다. 함수 동작 방식은 다음과 같습니다.

1. `orderBy` 함수 첫 번째 인자로 정렬하려는 데이터를 전달합니다. (전달 형태는 배열에 값을 담는 형태입니다.)
2. `orderBy` 함수 두 번째 인자로 데이터 정렬 기준을 전달합니다. (전달 형태는 배열에 값을 담는 형태입니다.)
3. `orderBy` 함수 세 번째 인자로 오름차순 혹은 내림차순 정렬인지 전달합니다. (전달 형태는 배열에 값을 담는 형태입니다.)

```javascript
const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
```

`Sorting Logic`

1. `sortColumn` 상태를 정의합니다. 해당 상태 값에는 정렬 기준 열 이름과, 정렬 기준 방식 (오름차순 or 내림차순)이 정의됩니다.
2. `onHandleSort` 함수가 호출되면, 클릭 된 정렬 열 정보를 인자 값으로 받습니다.

- 정렬 기준값과 비교해 같은 경우: 정렬 기준 방식 (오름차순 ==> 내림차순) or (내림차순 ==> 오름차순)으로 변경해줍니다.
- 정렬 기준 값 자체가 다른 경우: 정렬 기준값을 업데이트하고, 정렬 기준 방식은 오름차순으로 설정합니다.

3. 장르에 따라 분류된 데이터를 `orderBy` 함수에 전달합니다. 이후 `sortColumn` 상태 값을 읽어와 `orderBy` 함수의 두 번째, 세 번째 인자 값으로 전달합니다.
4. `orderBy` 함수가 리턴한 정렬된 데이터를 `paginate` 함수에 전달해 최종적으로 정렬된 데이터를 화면에 렌더링할 수 있습니다.

```javascript
// src/components/Movies.jsx
import { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/ListGroupComp";
import PaginationComp from "./common/PaginationComp";
import { paginate } from "../utils/paginate";
import MoviesTable from "./MoviesTable";
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
      sortColumn: { path: "title", order: "asc" },
    };
  }

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
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

  handleSort = (path) => {
    // console.log(path);
    const sortColumn = { ...this.state.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.setState({ sortColumn });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      genres,
      sortColumn,
    } = this.state;

    if (count === 0)
      return <p>모든 영화가 삭제되었습니다 (영화가 존재하지 않습니다).</p>;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

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
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
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

## Sorting: Moving Responsibility

정렬은 `MoviesTable` 컴포넌트에서 발생하므로, `Movies` 컴포넌트에 정의하는 것 대신에, `MoviesTable` 컴포넌트로 전달하는 것이 유지보수 관리가 용이합니다.
정렬에 관한 책임을 전가한다고 해서 `Moving Responsibility`라는 이름을 붙였습니다.

`Moving Responsibility Logic`

1. `MoviesTable` 컴포넌트를 함수형에서 클래스 방식으로 변경하고, `raiseSort` 함수를 정의합니다.
2. `Moives` 컴포넌트의 `handleSort` 로직을 `raiseSort` 함수로 옮깁니다.
3. `raiseSort` 함수에서 모든 업데이트를 진행하고, `sortColumn` 전체를 `onSort` 함수의 인자로 전달합니다.
4. `Movies` 컴포넌트의 `onSort` 함수는 `sortColumn` 전체를 결과 값으로 받고, 이를 `sortColumn` 상태 값에 반영합니다.
5. `sortColumn` 상태 값이 업데이트되면서 정렬된 요소가 재 렌더링 됩니다.

```javascript
// src/components/MoviesTable.jsx
import { Component } from "react";
import Like from "./common/Like";

class MoviesTable extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  };

  render() {
    const { movies, onDelete, onLike } = this.props;

    return (
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => this.raiseSort("title")}>Title</th>
            <th onClick={() => this.raiseSort("genre.name")}>Genre</th>
            <th onClick={() => this.raiseSort("numberInStock")}>Stock</th>
            <th onClick={() => this.raiseSort("dailyRentalRate")}>Rate</th>
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
                <Like onClick={() => onLike(movie)} liked={movie.liked} />
              </td>
              <td>
                <button
                  onClick={() => onDelete(movie)}
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

export default MoviesTable;
```

```javascript
// src/components/Movies.jsx
import { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/ListGroupComp";
import PaginationComp from "./common/PaginationComp";
import { paginate } from "../utils/paginate";
import MoviesTable from "./MoviesTable";
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
      sortColumn: { path: "title", order: "asc" },
    };
  }

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
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

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      genres,
      sortColumn,
    } = this.state;

    if (count === 0)
      return <p>모든 영화가 삭제되었습니다 (영화가 존재하지 않습니다).</p>;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

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
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
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

## Sorting: Extracting TableHeader

`MoviesTable` 컴포넌트에 `raiseSort` 함수를 정의함으로써 유지보수가 용이한 코드로 리팩토링했습니다. 여기서 문제는 `CustomersTable or PlayersTable` 등등 다른 데이터를 기반으로 테이블을 생성할 때는 해당 함수를 재사용하는 것이 아닌, 복사 붙여 넣기를 해야 한다는 문제가 발생합니다. 어떤 테이블에 상관없이 재사용할 수 있는 `TableHeader` 컴포넌트를 생성함으로써 이 문제를 해결할 수 있습니다.

`TableHeader` 컴포넌트에 필요한 `props`는 다음과 같습니다.

- `columns (배열)`
- `sortColumn: (객체)`
- `onSort: (함수)`

`TableHeader` 컴포넌트 구성 로직

1. `MoviesTable` 컴포넌트의 `raiseSort` 함수를 `TableHeader` 컴포넌트로 옮깁니다.
2. `props`로 `columns`을 받아 동적으로 `<thead> => <tr> => <th>` 생성합니다.
3. `th` 태그에 클릭시 `props`로 전달받은 `raiseSort` 함수를 호출합니다. 이때 인자에는 `column.path`를 전달합니다.
4. `TableHeader` 컴포넌트를 호출하는 `MoviesTable` 컴포넌트에 `props`로 전달할 `columns` 배열을 정의합니다. 이 경우 영화 정보가 될 수 있습니다. `columns` 배열의 객체에 필수적으로 포함되어야 할 키 값은 `label and path` 입니다.

```javascript
// src/components/common/TableHeader.jsx
import { Component } from "react";

// column: array
// sortColumn: object
// onSort: function

class TableHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
```

```javascript
// src/components/MoviesTable.jsx
import { Component } from "react";
import Like from "./common/Like";
import TableHeader from "./common/TableHeader";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
  ];

  render() {
    const { movies, onDelete, onLike, onSort, sortColumn } = this.props;

    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <tbody>
          {movies.map((movie) => (
            <tr>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like onClick={() => onLike(movie)} liked={movie.liked} />
              </td>
              <td>
                <button
                  onClick={() => onDelete(movie)}
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

export default MoviesTable;
```

## Sorting: Extracting TableBody + Rendering Cell Content

`TableHeader` 컴포넌트와 똑같이 `MoviesTable` 컴포넌트의 `TableBody` 태그 또한 재사용할 수 있는 컴포넌트 형태로 리팩토링 할 수 있습니다.

```javascript
// src/components/MoviesTable.jsx
import { Component } from "react";
import Like from "./common/Like";
import TableHeader from "./common/TableHeader";
import TableBody from "./common/TableBody";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { key: "like" },
    { key: "delete" },
  ];

  render() {
    const { movies, onDelete, onLike, onSort, sortColumn } = this.props;

    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody columns={this.columns} data={movies} />
      </table>
    );
  }
}

export default MoviesTable;
```

```javascript
// src/components/common/TableBody.jsx
import { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data, columns } = this.props;

    //   <td>{item[column.path]}</td>
    return (
      <tbody>
        {data.map((item) => (
          <tr>
            {columns.map((column) => (
              <td>{_.get(item, column.path)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
```

`Title, Genre, Stock, Rate` 열은 잘 렌더링 됬지만, `Like and Delete` 열은 렌더링 되지 않은 것을 확인할 수 있습니다.

```javascript
const x = <h1></h1>; // React Element {}
const x = <Like />;
```

리엑트 컴포넌트 또한 `JavaScript` 에서는 본질적으로 객체로 간주합니다. `Like or Delete` 컴포넌트를 통째로 전달하는 방법을 통해 이 문제를 해결할 수 있습니다.

`Like and Delete`의 경우 `movie` 값에 바로 접근할 수 없기 때문에 함수 형태로 인자를 받아, 리엑트 컴포넌트를 리턴하는 방식으로 동작하도록 구현했습니다. `movie` 인자 전달은 `TableBody` 컴포넌트에서 실행됩니다.

특이점을 살펴보자면, `Like and Delete`에 해당하는 객체의 경우 `content` 속성이 존재합니다. 이를 이용해 `TableBody` 컴포넌트에서 `content` 속성 여부를 확인하고 존재한다면 리턴하는 컴포넌트를, 그렇지 않다면 `path` 속성을 이용해 열에 해당하는 영화 데이터를 추출합니다.

1. `MoviesTable` 컴포넌트에서 `TableBody` 컴포넌트에 `props`로 두 개의 값을 전달합니다.

- 1. columns
- 2. data: movies

2. `props`로 전달받은 데이터를 확인하고 `renderCell` 함수를 통해 객체에 `content` 속성이 존재하는지 확인하고, 조건부 렌더링을 실행합니다.
3. `lodash` 모듈의 `get` 함수는 객체의 키 값을 통해 값을 추출합니다.

```javascript
import { Component } from "react";
import Like from "./common/Like";
import TableHeader from "./common/TableHeader";
import TableBody from "./common/TableBody";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like onClick={() => this.props.onLike(movie)} liked={movie.liked} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody columns={this.columns} data={movies} />
      </table>
    );
  }
}

export default MoviesTable;
```

```javascript
// src/components/common/TableBody.jsx
import { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  render() {
    const { data, columns } = this.props;

    //   <td>{item[column.path]}</td>
    return (
      <tbody>
        {data.map((item) => (
          <tr>
            {columns.map((column) => (
              <td>{this.renderCell(item, column)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
```

## Unique Keys - Final

리엑트 컴포넌트는 성능을 목적으로 `key` 속성을 부여해야 합니다. `Like or Delete`는 `path` 속성이 없기 때문에 `or` 연산자를 통해 `column.key`로 `key`값을 생성하도록 구성했습니다.

```javascript
import { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  render() {
    const { data, columns } = this.props;

    //   <td>{item[column.path]}</td>
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={item._id + (column.path || column.key)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
```

해당 `key`값 생성 로직을 별도의 함수로 정의해 구현해보겠습니다.

```javascript
// src/components/common/TableBody.jsx
import { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;

    //   <td>{item[column.path]}</td>
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
```

## Adding the Sort Icon

`Sort Icon Logic`

1. 현재 `Column`의 주소와 일치하지 않는 경우 `null` 리턴을 통해 어떠한 아이콘도 렌더링하지 않습니다.
2. 현재 `Column`과 일치하는 경우에는 `sortColumn.order` 값을 추출해 오름차순 or 내림차순인지 파악하고 그에 알맞은 아이콘을 렌더링합니다.

```javascript
// src/components/common/TableHeader.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAsc, faSortDesc } from "@fortawesome/free-solid-svg-icons";
import { Component } from "react";

class TableHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <FontAwesomeIcon icon={faSortAsc} />;
    return <FontAwesomeIcon icon={faSortDesc} />;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              style={{ cursor: "pointer" }}
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
```

## Extracting Tables

`MoviesTable` 컴포넌트는 `TableHeader and TableBody` 컴포넌트를 렌더링합니다. 하지만 또 다른 테이블은 만들고 싶은 경우, 다시 한번 `table` 태그를 정의하고 거기에 `TableHeader and TableBody` 컴포넌트를 자식 요소로 정의해야 합니다. 이러한 과정을 한 번 더 리팩토링 함으로써 복사 붙여넣기 방식이 아닌, 하나의 `Table` 컴포넌트를 생성해 재사용성 있게 구현해보겠습니다.
(`table` 태그를 매번 적는 귀찮음을 해결)

```javascript
// src/components/common/Table.jsx
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table = (props) => {
  const { columns, sortColumn, onSort, data } = props;

  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody columns={columns} data={data} />
    </table>
  );
};

export default Table;
```

```javascript
// src/components/MoviesTable.jsx
import { Component } from "react";
import Like from "./common/Like";
import Table from "./common/Table";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like onClick={() => this.props.onLike(movie)} liked={movie.liked} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
```

## Extracting a Method

`Movies` 컴포넌트의 `render`함수 내부에 실행 디테일을 정의함으로써 코드의 가독성을 떨어뜨리고 있기 때문에 이를 별도의 `getPagedData` 함수로 정의함으로써 코드 가독성을 높이고, 유지 보수가 용이하도록 구현해보겠습니다.

```javascript
// src/components/Movies.jsx
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
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
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
```

`Refactoring`

```javascript
// src/components/Movies.jsx
import { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/ListGroupComp";
import PaginationComp from "./common/PaginationComp";
import { paginate } from "../utils/paginate";
import MoviesTable from "./MoviesTable";
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
      sortColumn: { path: "title", order: "asc" },
    };
  }

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
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

  getPagedData = () => {
    const {
      selectedGenre,
      pageSize,
      sortColumn,
      currentPage,
      movies: allMovies,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, selectedGenre, genres, sortColumn } =
      this.state;

    if (count === 0)
      return <p>모든 영화가 삭제되었습니다 (영화가 존재하지 않습니다).</p>;

    const { totalCount, data: movies } = this.getPagedData();

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
          <p>현재 {totalCount}개 영화가 존재합니다.</p>
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
    );
  }
}

export default Movies;
```

## Destructuring Arguments

```javascript
// src/components/common/Table.jsx
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table = (props) => {
  const { columns, sortColumn, onSort, data } = props;

  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody columns={columns} data={data} />
    </table>
  );
};

export default Table;
```

`After Destructuring`

```javascript
// src/components/common/Table.jsx
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table = ({ columns, sortColumn, onSort, data }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody columns={columns} data={data} />
    </table>
  );
};

export default Table;
```

### Summary

1. Component Design
2. Component Interface
3. Reusable Components
4. Refactoring
5. Writing Clean Code
