'use client'

import { IMovie } from '@/types/movie';
import { Card, CardActionArea, CardMedia } from '@mui/material';
import { useRouter } from 'next/navigation';

interface IProps {
  movie: IMovie
}

export default function MoviePoster({ movie }: IProps) {
  const router = useRouter()

  return (
    <Card>
      <CardActionArea onClick={() => router.push(`/movie/${movie?.id}`)} style={{ height: '100%' }}>
        <CardMedia
          component='img'
          image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.original_title}
          height='100%'
        />
      </CardActionArea>
    </Card>
  );
};