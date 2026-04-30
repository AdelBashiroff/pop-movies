import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, Card, CardMedia, CardContent, 
  Typography, Rating, Box, CircularProgress, Alert
} from '@mui/material';

const API_KEY = 'cd04284e-717d-45b6-95c2-554e929b711b';

export const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true);
        const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, {
          headers: {
            'X-API-KEY': API_KEY,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error(`Ошибка: ${response.status}`);

        const data = await response.json();
        setMovie(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

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
        <Alert severity="error">Ошибка загрузки фильма: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card>
        <Box sx={{ display: 'flex' }}>
          <CardMedia
            component="img"
            sx={{ width: 300, objectFit: 'cover' }}
            image={movie.posterUrl}
            alt={movie.nameRu}
          />
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {movie.nameRu} ({movie.year})
            </Typography>
            
            {movie.nameOriginal && (
              <Typography variant="subtitle1" gutterBottom>
                {movie.nameOriginal}
              </Typography>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={movie.ratingKinopoisk / 2} precision={0.1} readOnly />
              <Typography variant="body1" sx={{ ml: 1 }}>
                {movie.ratingKinopoisk}
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ mb: 2 }}>
              {movie.description || 'Описание отсутствует'}
            </Typography>

            <Typography variant="body2">
              Страна: {movie.countries?.map(c => c.country).join(', ')}
            </Typography>
            <Typography variant="body2">
              Жанр: {movie.genres?.map(g => g.genre).join(', ')}
            </Typography>
            <Typography variant="body2">
              Длительность: {movie.filmLength} мин.
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Container>
  );
};