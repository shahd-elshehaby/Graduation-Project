let nextBtn = document.querySelector('.next');
let prevBtn = document.querySelector('.prev');
let slider = document.querySelector('.slider');
let sliderList = slider.querySelector('.list');
let thumbnail = document.querySelector('.thumbnail');
let thumbnailItems = thumbnail.querySelectorAll('.item');

thumbnail.appendChild(thumbnailItems[0]);

// Function for next button 
nextBtn.onclick = function() {
    moveSlider('next');
    resetAutoSlide(); // Reset the auto-slide timer on manual navigation
};

// Function for prev button 
prevBtn.onclick = function() {
    moveSlider('prev');
    resetAutoSlide(); // Reset the auto-slide timer on manual navigation
};

// Move slider function
function moveSlider(direction) {
    let sliderItems = sliderList.querySelectorAll('.item');
    let thumbnailItems = document.querySelectorAll('.thumbnail .item');

    if (direction === 'next') {
        sliderList.appendChild(sliderItems[0]);
        thumbnail.appendChild(thumbnailItems[0]);
        slider.classList.add('next');
    } else {
        sliderList.prepend(sliderItems[sliderItems.length - 1]);
        thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1]);
        slider.classList.add('prev');
    }

    slider.addEventListener('animationend', function() {
        if (direction === 'next') {
            slider.classList.remove('next');
        } else {
            slider.classList.remove('prev');
        }
    }, { once: true }); // Remove the event listener after it's triggered once
}

// Auto-slide functionality
let autoSlideInterval;

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        moveSlider('next');
    }, 5000); // Change slides every 2 seconds
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}
// Start auto-slide on page load
startAutoSlide();
// Select all elements with the class 'see-more-button'
const seeMoreButtons = document.querySelectorAll('.see-more-button');
document.addEventListener('scroll', function() {
const reveals = document.querySelectorAll('.reveal');
reveals.forEach(reveal => {
const windowHeight = window.innerHeight;
const revealTop = reveal.getBoundingClientRect().top;
const revealPoint = 150; // Point at which the element should be revealed

if (revealTop < windowHeight - revealPoint) {
    reveal.classList.add('visible');
} else {
    reveal.classList.remove('visible');
}
});
});