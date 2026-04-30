import { Card, CardContent, CardMedia, Typography, Rating, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie }) => {
  const movieId = movie.filmId || movie.kinopoiskId;
  
  return (
    <Link to={`/movie/${movieId}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ display: 'flex', height: 200, mb: 2 }}>
        <CardMedia
          component="img"
          sx={{ width: 140, objectFit: 'cover' }}
          image={movie.posterUrlPreview || movie.posterUrl}
          alt={movie.nameRu}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6" component="div">
            {movie.nameRu} ({movie.year})
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={movie.ratingKinopoisk / 2} precision={0.1} readOnly />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {movie.ratingKinopoisk}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}>
            {movie.description || 'Описание отсутствует'}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};