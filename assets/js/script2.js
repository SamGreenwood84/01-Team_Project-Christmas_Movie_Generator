<<<<<<< Updated upstream
const url = 'https://streaming-availability.p.rapidapi.com/countries';
=======
const url = 'https://streaming-availability.p.rapidapi.com/search/filters?country=us&services=netflix,prime,hbo,hulu&show_type=movie&genre=16,35,10751&keyword=Christmas&year_max=1967';
>>>>>>> Stashed changes

const options = {
method: 'GET', 
headers: {
    'Content-Type': 'application/json',
    // 'X-RapidAPI-Key': 'df70185a90mshe979c7904560fe7p11849fjsn2041343439ed',
    'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
}
};
fetch(url, options)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error', error));
