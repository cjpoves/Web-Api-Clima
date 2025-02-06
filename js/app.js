const form = document.querySelector(".formulario"); 
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");


window.addEventListener("load", () => {
    formulario.addEventListener("submit", buscarClima);
})

function buscarClima(e) {
    e.preventDefault();

    //Validamos que pase campos al form
    const ciudad = document.querySelector("#ciudad").value;
    const pais = document.querySelector("#pais").value;

    if(ciudad === "" || pais === "") {
        //Muestra error al usuario con función
        mostrarError("Ambos campos son obligatorios");
        return;
    }
    consultarAPI(ciudad, pais);
}

//Funcion para mostrar mensaje de error en el html
function mostrarError (mensaje) {
    
    const alerta = document.createElement("div");
    alerta.classList.add("mensaje_error")
    alerta.innerHTML = `<span class ="error">${mensaje}</span>`
    form.appendChild(alerta);

    setTimeout (() => {
        alerta.remove();
    }, 2000);
}

//Funcion para consultar la API del tiempo pasandole ciudad y pais
function consultarAPI(ciudad, pais) {
    const appId = "05b15a03f6fa058a08cdb9923e408806";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos =>{ 

            limpiarHTML();

            if (datos.cod === "404") {
                mostrarError("Ciudad no encontrada")
                return;
                
        }
        console.log(datos);
        mostrarClima(datos);
    })
}

//Funcion que muestra clima y lo imprime en el HTML, extrameos temperatus del objeto que tiene los datos de la consulta, añadimos un div
// y un p que lo añade al html para mostrarlo
function mostrarClima(datos) {
    const { weather: [{main}] , main: {temp, temp_max, temp_min} } = datos;

    const precipitaciones = main;

    const centigrados = convertirKelvinACelsius(temp);
    const max = convertirKelvinACelsius(temp_max); 
    const min = convertirKelvinACelsius(temp_min);  

    const gradosActuales = document.createElement("p");
    gradosActuales.innerHTML = `Temp actual: ${centigrados} C`;
    gradosActuales.classList.add("gradosActuales");

    const gradosMaximos = document.createElement("p");
    gradosMaximos.innerHTML = `Max: ${max} C`;
    gradosMaximos.classList.add("max_min");

    const gradosMinimos = document.createElement("p");
    gradosMinimos.innerHTML = `Min: ${min} C`;
    gradosMinimos.classList.add("max__min");

    const resultadoActual = document.createElement("div");
    resultadoActual.classList.add("grados");
    resultadoActual.appendChild(gradosActuales);

    // Funcion para que aparezca icono SVG dependiendo de las precipitaciones que haya
    if (precipitaciones === "Clear") {
        const icono = document.createElement("svg");
        icono.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2"> <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path> <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"></path> </svg> `;
        icono.classList.add("icono");
        resultado.appendChild(icono);
       } else if (precipitaciones === "Clouds") {
        const icono = document.createElement("svg");
        icono.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2"> <path d="M7 16a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-12"></path> <path d="M5 20l14 0"></path> </svg>  `;
        icono.classList.add("icono");
        resultado.appendChild(icono);
       } else if (precipitaciones === "Rain") {
        const icono = document.createElement("svg");
        icono.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2"> <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7"></path> <path d="M11 13v2m0 3v2m4 -5v2m0 3v2"></path> </svg>    `;
        icono.classList.add("icono");
        resultado.appendChild(icono);
       } else if (precipitaciones === "Drizzle") {
        const icono = document.createElement("svg");
        icono.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2"> <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7"></path> <path d="M11 13v2m0 3v2m4 -5v2m0 3v2"></path> </svg>    `;
        icono.classList.add("icono");
        resultado.appendChild(icono);
       } else if (precipitaciones === "Thunderstorm") {
        const icono = document.createElement("svg");
        icono.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2"> <path d="M13 18.004h-6.343c-2.572 -.004 -4.657 -2.011 -4.657 -4.487c0 -2.475 2.085 -4.482 4.657 -4.482c.393 -1.762 1.794 -3.2 3.675 -3.773c1.88 -.572 3.956 -.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.396 0 2.6 .831 3.148 2.03"></path> <path d="M19 16l-2 3h4l-2 3"></path> </svg>     `;
        icono.classList.add("icono");
        resultado.appendChild(icono);
       } else if (precipitaciones === "Snow") {
        const icono = document.createElement("svg");
        icono.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2"> <path d="M10 4l2 1l2 -1"></path> <path d="M12 2v6.5l3 1.72"></path> <path d="M17.928 6.268l.134 2.232l1.866 1.232"></path> <path d="M20.66 7l-5.629 3.25l.01 3.458"></path> <path d="M19.928 14.268l-1.866 1.232l-.134 2.232"></path> <path d="M20.66 17l-5.629 -3.25l-2.99 1.738"></path> <path d="M14 20l-2 -1l-2 1"></path> <path d="M12 22v-6.5l-3 -1.72"></path> <path d="M6.072 17.732l-.134 -2.232l-1.866 -1.232"></path> <path d="M3.34 17l5.629 -3.25l-.01 -3.458"></path> <path d="M4.072 9.732l1.866 -1.232l.134 -2.232"></path> <path d="M3.34 7l5.629 3.25l2.99 -1.738"></path> </svg>   `;
        icono.classList.add("icono");
        resultado.appendChild(icono);
       } else if (precipitaciones === "Mist") {
        const icono = document.createElement("svg");
        icono.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2"> <path d="M5 5h3m4 0h9"></path> <path d="M3 10h11m4 0h1"></path> <path d="M5 15h5m4 0h7"></path> <path d="M3 20h9m4 0h3"></path> </svg>   `;
        icono.classList.add("icono");
        resultado.appendChild(icono);
       }

    const resultadoMaxMin = document.createElement("div");
    resultadoMaxMin.classList.add("gradosMaxMin");
    resultadoMaxMin.appendChild(gradosMaximos);
    resultadoMaxMin.appendChild(gradosMinimos);


    resultado.appendChild(resultadoActual);
    resultado.appendChild(resultadoMaxMin);
}

//Funcion para pasar a grados celsius y que sea un numero entero
function convertirKelvinACelsius(grados) {
    return parseInt(grados -273.15)
}

//Funcion para limpiar los resultados para que no haya duplicados
function limpiarHTML () {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}