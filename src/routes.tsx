import MovieCarousel from './features/MovieCarousel/MovieCarousel'
import MovieDetail from './features/MovieDetail/MovieDetail'
import { NotFound } from './pages/NotFound'

export const routes = [
  {
    path: '/',
    element: <MovieCarousel />,
  },
  {
    path: '/movie/:id',
    element: <MovieDetail />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]
