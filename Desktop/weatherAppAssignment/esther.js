// const wrapper =document.querySelector(".wrapper"),
// inputPart = wrapper.querySelector(".input-part"),
// infoTxt = inputPart.querySelector(".info-txt"),
// inputField = inputPart.querySelector("input");

// inputField.addEventListener("keyup", e =>{
//     // if the user click on enter btn and input value is not empty
//     if(e.key == 'Enter' && inputField.value != ""){
//         requestApi(inputField.value);
//     }
// });
 
// function requestApi(city){
//     let api ='https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}';
// }

// const getWeatherBtn = document.getElementById('get-weather-btn');
// const icon = document.getElementById('icon');
// const city = document.getElementById('city');
// const country = document.getElementById('country');
// const temperature = document.getElementById('temp');
// const feelsLike = document.getElementById('feels');
// const lat = document.getElementById('latitude');
// const long = document.getElementById('longitude');
// const inputLocation = document.querySelector('location');


const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
wIcon = document.querySelector(".weather-part img"),
arrowBack = wrapper.querySelector("header i");


let api;

inputField.addEventListener("keyup", e =>{
    // if user pressed enter btn and input values is not empty
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click",()=>{
    if(navigator.geolocation){ // if browser support geolocation api
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser not support geolocation api");

    }
});

function onSuccess(position){
    const {latitude, longitude} = position.coords;
    api ='';
    fetchData();
}

function onError(error){
    // console.log(error);
    infoTxt.innerHTML = error.message;
    infoTxt.classList.add("error");
}

function requestApi(city){
    api = '';
    fetchData();
}

function fetchData(){
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");


    // getting api response and returning it with parsing into js obj and in another 
    // then function calling weatherDetails function with passing api result as an assignment
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info){
    infoTxt.classList.replace("pending", "error")
    if(info.cod == "404"){
        infoTxt.innerText = "${inputField.value} isn't a valid city name";
    }else{
        //getrequired properties value from the info object
        const city = info.name;
        const country = info.sys.country;
        const {description,id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

    //using custom icon according to the id which api return us
    if(id == 800){
        wIcon.src = "icons/clear.svg";
    }else if(id >= 200 && id <= 232){
        wIcon.src = "icons/storm.svg";
    }else if(id >= 200 && id <= 232){
        wIcon.src = "icons/snow.svg";
    }else if(id >= 200 && id <= 232){
        wIcon.src = "icons/haze.svg";
    }else if(id >= 200 && id <= 232){
        wIcon.src = "icons/cloud.svg";
    }else if((id >= 300 && id <= 321) || (id >= 500 && id <=531)){
        wIcons.src = "icons/rain.svg";
    }


    // pass these values to a particular html element
    wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
    wrapper.querySelector(".weather").innerText = description;
    wrapper.querySelector(".location span").innerText = '$(city), $(country)';
    wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
    wrapper.querySelector(".humidity span").innerText = '${humidity}%';


    // getting api response and returning it with parsing into js obj and in another 
    // then function calling weatherDetails function with passing api result as an assignment
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));

        infoTxt.classList.remove("pending", "error")
        wrapper.classList.add("active");
        // console.log(info);



    }
}

arrowBack.addEventListener("click", ()=>{
     wrapper.classList.remove("active");
});
