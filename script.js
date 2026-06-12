const API_KEY = "at_ASa98z6Xltyt1g4QnfNPW7ABDIogR";

const searchInput = document.querySelector('.search-bar-type');
const searchButton = document.querySelector('.submit-button');
const ipAddressElement = document.getElementById('partition-ip');
const locationElement = document.getElementById('partition-location');
const timezoneElement = document.getElementById('partition-timezone');
const ispElement = document.getElementById('partition-isp');


let map = null;
let marker = null;

let myIcon = L.icon({
    iconUrl: 'images/icon-location.svg',
    iconSize: [30, 45],
    iconAnchor: [15, 45], 
    popupAnchor: [0, -45]  
});



async function getIPLocation(ipAddress = null){

    let url = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}`;

    if(ipAddress && ipAddress.trim()!= ''){
        url += `&ipAddress=${ipAddress}`;
    }

    const response = await fetch(url);
    const data = await response.json();


    ipAddressElement.textContent = data.ip;
    locationElement.textContent = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
    timezoneElement.textContent = `UTC${data.location.timezone}`;
    ispElement.textContent = data.isp;

    let firstCoords = data.location.lat;
    let secondCoords = data.location.lng;

    if(!map){
        
        map = L.map('map').setView([firstCoords, secondCoords], 10);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        marker = L.marker([firstCoords, secondCoords], {icon: myIcon}).addTo(map);

    }

    else{
        map.setView([firstCoords, secondCoords], 10);
        marker.setLatLng([firstCoords, secondCoords]);

    }

}



searchButton.addEventListener("click", ()=> {
    const searchTerm = searchInput.value.trim();
    if(searchTerm === ''){
        getIPLocation();
    }

    else{
        getIPLocation(searchTerm);
    }

});


searchInput.addEventListener("keypress", (event)=>{
    if(event.key === "Enter"){
        const searchTerm = searchInput.value.trim();
        if(searchTerm === ''){
            getIPLocation();
        }

        else{
            getIPLocation(searchTerm);
        }
    }

});
 
getIPLocation();







