script:
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const cursor = document.getElementById('cursor');
    const cursorBorder = document.getElementById('cursor-border');
    const backToTop = document.getElementById('back-to-top');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    // Menu toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        menuToggle.classList.toggle('menu-open');
    });

    // Theme toggle
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        themeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });

    // Custom cursor
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorBorder.style.left = e.clientX + 'px';
        cursorBorder.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
        cursorBorder.style.transform = 'scale(1.2)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
        cursorBorder.style.transform = 'scale(1)';
    });

    // Preloader
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        preloader.style.display = 'none';
    });

    // Scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Active navigation link
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Back to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Typewriter effect
    const typewriterElement = document.getElementById('typewriter');
    const phrases = ['Computer Science Student', 'Aspiring Developer', 'Data Science Enthusiast', 'AI and ML Passionate'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(typeWriter, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeWriter, 500);
        } else {
            setTimeout(typeWriter, isDeleting ? 50 : 100);
        }
    }

    typeWriter();

    // Skills chart
    const ctx = document.getElementById('skillsChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['C', 'C++', 'Python', 'Java', 'HTML', 'CSS', 'React.js', 'Node.js', 'MySQL', 'Data Visualization', 'Power Bi'],
            datasets: [{
                label: 'Skill Level',
                data: [95, 85, 80, 78, 95, 90, 85, 80, 85, 90, 75],
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: 'rgba(52, 152, 219, 1)',
                pointBackgroundColor: 'rgba(52, 152, 219, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(52, 152, 219, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        display: false
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }
        }
    });

    // Experience timeline
    const experiences = [
        {
            title: "Technical Content Writer Intern",
            company: "Programming Hub",
            location: "Seawoods, Navi Mumbai",
            period: "Apr 2024 – Jul 2024",
            responsibilities: [
                "Edited and reviewed 15 AI/ML-based content to meet diverse audience needs.",
                "Proposed 8 major innovative topics and developed 5 practical projects within deadlines."
            ]
        },
        {
            title: "Data Science Intern",
            company: "Cod Soft",
            location: "Online",
            period: "Apr 2024 – May 2024",
            responsibilities: [
                "Utilized data science techniques to analyse 4 datasets and solve targeted challenges.",
                "Created compelling data visualizations for stakeholder presentations."
            ]
        },
        {
            title: "Co-Head",
            company: "Computer Association",
            location: "Pillai College of Arts, Commerce and Science, Panvel",
            period: "July 2023 – Present",
            responsibilities: [
                "Leading the team of 50+ members through major Technical events in the College.",
                "Got an Opportuinity to have a Insightful Meeting with the Marketing Head of Riot Gaming India for future upcoming events."
            ]
        }
    ];

    const experienceTimeline = document.querySelector('.timeline');
    experiences.forEach((exp, index) => {
        const expItem = document.createElement('div');
        expItem.classList.add('timeline-item', index % 2 === 0 ? 'left' : 'right');
        expItem.innerHTML = `
            <div class="timeline-content">
                <h3>${exp.title}</h3>
                <p>${exp.company} | ${exp.location}</p>
                <p>${exp.period}</p>
                <ul>
                    ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                </ul>
            </div>
        `;
        experienceTimeline.appendChild(expItem);
    });

    // Projects
    const projects = [
        {
            title: "Anime Website Project",
            description: "Developed an online streaming service using Java, HTML, CSS, SQL, improving user satisfaction by 25%.",
            image: "./images/Screenshot1.png",
            URL: "http://localhost:8080/Anime1/index.html",
            category: "web"
        },
        {
            title: "Hand Gesture Dino Game",
            description: "Developed a Python-based computer vision game for interactive control.",
            image: "https://www.coolmathgames.com/sites/default/files/DinoGame_OG-logo.jpg",
            URL:"hand_gesture_dino_game.html",
            category: "ai"
        },
        {
            title: "Image Cartoonify Convertor",
            description: "Developed a Ai project which directly converts the imported image into Cartoonish version of it.",
            image: "./images/Screenshot2.png",
            URL:"https://colab.research.google.com/drive/1n5DSw8copZ-ET7esTzw1ydleInMkpsPy",
            category: "ai"
        }
    ];

    const projectsGrid = document.querySelector('.projects-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    function createProjectCard(project) {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        projectCard.dataset.category = project.category;
        projectCard.innerHTML = `
            <img src="${project.image}">
            <div class="project-card-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.URL}" class="btn">View Project</a>
            </div><br><br>
        `;
        return projectCard;
    }

    function filterProjects(category) {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterProjects(button.dataset.filter);
        });
    });

    // Education
    const education = [
        {
            degree: "B.Sc. Computer Science",
            institution: "Pilla's College of Arts, Commerce And Science (Autonomous)",
            location: "Panvel",
            period: "August 2022 – Present"
        },
        {
            degree: "Higher Secondary (12th)",
            institution: "K.L.E. Jr. College",
            location: "Kalamboli",
            period: "August 2020 – June 2022"
        },
        {
            degree: "Secondary (10th)",
            institution: "St. Joseph High School",
            location: "Kalamboli",
            period: "June 2010 – June 2020"
        }
    ];

    const educationTimeline = document.querySelector('#education .timeline');
    education.forEach((edu, index) => {
        const eduItem = document.createElement('div');
        eduItem.classList.add('timeline-item', index % 2 === 0 ? 'left' : 'right');
        eduItem.innerHTML = `
            <div class="timeline-content">
                <h3>${edu.degree}</h3>
                <p>${edu.institution}</p>
                <p>${edu.location}</p>
                <p>${edu.period}</p>
            </div>
        `;
        educationTimeline.appendChild(eduItem);
    });

    // Contact form
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically send the form data to a server
        console.log('Form submitted:', {
            name: contactForm.name.value,
            email: contactForm.email.value,
            message: contactForm.message.value
        });
        // Reset form after submission
        contactForm.reset();
        alert('Thank you for your message. I will get back to you soon!');
    });

    // Vanta.js background
    VANTA.NET({
        el: "#vanta-background",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x3498db,
        backgroundColor: 0x1a1a1a,
        points: 10.00,
        maxDistance: 20.00,
        spacing: 15.00
    });

    // GSAP animations
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.profile-image', {
        duration: 1.5,
        y: -100,
        opacity: 0,
        ease: 'bounce.out',
        delay: 0.5
    });

    gsap.from('.hero h1, .hero h2, .hero p, .hero .btn', {
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 1
    });

    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        });
    });

    gsap.utils.toArray('.timeline-item').forEach(item => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            duration: 1,
            x: item.classList.contains('left') ? -50 : 50,
            opacity: 0,
            ease: 'power3.out'
        });
    });

    gsap.utils.toArray('.project-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        });
    });
});

