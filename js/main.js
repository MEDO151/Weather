// first day 
let firstDayDay = document.querySelector(".day-one")
let firstDayMonth = document.querySelector(".month-one")
let countryName = document.querySelector(".country-name")
let dgreeFirstDay = document.querySelector(".num")
let firstDayIcon = document.querySelector(".num-icon")
let firstDayInfo = document.querySelector(".info")
let firstDayCloud = document.querySelector(".cloud-text")
let firstDayWind = document.querySelector(".wind")
let firstDayCompass = document.querySelector(".compass")

// second day
let secondDayDay = document.querySelector(".day-two")
let secondDayIcon = document.querySelector(".day-two-icon")
let secondDayMaxDegree = document.querySelector(".max-num-two")
let secondDayMinDegree = document.querySelector(".min-num-two")
let secondDayInfo = document.querySelector(".info-two")

// thirdDay
let thirdDayDay = document.querySelector(".day-three")
let thirdDayIcon = document.querySelector(".day-three-icon")
let thirdDayMaxDegree = document.querySelector(".max-num-three")
let thirdDayMinDegree = document.querySelector(".min-num-three")
let thirdDayInfo = document.querySelector(".info-three")

// search
let search = document.querySelector(".search")


let day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
let month = ["January","February","March","April","May","June","July","August","September","October","November","December"]

async function getInformation(){
    let request = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=cf0e52147698470a882195639240601&q=Alexandria&days=3`)
    let allRequest = await request.json()
    console.log(allRequest)
    firstDay()
    SecondDay()
    thirdDay()

    search.addEventListener("keyup" , async function(){
        request = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=cf0e52147698470a882195639240601&q=${search.value}&days=3`)
        allRequest = await request.json()
        firstDay()
        SecondDay()
        thirdDay()
    })

    function firstDay(){
        let date = new Date(allRequest.forecast.forecastday[0].date)

        firstDayDay.innerHTML = day[date.getDay()]
        firstDayMonth.innerHTML = date.getDate() + " " + month[date.getMonth()]
        countryName.innerHTML = allRequest.location.name
        dgreeFirstDay.innerHTML = allRequest.current.temp_c + `<sup>o</sup>C`
        firstDayIcon.setAttribute( "src" , `http:` + allRequest.current.condition.icon ) 
        firstDayInfo.innerHTML = allRequest.current.condition.text
        firstDayCloud.innerHTML = allRequest.current.cloud + `%`
        firstDayWind.innerHTML = allRequest.current.wind_kph + `km/h`
        firstDayCompass.innerHTML = allRequest.current.wind_dir
        
    }

    function SecondDay(){
        let date = new Date(allRequest.forecast.forecastday[1].date)

        secondDayDay.innerHTML = day[date.getDay()]
        secondDayIcon.innerHTML = `<img  src="${"http:" + allRequest.forecast.forecastday[1].day.condition.icon}" alt=""></img>`
        secondDayMaxDegree.innerHTML = allRequest.forecast.forecastday[1].day.maxtemp_c  + `<sup>o</sup>C`
        secondDayMinDegree.innerHTML = allRequest.forecast.forecastday[1].day.mintemp_c + `<sup>o</sup>c`
        secondDayInfo.innerHTML = allRequest.forecast.forecastday[1].day.condition.text
    }

    function thirdDay(){
        let date = new Date(allRequest.forecast.forecastday[2].date)

        thirdDayDay.innerHTML = day[date.getDay()]
        thirdDayIcon.innerHTML = `<img  src="${"http:" + allRequest.forecast.forecastday[2].day.condition.icon}" alt=""></img>`
        thirdDayMaxDegree.innerHTML = allRequest.forecast.forecastday[2].day.maxtemp_c  + `<sup>o</sup>C`
        thirdDayMinDegree.innerHTML = allRequest.forecast.forecastday[2].day.mintemp_c + `<sup>o</sup>c`
        thirdDayInfo.innerHTML = allRequest.forecast.forecastday[2].day.condition.text
    }
}

getInformation()