document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    let currentIndex = 0;
    const totalItems = items.length;

    // Función para mover el carrusel
    function moveCarousel(direction) {
        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % totalItems;
        } else {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        }
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Event listeners para los botones
    nextBtn.addEventListener('click', () => moveCarousel('next'));
    prevBtn.addEventListener('click', () => moveCarousel('prev'));

    // Autoplay
    let autoplay = setInterval(() => moveCarousel('next'), 5000);

    // Pausar autoplay cuando el mouse está sobre el carrusel
    carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
    carousel.addEventListener('mouseleave', () => {
        autoplay = setInterval(() => moveCarousel('next'), 5000);
    });
});