import { getMoviesList } from "../services/movie-service.js";
import { generateRandomNumber, getRange } from "../utils/utils.js";

let updatedMovies;
const movieList =  await getMoviesList();
let categorizedMovies = {
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
        categorizeMovies(movieList, rangeStart, rangeEnd); 
        if (seconds >= timeLimit) {

            // Stop the interval after 60 seconds
            clearInterval(interval); 
            //Update the updated JSON and host in the API
            categorizedMovies = updateMoviesList(updatedMovies);  
            console.log('Movie list categorized: ', categorizedMovies);
        }
    }, timeInterval);
}

function updateMoviesList(updatedMovieList) {
    updatedMovieList.forEach((movie) => {
        movie.Metascore <= 250 ? categorizedMovies['1-250'].push(movie) :
        movie.Metascore <= 500 ? categorizedMovies['251-500'].push(movie) :
        movie.Metascore <= 750 ? categorizedMovies['501-750'].push(movie) :
        categorizedMovies['751-1000'].push(movie);
    });
    return categorizedMovies;
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
    updatedMovies = movies.map((movie) => {
      const { Metascore, Released, Ratings } = movie;
      let isRating;
      let isDay;
      if(Metascore >= rangeStart && Metascore <= rangeEnd){
        switch(rangeEnd){
            case 250 : 
                isRating = checkRating(Ratings, 75, true); 
                isDay = checkReleaseDay(Released);
                if(isRating && isDay.isEvenDay){    
                    movie.Metascore += 2; 
                }
                break;
        
            case 500 :
                isRating = checkRating(Ratings, 50, true);
                isDay = checkReleaseDay(Released);
                if(isRating && !isDay.isEvenDay){
                    movie.Metascore += 1;
                }
                break;

            case 750 :
                isRating = checkRating(Ratings, 50, false); 
                isDay = checkReleaseDay(Released, 2);
                if(isRating && isDay.isReleaseDay){
                    movie.Metascore -= 1;
                }
                break;

            case 1000:
                isRating = checkRating(Ratings, 25, false);
                isDay = checkReleaseDay(Released, 1);
                if(isRating && isDay.isReleaseDay){
                    movie.Metascore -= 2;
                }
                break;

            default: 
                break;
            }
      }
      return movie;
    });
  }

/**
 * Function to check if a rating satisfies the given condition
 * @param ratingList - Ratings array from the API
 * @param maxRating - Rating required based on the condition
 * @returns isRating
 */
const checkRating = (ratingList, maxRating, isAbove) => {
    return ratingList.some(rating => {
        let fraction = rating.Value.split("/");
        let ratingValue = parseFloat(fraction[0]) / parseFloat(fraction[1]) * 100;
        return isAbove ? ratingValue > maxRating : ratingValue < maxRating;
    });
}

/**
 * Function to check if a release day satisfies the given condition
 * @param date - Release date from the API
 * @param day - Day required based on the condition
 * @returns isDay
 */
const checkReleaseDay = (date, day) => { 
    const getDay = new Date(date).getDay();
    const isReleaseDay = getDay == day;
    const isEvenDay = getDay % 2 === 0;
    return { isReleaseDay, isEvenDay };
}
