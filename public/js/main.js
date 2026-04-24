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
        loop: true,
        speed: 3000,
        allowTouchMove: false,
        autoplay: {
            delay: 0,
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
        speed: 2500,
        allowTouchMove: false,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        slidesPerView: 3,
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

            let resultado = {};
            try {
                resultado = await respuesta.json();
            } catch (e) {
                console.warn('La respuesta no fue JSON');
            }

            if (respuesta.ok) {

                divRespuestas.className = 'alert alert-success py-2 mb-4 shadow-sm mt-3 text-center fw-bold rounded-3 transition-all';

                const mensajeConfirmacion = '¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.';
                divRespuestas.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i>${mensajeConfirmacion}`;
                formulario.reset();
            } else {
                divRespuestas.className = 'alert alert-warning py-2 mb-4 mt-3 text-center fw-bold rounded-3 transition-all';
                divRespuestas.innerHTML = `<i class="bi bi-exclamation-triangle-fill me-2"></i>Hubo un error al enviar el mensaje. Intenta de nuevo.`;
            }
        } catch (error) {
            console.error('Error en la petición:', error);
            divRespuestas.className = 'alert alert-danger py-2 mb-4 mt-3 text-center fw-bold rounded-3 transition-all';
            divRespuestas.innerHTML = `<i class="bi bi-wifi-off me-2"></i>Error de conexión con el servidor.`;
        }

        setTimeout(() => {
            divRespuestas.className = '';
            divRespuestas.innerHTML = '';
        }, 6000);
    });
}


// =========================================================
// MODO OSCURO - EVENT DELEGATION
// =========================================================
document.body.addEventListener('click', (e) => {
    const toggleBtn = e.target.closest('#darkModeToggle');
    if (toggleBtn) {
        e.preventDefault();
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        const icon = toggleBtn.querySelector('i');
        if (icon) {
            if (newTheme === 'dark') {
                icon.classList.remove('bi-moon-stars-fill');
                icon.classList.add('bi-sun-fill');
            } else {
                icon.classList.remove('bi-sun-fill');
                icon.classList.add('bi-moon-stars-fill');
            }
        }
    }
});
