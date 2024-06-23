'use server'

import { Fragment } from 'react'
import axios from 'axios'
import Panel from '@/components/Panel'
import { IMovie } from '@/types/movie'
import { Box, Rating, Typography } from '@mui/material'
import MoviePoster from '@/components/MoviePoster'

type searchParams = { [key: string]: string }

const getData = async (id: string): Promise<IMovie & { recommendations: IMovie[] }> => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjVjMzM3Y2U2NjY0ZjkwZDRmYzZiOTc1Y2I0YWZhNCIsIm5iZiI6MTcxOTA3MTY2MS43MDM3MTMsInN1YiI6IjY2NzZlOWFkYzUwYjMyNmY5YzJiMzhkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fq2rhwHEnQg4Khi6YOZZvf-z-zv1T5rEvYerUAPGzM8'
      }
    })
    const recommendations = await axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US`, {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjVjMzM3Y2U2NjY0ZjkwZDRmYzZiOTc1Y2I0YWZhNCIsIm5iZiI6MTcxOTA3MTY2MS43MDM3MTMsInN1YiI6IjY2NzZlOWFkYzUwYjMyNmY5YzJiMzhkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fq2rhwHEnQg4Khi6YOZZvf-z-zv1T5rEvYerUAPGzM8'
      }
    })

    return { ...response?.data, recommendations: recommendations?.data?.results }
  } catch (error) {
    return error as any
  }
}

interface IProps {
  params: searchParams
}

export default async function Popular({ params }: IProps) {
  const data = await getData(params?.id)

  if (!data) return <p>Ooops error</p>

  const date = new Date(data?.release_date ?? '')

  return (
    <Panel>
      <Box width='100%' position='absolute' left={0} height={{ xs: '30vh', sm: '80vh' }}>
        <img alt={data?.title} src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`} className='defuse-img' style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
      </Box>
      <Box paddingTop={{ xs: '25vh', sm: '40px' }} minHeight={{ sm: '80vh' }} paddingInline={{ xs: '10px', sm: '40px' }} display='flex' flexDirection='column'>
        <Typography variant='h3'>{data?.title}</Typography>
        <Typography variant='caption'>{data?.tagline}</Typography>
        <Typography variant='subtitle2' paddingTop='12px'>{data?.runtime}m - {data?.genres?.map((genre) => <Fragment key={`${genre?.name}-${genre?.id}`}> {genre?.name} -</Fragment>)} {date?.getUTCFullYear()}</Typography>
        <Rating defaultValue={data?.vote_average} max={10} readOnly />
        <Box paddingTop='24px' maxWidth={{ md: '50%' }}>
          <Typography variant='subtitle1'>{data?.overview}</Typography>
        </Box>
      </Box>
      <Box paddingTop={{ xs: '46px', sm: '0px' }}>
        <Typography variant='h5'>Recommendations</Typography>
        <div className='grid-layout' style={{ flex: 1, paddingTop: '16px' }}>
          {
            data?.recommendations?.map((movie: IMovie) => <MoviePoster movie={movie} key={`${movie?.id}-${movie?.title}`} />)
          }
        </div>
      </Box>
    </Panel>
  )
};