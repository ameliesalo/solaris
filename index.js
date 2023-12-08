let BASE_URL = 'https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com';
let planetInfo;

//hämtar apinyckeln
async function getKey(){
  let resp = await fetch(`${BASE_URL}/keys`, {method: 'POST'})
    let data = await resp.json()
    return data.key
};

//hämtar himlakropparna med hjälp av nyckeln
async function solarisBodies(apiKey){
    let resp = await fetch(`${BASE_URL}/bodies`, {
    method: 'GET',
    headers: {'x-zocom': apiKey}})
    let data = await resp.json()
    console.log(data)
    bodies(data.bodies)
}
//loopar igenom datan om himlakropparna och skriver ut dem i en ul (planetList)
function bodies(data){
let planetList = document.getElementById('planetlist')
   data.forEach((planet)=>{
    let listPlanet = document.createElement('li');
    //knapp som kopplas till varje li för att få fram info om planeten (displayPlanetInfo) samt tangent tryck för att stänga info fönstret
    let button = document.createElement('button');
    button.addEventListener('click',()=> displayPlanetInfo(planet))
    button.addEventListener('keydown', resetpage)
    //text innehåll samt sammankoppling av delar från html och js (planetList ul, listPlanet li, button)
    listPlanet.textContent = planet.name
    listPlanet.append(button)
    //försök till att sätta klass namn 0 och uppåt enligt listans längd
    button.setAttribute('class', 'listplanet.length = 0++')
    planetList.append(listPlanet)
   });
}
//hämtar utvald info om planet och skriver ut det i html taggar inom html div (planetinfo)
function displayPlanetInfo(planet){
    let planetInfo = document.getElementById('planetinfo')
    planetInfo.innerHTML = `
    <h2>${planet.name}</h2>
    <p>description: ${planet.desc}</p>
    <ul>
    <li>circumference: ${planet.circumference}</li>
    <li>distance: ${planet.distance}</li>
    <li>latin name: ${planet.latinName}</li>
    <li>temperature day: ${planet.temp.day}</li>
    <li>temperature night: ${planet.temp.night}</li>
    </ul>
    `
};

//funktion som innehåller dvs funktioner som skall startas när start sidan öppnas
async function startPage(){
    const apiKey = await getKey()
    planetInfo= await solarisBodies(apiKey)
    console.log(planetInfo)
}
//funktion för att återställa startstidan vid tangent tryck efter visad info
const resetpage = () => {
    location.reload()
}

startPage()