// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAll);
} else {
    // DOM is already ready
    initializeAll();
}

function initializeAll() {
    initializeNavigation();
    initializeCart();
    initializeSmoothScrolling();
    initializeIcons();
}

function initializeNavigation() {
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
            if (icon && typeof lucide !== 'undefined') {
                icon.setAttribute('data-lucide', isMenuOpen ? 'x' : 'menu');
                lucide.createIcons();
            }
        });

        // Close mobile menu when clicking on links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Don't prevent default - allow navigation to proceed
                isMenuOpen = false;
                mobileMenu.classList.add('hidden');
                const icon = menuToggle.querySelector('i');
                if (icon && typeof lucide !== 'undefined') {
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
                // Navigation will proceed normally
            }, { passive: true });
        });
    }

    // Scroll effect for navbar
    if (navbar) {
        let scrolled = false;
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const shouldBeScrolled = scrollY > 20;
            
            if (shouldBeScrolled !== scrolled) {
                scrolled = shouldBeScrolled;
                if (scrolled) {
                    navbar.classList.remove('bg-transparent', 'py-5');
                    navbar.classList.add('bg-slate-950/90', 'backdrop-blur-xl', 'border-b', 'border-white/10', 'py-3');
                } else {
                    navbar.classList.remove('bg-slate-950/90', 'backdrop-blur-xl', 'border-b', 'border-white/10', 'py-3');
                    navbar.classList.add('bg-transparent', 'py-5');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
    }
}

function initializeCart() {
    // Update cart count on page load (if cart.js is loaded)
    if (typeof Cart !== 'undefined') {
        Cart.updateCartCount();
    }
}

function initializeSmoothScrolling() {
    // Smooth scrolling for anchor links ONLY (not external links)
    // This only affects links starting with #, so it won't interfere with page navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Only handle anchor links that are on the same page
            if (href === '#' || !href) return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            // If target doesn't exist, let the browser handle it normally
        });
    });
    // Note: Non-anchor links (like pages/shop.html) are not modified here
    // They will work normally without any JavaScript interference
}

function initializeIcons() {
    // Initial icon creation
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
}

// Re-initialize icons on dynamic content (if any)
// Use debounce to prevent excessive re-initialization
let iconUpdateTimeout;
if (typeof MutationObserver !== 'undefined' && document.body) {
    const observer = new MutationObserver((mutations) => {
        // Only update if icons were actually added
        const hasIconChanges = mutations.some(mutation => 
            Array.from(mutation.addedNodes).some(node => 
                node.nodeType === 1 && (node.hasAttribute('data-lucide') || node.querySelector('[data-lucide]'))
            )
        );
        
        if (hasIconChanges) {
            clearTimeout(iconUpdateTimeout);
            iconUpdateTimeout = setTimeout(() => {
                if (typeof lucide !== 'undefined' && lucide.createIcons) {
                    lucide.createIcons();
                }
            }, 300);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

