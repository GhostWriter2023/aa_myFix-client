import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

export const MovieView = ({ movie, onBackClick }) => {
    return (
      <Row onClick={() => { onBackClick(movie); }}>
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
        <Button variant="primary">Back</Button>
      </Row>
    );
  };
