import { movieApiCall } from "./movie-service.js";
import { generateRandomNumber, checkRangeUsingRandomNumber } from "./random-utils.js";

const movieList =  await movieApiCall();
const randomNumber = generateRandomNumber();
const range = checkRangeUsingRandomNumber(randomNumber);

/**
 * Function to cateogorize movies into ranges based on 3 conditions
 * 1. Check metascore in given range
 * 2. Check the release date
 * 3. Check the rating
 * @param movies - movie list from API
 * @param range - the range returned based on the random number
 * @returns categorizedMovies
 */
function categorizeMovies(movies, range) {
    const categorizedMovies = {
      '1-250': [],
      '251-500': [],
      '501-750': [],
      '751-1000': [],
    };
  
    //Looping through the movie list
    movies.forEach((movie) => {
      const { Metascore, Released, Ratings } = movie;
    
      let isRating;
      let isDay;
      console.log(range);
      switch(range){
        case 1 : 
            isRating = checkRating(Ratings, 75);        
            if(Metascore <= 250 && isRating){
                console.log(1);
                movie.Metascore += 2;
                categorizedMovies["1-250"].push(movie);
                // console.log("swe movie 1", movie);
            }
            break;
        
        case 2 :
            isRating = checkRating(Ratings, 50);
            if(Metascore >=251 && Metascore <= 500 && isRating){
                console.log(2);
                movie.Metascore += 1;
                categorizedMovies["251-500"].push(movie);
                // console.log("swe movie 2", movie);
            }
            break;

        case 3 :
            isRating = checkRating(Ratings, 50);
            isDay = checkReleaseDay(Released, 2);
            if(Metascore >=501 && Metascore <= 750 && isRating){
                console.log(3);
                movie.Metascore -= 1;
                categorizedMovies["501-750"].push(movie);
                // console.log("swe movie 3", movie);
            }
            break;

        case 4:
            isRating = checkRating(Ratings, 25);
            isDay = checkReleaseDay(Released, 1);
            console.log('abcd',isRating, isDay);
            if(isRating){
                console.log(4);
                movie.Metascore -= 2;
                categorizedMovies["751-1000"].push(movie);
                // console.log("swe movie 4", movie);
            }
            break;
        }
    });
    return categorizedMovies;
  }

/**
 * Function to check if a rating satisfies the given condition
 * @param ratingList - Ratings array from the API
 * @param maxRating - Rating required based on the condition
 * @returns isRating
 */
const checkRating = (ratingList, maxRating) => {
    let isRating = false;
    ratingList.forEach( rating => {
        rating.Value = eval(rating.Value) * 100;
        console.log('swe rating value', rating.Value);
        isRating = rating.Value >= maxRating ? true : false;
        if(isRating){
            return isRating;
        } 
    });
    console.log('swe check rating', isRating);
    return isRating;
}

/**
 * Function to check if a release day satisfies the given condition
 * @param date - Release date from the API
 * @param day - Day required based on the condition
 * @returns isDay
 */
const checkReleaseDay = (date, day) => {
    console.log('swe release day',date, day, new Date(date).getDay());
    const isDay = new Date(date).getDay() == day;
    console.log('swe release day 2', isDay);
    return isDay;
}

//TODO: Print the list of categorized movies
console.log(categorizeMovies(movieList,range));