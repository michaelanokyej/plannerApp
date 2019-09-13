'use strict'

// Get user's current location and load weather section 
function initialize(){
    let long;
    let lat;
    let tempDescription = $('.temp-description');
    let tempDegree = $('.temp-degree');
    let tempSuggestion = $('.temp-suggestion');
    let locationTimezone = $('.location-timezone');
    // let weatherIcon = $('.icon')    





    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            // console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(`long = ${long} and lat = ${lat} `);

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const weatherURL =`${proxy}https://api.darksky.net/forecast/0c2f73d8efc4b088e536ea18dc777461/${lat},${long}`;
            fetch(weatherURL)
            .then(response => response.json()) 
            .then(data => {
                const {temperature, summary, icon} = data.currently;
                // Display elements in DOM
                tempDegree.text(temperature);
                tempDescription.text(summary);
                locationTimezone.text(data.timezone);
                // Set weather icon in DOM
                // setIcons(icon, $('.icon'));
                // let displayedTemp = temperature;
                // getSuggestion(displayedTemp);
                })
            getUserState(long, lat)
        }); 
    }else{
        alert ('Your browser does not support geolocation');
    }
    // give the user to provide location manually 
    // if they are not comfy with automatic geolocations 

// function setIcons(icon, iconID){
//     const skycons = new Skycons({color: "white" });
//     const currentIcon = icon.replace(/-/g, "_").toUpperCase();
//     skycons.play();
//     return skycons.set(iconID, Skycons[currentIcon]);
// }
    loadTodoPage()

}
// function to display suggestion 
// function getSuggestion(displayedTemp){
//     if(temperature < 75){
//         tempSuggestion.text(`It is kinda cold, wear a sweater.`)
//     }
// }


// Reverse geocode user's long 
// and latitude to get user's state 
    function getUserState(long, lat){
       const addURL = `https://us1.locationiq.com/v1/reverse.php?key=ee9597797b2280&lat=${lat}&lon=${long}&format=json`;
       fetch(addURL)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText)
    })
    .then(responseJson => {
        console.log(responseJson);
        const userState = responseJson.address.state;
        console.log (userState);
        getParks(userState)
    })
    .catch(err => {
      $('.errorMessage').text(`Something went wrong: ${err.message}`);
    });
    }

    // Use user,s state to call parks API 
    function getParks(userState){
        const parkKey= 'RaYswaUxaB9BWohOoxp1qBuF5mSz9pFYsvP7NOWo'
        fetch(`https://developer.nps.gov/api/v1/places?q=${userState}&api_key=${parkKey}&limit=4`)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.statusText)
        })
        // .then(responseJson => displayResults(responseJson))
        .then(responseJson => {
            console.log(responseJson)
            displayResults(responseJson)
        })
        .catch(err => {
          $('.errorMessage').text(`Something went wrong: ${err.message}`);
        });
    
        function displayResults(responseJson){
            let array = responseJson.data;
            if(array === undefined || array.length === 0){
                alert('Sorry, something went wrong, check input.');
            }else{
                for(let i=0; i < array.length; i++){
                    $('.displayedResults').append(`
                    <li class="projectLi"> 
                        <div class="title">${array[i].title}</div>
                        <div class="imgWrapper">
                            <img src="${array[i].listingimage.url}" alt="Todo List screenshot" class="projectImage" />
                        </div>
                        <div class="paraWrapper">
                            <p class="center description">${array[i].listingdescription}</p>
                        </div>
                        <div class="park-links">
                            <a href="${array[i].url}" class ="parkButton" target="_blank">Go to park</a> 
                        </div>
                    </li>
                    `)
                }
            }
            $('h1.results').removeClass('hidden');
        }
    }

    // When todo list button is clicked, load todo section 
function loadTodoPage(){
    $('.todoContainer').on('click', '.todoButton', function(e){
        // console.log('todo button clicked');
        $('#todoApp').toggleClass('hidden');
        $('#todoApp').html(`<h1>To-DO List <i class="fas fa-plus"></i></h1>
        <input type="text" name="" placeholder="Add New Todo">
        <ul class='todoUL'>
            <li><span><i class="fas fa-trash-alt"></i></span> Study jQuery</li>
            <li><span><i class="fas fa-trash-alt"></i></span> Work on portfolio</li>
            <li><span><i class="fas fa-trash-alt"></i></span> Apply for jobs</li>
            <li><span><i class="fas fa-trash-alt"></i></span> Repeat</li>
        </ul>`)
    })
    // handlingTodo()
}

// The below function handle todo section interactivity 
// function handlingTodo(){
//     // Check off specific Todos by clicking
// $('.todoUL').on('click', 'li', function(){
//     // Toggle the completed class
//         $(this).toggleClass('completed');
//     });
    
//     // Click on X to delete todo
//     $('ul').on('click', 'span', function(event){
//         $(this).parent().fadeOut(500, function(){
//             $(this).remove();
//         });
//         event.stopPropagation();
//     });
    
//     $('input[type="text"]').keypress(function(event){
//     // Check if user has hit enter
//         if(event.which === 13){
//     // Grab new todo text from input
//         let toDoText = $(this).val();
//     // Clean input after grabbing value
//         $(this).val('');
//     // create a new li and add to ul
//         $('ul').append(`<li><span><i class="fas fa-trash-alt"></i></span> ${toDoText}</li>`);
//         }
//     });
    
    
//     $('.fa-plus').click(function(){
//         $('input[type="text"]').fadeToggle();
//     });
// }


$(initialize)




