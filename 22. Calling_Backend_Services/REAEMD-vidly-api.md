# Vidly Backend

- Installing MongoDB
- Setting Up the Node Backend
- Disabling Authentication
- Exercise - Connect Movies Page to the Backend
- Adding Http and Log Services
- Replacing FakeGenreService
- Replacing FakeMovieService
- Extracting a Config File
- Exercise - Connect Moive Form to the Backend
- Populating the Forms
- Refactoring
- Saving the Movie
- Refactoring

## Installing MongoDB

- https://www.mongodb.com/

## Setting Up the Node Backend

```javascript
// seed.js
const { Genre } = require("./models/genre");
const { Movie } = require("./models/movie");
const mongoose = require("mongoose");
require("dotenv").config();

const data = [
  {
    name: "Comedy",
    movies: [
      { title: "Airplane", numberInStock: 5, dailyRentalRate: 2 },
      { title: "The Hangover", numberInStock: 10, dailyRentalRate: 2 },
      { title: "Wedding Crashers", numberInStock: 15, dailyRentalRate: 2 },
    ],
  },
  {
    name: "Action",
    movies: [
      { title: "Die Hard", numberInStock: 5, dailyRentalRate: 2 },
      { title: "Terminator", numberInStock: 10, dailyRentalRate: 2 },
      { title: "The Avengers", numberInStock: 15, dailyRentalRate: 2 },
    ],
  },
  {
    name: "Romance",
    movies: [
      { title: "The Notebook", numberInStock: 5, dailyRentalRate: 2 },
      { title: "When Harry Met Sally", numberInStock: 10, dailyRentalRate: 2 },
      { title: "Pretty Woman", numberInStock: 15, dailyRentalRate: 2 },
    ],
  },
  {
    name: "Thriller",
    movies: [
      { title: "The Sixth Sense", numberInStock: 5, dailyRentalRate: 2 },
      { title: "Gone Girl", numberInStock: 10, dailyRentalRate: 2 },
      { title: "The Others", numberInStock: 15, dailyRentalRate: 2 },
    ],
  },
];

async function seed() {
  await mongoose.connect(process.env.DB);

  await Movie.deleteMany({});
  await Genre.deleteMany({});

  for (let genre of data) {
    const { _id: genreId } = await new Genre({ name: genre.name }).save();
    const movies = genre.movies.map((movie) => ({
      ...movie,
      genre: { _id: genreId, name: genre.name },
    }));
    await Movie.insertMany(movies);
  }

  mongoose.disconnect();

  console.info("Done!");
}

seed();
```

```cmd
node seed.js
```

## Disabling Authentication

`Testcase`

```javascript
// Vidly Server
GET: http://localhost:3000/api/movies

```

테스트를 위해 일시적으로 `requiresAuth` 환경 변수를 `false`로 설정했습니다.

```env
requiresAuth=false
```
