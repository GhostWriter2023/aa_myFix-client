import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null); 
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/movies`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Movies data: ", data);
        const moviesFromApi = data.map((doc) => {
          return {
            id: doc._id,
            title: doc.Title,
            image: doc.ImagePath,
            description: doc.Description,
            genre: doc.Genre.Name,
            director: doc.Director.Name
          };
        });

        setMovies(moviesFromApi);
      });
    }, [token]);

    return (
      <Row className="justify-content-md-center">
        {!user ? (
        <>
          <Col sm={3}>
           <h4>Welcome to</h4><br/><h1>myFlix</h1>
          </Col>
          <Col sm={3}>
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
          </Col>
          <Col sm={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h4>If not a registered user, then fill the fields on the righ to create a new user profile.</h4>
          </Col>         
          <Col sm={3}>
            <SignupView />
          </Col>
        </>

        ) : selectedMovie ? (
          <Col md={8}>
            <Button variant="primary" onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}>
              Logout
            </Button>
            <MovieView
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
          </Col>
        ) : movies.length === 0 ? (
          <>
            <Button variant="primary" onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}>
              Logout
            </Button>
            <div>The list is empty!</div>
          </>
        ) : (
          <>
            <Button variant="primary" onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}>
              Logout
              </Button>
            {movies.map((movie) => (
              <Col className="mb-4" key={movie.id} md={3}>              
                <MovieCard
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))}
          </>
        )}
      </Row>
    );
  };