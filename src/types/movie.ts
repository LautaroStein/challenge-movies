export interface IGenre {
  id: number
  name: string
}

export interface IProductionCompany {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

export interface IProductionCountry {
  iso_3166_1: number
  name: string
}

export interface ISpokeLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

export interface IMovie {
  adult: boolean
  backdrop_path: string
  belongs_to_collection?: {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
  }
  budget?: number
  genre_ids: string[]
  genres?: IGenre[]
  id: number
  homepage?: string
  imdb_id?: string
  origin_country?: string[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  production_companies?: IProductionCompany[]
  production_countries?: IProductionCountry[]
  release_date?: string
  revenue?: number
  spoken_languages?: ISpokeLanguage[]
  status?: string
  tagline?: string
  runtime?: number
}