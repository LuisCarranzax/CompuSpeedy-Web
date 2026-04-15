/**
 * COMPONENTES DINÁMICOS
 * Este script carga el Navbar y el Footer desde sus archivos maestros.
 * Evita que tengas que copiar y pegar el mismo menú en cientos de páginas.
 * 
 * IMPORTANTE: Para que `fetch` funcione de forma local en tu computadora, 
 * debes estar abriendo el proyecto a través de "Live Server" o un servidor localhost,
 * no abriendo el .html directamente con doble clic.
 */
async function loadComponents(basePath = '.') {
    try {
        // Cargar el Navbar
        const navContainer = document.getElementById('navbar-placeholder');
        if (navContainer) {
            const resNav = await fetch(`${basePath}/components/navbar.html`);
            if (resNav.ok) {
                let htmlNav = await resNav.text();
                // Ajustar los enlaces relativos para que funcionen estés donde estés
                htmlNav = htmlNav.replaceAll('{{base}}', basePath);
                navContainer.innerHTML = htmlNav;
            } else {
                console.error("No se pudo cargar el navbar. Verifica las rutas.");
            }
        }

        // Cargar el Footer
        const footerContainer = document.getElementById('footer-placeholder');
        if (footerContainer) {
            const resFooter = await fetch(`${basePath}/components/footer.html`);
            if (resFooter.ok) {
                let htmlFooter = await resFooter.text();
                htmlFooter = htmlFooter.replaceAll('{{base}}', basePath);
                footerContainer.innerHTML = htmlFooter;
            } else {
                console.error("No se pudo cargar el footer. Verifica las rutas.");
            }
        }

        // NOTA: Como el HTML dinámico fue inyectado recién ahora, debemos reatar el script
        // de Offcanvas móvil que tenías en main.js para que detecte los nuevos enlaces inyectados.
        reattachMobileMenuListener();

    } catch (error) {
        console.error("Error cargando los componentes (Comprueba si estás usando Live Server):", error);
    }
}

function reattachMobileMenuListener() {
    // --- AUTO-CERRAR MENÚ LATERAL EN MÓVILES ---
    const enlacesMenu = document.querySelectorAll('.offcanvas-body .nav-link:not(.dropdown-toggle), .offcanvas-body .dropdown-item');
    const menuLateral = document.getElementById('menuPrincipal');
    
    if (menuLateral) {
        enlacesMenu.forEach(enlace => {
            // Removemos listeners previos para evitar duplicados si se llama repetidamente (safety wrapper)
            const nuevoEnlace = enlace.cloneNode(true);
            enlace.parentNode.replaceChild(nuevoEnlace, enlace);
            
            nuevoEnlace.addEventListener('click', () => {
                if (window.innerWidth < 992) {
                    const bsOffcanvas = bootstrap.Offcanvas.getInstance(menuLateral) || new bootstrap.Offcanvas(menuLateral);
                    if (bsOffcanvas) {
                        bsOffcanvas.hide();
                    }
                }
            });
        });
    }
}
