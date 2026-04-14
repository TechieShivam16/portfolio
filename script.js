const textElement = document.getElementById('typing-text');
const phrases = ["Web Developer & Designer", "Frontend Developer", "Backend Developer", "Database Administrator"];
let phraseIndex = 0, charIndex = 0, isDeleting = false, typeSpeed = 100;

function type() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }
    setTimeout(type, typeSpeed);
}

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
const statBoxes = document.querySelectorAll('.stat-box');
const revealTexts = document.querySelectorAll('.reveal-text');
const progressBar = document.getElementById('progress-bar');
const triggerBox = document.getElementById('trigger-box');
const projectsSection = document.getElementById('projects');

function resetHeroAnimation() {
    const heroItems = document.querySelectorAll('#home .reveal-text');
    const heroBalls = document.querySelectorAll('.ball');
    heroItems.forEach(item => item.classList.remove('animate'));
    void document.getElementById('hero-text-parent').offsetWidth;
    heroItems.forEach((item, index) => { setTimeout(() => { item.classList.add('animate'); }, index * 150); });
    heroBalls.forEach(ball => {
        ball.style.animation = 'none';
        void ball.offsetWidth;
        ball.style.animation = 'popOut 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards, glowPulse 2s infinite alternate ease-in-out forwards';
    });
}

function resetAboutAnimation() {
    statBoxes.forEach(box => box.classList.remove('reveal'));
    const aboutTexts = document.querySelectorAll('#about .reveal-text');
    aboutTexts.forEach(text => text.classList.remove('animate'));
    void triggerBox.offsetWidth;
    statBoxes.forEach((box, index) => { setTimeout(() => { box.classList.add('reveal'); }, index * 150); });
    aboutTexts.forEach((text, index) => { setTimeout(() => { text.classList.add('animate'); }, index * 100); });
}

function resetProjectsAnimation() {
    const projectItems = document.querySelectorAll('#projects .reveal-text');
    projectItems.forEach(item => item.classList.remove('animate'));
    void document.getElementById('projects').offsetWidth;
    projectItems.forEach((item, index) => { setTimeout(() => { item.classList.add('animate'); }, index * 150); });
}

window.addEventListener('load', resetHeroAnimation);

document.getElementById('nav-home').addEventListener('click', () => { setTimeout(resetHeroAnimation, 100); });
document.getElementById('nav-about').addEventListener('click', () => { setTimeout(resetAboutAnimation, 100); });
document.getElementById('nav-projects').addEventListener('click', () => { setTimeout(resetProjectsAnimation, 100); });

const ctaParent = document.getElementById('cta-parent');
const ctaBtn = document.getElementById('cta-btn');
ctaParent.addEventListener('mouseenter', () => { ctaParent.classList.add('zoom-active'); });
ctaBtn.addEventListener('mouseenter', () => { ctaParent.classList.remove('zoom-active'); ctaParent.classList.add('no-zoom'); });
ctaParent.addEventListener('mouseleave', () => { ctaParent.classList.remove('zoom-active'); ctaParent.classList.remove('no-zoom'); });

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.id === 'trigger-box') {
                resetAboutAnimation();
                revealObserver.unobserve(entry.target);
            }
            if (entry.target.id === 'projects') {
                resetProjectsAnimation();
                revealObserver.unobserve(entry.target);
            }
        }
    });
}, { threshold: 0.1 });

if (triggerBox) revealObserver.observe(triggerBox);
if (projectsSection) revealObserver.observe(projectsSection);

window.addEventListener('scroll', () => {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + "%";

    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 150)) { current = section.getAttribute('id'); }
    });
    if (current === 'why-choose-me') { current = 'about'; }
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) { link.classList.add('active'); }
    });
});

document.addEventListener('DOMContentLoaded', type);