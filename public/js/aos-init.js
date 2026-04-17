// =========================================================
// INICIALIZACIÓN GLOBAL DE ANIMACIONES DE SCROLL (AOS)
// Este archivo se debe cargar SIEMPRE después de aos.js
// =========================================================
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });
} else {
    console.error("AOS no está definido. Asegúrate de cargar este script después de aos.js");
}
