/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const navUl = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');
const button = document.getElementById('btn');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

//Returns true if class is in viewport
const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// Add a nav element to the navbar for each section

const addNavElement = () => {
    for (const section of sections) {
        const navLi = document.createElement('li')
        navLi.innerHTML = `<a class="nav__link" id="nav-${section.id}">${section.dataset.nav}</a>`
        navUl.appendChild(navLi)
    }
}
addNavElement()

// Scroll smoothly to a section when clicked in nav bar
const scrollToSection = () => {
        document.querySelectorAll('.nav__link').forEach(a => {
            a.addEventListener('click', () => {
                sections.forEach(section => {
                    if(a.textContent === section.dataset.nav) {
                        section.scrollIntoView({behavior: 'smooth'})
                    }
                })
            })
    })
}

// Add class 'active' to section when near top of viewport
const addActiveClass = () => {
    for (const section of sections) {
        if (isInViewport(section)) {
            section.classList.add('active-section')
        } else {
            section.classList.remove('active-section')
        }
    }
}

//Hide NavBar when user stops scrolling
const hideNavBar = () => {
    const navBar = document.querySelector('nav');
    var timer;
    window.addEventListener('scroll', () => {
        window.clearTimeout(timer)
        navBar.style.display = 'block';
        timer = setTimeout(() => navBar.style.display= 'none' ,2000)
    }, false)
}
hideNavBar()

//Scroll to top button functionality
const scrollToTop = () => {
    button.addEventListener('click', () => {
        document.documentElement.scrollTop=0;
        document.body.scrollTop=0;
    })
}
scrollToTop()

//Only show scroll button when user scrolls below fold of page
const buttonVisible = () => {
    if(document.documentElement.scrollTop>100 || document.body.scrollTop>100) {
        button.style.display = 'block';
    } else {
        button.style.display = 'none';
    }
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Scroll to section on link click
navUl.addEventListener('click', scrollToSection())
// Set sections as active
document.addEventListener('scroll', function() {
    addActiveClass();
})
// Hide the nav bar when user stops scrolling
// Make scroll-to-top button visible when user scrolls below fold og page
document.addEventListener('scroll', () => {
   hideNavBar();
   buttonVisible();
})




