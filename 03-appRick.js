const formulario = document.getElementById("busqueda");
const inputNombre = document.getElementById("nombre");
//const divResultados = document.querySelector(".resultados");
const card = document.getElementById("card");
const templateCard = document.getElementById("template-card").content;
const fragment = document.createDocumentFragment();
const urlCharacters = "https://rickandmortyapi.com/api/character/"

const anterior = document.querySelector(".anterior");
const siguiente = document.querySelector(".siguiente");
var pagina = 1;



async function getCharactersByName(name, page )
{
    const urlFetch = urlCharacters + "?name=" + name    ;
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;
}

const pintarCards = characters => {
    card.innerHTML= " ";

    characters.results.forEach(element =>{
        //cambiamos partes de la plantilla para cada personaje 
        templateCard.querySelector("img").setAttribute("src",element.image)
        templateCard.querySelector("h4").textContent = element.name;
        templateCard.querySelector("p").textContent = element.status;
        templateCard.querySelector(".fecha").textContent = element.created;
        


        //clonamos la plantilla y la agregamos a un fragmento que ira acumulando todas las cards
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    })

    card.appendChild(fragment);

}

formulario.addEventListener("submit", e => {
    e.preventDefault();
    const name = inputNombre.value.trim(); 

    getCharactersByName(name, pagina)
        .then(characters => {
            console.log(characters)

            characters.results.forEach(element => {
                console.log(element.name);
            });

            pintarCards(characters);


        });

    

    
});

siguiente.addEventListener("click" , s => {
    pagina++;
    getCharactersByName(name, pagina)
        .then(characters => {
            console.log(characters)

            characters.results.forEach(element => {
                console.log(element.name);
            });

            pintarCards(characters);


        });
})

anterior.addEventListener("click" , r=> {
    pagina--;
    getCharactersByName(name, pagina)
        .then(characters => {
            console.log(characters)

            characters.results.forEach(element => {
                console.log(element.name);
            });

            pintarCards(characters);


        });

})
