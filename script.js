const API_KEY = "at_ASa98z6Xltyt1g4QnfNPW7ABDIogR";

const searchInput = document.querySelector('.search-bar-type');
const searchButton = document.querySelector('.submit-button');
const ipAddressElement = document.getElementById('partition-ip');
const locationElement = document.getElementById('partition-location');
const timezoneElement = document.getElementById('partition-timezone');
const ispElement = document.getElementById('partition-isp');


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




