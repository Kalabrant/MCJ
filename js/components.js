class AppHeader extends HTMLElement {
    connectedCallback() {
        const base = this.getAttribute('base-path') || './';
        this.innerHTML = `
        <nav class="navbar">
            <div class="nav-container">
                <a href="${base}index.html" class="logo">
                    <img src="${base}assets/logo-negativo.png" class="logo-light" alt="Logo Claro">
                    <img src="${base}assets/logo.png" class="logo-dark" alt="Logo Oscuro">
                    <span class="logo-text">María Camino a Jesús</span>
                </a>
                <div class="nav-links">
                    <div style="position: relative; display: inline-block;" class="dropdown-wrapper">
                        <a href="${base}informativa/quienes-somos.html">Nosotros</a>
                    </div>
                    <div style="position: relative; display: inline-block;" class="dropdown-wrapper">
                        <a href="${base}devocional/jesus-misericordioso.html">Devocional</a>
                    </div>
                    <a href="${base}informativa/obras.html">Obras</a>
                    <a href="${base}recursos/descargas.html">Recursos</a>
                    <a href="${base}informativa/contacto.html" class="btn-primary">Contacto</a>
                </div>
                <button class="mobile-menu-btn">
                    <i data-lucide="menu"></i>
                </button>
            </div>
        </nav>
        `;
        // Lucide icons might need to be refreshed if injected dynamically
        if(window.lucide) {
            window.lucide.createIcons();
        }
    }
}

class AppFooter extends HTMLElement {
    connectedCallback() {
        const base = this.getAttribute('base-path') || './';
        this.innerHTML = `
        <footer class="footer">
            <div class="container footer-grid">
                <div class="footer-brand">
                    <a href="${base}index.html" class="logo footer-logo">
                        <img src="${base}assets/logo-negativo.png" alt="Logo" style="height: 60px;">
                        <span class="logo-text">María<br>Camino a Jesús</span>
                    </a>
                    <p>Asociación Pública de Fieles Laicos de la Arquidiócesis de Maracaibo, Venezuela.</p>
                </div>
                <div class="footer-links">
                    <h4>Navegación</h4>
                    <a href="${base}informativa/quienes-somos.html">Nosotros</a>
                    <a href="${base}devocional/jesus-misericordioso.html">Devocional</a>
                    <a href="${base}informativa/obras.html">Obras</a>
                    <a href="${base}recursos/descargas.html">Recursos Pastoral</a>
                    <a href="${base}prensa/login.html">Acceso Prensa</a>
                </div>
                <div class="footer-contact">
                    <h4>Atención</h4>
                    <p><i data-lucide="clock"></i> Despacho: Lun-Vie (En construcción)</p>
                    <p><i data-lucide="map-pin"></i> Maracaibo, Zulia, Venezuela.</p>
                    <p><i data-lucide="mail"></i> info@mariacaminoajesus.org</p>
                    <div class="social-links" style="margin-top: 1rem;">
                        <a href="https://wa.me/580000000000" target="_blank" aria-label="WhatsApp" style="color: var(--clr-dark); background: var(--clr-primary-gold);"><i data-lucide="message-circle"></i></a>
                        <a href="https://instagram.com/mariacaminoajesus" target="_blank" aria-label="Instagram" style="color: var(--clr-dark); background: var(--clr-primary-gold);"><i data-lucide="instagram"></i></a>
                        <a href="https://youtube.com/mariacaminoajesus" target="_blank" aria-label="YouTube" style="color: var(--clr-dark); background: var(--clr-primary-gold);"><i data-lucide="youtube"></i></a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 Asociación Pública de Fieles María Camino a Jesús. Todos los derechos reservados.</p>
            </div>
        </footer>
        `;
        if(window.lucide) {
            window.lucide.createIcons();
        }
    }
}

customElements.define('app-header', AppHeader);
customElements.define('app-footer', AppFooter);
