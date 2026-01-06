window.onscroll = function() {
    updateProgressBar();
};

function updateProgressBar() {
    // Mennyit görgettünk lefelé
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    
    // Mekkora a teljes görgethető magasság
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Százalékos számítás
    var scrolled = (winScroll / height) * 100;
    
    // Csík szélességének átírása
    document.getElementById("myBar").style.width = scrolled + "%";
}
// Figyeljük a görgetést az Anchor menühöz
window.addEventListener('scroll', () => {
    // Kigyűjtjük az összes olyan elemet, aminek van ID-ja és a tartalom része
    const sections = document.querySelectorAll('section[id], div[id].text-block');
    const navLi = document.querySelectorAll('.anchor-list li a');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Finomhangolt érzékelés: ha a görgetés a szekció tetejéhez ér
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(a => {
        a.classList.remove('active');
        // Csak akkor adjuk hozzá az active-ot, ha pontos az egyezés
        if (current && a.getAttribute('href') === `#${current}`) {
            a.classList.add('active');
            
            // Automatikus belső görgetés a menün belül (ha sok az elem)
            const menu = document.querySelector('.anchor-menu');
            const activeElement = a.parentElement;
            
            if (menu && activeElement) {
                menu.scrollTo({
                    top: activeElement.offsetTop - (menu.clientHeight / 2),
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Sima görgetés (Smooth scroll) kattintáskor
document.querySelectorAll('.anchor-list a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop - 100, // Hogy ne takarja ki a fejléc
                behavior: 'smooth'
            });
        }
    });
});


const menu = document.querySelector('#mobile-menu');
const navLinks = document.querySelector('.nav-links');

menu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Animáció az ikonnak (opcionális: X alak)
    menu.classList.toggle('is-active');
});

document.addEventListener('DOMContentLoaded', () => {
    // A megfigyelő beállítása: érzékenyebbre vesszük a felső sávot
    const observerOptions = {
        root: null,
        rootMargin: '-5% 0px -85% 0px', // Akkor vált, ha az elem a felső 15%-ban van
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Csak akkor foglalkozunk vele, ha éppen belép a látható részre
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Kikeressük az összes .toc-link-et és levesszük az aktív osztályt
                document.querySelectorAll('.toc-link').forEach(link => {
                    link.classList.remove('active');
                });

                // Megkeressük a konkrét linket és rárakjuk az aktív osztályt
                const activeLink = document.querySelector(`.toc-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    // Figyeljük az összes linket, aminek van megfelelő ID-ja az oldalon
    document.querySelectorAll('.toc-link').forEach(link => {
        const id = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(id);
        if (targetElement) {
            observer.observe(targetElement);
        }
    });
});