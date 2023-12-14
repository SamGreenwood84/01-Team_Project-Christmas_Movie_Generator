// Variables declared

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
let yesBruceClicked = false;
let noBruceClicked = false;
let karloffClicked = false;
let carreyClicked = false;
let cumberClicked = false;
let genreClicked = false;
let ratingClicked = false;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYTBkNTFhMjI3ODc0YmVmNGU3OTQxM2Q1YTA4N2E4MyIsInN1YiI6IjY1NjkxOWY5YjdkMzUyMDEwYjUzYjRkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.47k3rlk5NKDz5f-TsTWyak6hnq2mdRFdS2O5MyF6ZOk",
  },
};

// Modal 1 listeners

$(".amazon").on("click", () => {
  console.log("amazon");
});
$(".netflix").on("click", () => {
  console.log("netflix");
});
$(".hbo").on("click", () => {
  console.log("hbo");
});
$(".hulu").on("click", () => {
  console.log("hulu");
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
$("#modalToggle2 .forward").on("click", () => {
  console.log("event happened");
  if (typeof lang === "undefined" || lang === "") {
    alert("Please choose a language.");
  } else {
    $("#modalToggle2").modal("hide");
    $("#modalToggle3").modal("show");
  }
});

// Modal 3 listeners

$(".noBruce").on("click", () => {
  noBruceClicked = true;
  console.log("no bruce");
  $(".uncommon").addClass("none");
});
$(".yesBruce").on("click", () => {
  yesBruceClicked = true;
  console.log("yes bruce");
});
$("#modalToggle3 .forward").on("click", () => {
  console.log("event happened");
  if (yesBruceClicked || noBruceClicked) {
    $("#modalToggle3").modal("hide");
    $("#modalToggle4").modal("show");
  } else {
    alert("Please select an option.");    
  }
});

// Modal 4 listeners

$(".karloff").on("click", () => {
  karloffClicked = true;
  console.log("karloff");
  // 1989 and earlier
  chosenDate = "1920";
  limitDate = "1990";
});
$(".carrey").on("click", () => {
  carreyClicked = true;
  console.log("carrey");
  // 1990's to 2010
  chosenDate = "1990";
  limitDate = "2011";
});
$(".cumber").on("click", () => {
  cumberClicked = true;
  console.log("cumberbatch");
  // 2011 to present
  chosenDate = "2011";
  limitDate = "2024";
});
$("#modalToggle4 .forward").on("click", () => {
  console.log("event happened");
  if (karloffClicked || carreyClicked || cumberClicked) {
    $("#modalToggle4").modal("hide");
    $("#modalToggle5").modal("show");
  } else {
    alert("Please select a Grinch.");    
  }
});

// Modal 5 section 1 listeners

$(".family").on("click", () => {
  genreClicked = true;
  console.log("family");
  id = "10751";
  idsToFilter.push(id);
});
$(".comedy").on("click", () => {
  genreClicked = true;
  console.log("comedy");
  id = "35";
  idsToFilter.push(id);
});
$(".anime").on("click", () => {
  genreClicked = true;
  console.log("anime");
  id = "16";
  idsToFilter.push(id);
});
$(".music").on("click", () => {
  genreClicked = true;
  console.log("musical");
  id = "10402";
  idsToFilter.push(id);
});
$(".fantasy").on("click", () => {
  genreClicked = true;
  console.log("fantasy");
  id = "14";
  idsToFilter.push(id);
});
// Modal 5 section 2 listeners
$(".horror").on("click", () => {
  genreClicked = true;
  console.log("horror");
  id = "27";
  idsToFilter.push(id);
});
$(".drama").on("click", () => {
  genreClicked = true;
  console.log("drama");
  id = "18";
  idsToFilter.push(id);
});
$(".romance").on("click", () => {
  genreClicked = true;
  console.log("romp");
  id = "10749";
  idsToFilter.push(id);
});
$(".action").on("click", () => {
  genreClicked = true;
  console.log("action");
  id = "28";
  idsToFilter.push(id);
});
$(".adventure").on("input", () => {
  genreClicked = true;
  console.log("advent");
  id = "12";
  idsToFilter.push(id);
});
$("#modalToggle5 .forward").on("click", () => {
  console.log("event happened");
  if (genreClicked) {
    $("#modalToggle5").modal("hide");
    $("#modalToggle6").modal("show");
  } else {
    alert("Please select a genre.");    
  }
});

// Modal 6 event listeners

$("#amountRange").on("input", () => {
  ratingClicked = true;
  let inputValue = $("#amountRange").val();
  rating = inputValue;
  console.log(rating);
});
$(".submit").on("click", () => {
  if (ratingClicked) {
    $("#modalToggle6").modal("hide");
    getMovie();
  } else {
    alert("Please select a rating.");    
  }
})

function getMovie() {

    const uniqueMovieIds = new Set();
    // First API call to get page1 results and totalPages for the rest of the calls
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${keyWord}&include_adult=false&language=${lang}&page=1`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        movieResults = [];
        data.results.forEach((movie) => {
          if (
            movie.release_date.substring(0, 4) >= chosenDate &&
            movie.release_date.substring(0, 4) < limitDate &&
            !uniqueMovieIds.has(movie.id)
          ) {
            movieResults.push(movie);
            uniqueMovieIds.add(movie.id);
          }
        });
        const result = data.results;
        const totalPages = data.total_pages;
  
        // The rest of the calls with totalPages being the # of calls
        for (let page = 2; page <= totalPages; page++) {
          fetch(
            `https://api.themoviedb.org/3/search/movie?query=${keyWord}&include_adult=false&language=${lang}&page=${page}`,
            options
          )
            .then((response) => response.json())
            .then((data) => {
              data.results.forEach((movie) => {
                // If movie is within date range and has not already been added, gets added to array
                if (
                  movie.release_date.substring(0, 4) >= chosenDate &&
                  movie.release_date.substring(0, 4) < limitDate &&
                  !uniqueMovieIds.has(movie.id)
                ) {
                  movieResults.push(movie);
                  uniqueMovieIds.add(movie.id);
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
                        (m) => m.id === movie.id
                      );
                      // Update moviesWithGenres
                      moviesWithGenres = moviesWithGenres.concat(filteredMovie);
                    }
                  });
                });
                // Filter by vote rating
                ratedMovies = moviesWithGenres.filter((movie) => {
                  return movie.vote_average >= rating;
                });
                // Remove duplicates based on movie ID
                // Movie may have been added more than once if had multiple genres included
                ratedMovies = Array.from(
                  new Set(ratedMovies.map((movie) => movie.id))
                ).map((id) => ratedMovies.find((movie) => movie.id === id));
                console.log(ratedMovies);
                ratedMovies.forEach((movie) => {
                  console.log(movie.title);
                });
                pickRandomMovie();
                function pickRandomMovie() {
                  let randomIndex = Math.floor(
                    Math.random() * ratedMovies.length
                  );
                  let randomChosenMovie = ratedMovies[randomIndex];
                  console.log(randomChosenMovie);
                  // Set items in local storage to be accessed by index2 later
                  localStorage.setItem(
                    "chosenMovie",
                    JSON.stringify(randomChosenMovie)
                  );
                  localStorage.setItem(
                    "ratedMovies",
                    JSON.stringify(ratedMovies)
                  );
                  window.location.href = "index2.html";
                }
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((err) => console.error(err));
}