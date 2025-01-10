
function navbarScroll(){

    const navbar = document.querySelector('.navbar');

    window.addEventListener( 'scroll' , () => {
        window.scrollY > 50 ?
        navbar.classList.add('bg-light'):
        navbar.classList.remove('bg-light');
    })
}

navbarScroll();