//  Shawn's code

//  Do not change any of this

//  We can work around this for now

//  It will be commented out until needed

document.addEventListener("DOMContentLoaded", function() {

    // let apiMovieKey = "2a0d51a227874bef4e79413d5a087a83"
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYTBkNTFhMjI3ODc0YmVmNGU3OTQxM2Q1YTA4N2E4MyIsInN1YiI6IjY1NjkxOWY5YjdkMzUyMDEwYjUzYjRkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.47k3rlk5NKDz5f-TsTWyak6hnq2mdRFdS2O5MyF6ZOk",
      },
    };
    // First API call
    fetch(
      "https://api.themoviedb.org/3/search/movie?query=candy cane lane&include_adult=false&language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((data) => {
    
        const result = data.results;
        const cards = document.querySelectorAll("img");
        const title = document.querySelectorAll(".card-title");
        const description = document.querySelectorAll(".card-text");
        const releaseDate = document.querySelectorAll(".releaseDate");
        const voteAverage = document.querySelectorAll(".rating");
        console.log(data.total_pages);
        const totalPages = data.total_pages;
    
        data.results.forEach((result, i) => {
    
            console.log(result.title);
            console.log(result.id);
            console.log(result.overview);
            console.log(result.release_date);
            console.log(result.vote_average);
    
            let posterPath = result.poster_path
            let posterURL = `https://image.tmdb.org/t/p/w500${posterPath}`;
            cards[i].src = posterURL;
            console.log(posterURL);
            title[i].innerText = `${result.title}`;
            description[i].innerText = `${result.overview}`;
            releaseDate[i].innerText = `Released: ${result.release_date}`;
            voteAverage[i].innerText = `Rating: ${result.vote_average}`;
    
           })
      })
      .catch((err) => console.error(err));
    });
    
    