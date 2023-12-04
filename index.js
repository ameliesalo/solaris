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
    button.addEventListener('click',()=> displayPlanetInfo(planet))
    button.addEventListener('keydown', resetpage)
    listPlanet.textContent = planet.name
    listPlanet.append(button)
    button.classList.add(length = '0-9')
    planetList.append(listPlanet)
   });
}

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
}


async function startPage(){
    const apiKey = await getKey()
    planetInfo= await solarisBodies(apiKey)
    console.log(planetInfo)
}

const resetpage = () => {
    location.reload()
}

startPage()