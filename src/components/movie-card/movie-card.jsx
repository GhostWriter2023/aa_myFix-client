import PropTypes from "prop-types";
<<<<<<< Updated upstream
=======
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
>>>>>>> Stashed changes

export const MovieCard = ( {movie}) => {
  return (
<<<<<<< Updated upstream
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.title}
    </div>
=======
    <Card className="h-100" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button className="primary" variant="link">More Info</Button>
        </Link>
      </Card.Body>
    </Card>
>>>>>>> Stashed changes
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
};
