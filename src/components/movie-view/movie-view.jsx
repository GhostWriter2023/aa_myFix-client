import Row from "react-bootstrap/Row";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  return (
      <Row>
        <div>
          <img src={movie.image} />
        </div>
        <div>
        <h4><span><strong>Title:</strong> </span>
          <span>{movie.title}</span></h4>
        </div>
        <div>
          <span><strong>Description:</strong> </span>
          <span>{movie.description}</span>
        </div>
        <div>
          <span><strong>Genre:</strong> </span>
          <span>{movie.genre}</span>
        </div>
        <div>
          <span><strong>Director:</strong> </span>
          <span>{movie.director}</span>
        </div>
        <Link to={`/`}>
          <button className="back-button">Back</button>
        </Link>
      </Row>
    );
  };
