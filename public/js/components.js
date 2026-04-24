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
            
                // Sincronizar ícono de modo oscuro al cargar el footer
                if (localStorage.getItem('theme') === 'dark') {
                    const darkIcon = document.querySelector('#darkModeToggle i');
                    if (darkIcon) {
                        darkIcon.classList.remove('bi-moon-stars-fill');
                        darkIcon.classList.add('bi-sun-fill');
                    }
                }
            } else {
                console.error("No se pudo cargar el footer. Verifica las rutas.");
            }
        }

        reattachMobileMenuListener();

    } catch (error) {
        console.error("Error cargando los componentes (Comprueba si estás usando Live Server):", error);
    }
}

function reattachMobileMenuListener() {
    const enlacesMenu = document.querySelectorAll('.offcanvas-body .nav-link:not(.dropdown-toggle), .offcanvas-body .dropdown-item');
    const menuLateral = document.getElementById('menuPrincipal');

    if (menuLateral) {
        enlacesMenu.forEach(enlace => {
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
