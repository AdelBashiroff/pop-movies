import { MovieCard } from './MovieCard';

export const MovieList = ({ movies }) => {
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard key={movie.filmId || movie.kinopoiskId} movie={movie} />
      ))}
    </div>
  );
};