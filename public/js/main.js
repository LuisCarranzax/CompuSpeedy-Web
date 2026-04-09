// --- AUTO-CERRAR MENÚ LATERAL EN MÓVILES ---
const enlacesMenu = document.querySelectorAll('.offcanvas-body .nav-link');
const menuLateral = document.getElementById('menuPrincipal');

if (menuLateral) {
    enlacesMenu.forEach(enlace => {
        enlace.addEventListener('click', () => {
            if (window.innerWidth < 992) {

                const bsOffcanvas = bootstrap.Offcanvas.getInstance(menuLateral);

                if (bsOffcanvas) {
                    bsOffcanvas.hide();
                }
            }
        });
    });
}

//Carrusel servicios
const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay:{
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination:{
        el: ".swiper-pagination",
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

// --- CONFIGURACIÓN DEL CARRUSEL DE TESTIMONIOS ---
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

