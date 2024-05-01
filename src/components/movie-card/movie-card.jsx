import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ( {movie, isFavorite}) => {
  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser? storedUser: null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [addTitle, setAddTitle] = useState("");
  const [delTitle, setDelTitle] = useState("");

  useEffect(() => {
    const addToFavorites = () => {
      fetch(`${process.env.REACT_APP_API_URL}/users/${user.username}/movies/${encodeURIComponent(movie.title)}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to add movie to favorites.");
          }
          alert("Movie added to favorites successfully!");
          window.location.reload();
          return response.json();
        })
        .then((user) => {
          if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    const removeFromFavorites = () => {
      fetch(
        `${process.env.REACT_APP_API_URL}/users/${user.username}/movies/${encodeURIComponent(movie.title)}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to remove movie from favorites.");
          }
          alert("Movie successfully removed from favorites!");
          window.location.reload();
          return response.json();
        })
        .then((user) => {
          if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    if (addTitle) {
      addToFavorites();
    }
    if (delTitle) {
      removeFromFavorites();
    }
  }, [addTitle, delTitle, token]);

  const handleAddToFavorites = () => {
    setAddTitle(movie.title);
  };
  const handleRemoveFromFavorites = () => {
    setDelTitle(movie.title);
  }; 

  return (
    <>
    <Link to={`/movies/${encodeURIComponent(movie.id)}`} className="movie-view">
    <Card className="h-100" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={movie.image} className="object-fit-cover" />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
      </Card.Body>
    </Card>
    <Card>
      {isFavorite ? ( 
      <Button variant="primary"  onClick={handleRemoveFromFavorites}>Remove</Button>
    ) : (
      <Button variant="primary" onClick={handleAddToFavorites}>Add</Button>  
    )}
    </Card>
    </Link>
    </>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    description: PropTypes.string,
    genre: PropTypes.string,
    director: PropTypes.string
  }).isRequired,
};
