
// Añadimos un event listener al botón HTML.
let button = document.getElementById('button');
button.addEventListener('click', ajaxCheckWeather);

function ajaxCheckWeather() {
    // Obtenemos la información que necesitamos del formulario.
    var ubicacion = document.getElementById('location').value;

    // Mostramos la ubicación en el documento HTML.
    muestraUbicacion(ubicacion);

    /* LLAMADA AJAX */
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + ubicacion + "&lang=es&appid=2123b15abf5dbccb4b78d19ccea8dd7d";

    // Hacemos llamada AJAX, gestionamos respuesta con responseManager(resp).
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => responseManager(result))
        .catch(error => alert('error', error));
}

/* Función principal que gestiona la respuesta a la llamada AJAX */
function responseManager(resp) {
    console.log(resp);
    cambiaIcono(resp.weather[0].icon);
    muestraDesc(resp.weather[0].description);

    // Extraer y mostrar la temperatura y la humedad.
    muestraTemperatura(resp.main.temp);
    muestraHumedad(resp.main.humidity);
}

/* Funciones auxiliares para cambiar el HTML/CSS */

function cambiaIcono(nombreIco) {
    let icono = document.getElementById('icono');
    icono.src = "img/" + nombreIco + "@2x.png";
}

function muestraDesc(desc) {
    let prev = document.getElementById('prevision');
    prev.innerHTML = desc;
}

function muestraUbicacion(ubicacion) {
    let elemento = document.getElementById('ubicacionPedida');
    elemento.innerHTML = ubicacion;
}

function muestraTemperatura(temp) {
    // Convierte la temperatura de Kelvin a Celsius y muestra en HTML.
    var tempCelsius = temp - 273.15;
    let tempElement = document.getElementById('temp');
    tempElement.innerHTML = tempCelsius.toFixed(2); // Muestra solo dos decimales.
}

function muestraHumedad(humidity) {
    let humElement = document.getElementById('humedad');
    humElement.innerHTML = humidity;
}
