

document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const buttons = document.querySelectorAll('nav button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const page = button.dataset.page;
            loadContent(page);
        });
    });

    function loadContent(page) {
        // Aquí normalmente harías una petición AJAX para cargar el contenido
        // Por ahora, simplemente cambiaremos el contenido directamente
        let html = '';
        switch(page) {
            case 'convertidor-unidades':
                html = '<h2>Convertidor de Unidades</h2><p>Aquí irá el convertidor de unidades.</p>';
                break;
            case 'simulador-clima':
                html = '<h2>Simulador de Clima</h2><p>Aquí irá el simulador de clima.</p>';
                break;
            case 'convertidor-monedas':
                html = '<h2>Convertidor de Monedas</h2><p>Aquí irá el convertidor de monedas.</p>';
                break;
            case 'os-info':
                html = '<h2>OS Info</h2><p>Aquí se mostrará la información del sistema operativo.</p>';
                break;
            case 'calculadora':
                html = '<h2>Calculadora</h2><p>Aquí irá la calculadora.</p>';
                break;
            case 'epoca-unix':
                html = '<h2>Época Unix</h2><p>Aquí se mostrará la época Unix.</p>';
                break;
            case 'acerca-de':
                html = '<h2>Acerca de</h2><p>Información sobre el proyecto "La navaja suiza".</p>';
                break;
            case 'contacto':
                html = '<h2>Contacto</h2><p>Información de contacto.</p>';
                break;
            case 'registrarse':
                html = '<h2>Registrarse</h2><p>Formulario de registro.</p>';
                break;
            default:
                html = '<h2>Bienvenido a La navaja suiza</h2><p>Selecciona una opción del menú.</p>';
        }
        content.innerHTML = html;
    }

    

