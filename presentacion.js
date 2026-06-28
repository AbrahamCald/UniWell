// ===============================
// UNIWELF PRESENTACIÓN - JS MEJORADO
// ===============================

// Seguridad de acceso
if (sessionStorage.getItem('uniwell_access') !== 'granted') {
    window.location.replace('index.html');
}

document.addEventListener('DOMContentLoaded', () => {

    const sections = [...document.querySelectorAll('.slide')];
    const navLinks = [...document.querySelectorAll('.side-nav a')];
    const progressBar = document.getElementById('progressBar');
    const counter = document.getElementById('sectionCounter');
    const mobileDrawer = document.getElementById('mobileDrawer');

    let activeIndex = 0;

    // ===============================
    // Boot screen
    // ===============================
    setTimeout(() => {
        document.getElementById('bootScreen')?.classList.add('hide');
    }, 1800);

    // ===============================
    // Animaciones reveal
    // ===============================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // ===============================
    // Control de secciones activas
    // ===============================
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            activeIndex = sections.findIndex(s => s.id === entry.target.id);
            updateNavigation();
        });
    }, { threshold: 0.55 });

    sections.forEach(section => sectionObserver.observe(section));

    function updateNavigation() {
        const active = sections[activeIndex];

        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === active.id);
        });

        if (counter) {
            counter.textContent = `${activeIndex + 1}/${sections.length}`;
        }

        if (progressBar) {
            progressBar.style.width = `${((activeIndex + 1) / sections.length) * 100}%`;
        }
    }

    // ===============================
    // Navegación entre secciones
    // ===============================
    function goTo(index) {
        if (index < 0) index = 0;
        if (index >= sections.length) index = sections.length - 1;

        sections[index].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    document.getElementById('nextSection')?.addEventListener('click', () => {
        goTo(activeIndex + 1);
    });

    document.getElementById('prevSection')?.addEventListener('click', () => {
        goTo(activeIndex - 1);
    });

    // ===============================
    // Botones internos (start)
    // ===============================
    document.querySelectorAll('[data-next]').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = document.getElementById(btn.dataset.next);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===============================
    // Menú móvil
    // ===============================
    document.getElementById('menuBtn')?.addEventListener('click', () => {
        mobileDrawer?.classList.toggle('active');
    });

    mobileDrawer?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileDrawer.classList.remove('active');
        });
    });

    // ===============================
    // Modo presentación (MEJORADO)
    // ===============================
    document.getElementById('presentMode')?.addEventListener('click', () => {
        document.body.classList.toggle('presentation-mode');
    });

    // ===============================
    // Logout
    // ===============================
    document.getElementById('logoutBtn')?.addEventListener('click', () => {
        sessionStorage.removeItem('uniwell_access');
        window.location.replace('index.html');
    });

    // ===============================
    // Atajos teclado
    // ===============================
    document.addEventListener('keydown', (e) => {

        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            goTo(activeIndex + 1);
        }

        if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            goTo(activeIndex - 1);
        }

        // Modo presentación
        if (e.key.toLowerCase() === 'p') {
            document.body.classList.toggle('presentation-mode');
        }
    });

    updateNavigation();
});