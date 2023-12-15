// Variables Declared
let myMovie = JSON.parse(localStorage.getItem("chosenMovie"));
let myArray = JSON.parse(localStorage.getItem("ratedMovies"));
let title = "";
let movieId = "";
let chosenMovie = "";

// Event Listeners
$(document).ready(() => {
  title = myMovie.title;
  console.log(title);
  movieId = myMovie.id;
  console.log(movieId);
  populateMovieCard();
});

$(".submit").on("click", () => {
  pickRandomMovie();
  function pickRandomMovie() {
    let index = Math.floor(Math.random() * myArray.length);
    chosenMovie = myArray[index];
    title = chosenMovie.title;
    populateMovieCard();
    getStream(title);
  }
});
$(".restart").on("click", () => {
    window.location.href = "index.html";
});

function getStream(title) {
  movieId = chosenMovie.id;
  console.log(title);
  const url = `https://streaming-availability.p.rapidapi.com/search/filters?country=us&services=netflix,prime,hbo,hulu&show_type=movie&keyword=${title}`;

  const options = {
      method: 'GET', 
      headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': 'ec3251b884msh32e86fe3f91ca4fp11e3b2jsnf9ee270a236c',
          // 'X-RapidAPI-Key': '2e0c500a89mshab8f861fe70bf86p1a5cdfjsn898ddcd83248',
         'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
     }
      };
      fetch(url, options)
          .then(res => res.json())
          .then(data => {
              console.log(data);
              let results = data.result;
              
              console.log(results[0].streamingInfo.us[0].service);
              
              // results[0].tmdbId can be matched with chosenMovie ID
          }
          )
          .catch(error => console.error('Error', error));
}


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
      // Populate the Card with values
      cards[0].src = posterURL;
      title[0].innerText = `${result.title}`;
      description[0].innerText = `${result.overview}`;
      releaseDate[0].innerText = `Released: ${result.release_date}`;
      voteAverage[0].innerText = `Rating: ${result.vote_average}`;
    })
    .catch((err) => console.error(err));
}
