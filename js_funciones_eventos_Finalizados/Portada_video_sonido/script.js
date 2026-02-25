document.addEventListener('DOMContentLoaded', function() {
    // Seleccionamos el video y la imagen del altavoz
    const video = document.querySelector('.mi-video');
    const altavoz = document.querySelector('.altavoz');
    const boton = document.querySelector(".medieval-button-elegante");

    // Verificamos que los elementos existen antes de agregar el evento
    if (video && altavoz) {
        altavoz.addEventListener('click', alternarSonido);

        function alternarSonido() {
            // Si el video está en silencio, activamos el sonido
            if (video.muted) {
                video.muted = false;
                altavoz.classList.remove('altavoz-muted');  // Quitamos el filtro
                altavoz.classList.add('altavoz-activated'); // Agregamos la clase para sonido activado
            } else {
                video.muted = true;
                altavoz.classList.remove('altavoz-activated'); // Quitamos la clase de sonido activado
                altavoz.classList.add('altavoz-muted');  // Aplicamos el filtro de desactivado
            }
        }
    } 

    boton.addEventListener('click', redirigir );

    function redirigir (){
        window.location.href ="../js_funciones_Eventos_objetos/js_creacion_objetos/index1.html"
    }
});
