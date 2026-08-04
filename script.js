// ==========================================
// Typewriter Effect Variables
// ==========================================
const textElement = document.getElementById('typing-text');
const phrases = ['Web Developer & Designer', 'Frontend Developer', 'Backend Developer', 'Database Administrator'];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

// Handles the typing animation sequence on the home screen
function type() {
    const phrase = phrases[phraseIndex];

    if (isDeleting) {
        textElement.textContent = phrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = phrase.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === phrase.length) {
        isDeleting = true;
        setTimeout(type, 2000);
        return;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    setTimeout(type, isDeleting ? 50 : 100);
}


// ==========================================
// Selectors for Navigation & Scrolls
// ==========================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
const progressBar = document.getElementById('progress-bar');
const statBoxes = document.querySelectorAll('.stat-box');
const aboutTrigger = document.getElementById('anim-trigger');
const projectsSection = document.getElementById('projects');
const contactSection = document.getElementById('contact');

// Animation Resets
function resetHeroAnimation() {
    const items = document.querySelectorAll('#home .reveal-text');
    items.forEach(item => item.classList.remove('animate'));
    void document.getElementById('intro-txt').offsetWidth;
    items.forEach((item, index) => setTimeout(() => item.classList.add('animate'), index * 120));
}

function resetAboutAnimation() {
    statBoxes.forEach(box => {
        box.classList.remove('reveal');
        box.classList.remove('entrance-settled');
    });
    const items = document.querySelectorAll('#about .reveal-text');
    items.forEach(item => item.classList.remove('animate'));
    void aboutTrigger.offsetWidth;
    
    statBoxes.forEach((box, index) => setTimeout(() => box.classList.add('reveal'), index * 120));
    items.forEach((item, index) => setTimeout(() => item.classList.add('animate'), index * 100));
}

function resetProjectsAnimation() {
    const items = document.querySelectorAll('#projects .reveal-text');
    items.forEach(item => item.classList.remove('animate'));
    void projectsSection.offsetWidth;
    items.forEach((item, index) => setTimeout(() => item.classList.add('animate'), index * 120));
}

function resetContactAnimation() {
    const items = document.querySelectorAll('#contact .reveal-text');
    items.forEach(item => item.classList.remove('animate'));
    void contactSection.offsetWidth;
    items.forEach((item, index) => setTimeout(() => item.classList.add('animate'), index * 120));
}


// ==========================================
// Event Listeners (Menu, Scroll, Init)
// ==========================================
window.addEventListener('load', resetHeroAnimation);
document.addEventListener('DOMContentLoaded', type);

document.getElementById('nav-home').addEventListener('click', () => setTimeout(resetHeroAnimation, 100));
document.getElementById('nav-about').addEventListener('click', () => setTimeout(resetAboutAnimation, 100));
document.getElementById('nav-projects').addEventListener('click', () => setTimeout(resetProjectsAnimation, 100));

const navContact = document.getElementById('nav-contact');
if (navContact) {
    navContact.addEventListener('click', () => setTimeout(resetContactAnimation, 100));
}

// Progress Bar & Active Link state updater
window.addEventListener('scroll', () => {
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    progressBar.style.width = height ? `${(document.documentElement.scrollTop / height) * 100}%` : '0%';
    
    let current = 'home';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 150) {
            current = section.id;
        }
    });
    
    if (current === 'why-choose-me') {
        current = 'about';
    }
    
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
});

// Mobile Hamburger Menu
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.nav-links');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
    
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// Contact Form Handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', event => {
        event.preventDefault();
        alert('Thank you! Your message has been received.');
        contactForm.reset();
    });
}


// ==========================================
// AI Assistant Logic
// ==========================================
const aiToggle = document.querySelector('.ai-toggle');
const aiChat = document.querySelector('.ai-chat');
const aiClose = document.querySelector('.ai-close');
const aiForm = document.querySelector('.ai-form');
const aiInput = document.querySelector('.ai-input');
const aiMessages = document.querySelector('.ai-messages');

function addAiMessage(message, sender) {
    const bubble = document.createElement('div');
    bubble.className = `ai-message ${sender}`;
    bubble.textContent = message;
    aiMessages.appendChild(bubble);
    aiMessages.scrollTop = aiMessages.scrollHeight;
}

function getAiReply(question) {
    const text = question.toLowerCase();
    if (text.includes('skill') || text.includes('technology')) {
        return 'Shivam works with HTML, CSS, JavaScript, React, Node.js, MongoDB and SQL.';
    }
    if (text.includes('project')) {
        return 'You can see Shivam’s projects in the Projects section.';
    }
    if (text.includes('contact') || text.includes('email') || text.includes('phone')) {
        return 'You can use the contact form, call +91 7600065230, or email shivammaurya1610@gmail.com.';
    }
    return 'Please ask about Shivam’s skills, projects, availability, or contact details.';
}

