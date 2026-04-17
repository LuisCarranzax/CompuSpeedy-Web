// =========================================================
// 1. CONFIGURACIÓN DEL CARRUSEL DE SERVICIOS (Inicio)
// =========================================================
if (document.querySelector('.mySwiper')) {
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            // Pequeña mejora: le decimos que busque la paginación SOLO dentro de mySwiper
            el: ".mySwiper .swiper-pagination",
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

// =========================================================
// 4. CONFIGURACIÓN DEL CARRUSEL DE MARCAS (Impresoras)
// =========================================================
if (document.querySelector('.marcasSwiper')) {
    const marcasSwiper = new Swiper(".marcasSwiper", {
        loop: true,
        speed: 2500,                // Un poquito más rápido que el de programas
        allowTouchMove: false,      // Bloquea el toque para movimiento continuo lineal
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        slidesPerView: 3,           // En celular caben 3 marcas
        spaceBetween: 30,
        breakpoints: {
            768: { slidesPerView: 4 },
            992: { slidesPerView: 5 },
            1200: { slidesPerView: 6 }
        }
    });
}
// =========================================================
// ENVÍO DE FORMULARIO DE CONTACTO (Con validación de existencia)
// =========================================================
const formulario = document.getElementById('formContacto');

// El IF es crucial: Solo ejecuta este código si el formulario existe en la página actual
if (formulario) {
    const divRespuestas = document.getElementById('mensaje');

    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!divRespuestas) return;

        // Mostrar mensaje de "Enviando..."
        divRespuestas.className = 'alert alert-info py-2 mb-4 mt-3 text-center fw-bold rounded-3 transition-all';
        divRespuestas.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Enviando mensaje...';

        const datos = {
            nombre: document.getElementById('nombre').value,
            correo: document.getElementById('correo').value,
            telefono: document.getElementById('telefono').value,
            problema: document.getElementById('problema').value,
        };

        try {
            const respuesta = await fetch('/api/contacto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });

            // Tratamos de procesar JSON, pero en caso de que la respuesta no sea JSON lo controlamos
            let resultado = {};
            try {
                resultado = await respuesta.json();
            } catch (e) {
                console.warn('La respuesta no fue JSON');
            }

            if (respuesta.ok) {
                // Alerta de Éxito Verde
                divRespuestas.className = 'alert alert-success py-2 mb-4 shadow-sm mt-3 text-center fw-bold rounded-3 transition-all';
                // Añadimos el mensaje de confirmación explícito como pidió el usuario
                const mensajeConfirmacion = '¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.';
                divRespuestas.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i>${mensajeConfirmacion}`;
                formulario.reset();
            } else {
                // Alerta de Error Naranja
                divRespuestas.className = 'alert alert-warning py-2 mb-4 mt-3 text-center fw-bold rounded-3 transition-all';
                divRespuestas.innerHTML = `<i class="bi bi-exclamation-triangle-fill me-2"></i>Hubo un error al enviar el mensaje. Intenta de nuevo.`;
            }
        } catch (error) {
            console.error('Error en la petición:', error);
            // Alerta de Error Roja
            divRespuestas.className = 'alert alert-danger py-2 mb-4 mt-3 text-center fw-bold rounded-3 transition-all';
            divRespuestas.innerHTML = `<i class="bi bi-wifi-off me-2"></i>Error de conexión con el servidor.`;
        }

        // Borrar el mensaje después de 6 segundos
        setTimeout(() => {
            divRespuestas.className = '';
            divRespuestas.innerHTML = '';
        }, 6000);
    });
}
