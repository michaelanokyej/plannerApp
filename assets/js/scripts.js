function userLocation(){
    let long;
    let lat;
    let tempDescription = $('.temp-description');
    let tempDegree = $('.temp-degree');
    let locationTimezone = $('.location-timezone');
    // let weatherIcon = $('.icon')    





    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
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
                
                })
        }); 
    }else{
        alert ('Your browser does not support geolocation');
    }

// function setIcons(icon, iconID){
//     const skycons = new Skycons({color: "white" });
//     const currentIcon = icon.replace(/-/g, "_").toUpperCase();
//     skycons.play();
//     return skycons.set(iconID, Skycons[currentIcon]);
// }

}




$(userLocation)

