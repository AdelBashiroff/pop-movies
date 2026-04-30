import { useState, useEffect } from 'react';
import { Container, CircularProgress, Alert, Typography } from '@mui/material';
import { MovieList } from './components/MovieList';
import { MovieDetails } from './components/MovieDetails';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const API_KEY = 'cd04284e-717d-45b6-95c2-554e929b711b';
const API_URL = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const response = await fetch(API_URL, {
          headers: {
            'X-API-KEY': API_KEY,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }

        const data = await response.json();
        setMovies(data.films || []);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">
          Ошибка загрузки фильмов: {error}
        </Alert>
      </Container>
    );
  }

  return (
    <BrowserRouter>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Популярные фильмы
          </Link>
        </Typography>

        <Routes>
          <Route path="/" element={<MovieList movies={movies} />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="*" element={
            <Alert severity="warning">Страница не найдена (404)</Alert>
          } />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;