if (aiToggle && aiChat && aiClose && aiForm && aiInput && aiMessages) {
    aiToggle.addEventListener('click', () => {
        aiChat.classList.add('open');
        aiToggle.setAttribute('aria-expanded', 'true');
        aiInput.focus();
    });
    
    aiClose.addEventListener('click', () => {
        aiChat.classList.remove('open');
        aiToggle.setAttribute('aria-expanded', 'false');
    });
    
    aiForm.addEventListener('submit', event => {
        event.preventDefault();
        const question = aiInput.value.trim();
        if (!question) return;
        
        addAiMessage(question, 'user');
        aiInput.value = '';
        
        setTimeout(() => addAiMessage(getAiReply(question), 'bot'), 250);
    });
}


// ==========================================
// Visual Interactivity & Observers
// ==========================================

// CTA Button Zoom Logic
const ctaParent = document.getElementById('cta-parent');
const ctaButton = document.getElementById('cta-btn');

if (ctaParent && ctaButton) {
    ctaParent.addEventListener('mouseenter', () => ctaParent.classList.add('zoom-active'));
    ctaButton.addEventListener('mouseenter', () => {
        ctaParent.classList.remove('zoom-active');
        ctaParent.classList.add('no-zoom');
    });
    ctaParent.addEventListener('mouseleave', () => {
        ctaParent.classList.remove('zoom-active');
        ctaParent.classList.remove('no-zoom');
    });
}

// Features Section Entrance 
const featuresSection = document.getElementById('why-choose-me');
if (featuresSection) {
    const featureObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('animate-features');
            featureObserver.unobserve(entry.target);
        });
    }, { threshold: 0.25 }); // Lowered to 0.25 so the animation triggers perfectly as you scroll into the section
    
    featureObserver.observe(featuresSection);
    
    featuresSection.addEventListener('animationend', event => {
        if (event.animationName === 'simpleFadeIn') {
            event.target.classList.add('entrance-settled');
        }
    });
}

// Orbit Reset Logic
function resetSkillOrbitAnimation() {
    const orbitItems = document.querySelectorAll('.ball, .motion-trail');
    orbitItems.forEach(item => { item.style.animation = 'none'; });
    void document.getElementById('skills-orbit').offsetWidth;
    orbitItems.forEach(item => { item.style.animation = ''; });
}

const homeNavigation = document.getElementById('nav-home');
if (homeNavigation) {
    homeNavigation.addEventListener('click', () => setTimeout(resetSkillOrbitAnimation, 120));
}

// Global Observer for remaining sections
const initialSectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        if (entry.target.id === 'anim-trigger') resetAboutAnimation();
        if (entry.target.id === 'projects') resetProjectsAnimation();
        if (entry.target.id === 'contact') resetContactAnimation();
        initialSectionObserver.unobserve(entry.target);
    });
}, { threshold: 0.1 });

if (aboutTrigger) initialSectionObserver.observe(aboutTrigger);
if (projectsSection) initialSectionObserver.observe(projectsSection);
if (contactSection) initialSectionObserver.observe(contactSection);

// About visual image pop-in
const aboutSection = document.getElementById('about');
if (aboutSection && aboutTrigger) {
    const aboutVisualObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            aboutSection.classList.add('about-visual-enter');
            aboutVisualObserver.unobserve(entry.target);
        });
    }, { threshold: 0.1 });
    aboutVisualObserver.observe(aboutTrigger);
}

// About section cleanup to restore CSS hover transitions
const aboutSectionElement = document.getElementById('about');
if (aboutSectionElement) {
    aboutSectionElement.addEventListener('animationend', event => {
        if (event.animationName === 'fadeLeftRight' && event.target.classList.contains('stat-box')) {
            event.target.classList.add('entrance-settled');
        }
    });
}

// Skills section staggered entrance
const skillsSectionTarget = document.getElementById('skills');
if (skillsSectionTarget) {
    const skillObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('animate-skills');
            skillObserver.unobserve(entry.target);
        });
    }, { threshold: 0.25 }); // Lowered to 0.25 so the animation triggers perfectly as you scroll into the section
    
    skillObserver.observe(skillsSectionTarget);
    
    skillsSectionTarget.addEventListener('animationend', event => {
        if (event.animationName === 'simpleFadeIn' && event.target.classList.contains('skill-card')) {
            event.target.classList.add('entrance-settled');
        }
    });
}