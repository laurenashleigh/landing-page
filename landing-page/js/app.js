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
const navUl = document.getElementById('navbar__list')
const sections = document.querySelectorAll('section')

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

//

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

const addNavElement = () => {
    for (const section of sections) {
        const navLi = document.createElement('li')
        navLi.innerHTML = `<a class="nav__link" id="nav-${section.id}" href="#${section.id}">${section.dataset.nav}</a>`
        navUl.appendChild(navLi)
    }
    console.log('addNavElement yup')
}
addNavElement()

const scrollToSection = (e) => {
        e.preventDefault()
        document.querySelectorAll('.nav__link').forEach(a => {
            document.querySelector('section').scrollIntoView({behavior: 'smooth'})
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

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click
navUl.addEventListener('click', scrollToSection(e))
// Set sections as active
document.addEventListener('scroll', function() {
    addActiveClass();
})
document.addEventListener('scroll', hideNavBar())




