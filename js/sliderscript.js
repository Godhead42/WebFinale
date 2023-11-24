let currentSlide = 1;
const carouselItems = document.querySelectorAll('.carousel-item');

function showSlide(slideIndex) {
    carouselItems[currentSlide].classList.remove('active');
    currentSlide = slideIndex;
    carouselItems[currentSlide].classList.add('active');
}

function showNextSlide() {
    let nextSlide = currentSlide + 1;
    if (nextSlide >= carouselItems.length) {
        nextSlide = 0;
    }
    showSlide(nextSlide);
}

function showPreviousSlide() {
    let previousSlide = currentSlide - 1;
    if (previousSlide < 0) {
        previousSlide = carouselItems.length - 1;
    }
    showSlide(previousSlide);
}

document.querySelector('.carousel-control-prev').addEventListener('click', showPreviousSlide);
document.querySelector('.carousel-control-next').addEventListener('click', showNextSlide);

setInterval(showNextSlide, 3000); 
