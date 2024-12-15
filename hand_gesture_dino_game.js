document.addEventListener('DOMContentLoaded', () => {
    // Menu show and hide
    const navMenu = document.getElementById('nav-menu'),
          navToggle = document.getElementById('nav-toggle'),
          navClose = document.getElementById('nav-close')
  
    if(navToggle){
      navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
      })
    }
  
    if(navClose){
      navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
      })
    }
  
    // Remove menu mobile
    const navLink = document.querySelectorAll('.nav__link')
  
    function linkAction(){
      const navMenu = document.getElementById('nav-menu')
      navMenu.classList.remove('show-menu')
    }
    navLink.forEach(n => n.addEventListener('click', linkAction))
  
    // Scroll sections active link
    const sections = document.querySelectorAll('section[id]')
  
    function scrollActive(){
      const scrollY = window.pageYOffset
  
      sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50
        sectionId = current.getAttribute('id')
  
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
          document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
          document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
      })
    }
    window.addEventListener('scroll', scrollActive)
  
    // Change background header
    function scrollHeader(){
      const nav = document.getElementById('header')
      if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
    }
    window.addEventListener('scroll', scrollHeader)
  
    // Show scroll up
    function scrollUp(){
      const scrollUp = document.getElementById('scroll-up');
      if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
    }
    window.addEventListener('scroll', scrollUp)
  
    // Dark light theme
    const themeButton = document.getElementById('theme-toggle')
    const darkTheme = 'dark-theme'
    const iconTheme = 'fa-sun'
  
    const selectedTheme = localStorage.getItem('selected-theme')
    const selectedIcon = localStorage.getItem('selected-icon')
  
    const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
    const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'fa-moon' : 'fa-sun'
  
    if (selectedTheme) {
      document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
      themeButton.classList[selectedIcon === 'fa-moon' ? 'add' : 'remove'](iconTheme)
    }
  
    themeButton.addEventListener('click', () => {
      document.body.classList.toggle(darkTheme)
      themeButton.classList.toggle(iconTheme)
      localStorage.setItem('selected-theme', getCurrentTheme())
      localStorage.setItem('selected-icon', getCurrentIcon())
    })
  
    // Scroll reveal animation
    const sr = ScrollReveal({
      origin: 'top',
      distance: '60px',
      duration: 2500,
      delay: 400,
      // reset: true
    })
  
    sr.reveal(`.dino-hero__content, .dino-hero__img, 
               .game-intro__img, .game-intro__content,
               .feature__card,
               .screenshot__card,
               .gameplay-video__content,
               .cta__content, .cta__img,
               .footer__content`, {
      interval: 100
    })
  
    document.addEventListener('DOMContentLoaded', function() {
        new Swiper('.swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    });
})