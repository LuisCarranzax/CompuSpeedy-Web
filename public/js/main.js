// =========================================================
// 1. CONFIGURACIÓN DEL CARRUSEL DE SERVICIOS (Inicio)
// =========================================================
if (document.querySelector('.mySwiper')) {
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay:{
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination:{
            // Pequeña mejora: le decimos que busque la paginación SOLO dentro de mySwiper
            el: ".mySwiper .swiper-pagination", 
            clickable: true,
        },
        breakpoints:{
            768:{
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024:{
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
    });
}

// =========================================================
// 2. CONFIGURACIÓN DEL CARRUSEL DE TESTIMONIOS (Inicio)
// =========================================================
if (document.querySelector('.testimoniosSwiper')) {
    const testimoniosSwiper = new Swiper(".testimoniosSwiper", {
        slidesPerView: 1, 
        spaceBetween: 20, 
        loop: true,       
        autoplay: {
            delay: 4000,  
            disableOnInteraction: false,
        },
        pagination: {
            el: ".testimoniosSwiper .swiper-pagination", 
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2, 
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3, 
                spaceBetween: 30,
            },
        },
    });
}

// =========================================================
// 3. CONFIGURACIÓN DEL CARRUSEL DE PROGRAMAS (Ticker en Instalación)
// =========================================================
if (document.querySelector('.programasSwiper')) {
    const programasSwiper = new Swiper(".programasSwiper", {
        loop: true,                 // Vuelve a empezar infinitamente
        speed: 3000,                // La velocidad constante a la que se mueve
        allowTouchMove: false,      // Evita que el usuario lo arrastre y rompa la ilusión lineal
        autoplay: {
            delay: 0,                 // Cero delay = no se detiene nunca
            disableOnInteraction: false,
        },
        slidesPerView: 2,
        spaceBetween: 20,
        breakpoints: {
            576: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            992: { slidesPerView: 5 },
            1200: { slidesPerView: 6 }
        }
    });
}


//Correo Contacto
document.addEventListener('DOMContentLoaded',() =>{
    const formulario = document.getElementById('formContacto');
    const divRespuestas = document.getElementById('mensaje');

    formulario.addEventListener('submit', async (e) =>{
        
        e.preventDefault();

        const datos ={
            nombre: document.getElementById('nombre').value,
            correo: document.getElementById('correo').value,
            telefono: document.getElementById('telefono').value,
            problema: document.getElementById('problema').value,
        };

        try{
            const respuesta = await fetch('/api/contacto',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });
            const resultado = await respuesta.json();

            if(respuesta.ok){

                divRespuestas.innerHTML=`<div class="alert alert-success">${resultado.mensaje}</div>`
                formulario.reset();

            }else{
                divRespuestas.innerHTML = `<div class="alert alert-danger">Hubo un error al enviar el mensaje.</div>`;
            }
        }catch (error){
            console.error('Error en la petición:', error);
            divRespuestas.innerHTML = `<div class="alert alert-danger">Error de conexión con el servidor.</div>`;    
        }

        setTimeout(() =>{
            divRespuestas.innerHTML = '';
        },5000);
    });
});

