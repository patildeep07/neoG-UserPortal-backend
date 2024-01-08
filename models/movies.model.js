const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  genre: [{
    type: String,
    enum: ['Action', 'Drama', 'Comedy', 'Romance', 'Thriller', 'Fantasy', 'Sci-Fi', 'Sports', 'Musical']
  }],
  director: { type: String, required: true },
  actors: [{ type: String }],
  language: { type: String, required: true },
  country: { type: String, default: "India" },
  rating: { type: Number, min: 0, max: 10, default: 0 },
  plot: String,
  awards: String,
  posterUrl: String,
  trailerUrl: String,
  averageUserRating: Number,
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    text: String,
    userRating: Number
  }]
}, { timepstamps: true })

const Movie = mongoose.model('Movie', movieSchema)

const fs = require('fs')


const moviesData = [
    {
      "title": "Dilwale Dulhania Le Jayenge",
      "releaseYear": 1995,
      "genre": ["Romance", "Drama"],
      "director": "Aditya Chopra",
      "actors": ["Shah Rukh Khan", "Kajol"],
      "language": "Hindi",
      "country": "India",
      "rating": 9.1,
      "plot": "A young man and woman fall in love on a Europe trip.",
      "awards": "Multiple Filmfare Awards",
      "posterUrl": "https://example.com/poster1.jpg",
      "trailerUrl": "https://example.com/trailer1.mp4"
    },
    {
      "title": "Bahubali: The Beginning",
      "releaseYear": 2015,
      "genre": ["Action", "Fantasy"],
      "director": "S. S. Rajamouli",
      "actors": ["Prabhas", "Anushka Shetty"],
      "language": "Telugu",
      "country": "India",
      "rating": 8.1,
      "plot": "A man embarks on a journey to rescue his mother from a tyrant.",
      "awards": "National Film Award",
      "posterUrl": "https://example.com/poster2.jpg",
      "trailerUrl": "https://example.com/trailer2.mp4"
    },
    {
      "title": "Lagaan",
      "releaseYear": 2001,
      "genre": ["Drama", "Sports"],
      "director": "Ashutosh Gowariker",
      "actors": ["Aamir Khan", "Gracy Singh"],
      "language": "Hindi",
      "country": "India",
      "rating": 8.2,
      "plot": "A group of villagers challenge British officers to a cricket match.",
      "awards": "Oscar Nomination",
      "posterUrl": "https://example.com/poster3.jpg",
      "trailerUrl": "https://example.com/trailer3.mp4"
    },
    {
      "title": "Kabhi Khushi Kabhie Gham",
      "releaseYear": 2001,
      "genre": ["Drama", "Romance"],
      "director": "Karan Johar",
      "actors": ["Shah Rukh Khan", "Kajol"],
      "language": "Hindi",
      "country": "India",
      "rating": 7.6,
      "plot": "A family drama spanning generations and continents.",
      "awards": "Multiple Filmfare Awards",
      "posterUrl": "https://example.com/poster4.jpg",
      "trailerUrl": "https://example.com/trailer4.mp4"
    },
    {
      "title": "PK",
      "releaseYear": 2014,
      "genre": ["Comedy", "Drama"],
      "director": "Rajkumar Hirani",
      "actors": ["Aamir Khan", "Anushka Sharma"],
      "language": "Hindi",
      "country": "India",
      "rating": 8.1,
      "plot": "An alien visits Earth and questions religious beliefs.",
      "awards": "National Film Award",
      "posterUrl": "https://example.com/poster5.jpg",
      "trailerUrl": "https://example.com/trailer5.mp4"
    },
    {
      "title": "Bajrangi Bhaijaan",
      "releaseYear": 2015,
      "genre": ["Drama", "Comedy"],
      "director": "Kabir Khan",
      "actors": ["Salman Khan", "Kareena Kapoor"],
      "language": "Hindi",
      "country": "India",
      "rating": 8.0,
      "plot": "A man helps a lost girl reunite with her family.",
      "awards": "National Film Award",
      "posterUrl": "https://example.com/poster6.jpg",
      "trailerUrl": "https://example.com/trailer6.mp4"
    },
    {
      "title": "3 Idiots",
      "releaseYear": 2009,
      "genre": ["Comedy", "Drama"],
      "director": "Rajkumar Hirani",
      "actors": ["Aamir Khan", "Kareena Kapoor"],
      "language": "Hindi",
      "country": "India",
      "rating": 8.4,
      "plot": "Two friends search for their long-lost college buddy.",
      "awards": "Multiple Filmfare Awards",
      "posterUrl": "https://example.com/poster7.jpg",
      "trailerUrl": "https://example.com/trailer7.mp4"
    },
    {
      "title": "Gully Boy",
      "releaseYear": 2019,
      "genre": ["Drama", "Musical"],
      "director": "Zoya Akhtar",
      "actors": ["Ranveer Singh", "Alia Bhatt"],
      "language": "Hindi",
      "country": "India",
      "rating": 7.9,
      "plot": "A young man from the slums aspires to be a rapper.",
      "awards": "Oscar Nomination",
      "posterUrl": "https://example.com/poster8.jpg",
      "trailerUrl": "https://example.com/trailer8.mp4"
    }
  ]

async function seedDatabase() {
  try {
    for (const movieData of moviesData) {
      const newMovie = new Movie({
        title: movieData.title,
        releaseYear: movieData.releaseYear,
        genre: movieData.genre,
        director: movieData.director,
        actors: movieData.actors,
        language: movieData.language,
        country: movieData.country,
        rating: movieData.rating,
        plot: movieData.plot,
        awards: movieData.awards,
        posterUrl: movieData.posterUrl,
        trailerUrl: movieData.trailerUrl
      })

      await newMovie.save()
      console.log(`Movie ${newMovie.title} seeded.`)
    }
    console.log('Database seeding completed.')

  } catch (error) {
    console.log(error)
  } finally {
    // mongoose.disconnect()
  }

}

// seedDatabase()

module.exports = {Movie}