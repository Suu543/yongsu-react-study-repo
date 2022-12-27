import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const MovieForm = () => {
  let navigate = useNavigate();
  let params = useParams();

  return (
    <div className="container">
      <h1>Movie Form {params.movieId} </h1>
      <button className="btn btn-primary" onClick={() => navigate("/movies")}>
        Save
      </button>
    </div>
  );
};

export default MovieForm;
