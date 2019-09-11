// YELP API CALL 

// const apiKey = 'HI2yLub0ev8FlNpORdtb5XBAqME7GR-4u8DeC3xceQE4Ac_2H-x86YFTECI2-m7QO9n9GyX_UNE9nPQyigosUS75PgdJmEvfIt5-jOY1UQklzL0dUu5ualbrAih4XXYx';


// function callyelp(location, term){
//     const params = {
//         location,
//         term,
//     }

//     const options = {headers: {'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json',},}

//     fetch(`https://api.yelp.com/v3/businesses/search?${params.location}&${params.term}&limit=4`, options)
//     .then(response => {return response.json()})
//     .then(responseJson => console.log(responseJson))
//     };





// function callOnSubmit(){
//     $('#submitButton').on('click', event =>{
//     event.preventDefault();
//     let city = $('#city').val();
//     let state = $('#state').val();   
//     let location = `${city},${state}`;
//     let term = $('#term').val();
//     console.log(location);
//     console.log(term);
//     callyelp(location, term);
//     });
// }

// $(callOnSubmit)




// UV API CALL 



function weather(){
    $('.weatherButton').on('click', event =>{
            event.preventDefault();
            let userCity = $('#weatherCity').val();
            console.log(userCity);
            // callyelp(location, term);
            generateURL(userCity);
        });
}

function generateURL(userCity){
    const weatherURL = `https://community-open-weather-map.p.rapidapi.com/weather?q=${userCity}`;

    fetch(weatherURL, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
		"x-rapidapi-key": "56f1ddd8d3mshda48e4f02546bd7p1cb9afjsn8205f3f94db4"
	}
    })
    .then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText)
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
    	console.log(err);
    });
}

function displayResults(responseJson){
    console.log(responseJson);
}


$(weather)