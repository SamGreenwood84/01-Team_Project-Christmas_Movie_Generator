// Variables Declared
let myMovie = JSON.parse(localStorage.getItem("chosenMovie"));
let myArray = JSON.parse(localStorage.getItem("ratedMovies"));
let title = "";

// Event Listeners
$(document).ready(() => {
  title = myMovie.title;
  populateMovieCard();
});

$(".submit").on("click", () => {
  pickRandomMovie();
  function pickRandomMovie() {
    let index = Math.floor(Math.random() * myArray.length);
    let chosenMovie = myArray[index];
    title = chosenMovie.title;
    populateMovieCard();
  }
});
$(".restart").on("click", () => {
    window.location.href = "index.html";
});

// Movie Card
function populateMovieCard() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYTBkNTFhMjI3ODc0YmVmNGU3OTQxM2Q1YTA4N2E4MyIsInN1YiI6IjY1NjkxOWY5YjdkMzUyMDEwYjUzYjRkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.47k3rlk5NKDz5f-TsTWyak6hnq2mdRFdS2O5MyF6ZOk",
    },
  };
  // API call
  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      const result = data.results[0];
      const cards = document.querySelectorAll("img");
      const title = document.querySelectorAll(".card-title");
      const description = document.querySelectorAll(".card-text");
      const releaseDate = document.querySelectorAll(".releaseDate");
      const voteAverage = document.querySelectorAll(".rating");
      const totalPages = data.total_pages;

      let posterPath = result.poster_path;
      let posterURL = `https://image.tmdb.org/t/p/w500${posterPath}`;
      cards[0].src = posterURL;
      title[0].innerText = `${result.title}`;
      description[0].innerText = `${result.overview}`;
      releaseDate[0].innerText = `Released: ${result.release_date}`;
      voteAverage[0].innerText = `Rating: ${result.vote_average}`;
    })
    .catch((err) => console.error(err));
}
