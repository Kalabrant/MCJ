/* ============================================================
   Novena a María Auxiliadora — lógica de acordeón y día actual
   ============================================================ */
(function () {
    'use strict';

    // Fechas oficiales de cada día (zona horaria local del navegador)
    const FECHAS = {
        1: { fecha: '2026-05-16', label: 'Sábado 16 de mayo' },
        2: { fecha: '2026-05-17', label: 'Domingo 17 de mayo' },
        3: { fecha: '2026-05-18', label: 'Lunes 18 de mayo' },
        4: { fecha: '2026-05-19', label: 'Martes 19 de mayo' },
        5: { fecha: '2026-05-20', label: 'Miércoles 20 de mayo' },
        6: { fecha: '2026-05-21', label: 'Jueves 21 de mayo' },
        7: { fecha: '2026-05-22', label: 'Viernes 22 de mayo' },
        8: { fecha: '2026-05-23', label: 'Sábado 23 de mayo' },
        9: { fecha: '2026-05-24', label: 'Domingo 24 de mayo (Pentecostés)' }
    };

    // Día (YYYY-MM-DD) en hora local
    function ymd(d) {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    }

    function diaActual() {
        // Permite override con ?dia=N para pruebas
        const params = new URLSearchParams(window.location.search);
        const ov = parseInt(params.get('dia'), 10);
        if (ov >= 1 && ov <= 9) return ov;

        const hoy = ymd(new Date());
        for (let n = 1; n <= 9; n++) {
            if (FECHAS[n].fecha === hoy) return n;
        }
        // Fuera de rango: antes / durante octava / después
        if (hoy < FECHAS[1].fecha) return 0;          // antes
        if (hoy > FECHAS[9].fecha) return 10;         // después
        return 0;
    }

    function abrir(card) {
        if (!card) return;
        card.classList.add('is-open');
        const btn = card.querySelector('.dia-header');
        if (btn) btn.setAttribute('aria-expanded', 'true');
    }
    function cerrar(card) {
        if (!card) return;
        card.classList.remove('is-open');
        const btn = card.querySelector('.dia-header');
        if (btn) btn.setAttribute('aria-expanded', 'false');
    }
    function toggle(card) {
        if (card.classList.contains('is-open')) cerrar(card);
        else abrir(card);
    }

    function init() {
        const cards = document.querySelectorAll('.dia-card');
        if (!cards.length) return;

        // Listener de click en cabeceras
        cards.forEach(card => {
            const header = card.querySelector('.dia-header');
            if (header) header.addEventListener('click', () => toggle(card));
        });

        const hoyN = diaActual();
        const hoyYMD = ymd(new Date());

        // Marcar pasado/futuro/hoy
        cards.forEach(card => {
            const f = card.dataset.fecha;
            if (!f) return;
            if (hoyN >= 1 && hoyN <= 9) {
                if (f < hoyYMD) card.classList.add('is-past');
                else if (f === hoyYMD) card.classList.add('is-today');
                else card.classList.add('is-future');
            }
        });

        // Auto-abrir y scroll al día corriente
        let targetCard = null;
        const hash = window.location.hash;
        const hashMatch = hash.match(/^#dia-(\d)$/);
        if (hashMatch) {
            const n = parseInt(hashMatch[1], 10);
            targetCard = document.getElementById(`dia-${n}`);
        } else if (hoyN >= 1 && hoyN <= 9) {
            targetCard = document.getElementById(`dia-${hoyN}`);
        }

        if (targetCard) {
            abrir(targetCard);
            setTimeout(() => {
                targetCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 350);
        }

        // Barra "día actual"
        const bar = document.getElementById('dia-actual-bar');
        if (bar && hoyN >= 1 && hoyN <= 9) {
            bar.style.display = 'block';
            document.getElementById('bar-dia').textContent = `día ${hoyN}`;
            document.getElementById('bar-fecha').textContent = FECHAS[hoyN].label;
            document.getElementById('bar-link').href = `#dia-${hoyN}`;
        }

        // Botón "Ir al día de hoy" del hero
        const btnIrHoy = document.querySelector('.hero-actions a[href="#dias"]');
        if (btnIrHoy && hoyN >= 1 && hoyN <= 9) {
            btnIrHoy.setAttribute('href', `#dia-${hoyN}`);
        }

        // Refrescar iconos
        if (window.lucide) window.lucide.createIcons();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
