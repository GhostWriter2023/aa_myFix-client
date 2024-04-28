<<<<<<< Updated upstream
export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
=======
import Row from "react-bootstrap/Row";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  return (
      <Row>
>>>>>>> Stashed changes
        <div>
          <img src={movie.image} />
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.title}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.description}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.genre}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.director}</span>
        </div>
<<<<<<< Updated upstream
        <button onClick={onBackClick}>Back</button>
      </div>
=======
        <Link to={`/`}>
          <button className="mt-3" variant="primary">Back</button>
        </Link>
      </Row>
>>>>>>> Stashed changes
    );
  };