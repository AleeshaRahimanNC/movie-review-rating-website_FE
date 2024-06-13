import React from 'react'
import './Cards.css'
import { useNavigate } from 'react-router-dom'

function Cards({movies}) {
    const navigate=useNavigate()
  return (
    <div className='card' onClick={() => navigate('/home/movieDetails/' + movies._id)}>
      <img src={movies.moviePic} alt={movies.title} />

      <div className='card-content'>
        <h2>{movies.title}</h2>
        <p>Rating: {movies.aggregatedRating}</p>
      </div>
    </div>
  )
}

export default Cards