import { getMoviesList, updateMoviesList } from "../services/movie-service.js";
import { generateRandomNumber, getRange } from "../utils/random-utils.js";

const movieList =  await getMoviesList();
const categorizedMovies = {
    '1-250': [],
    '251-500': [],
    '501-750': [],
    '751-1000': [],
};
let seconds = 0;
const timeInterval = 1000;
const timeLimit = 60;
const randomNumberMaxLimit = 1000;
const rangeSize = 250;
const button = document.getElementById('start');
button.onclick = startProcess;


function startProcess() {
    const interval = setInterval(function() {
        seconds++;
        console.log('TIMER: ', seconds);

        //Generate Random Number
        const randomNumber = generateRandomNumber(randomNumberMaxLimit);
        console.log('Random Number : ', randomNumber);

        //Get the range
        const { rangeStart, rangeEnd } = getRange(randomNumber, rangeSize);
        console.log('Range Obtained : ', rangeStart, rangeEnd);

        //Categorize Movies
        const updatedMovies = categorizeMovies(movieList, rangeStart, rangeEnd);
        if (seconds >= timeLimit) {

            // Stop the interval after 60 seconds
            clearInterval(interval); 
            console.log('Movie into Categories : ', categorizedMovies);

            //Update the updated JSON and host in the API
            updateMoviesList(updatedMovies);  
            console.log('Movie list to be Updated in API : ', updatedMovies);
        }
    }, timeInterval);
}


/**
 * Function to cateogorize movies into ranges based on 3 conditions
 * 1. Check metascore in given range
 * 2. Check the release date
 * 3. Check the rating
 * @param movies - movie list from API
 * @param range - the range returned based on the random number
 * @returns movies - movies with updated metascore
 */
function categorizeMovies(movies, rangeStart, rangeEnd) { 
    //Looping through the movie list
    movies.forEach((movie) => {
      const { Metascore, Released, Ratings } = movie;
      let isRating;
      let isDay;

      if(Metascore >= rangeStart && Metascore <= rangeEnd){
        switch(rangeEnd){
            case 250 : 
                isRating = checkRating(Ratings, 75);  
                if(isRating){    
                    movie.Metascore += 2;
                }
                break;
        
            case 500 :
                isRating = checkRating(Ratings, 50);
                if(isRating){
                    movie.Metascore += 1;
                }
                break;

            case 750 :
                isRating = checkRating(Ratings, 50); 
                isDay = checkReleaseDay(Released, 2);
                if(isRating && isDay){
                    movie.Metascore -= 1;
                }
                break;

            case 1000:
                isRating = checkRating(Ratings, 25);
                isDay = checkReleaseDay(Released, 1);
                if(isRating && isDay){
                    movie.Metascore -= 2;
                }
                break;

            default: 
                break;
            }
        
        //If the movie is already in a given range, update it.
        const index = categorizedMovies[`${rangeStart}-${rangeEnd}`].findIndex(movieItem => movieItem.Title === movie.Title); 
        index !== -1 ? categorizedMovies[`${rangeStart}-${rangeEnd}`][index].Metascore = movie.Metascore : categorizedMovies[`${rangeStart}-${rangeEnd}`].push(movie);
      }
    });
    return movies;
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
        isRating = rating.Value >= maxRating ? true : false;
        if(isRating){
            return isRating;
        } 
    });
    return isRating;
}

/**
 * Function to check if a release day satisfies the given condition
 * @param date - Release date from the API
 * @param day - Day required based on the condition
 * @returns isDay
 */
const checkReleaseDay = (date, day) => {
    const isDay = new Date(date).getDay() == day;
    return isDay;
}
