import { useEffect, useState } from "react";
import PropTypes from "prop-types";
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
      fetch(`${process.env.REACT_APP_API_URL}/users/${user.Username}/movies/${encodeURIComponent(movie.id)}`,
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
        `${process.env.REACT_APP_API_URL}/users/${user.Username}/movies/${encodeURIComponent(movie.id)}`,
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
  const handleRemoveFmFavorites = () => {
    setDelTitle(movie.title);
  }; 

  return (
    <>
      <Card className="h-100 mt-4" style={{ width: '18rem' }}>
        <Card.Img variant="top" src={movie.image} className="object-fit-cover" />
        <Card.Body>
          <Link to={`/movies/${encodeURIComponent(movie.id)}`} className="movie-view">
          <Card.Title>{movie.title}</Card.Title>
          </Link>
          <Card.Text>{movie.description}</Card.Text>
        <div>
          {isFavorite ? ( 
          <Button variant="primary" style={{ width: '100px' }} onClick={handleRemoveFmFavorites}>Remove</Button>
        ) : (
          <Button variant="primary" style={{ width: '100px' }} onClick={handleAddToFavorites}>Add</Button>  
        )}
        </div>
        </Card.Body>
      </Card>
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
