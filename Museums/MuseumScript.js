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

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');

    console.log("Search Term from URL:", searchTerm);

    if (searchTerm) {
        highlightText(searchTerm.toLowerCase());
    }

    function highlightText(searchTerm) {
        const elements = document.querySelectorAll(
            'h1, h2, h3, h4, p, div, span, a, .title, .type, .description, .front, .back, .info, .heading, .i, .l, .ia, .la'
        );
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        let highlightedElements = [];

        elements.forEach(element => {
            const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
            let node, nodesToReplace = [];
            while ((node = walker.nextNode())) {
                if (node.textContent.toLowerCase().includes(searchTerm)) {
                    nodesToReplace.push(node);
                }
            }
            nodesToReplace.forEach(node => {
                const fragment = document.createDocumentFragment();
                const text = node.textContent;
                let lastIndex = 0;
                text.replace(regex, (match, p1, offset) => {
                    if (offset > lastIndex) {
                        fragment.appendChild(document.createTextNode(text.slice(lastIndex, offset)));
                    }
                    const span = document.createElement('span');
                    span.className = 'highlight';
                    span.textContent = match;
                    fragment.appendChild(span);
                    highlightedElements.push(span);
                    lastIndex = offset + match.length;
                });
                if (lastIndex < text.length) {
                    fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
                }
                node.parentNode.replaceChild(fragment, node);
            });
        });

        if (highlightedElements.length > 0) {
            highlightedElements[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            console.log("Highlighted elements count:", highlightedElements.length);
        } else {
            console.log("No elements found for:", searchTerm);
        }
    }
});