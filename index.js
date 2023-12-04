let BASE_URL = 'https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com';
let planetInfo;

//hämtar planeterna från html index
let solen = document.getElementById('ellipse1');
let mercury = document.getElementById('ellispe2');
let venus = document.getElementById('ellipse3');
let jorden = document.getElementById('ellipse4');
let march = document.getElementById('ellipse5');
let jupiter = document.getElementById('ellipse6');
let saturn = document.getElementById('ellipse7');
let uranus = document.getElementById('ellipse8');
let neptunus = document.getElementById('ellipse9');

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

function bodies(data){
let planetList = document.getElementById('planetlist')
   data.forEach((planet)=>{
    let listPlanet = document.createElement('li');
    let button = document.createElement('button');
    button.textContent = 'getinfo'
    button.addEventListener('click',()=> displayPlanetInfo(planet))
    listPlanet.textContent = planet.name
    listPlanet.append(button)
    planetList.append(listPlanet)
   });
}

function displayPlanetInfo(planet){
    let planetInfo = document.getElementById('planetinfo')
    planetInfo.innerHTML = `
    <h2>${planet.name}</h2>
    <p>description: ${planet.desc}</p>
    <p>circumference: ${planet.circumference}</p>
    <p>distance: ${planet.distance}</p>
    <p>latin name: ${planet.latinName}</p>
    <p>temperature day: ${planet.temp.day}
    <p>temperature night: ${planet.temp.night}
    `
}


async function startPage(){
    const apiKey = await getKey()
    planetInfo= await solarisBodies(apiKey)
    console.log(planetInfo)
}

startPage()