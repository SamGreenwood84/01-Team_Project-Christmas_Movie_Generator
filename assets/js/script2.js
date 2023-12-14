const url = 'https://streaming-availability.p.rapidapi.com/search/filters?country=us&services=netflix,prime,hbo,hulu&show_type=movie&genre=16,35,10751&keyword=Christmas&year_max=1967';

const options = {
    method: 'GET', 
    headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': '2e0c500a89mshab8f861fe70bf86p1a5cdfjsn898ddcd83248',
       'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
   }
    };
    fetch(url, options)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error', error));