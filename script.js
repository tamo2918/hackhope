// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        this.classList.add('active');
        
        if (targetId === '#home') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else if (targetId === '#about') {
            const missionSection = document.querySelector('.mission');
            if (missionSection) {
                missionSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        } else if (targetId === '#contact') {
            const contactSection = document.querySelector('.contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to main elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.mission-title, .mission-quote, .member-title, .details-button, .member-profile-card, .contact-title, .contact-item');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        // Add staggered delay for member cards
        if (el.classList.contains('member-profile-card')) {
            const cardIndex = Array.from(document.querySelectorAll('.member-profile-card')).indexOf(el);
            el.style.transition = `opacity 1s ease ${cardIndex * 0.2}s, transform 1s ease ${cardIndex * 0.2}s`;
        } else if (el.classList.contains('contact-item')) {
            // Add staggered delay for contact items
            const itemIndex = Array.from(document.querySelectorAll('.contact-item')).indexOf(el);
            el.style.transition = `opacity 1s ease ${itemIndex * 0.15}s, transform 1s ease ${itemIndex * 0.15}s`;
        } else {
            el.style.transition = 'opacity 1s ease, transform 1s ease';
        }
        
        observer.observe(el);
    });
    
    // Initialize typing animation for hero title
    initTypingAnimation();
});

// Typing Animation Function
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    const cursorElement = document.querySelector('.typing-cursor');
    
    if (!typingElement) return;
    
    const text = typingElement.getAttribute('data-text');
    typingElement.textContent = '';
    
    // Show hero title container first
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
    }
    
    let index = 0;
    
    function typeCharacter() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            
            // Random typing speed for more natural effect
            const speed = Math.random() * 60 + 30; // 30-90ms (faster than before)
            setTimeout(typeCharacter, speed);
        } else {
            // Animation complete, hide cursor after a delay
            setTimeout(() => {
                if (cursorElement) {
                    cursorElement.style.opacity = '0';
                }
            }, 2000);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeCharacter, 600);
}

// Subtle parallax effect for hero section (reduced intensity)
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.02; // Much subtler effect
    
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && scrolled < window.innerHeight) {
        heroTitle.style.transform = `translateY(${rate}px)`;
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Enhanced button interactions
const detailsButton = document.querySelector('.details-button');
if (detailsButton) {
    detailsButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    detailsButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    detailsButton.addEventListener('click', function(e) {
        // Create ripple effect
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            background: rgba(71, 67, 6, 0.3);
            border-radius: 50%;
            pointer-events: none;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s linear;
            z-index: 1;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Scroll to About section (Mission)
        const missionSection = document.querySelector('.mission');
        if (missionSection) {
            missionSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Social icon hover effects
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.social-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    });
    
    link.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.social-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Loading animation with better performance
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Trigger initial animations
    setTimeout(() => {
        const logo = document.querySelector('.logo h1');
        if (logo) {
            logo.style.opacity = '1';
            logo.style.transform = 'translateY(0)';
        }
    }, 100);
});

// Scroll-based navigation highlighting
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollPosition = window.pageYOffset + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.classList.contains('hero') ? '#home' :
                     section.classList.contains('mission') ? '#about' :
                     section.classList.contains('contact') ? '#contact' : '';
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavigation);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavigation();
}); 