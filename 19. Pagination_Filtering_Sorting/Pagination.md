# Pagination

<img src="https://cdn-images-1.medium.com/max/800/1*R40AyRKUKANpASkLlWL7OQ.png" />
<img src="https://cdn-images-1.medium.com/max/800/1*zK-vZar1SgTIuFMrshPHFA.png" />

- Pagination Component in React Bootstrap
- Pagination Component Interface
- Displaying Pages
- Handling Page Changes
- Paginating Data
- Type Checking with PropTypes

## Pagination - Pagination Component in React Bootstrap

- https://react-bootstrap.netlify.app/components/pagination/#rb-docs-content

```javascript
import Pagination from "react-bootstrap/Pagination";

function PaginationComponent() {
  return (
    <Pagination>
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Item>{2}</Pagination.Item>
      <Pagination.Item>{3}</Pagination.Item>
      <Pagination.Item active>{4}</Pagination.Item>
      <Pagination.Item disabled>{5}</Pagination.Item>
      <Pagination.Item>{6}</Pagination.Item>
    </Pagination>
  );
}

export default PaginationComponent;
```

## Pagination - Pagination Component Interface

`Pagination` 컴포넌트를 생성하고, 해당 컴포넌트의 `props`로 세 개의 값을 전달했습니다.

1. itemsCount: 총 영화 개수
2. pageSize: 페이지당 영화 렌더링 개수
3. onPageChange: 전환된 페이지를 렌더링하기 위한 메소드 (Movies 컴포넌트에 정의해 `props`로 전달하는 방식으로 동작합니다.)

```javascript
// src/components/Movies.jsx
import { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/Like";
import PaginationComp from "./common/PaginationComp";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      pageSize: 4,
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

  handlePage = (page) => {
    console.log(page);
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
        <PaginationComp
          itemsCount={count}
          pageSize={this.state.pageSize}
          onPageChange={this.handlePage}
        />
      </>
    );
  }
}

export default Movies;
```

```javascript
// src/components/common/PaginationComp.jsx
const Pagination = () => {
  return null;
};

export default Pagination;
```

## Pagination - Displaying Pages

- `react-bootstrap` `Pagination` 컴포넌트와 이름이 겹쳐서 `PaginationComp`로 이름을 변경했습니다.
- https://react-bootstrap.netlify.app/components/pagination/#rb-docs-content

`Pagination Logic`

1. `Movies` 컴포넌트로부터 전달받은 `props`에서 `itemsCount` and `pageSize` 값을 추출합니다.
2. 전체 영화 개수를 한 페이지당 요소 배치 개수로 나누고 올림 해줍니다.
3. 해당 계산 이후 `pagesCount` 값이 1이라면 별도의 `pagination`이 필요 없음을 의미하기 때문에 바로 `null`을 리턴합니다.
4. `lodash` 모듈의 `range` 메소드를 이용해 배열에 `1 ~ pagesCount` 만큼 숫자를 담아줍니다.
5. `map` 함수를 사용해 동적으로 페이지를 생성합니다.

```javascript
// react-bootstrap boilerplate
import Pagination from "react-bootstrap/Pagination";
import _ from "lodash";

const PaginationComp = (props) => {
  const { itemsCount, pageSize } = props;

  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  // [1 ... pagesCount];

  return (
    <Pagination>
      {pages.map((page) => (
        <Pagination.Item key={page}>{page}</Pagination.Item>
      ))}
    </Pagination>
  );
};

export default PaginationComp;
```

## Pagination - Handling Page Changes

`Handling Page Changes Logic`

1.  `Movies` 컴포넌트에 `currentPage` 상태 값을 추가했습니다.
2.  `Movies` 컴포넌트에 `handlePageChange` 함수를 추가했습니다.
3.  `handlePageChange` 함수를 `Pagination` 컴포넌트의 `props`로 전달했습니다. (해당 함수는 `page` 값을 인자로 받습니다.)
4.  `Pagination` 컴포넌트를 통해 생성된 페이지 숫자를 클릭할 경우, `handlePageChange` 함수를 호출합니다.
5.  `handlePageChange` 함수 내부적으로 인자로 받은 `page` 값을 `currentPage` 상태 값에 갱신해줍니다.
6.  `Pagination` 컴포넌트 내부에서도 `active` 속성을 활용해 현재 몇 페이지에 있는지 시각적으로 확인할 수 있습니다.

## Pagination - Paginating Data

```cmd
npm install lodash
```

`Paginating Data Logic`

1. `pagination`에 사용할 `paginate` 함수를 하나 생성합니다.
2. `paginate` 함수는 인자로 세 개의 값을 받습니다. (items: 모든 데이터, pageNumber: 현재 페이지, pageSize: 페이지 당 배치되는 요소 개수)
3. `lodash` 모듈을 활용해 간단히 로직을 구현할 수 있습니다.

- 1. (현재 페이지 - 1) \* 페이지 당 배치되는 요소 개수를 곱해서, 화면에 배치될 첫 번째 요소의 배열상 위치를 추출합니다.
- 2. 추출한 첫번째 인덱스를 기준으로 페이지 당 배치되는 요소 개수만큼 추출합니다.
- 3. 이후 해당 값을 배열에 담아 리턴합니다.

Tip

- `_(items)` 방식을 코드를 작성한 이유는 배열을 `lodash object`로 변환해 `chaning` 형태로 `slice => take => value` 함수를 사용하기 위한 목적입니다.

// lodash object to chain all the lodash objects
// 1. items 가져온다
// 2. startIndex 뒤로 자른다
// 3. startIndex 뒤로 잘라온 것 중 pageSize 만큼만 가져온다
// 4. 값을 리턴한다.

```javascript
// src/utils/paginate.js
import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;

  return _(items).slice(startIndex).take(pageSize).value();
}
```

```javascript
import { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/Like";
import PaginationComp from "./common/PaginationComp";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
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

  componentDidMount() {
    this.setState({ movies: getMovies() });
  }

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies } = this.state;

    if (count === 0)
      return <p>모든 영화가 삭제되었습니다 (영화가 존재하지 않습니다).</p>;

    const movies = paginate(allMovies, currentPage, pageSize);

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
      </>
    );
  }
}

export default Movies;
```

## Pagination - Type Checking with PropTypes

`Pagination` 컴포넌트는 네 개의 `props` 값을 받습니다. 더 많은 `props`를 받을 수 있습니다. 이 지점에서 중요한 것은 필수적인 `props`를 확실히 전달했는지를 확인하는 것입니다.
이를 일일이 확인하는 것은 번거로운 작업입니다. 이를 자동화 하기 위해 `PropTypes`을 이용할 수 있습니다.

```cmd
npm install prop-types
```

```javascript
// src/components/common/PaginationComp.jsx
import Pagination from "react-bootstrap/Pagination";
import _ from "lodash";
import PropTypes from "prop-types";

const PaginationComp = (props) => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;

  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  // [1 ... pagesCount];

  return (
    <Pagination>
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          onClick={() => onPageChange(page)}
          active={page === currentPage}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

// You can chain any of the above with `isRequired` to make sure a warning
// is shown if the prop isn't provided.
PaginationComp.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default PaginationComp;
```

만약 다음과 같이 `Pagination` 컴포넌트에 `props`를 전달하는 경우, 다음과 경고가 콘솔에 출력됩니다. <br />
`itemsCount`는 숫자인데 문자가 전달되었습니다.

```javascript
<Pagination itemsCount="aaa" />
```

## Filtering

## Sorting
