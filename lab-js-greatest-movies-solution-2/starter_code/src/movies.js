/* eslint no-restricted-globals: 'off' */

// Iteration 1 - All directors
function getAllDirectors(moviesArr) {
  const directors = moviesArr.map((movieObj) => {
    return movieObj.director;
  });
  const uniqueDirectors = cleanDuplicates(directors);

  return uniqueDirectors;
}

// Bonus - Iteration 1.1: Clean the array of directors
function cleanDuplicates(directorsArray) {
  const directorsSet = new Set(directorsArray);
  const uniqueDirectors = [...directorsSet];
  return uniqueDirectors;
}

console.log(getAllDirectors(movies));

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct
function howManyMovies(moviesArr) {
  const filteredMovies = moviesArr.filter(function (eachMovie) {
    const directorMatch = eachMovie.director === "Steven Spielberg";
    const isDrama = eachMovie.genre.includes("Drama");
    return directorMatch && isDrama;
  });
  return filteredMovies.length;
}

// Iteration 3: All rates average - Get the average of all rates with 2 decimals
function ratesAverage(moviesArr) {
  //  return !moviesArr.length? 0 : Number((moviesArr.reduce((a,b) => b.rate? a + b.rate : a, 0)/moviesArr.length).toFixed(2));
  // this is the one line version

  // It should return 0 if there is no movie
  if (!moviesArr.length) {
    return 0;
  }

  let total = moviesArr.reduce((acc, movie) => {
    if (movie.rate) {
      const updatedAcc = acc + movie.rate;
      return updatedAcc;
    } else {
      // Return average even if one of the movies does not have rate!
      return acc;
    }
  }, 0);

  // you can use Number(), parseInt() or simply plus +
  return Number((total / moviesArr.length).toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesRate(moviesArr) {
  const dramaMovies = moviesArr.filter(function (eachMovie) {
    const isDramaMovie = eachMovie.genre.includes("Drama");
    return isDramaMovie;
  });

  return ratesAverage(dramaMovies);
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArr) {
  const moviesArrCopy = [...moviesArr];

  moviesArrCopy.sort(function (a, b) {
    if (a.year > b.year) {
      return 1;
    } else if (a.year < b.year) {
      return -1;
    } else {
      // If both movies have the same year, order them by title
      if (a.title < b.title) {
        return -1;
      } else {
        return 0;
      }
    }
  });

  return moviesArrCopy;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArr) {
  const moviesArrCopy = [...moviesArr];
  return moviesArrCopy
    .sort(function (a, b) {
    
    
  // if 1 returned: b is sorted before a
  // if -1 returned: a stays before b (leave a and b unchanged)
  // if 0 returned: a stays before b (leave a and b unchanged)
    
      if (a.title > b.title) {
        return 1;
      } else if (a.title < b.title) {
        return -1;
      } else {
        return 0;
      }
    })
    .map((eachMovie) => eachMovie.title)
    .slice(0, 20);
}

// Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArr) {
  const moviesArrCopy = Array.from(moviesArr) //[...moviesArr];

  const formatedMovies = moviesArrCopy.map(function (oneMovie) {
    const formatedMovie = Object.assign({}, oneMovie) //{ ...oneMovie };
    formatedMovie.duration = durationToMinutes(oneMovie.duration);

    return formatedMovie;
  });

  return formatedMovies;
}

function durationToMinutes(durationString) {
  const timeUnits = durationString.trim().split(" ");
  
  const min = parseInt(timeUnits.find(el=>el.includes("min"))) || 0;
  const h = parseInt(timeUnits.find(el=>el.includes("h"))) || 0;

  return `${(h*60) + min} min`;
}


// BONUS Iteration: Best yearly rate average - Best yearly rate average
function bestYearAvg(moviesArr) {
  // Should return null if the array is empty
  if (!moviesArr.length) return null;

  let dictionary = {};

  // Create a dictionary that has movies organized by years
  moviesArr.forEach((eachMovie) => {
    if (!dictionary[eachMovie.year]) {
      // if the year doesn't exist in the dictionary, create it as an array
      dictionary[eachMovie.year] = [eachMovie]; // and add the movie for that year
    } else {
      dictionary[eachMovie.year].push(eachMovie); // if the year exist add the movie to the array representing tht year
    }
  });

  let highestRate = 0;
  let theBestYear;

  // Loop over the dictionary object to determine which year has the highest average rate
  for (const year in dictionary) {
    const yearAverageRate = ratesAverage(dictionary[year]);

    // if current year average is highest than the known highest rate, update the best year and rate
    if (yearAverageRate > highestRate) {
      highestRate = yearAverageRate;
      theBestYear = year;
    }
  }
  return `The best year was ${theBestYear} with an average rate of ${highestRate}`;
}
