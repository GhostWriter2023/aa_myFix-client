import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

//NEED TO POPULATE THIS WITH MOVIE DATA OR LINK TO LIBRARY
export const MainView = () => {
  const [movies, setMovies] = useState([/*
  {
    id: 1,
    title: "Mission Impossible: dead reckoning",
    image:
      "https://upload.wikimedia.org/wikipedia/en/e/ed/Mission-_Impossible_%E2%80%93_Dead_Reckoning_Part_One_poster.jpg",
    description: "Ethan Hunt and his IMF team have once again been disavowed, and they must pair up new allies in a race against time after their mission has gone wrong.",
    genre: "Action",
    director: "Christopher McQuarrie"
  },
  {
     id: 2,
     title: "The Sixth Sense",
     image:
     "https://upload.wikimedia.org/wikipedia/en/a/a4/The_Sixth_Sense_poster.png",
     description: "A boy who communicates with spirits seeks the help of a disheartened child psychologist.",
     genre: "Thriller",
     director: "M. Night Shyamalan"
  },
  {
     id: 3,
     title: "Minions",
     image:
     "https://upload.wikimedia.org/wikipedia/en/1/19/Minions_%282015_film%29.jpg",
     description: "Minions Stuart, Kevin, and Bob are recruited by Scarlet Overkill, a super-villain who, alongside her inventor husband Herb, hatches a plot to take over the world.",
     genre: "Animation",
     director: "Kyle Balda"
  }
*/]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  useEffect(() => {
    fetch("https://ghostwriter-movies-1d2fe76cf812.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.docs.map((doc) => {
          return {
            id: doc.key,
            title: doc.title,
            image: nul,
            description: doc.description,
            genre: doc.genre,
            director: doc.director_name?.[0]
          };
        });

        setMovies(moviesFromApi);
      });
  }, []);

  if (selectedMovie) {
    return (
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
          />
      ))}
    </div>
  );
};