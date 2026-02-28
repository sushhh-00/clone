document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = this.nextElementSibling;
            const isOpen = answer.style.maxHeight;

            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = null;
            });

            if (!isOpen) {
                faqItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.classList.toggle('light-theme', currentTheme === 'light');

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('light-theme');
            const theme = body.classList.contains('light-theme') ? 'light' : 'dark';
            localStorage.setItem('theme', theme);
        });
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.feature, .faq, .cta');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    const carousel = document.querySelector('.carousel');
    const leftBtn = document.querySelector('.carousel-btn.left');
    const rightBtn = document.querySelector('.carousel-btn.right');

    if (carousel && leftBtn && rightBtn) {
        const scrollAmount = 216;
        leftBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        rightBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        const updateButtons = () => {
            const isAtStart = carousel.scrollLeft <= 0;
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;
            const isAtEnd = carousel.scrollLeft >= maxScroll - 1;

            leftBtn.style.opacity = isAtStart ? '0.5' : '1';
            leftBtn.disabled = isAtStart;
            rightBtn.style.opacity = isAtEnd ? '0.5' : '1';
            rightBtn.disabled = isAtEnd;
        };

        carousel.addEventListener('scroll', updateButtons);
        
        updateButtons();
    }
});
