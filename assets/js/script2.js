
// let year;
// let yearMin = `&year_min=${year}`;
// let yearMax = `&year_max=${year}`;
// let firstGenreId = `genre=${genreId}`;
// let nextGenreId = `,${genreId}`;
let myMovie = JSON.parse(localStorage.getItem("chosenMovie"));
let myArray = JSON.parse(localStorage.getItem("ratedMovies"));
let title = "";
let movieId = "";
movieId = myMovie.id;
title = myMovie.title;

const url = 'https://streaming-availability.p.rapidapi.com/search/filters?country=us&services=netflix,prime,hbo,hulu&show_type=movie&keyword=the muppets christmas';

const options = {
    method: 'GET', 
    headers: {
        'Content-Type': 'application/json',
        // 'X-RapidAPI-Key': '2e0c500a89mshab8f861fe70bf86p1a5cdfjsn898ddcd83248',
       'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
   }
    };
    // fetch(url, options)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            let results = data.result;
            results.forEach(i => {
                console.log(results[0].streamingInfo.us[0].service);
            });
            // results[0].tmdbId can be matched with chosenMovie ID
        }
        )
        .catch(error => console.error('Error', error));