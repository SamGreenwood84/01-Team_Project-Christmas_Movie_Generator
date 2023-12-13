//  Shawn's code

//  Do not change any of this

//  We can work around this for now

//  It will be commented out until needed
const keyWord = "Christmas";
let lang = "";
let rating = "";
let chosenDate = "";
let limitDate = "";
let id = "";
let movieResults = [];
let moviesWithGenres = [];
let idsToFilter = [];
let ratedMovies = [];

// Modal 1 listeners
$(".amazon").on("click", () => {
  console.log("amazon");
});
$(".netflix").on("click", () => {
  console.log("netflix");
});
$(".disney").on("click", () => {
  console.log("disney");
});
$(".crave").on("click", () => {
  console.log("crave");
});
// Modal 2 listeners
$(".english").on("click", () => {
  console.log("english");
  lang = "en-US";
});
$(".french").on("click", () => {
  console.log("french");
  lang = "fr-EU";
});
$(".spanish").on("click", () => {
  console.log("spanish");
  lang = "es-EU";
});
$(".japanese").on("click", () => {
  console.log("japanese");
  lang = "ja-US";
});
// Modal 3 listeners
$(".noBruce").on("click", () => {
  console.log("no bruce");
  $(".uncommon").addClass("none");
});
$(".yesBruce").on("click", () => {
  console.log("yes bruce");
});
// Modal 4 listeners
$(".karloff").on("click", () => {
  console.log("karloff");
  // 1989 and earlier
  chosenDate = "1920";
  limitDate = "1990";
  
});
$(".carrey").on("click", () => {
  console.log("carrey");
  // 1990's to 2010
  chosenDate = "1990";
  limitDate = "2011";
});
$(".cumber").on("click", () => {
  console.log("cumberbatch");
  // 2011 to present
  chosenDate = "2011";
  limitDate = "2024";
});
// Modal 5 section 1 listeners
$(".family").on("click", () => {
  console.log("family");
  id = "10751";
  idsToFilter.push(id);
});
$(".comedy").on("click", () => {
  console.log("comedy");
  id = "35";
  idsToFilter.push(id);
});
$(".anime").on("click", () => {
  console.log("anime");
  id = "16";
  idsToFilter.push(id);
});
$(".music").on("click", () => {
  console.log("musical");
  id = "10402";
  idsToFilter.push(id);
});
$(".fantasy").on("click", () => {
  console.log("fantasy");
  id = "14";
  idsToFilter.push(id);
});
// Modal 5 section 2 listeners
$(".horror").on("click", () => {
  console.log("horror");
  id = "27";
  idsToFilter.push(id);
});
$(".drama").on("click", () => {
  console.log("drama");
  id = "18";
  idsToFilter.push(id);
});
$(".romance").on("click", () => {
  console.log("romp");
  id = "10749";
  idsToFilter.push(id);
});
$(".action").on("click", () => {
  console.log("action");
  id = "28";
  idsToFilter.push(id);
});
$(".adventure").on("click", () => {
  console.log("advent");
  id = "12";
  idsToFilter.push(id);
});
// let apiMovieKey = "2a0d51a227874bef4e79413d5a087a83";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYTBkNTFhMjI3ODc0YmVmNGU3OTQxM2Q1YTA4N2E4MyIsInN1YiI6IjY1NjkxOWY5YjdkMzUyMDEwYjUzYjRkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.47k3rlk5NKDz5f-TsTWyak6hnq2mdRFdS2O5MyF6ZOk",
  },
};

$(".submit").on("click", function () {  
  // First API call to get page1 results and totalPages for the rest of the calls
  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${keyWord}&include_adult=false&language=${lang}&page=1`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      movieResults = [];
      data.results.forEach((movie) => {
        if (movie.release_date.substring(0, 4) >= chosenDate && movie.release_date.substring(0, 4) < limitDate) {
          movieResults.push(movie);
        }
      });
      const result = data.results;
      // const cards = document.querySelectorAll("img");
      // const title = document.querySelectorAll(".card-title");
      // const description = document.querySelectorAll(".card-text");
      // const releaseDate = document.querySelectorAll(".releaseDate");
      // const voteAverage = document.querySelectorAll(".rating");
      // console.log(data.total_pages);
      const totalPages = data.total_pages;

      // data.results.forEach((result, i) => {

      //     console.log(result.title);
      //     console.log(result.overview);
      //     console.log(result.release_date);
      //     console.log(result.vote_average);

      //     let posterPath = result.poster_path
      //     let posterURL = `https://image.tmdb.org/t/p/w185${posterPath}`;
      //     cards[i].src = posterURL;
      //     console.log(posterURL);
      //     title[i].innerText = `${result.title}`;
      //     description[i].innerText = `${result.overview}`;
      //     releaseDate[i].innerText = `Released: ${result.release_date}`;
      //     voteAverage[i].innerText = `Rating: ${result.vote_average}`;

      //    })

      // The rest of the calls with totalPages being the # of calls
      for (let page = 170; page <= totalPages; page++) {
        fetch(
          `https://api.themoviedb.org/3/search/movie?query=${keyWord}&include_adult=false&language=${lang}&page=${page}`,
          options
        )
          .then((response) => response.json())
          .then((data) => {
            data.results.forEach((movie) => {
              if (movie.release_date.substring(0, 4) >= chosenDate && movie.release_date.substring(0, 4) < limitDate) {
                movieResults.push(movie);
              }
            });
            // Wait for all the fetches to be complete
            if (page === totalPages) {
              // Loop through each movie in the movieResults array
              movieResults.forEach((movie) => {
                let genreIds = movie.genre_ids;
                genreIds.forEach((genreId) => {
                  // Filter by included genre IDs
                  if (idsToFilter.includes(`${genreId}`)) {
                    const filteredMovie = movieResults.filter(
                      (m) => m.id == movie.id
                    );
                    // Update moviesWithGenres
                    moviesWithGenres = moviesWithGenres.concat(filteredMovie);
                  }
                });
              });
              // console.log(moviesWithGenres);
              // Filter by vote rating
              rating = "5";
              ratedMovies = moviesWithGenres.filter(movie => {
                return movie.vote_average >= rating;
              })
              console.log(ratedMovies);
              ratedMovies.forEach((movie) => {
                console.log(movie.title);
              });
              pickRandomMovie();
              function pickRandomMovie() {
                console.log("randomness initiated");
                console.log(ratedMovies.length);
                let randomIndex = Math.floor(Math.random()*(ratedMovies.length));
                console.log(randomIndex);
                console.log(ratedMovies[randomIndex]);
              }
            }
          })
          .catch((error) => {
            // Handle any errors
            console.error(error);
          });
      }
    })
    .catch((err) => console.error(err));

  //   let movieId = "5825";

  // // Get reviews with movie id, which can be found in the above query search {result.id}

  //   fetch(`https://api.themoviedb.org/3/movie/5825/reviews`, options)
  //   .then(response => response.json())
  // .then(data => {
  //   console.log(data);
  //   const result = data.results;

  //   data.results.forEach((result, i) => {

  //       console.log(result.author);
  //       console.log(result.content);

  //      })

  //   })

  //   .catch(err => console.error(err));
});
