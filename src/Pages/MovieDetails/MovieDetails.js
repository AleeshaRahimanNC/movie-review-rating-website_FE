import React from 'react'
import './MovieDetails.css'
import CusNavBar from '../../Components/Common/CusNavBar/CusNavBar'
import MovieDetailBody from '../../Components/MovieDetailBody/MovieDetailBody'
import { useParams } from 'react-router-dom';

function MovieDetails() {
  const { movieId } = useParams();
  return (
    <>
    <CusNavBar/>
    <MovieDetailBody movieId={movieId}/>
    </>
  )
}

export default MovieDetails