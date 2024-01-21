import { movieApiCall } from "./movie-service.js";
import { generateRandomNumber, checkRangeUsingRandomNumber } from "./random-utils.js";

const movieList =  await movieApiCall();
// console.log(movieList);
const randomNumber = generateRandomNumber();
const range = checkRangeUsingRandomNumber(randomNumber);

function categorizeMovies(movies, range) {
    const categorizedMovies = {
      '1-250': [],
      '251-500': [],
      '501-750': [],
      '751-1000': [],
    };
  
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

const checkReleaseDay = (date, day) => {
    console.log('swe release day',date, day, new Date(date).getDay());
    const isDay = new Date(date).getDay() == day;
    console.log('swe release day 2', isDay);
    return isDay;
}

console.log("random Numher", randomNumber, range)
console.log(categorizeMovies(movieList,range));