import { Button, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  return (
    <Container className="mt-5" >
        <Row>
        <div className="d-flex justify-content-center mb-4">
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
          <Button className="mt-3" variant="primary" style={{ width: '100px' }} type="submit">
           Back
          </Button>
        </Link>
      </Row>
    </Container>
    );
  };
