const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://streaming-availability.p.rapidapi.com/countries',
  headers: {
    'X-RapidAPI-Key': 'df70185a90mshe979c7904560fe7p11849fjsn2041343439ed',
    'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}