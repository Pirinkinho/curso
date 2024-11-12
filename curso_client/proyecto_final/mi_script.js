
// Este evento se ejecuta cuando el DOM (estructura HTML) ha sido completamente cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Comprobamos si el navegador soporta la geolocalización.
    if (navigator.geolocation) {
        // Si la geolocalización está soportada, obtenemos la posición del usuario.
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
        // Si no se puede obtener la geolocalización, mostramos un mensaje de alerta.
        alert("La geolocalización no es compatible con este navegador.");
    }
});

// Función que se ejecuta si se obtiene la geolocalización con éxito.
function successCallback(position) {
    // Almacena la latitud y longitud obtenida de la geolocalización.
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    // Llama a la función para obtener los datos del tiempo, pasando latitud y longitud.
    obtenerDatosTiempo(lat, lon);
}

// Función que se ejecuta si ocurre un error al obtener la geolocalización.
function errorCallback(error) {
    // Muestra un mensaje de error si no se pudo obtener la ubicación.
    alert("No se pudo obtener la ubicación: " + error.message);
}

// Función que obtiene los datos meteorológicos a partir de la latitud y longitud.
function obtenerDatosTiempo(lat, lon) {
    // Clave de API para autenticar la solicitud (necesitas tu propia clave).
    const apiKey = "2123b15abf5dbccb4b78d19ccea8dd7d";
    // URL de la API con la latitud, longitud, idioma y la clave de API
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&appid=${apiKey}`;

    // Realiza una solicitud de tipo "fetch" para obtener los datos meteorológicos.
    fetch(url)
        // Convierte la respuesta a formato JSON.
        .then(response => response.json())
        // Llama a la función para mostrar los datos obtenidos.
        .then(data => mostrarDatos(data, lat, lon))
        // Si ocurre un error en la solicitud, lo muestra en un mensaje de alerta.
        .catch(error => alert('Error al obtener los datos del tiempo: ' + error));
}

// Función para mostrar los datos meteorológicos obtenidos.
function mostrarDatos(data, lat, lon) {
    // Comprueba si hay un nombre de localidad, si no, utiliza el país o "globe" como valor por defecto.
    // Si no hay localidad, muestra el país o "globe".
    const localidad = data.name || data.sys.country || "globe"; 
    
    // Determina si la latitud es norte o sur.
    const latitudDireccion = lat >= 0 ? 'Norte' : 'Sur';
    // Determina si la longitud es este u oeste.
    const longitudDireccion = lon >= 0 ? 'Este' : 'Oeste';
    
    // Muestra la latitud con dirección (Norte/Sur).
    document.getElementById("latitud").innerText = `Latitud: ${Math.abs(lat).toFixed(2)}° ${latitudDireccion}`;
    // Muestra la longitud con dirección (Este/Oeste).
    document.getElementById("longitud").innerText = `Longitud: ${Math.abs(lon).toFixed(2)}° ${longitudDireccion}`;
    
    // Muestra localidad o el país.
    document.getElementById("localidad").innerText = `Localidad registrada: ${localidad}`;
    
    // Muestra la previsión entre comillas.
    document.getElementById("previsionTexto").innerText = `"${data.weather[0].description}"`; 
    
    // Muestra la temperatura en grados Celsius (convertida desde Kelvin).
    document.getElementById("temp").innerText = (data.main.temp - 273.15).toFixed(2); 
    
    // Muestra la humedad.
    document.getElementById("humedad").innerText = `${data.main.humidity}`;
}

