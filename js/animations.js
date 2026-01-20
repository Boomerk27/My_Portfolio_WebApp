// animations.js

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');

            // Animate progress numbers
            if (entry.target.classList.contains('progress-number')) {
                animateValue(entry.target, 0, entry.target.getAttribute('data-target'), 2000);
            }
        }
    });
}, observerOptions);

// Heading animations observer
const headingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, { threshold: 0.3 });

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Observe skill categories
    document.querySelectorAll('.skill-category').forEach(el => {
        observer.observe(el);
    });

    // Observe project cards
    document.querySelectorAll('.project-card').forEach(el => {
        observer.observe(el);
    });

    // Observe progress numbers
    document.querySelectorAll('.progress-number').forEach(el => {
        observer.observe(el);
    });

    // Observe certificate cards
    document.querySelectorAll('.certificate-card').forEach(el => {
        observer.observe(el);
    });

    // Observe progress cards
    document.querySelectorAll('.progress-card').forEach(el => {
        observer.observe(el);
    });

    // Observe stat cards
    document.querySelectorAll('.stat-card').forEach(el => {
        observer.observe(el);
    });

    // Observe proof items
    document.querySelectorAll('.proof-item').forEach(el => {
        observer.observe(el);
    });

    // Initialize all animations
    initHeadingAnimations();
    initFloatingShapes();
    initHoverEffects();
    initScrollProgress();
    initGlitchEffects(); // Initialize glitch effects for all headings
});

// Initialize heading animations
function initHeadingAnimations() {
    // Observe all headings for animation
    const headings = document.querySelectorAll(
        '.section-title h2, .skill-category h3, .project-content h3, .certificate-content h3, .progress-card h3, .stat-card h3'
    );

    headings.forEach(heading => {
        // Pause animations initially
        heading.style.animationPlayState = 'paused';
        headingObserver.observe(heading);
    });
}

// Initialize glitch effects for all headings
function initGlitchEffects() {
    const headings = document.querySelectorAll(
        '.section-title h2, ' +
        '.skill-category h3, ' +
        '.progress-card h3, ' +
        '.tryhackme-banner h3, ' +
        '.ctf-stats h3, ' +
        '.progress-card-header h3, ' +
        '.project-content h3, ' +
        '.certificate-content h3, ' +
        '.stat-card h3, ' +
        '.contact-info h3, ' +
        '.footer-column h3, ' +
        '.about-text h3, ' +
        '.logo'
    );

    headings.forEach(heading => {
        // Add data-text attribute for glitch effect
        if (!heading.getAttribute('data-text')) {
            heading.setAttribute('data-text', heading.textContent);
        }

        // Add random glitch effect on interval
        const glitchInterval = setInterval(() => {
            if (Math.random() > 0.8 && isElementInViewport(heading)) { // 20% chance to glitch when in viewport
                triggerGlitch(heading);
            }
        }, getRandomDelay(4000, 8000)); // Random delay between 4-8 seconds

        // Store interval for cleanup
        heading.dataset.glitchInterval = glitchInterval;

        // Add hover glitch effect
        heading.addEventListener('mouseenter', () => {
            triggerGlitch(heading);
        });

        // Add click glitch effect
        heading.addEventListener('click', () => {
            triggerGlitch(heading, 500);
        });
    });
}

// Trigger glitch effect on element
function triggerGlitch(element, duration = 300) {
    element.classList.add('glitch-active');
    setTimeout(() => {
        element.classList.remove('glitch-active');
    }, duration);
}

// Check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Animate value counter
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize floating shapes
function initFloatingShapes() {
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach(shape => {
        // Random initial position and animation
        const randomX = Math.random() * 80 + 10;
        const randomY = Math.random() * 80 + 10;
        const randomDelay = Math.random() * 5;
        const randomDuration = Math.random() * 3 + 3;

        shape.style.left = `${randomX}%`;
        shape.style.top = `${randomY}%`;
        shape.style.animation = `float ${randomDuration}s ease-in-out ${randomDelay}s infinite`;
    });
}

// Initialize hover effects
function initHoverEffects() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.skill-category, .project-card, .certificate-card, .progress-card, .stat-card, .proof-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px var(--shadow-color)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 5px 15px var(--shadow-color)';
        });
    });

    // Add pulse effect to buttons on hover
    const buttons = document.querySelectorAll('.btn, .project-btn, .certificate-btn, .bug-proof-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.classList.add('pulse');
        });

        button.addEventListener('mouseleave', () => {
            button.classList.remove('pulse');
        });
    });

    // Add glow effect to navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.classList.add('glow-on-hover');
        });

        link.addEventListener('mouseleave', () => {
            link.classList.remove('glow-on-hover');
        });
    });
}

// Initialize scroll progress indicator
function initScrollProgress() {
    // Create scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--primary-color);
        z-index: 1001;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px var(--primary-color);
    `;
    document.body.appendChild(progressBar);

    // Update progress bar on scroll
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;

        // Add glitch effect to progress bar at certain scroll points
        if (scrolled % 25 < 2) {
            progressBar.style.background = '#ff00ff';
            setTimeout(() => {
                progressBar.style.background = 'var(--primary-color)';
            }, 100);
        }
    });
}


// Utility function for random delays
function getRandomDelay(min, max) {
    return Math.random() * (max - min) + min;
}


// Cleanup function to remove glitch intervals
function cleanupGlitchEffects() {
    const headings = document.querySelectorAll('[data-glitch-interval]');
    headings.forEach(heading => {
        if (heading.dataset.glitchInterval) {
            clearInterval(parseInt(heading.dataset.glitchInterval));
        }
    });
}

// Handle page visibility changes to optimize performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, reduce animation intensity
        document.body.style.animationPlayState = 'paused';
    } else {
        // Page is visible, resume animations
        document.body.style.animationPlayState = 'running';
    }
});