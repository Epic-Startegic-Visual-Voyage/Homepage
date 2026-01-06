document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        // A 'nav-links' elemhez hozzáadja vagy elveszi az 'active' osztályt
        navLinks.classList.toggle('active');

        // Opcionális: a hamburger ikon átváltása 'X'-re
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times'); // fa-times az 'X' ikon a Font Awesome-ban
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Opcionális: bezárja a menüt, ha a felhasználó rákattint egy linkre (mobilon)
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                hamburger.querySelector('i').classList.remove('fa-times');
                hamburger.querySelector('i').classList.add('fa-bars');
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // ... a meglévő hamburger menü kódja itt folytatódik ...

    // --- GÖRGETÉS JELZŐ CSÍK FUNKCIÓJA ---
    const progressBar = document.getElementById('progress-bar');
    
    // Függvény a görgetési előrehaladás kiszámítására
    function updateProgressBar() {
        // 1. Kiszámoljuk a lap teljes görgethető magasságát
        const fullHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        // 2. Lekérjük a jelenlegi görgetési pozíciót (honnan van a tető)
        const scrollPosition = document.documentElement.scrollTop;
        
        // 3. Kiszámoljuk az előrehaladást %-ban
        const progressPercentage = (scrollPosition / fullHeight) * 100;
        
        // 4. Beállítjuk a csík szélességét
        progressBar.style.width = progressPercentage + '%';
    }

    // Eseményfigyelő hozzáadása a görgetés eseményéhez
    window.addEventListener('scroll', updateProgressBar);
    
    // A funkciót betöltéskor is lefutatjuk, ha az oldal nem a tetején nyílik meg
    updateProgressBar();
});



document.addEventListener('DOMContentLoaded', () => {
    // 1. Az animálandó elem(ek) kiválasztása
    const elementsToAnimate = document.querySelectorAll('.testimonial-box');

    // 2. Az animációhoz szükséges CSS osztály
    const animateClass = 'is-visible'; 
    
    // 3. A CSS osztály hozzáadása (ez indítja az animációt)
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ha az elem belép a látómezőbe, hozzáadjuk az osztályt
                entry.target.classList.add(animateClass);
                // Leállítjuk a megfigyelést, hogy ne fusson le mégegyszer
                observer.unobserve(entry.target);
            }
        });
    };

    // 4. Observer beállítása (az animáció már 20% láthatóságnál induljon)
    const observerOptions = {
        root: null, // A viewport-ot használjuk
        rootMargin: '0px',
        threshold: 0.2 // 20% láthatóságnál indul
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // 5. Minden elemet megfigyelünk
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
});