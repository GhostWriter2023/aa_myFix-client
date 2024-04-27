import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ( {movie, onMovieClick}) => {
  return (
    <Card className="h-100" style={{ width: '18rem' }} onClick={() => { onMovieClick(movie); }}>
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Button variant="primary">More Info</Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    description: PropTypes.string,
    genre: PropTypes.string,
    director: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
