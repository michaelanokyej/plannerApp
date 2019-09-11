function userLocation(){
    let long;
    let lat;
    let tempDescription = $('.temp-description');
    let tempDegree = $('.temp-degree');
    // let tempDegree = $('.temp-degree');





    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(`long = ${long} and lat = ${lat} `);
        }); 
    }else{
        alert ('Your browser does not support geolocation');
    }
    getWeather(long, lat)
    // getuvIndex(long, lat);
}

function getWeather(long, lat){
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const weatherURL =`${proxy}https://api.darksky.net/forecast/0c2f73d8efc4b088e536ea18dc777461/${lat},${long}`;

    fetch(weatherURL)
        .then(response => response.json()) 
        .then(data => {
            console.log(data);
            const {temperature, summary} = data.currently;
        })


}



$(userLocation)

