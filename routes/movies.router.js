const {User} = require('../models/users.model')
const {Movie} = require('../models/movies.model')

const express = require('express')
const router = express.Router()

// 7. Adding Rating and Review

const addRatingAndReview = async (movieId, userReview) => {
  try {
    const foundMovie = await Movie.findById(movieId)
    

    if (foundMovie) {
      foundMovie.reviews.push(userReview)

      const avgRating = foundMovie.reviews.reduce((acc, review) => acc + review.userRating ,0)/foundMovie.reviews.length

      foundMovie.averageUserRating = parseFloat(avgRating).toFixed(2)

      await foundMovie.save()

      const updatedMovie = await Movie.findById(movieId).populate('reviews.user', 'email username profilePicture')

      return {message:'Review added!', updatedMovie}
    } 

  } catch (error) {
    return {message:'Movie not found!'}
  }
}

router.post('/:movieId/rating', async (req, res) => {
  try {
    const updatedMovie = await addRatingAndReview(req.params.movieId, req.body)

    if (updatedMovie.message === 'Review added!') {
      res.json(updatedMovie)
    } else {
      res.status(404).json(updatedMovie)
    }
  } catch (error) {
    res.status(500).json({message:'Failed to fetch data'})
  }
})

// 7. Get movie Reviews with User Details

const getMovieReviewsWithUserDetails = async (movieId) => {
  try {
    const foundMovie = await Movie.findById(movieId).populate('reviews.user','email username profilePicture phoneNumber address')

    if (foundMovie) {

    return {message:`Found movie successfully!`, title:foundMovie.title ,reviews:foundMovie.reviews.slice(0,3)}
    }
    
  } catch (error) {
    return {message:'Movie not found!'}
  }
}

router.get('/:movieId/reviews', async (req,res) => {
  try {
    const top3Reviews = await getMovieReviewsWithUserDetails(req.params.movieId)

    if (top3Reviews.message === "Found movie successfully!" ) {
      res.json(top3Reviews)
    } else {
      res.status(404).json(top3Reviews)
    }
  } catch {
    res.status(500).json({message:'Failed to fetch data'})
  }
})

module.exports = router