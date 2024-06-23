'use server'

import axios from 'axios'
import Pagination from '@/components/Pagination'
import Panel from '@/components/Panel'
import MoviePoster from '@/components/MoviePoster'
import { IMovie } from '@/types/movie'
import { Typography } from '@mui/material'

type ISearchParams = { [key: string]: string | string[] | undefined }

const getData = async (searchParams: ISearchParams) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${searchParams?.page ?? 1}`, {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjVjMzM3Y2U2NjY0ZjkwZDRmYzZiOTc1Y2I0YWZhNCIsIm5iZiI6MTcxOTA3MTY2MS43MDM3MTMsInN1YiI6IjY2NzZlOWFkYzUwYjMyNmY5YzJiMzhkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fq2rhwHEnQg4Khi6YOZZvf-z-zv1T5rEvYerUAPGzM8'
      }
    })

    return response?.data
  } catch (error) {
    return error
  }
}

interface IProps {
  searchParams: ISearchParams;
}

export default async function Page({ searchParams }: IProps) {
  const data = await getData(searchParams)

  if (!data?.results) return <p>Ooops error</p>

  return (
    <Panel>
      <Typography variant='h3' marginBottom='24px'>Now Playing</Typography>
      <div className='grid-layout' style={{ flex: 1, paddingBottom: '24px' }}>
        {
          data?.results?.map((movie: IMovie) => <MoviePoster movie={movie} key={`${movie?.id}${movie?.title}`} />)
        }
      </div>
      <Pagination total={data?.total_pages} />
    </Panel>
  )
};