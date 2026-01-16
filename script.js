// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const navbar = document.getElementById('navbar');
let isMenuOpen = false;

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        mobileMenu.classList.toggle('hidden', !isMenuOpen);
        
        // Update icon
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.setAttribute('data-lucide', isMenuOpen ? 'x' : 'menu');
            lucide.createIcons();
        }
    });

    // Close mobile menu when clicking on links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            mobileMenu.classList.add('hidden');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    });
}

// Scroll effect for navbar
let scrolled = false;
const handleScroll = () => {
    const scrollY = window.scrollY;
    const shouldBeScrolled = scrollY > 20;
    
    if (shouldBeScrolled !== scrolled) {
        scrolled = shouldBeScrolled;
        if (navbar) {
            if (scrolled) {
                navbar.classList.remove('bg-transparent', 'py-5');
                navbar.classList.add('bg-slate-950/90', 'backdrop-blur-xl', 'border-b', 'border-white/10', 'py-3');
            } else {
                navbar.classList.remove('bg-slate-950/90', 'backdrop-blur-xl', 'border-b', 'border-white/10', 'py-3');
                navbar.classList.add('bg-transparent', 'py-5');
            }
        }
    }
};

window.addEventListener('scroll', handleScroll);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Re-initialize icons on dynamic content (if any)
const observer = new MutationObserver(() => {
    lucide.createIcons();
});

if (document.body) {
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Update cart count on page load (if cart.js is loaded)
if (typeof Cart !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        Cart.updateCartCount();
    });
}
