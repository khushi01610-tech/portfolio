document.addEventListener('DOMContentLoaded', () => {

    /* --- Custom Cursor --- */
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        const interactives = document.querySelectorAll('a, button');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('cursor-hover');
            });
        });
    }

    /* --- Scroll Animations (Intersection Observer) --- */
    const faders = document.querySelectorAll('.reveal-fade');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                
                if(entry.target.classList.contains('hero-bottom')) {
                    animateNumbers();
                }

                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
    
    setTimeout(() => {
        document.querySelector('.hero-bottom').classList.add('appear');
    }, 500);

    /* --- Number Counter Animation --- */
    let numbersAnimated = false;
    function animateNumbers() {
        if(numbersAnimated) return;
        numbersAnimated = true;
        
        // This is a minimal visual bump mechanism
        const counters = document.querySelectorAll('.stat-item h3');
        counters.forEach(counter => {
            counter.animate([
                { opacity: 0, transform: 'translateY(10px)' },
                { opacity: 1, transform: 'translateY(0)' }
            ], {
                duration: 800,
                easing: 'ease-out',
                fill: 'forwards'
            });
        });
    }

    /* --- Smooth Navbar Scrolling --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
