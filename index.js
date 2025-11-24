// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update active navigation link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');

function updateActiveNav() {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Header background on scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 26, 26, 0.95)';
    } else {
        header.style.background = 'rgba(26, 26, 26, 0.9)';
    }
});

// Animate skill bars on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (name && email && subject && message) {
            // Here you would typically send the data to a server
            // For now, we'll just show an alert
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Add fade-in animation on scroll
const fadeElements = document.querySelectorAll('.portfolio-item, .skill-item');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
});

// Mobile menu toggle (for smaller screens)
function createMobileMenu() {
    const header = document.querySelector('.header');
    const navbar = document.querySelector('.navbar');
    
    // Create mobile menu button
    const menuBtn = document.createElement('button');
    menuBtn.className = 'menu-toggle';
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    menuBtn.style.cssText = `
        display: none;
        background: transparent;
        border: none;
        color: #fff;
        font-size: 24px;
        cursor: pointer;
    `;
    
    header.insertBefore(menuBtn, navbar);
    
    // Toggle menu on click
    menuBtn.addEventListener('click', () => {
        navbar.style.display = navbar.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Show/hide menu button based on screen size
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            menuBtn.style.display = 'block';
            navbar.style.cssText = `
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: rgba(26, 26, 26, 0.98);
                flex-direction: column;
                padding: 20px;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
            `;
            navLinks.forEach(link => {
                link.style.margin = '10px 0';
            });
        } else {
            menuBtn.style.display = 'none';
            navbar.style.cssText = '';
            navLinks.forEach(link => {
                link.style.margin = '';
            });
        }
    }
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
}

// Initialize mobile menu
createMobileMenu();

// Project Popup Functionality
const projectConfig = {
    artworks: {
        title: 'Traditional Artworks',
        images: [
            'images/Artworks/Boy.jpg',
            'images/Artworks/Bros.jpg',
            'images/Artworks/EYE.jpg',
            'images/Artworks/Girl.jpg',
            'images/Artworks/PEPE.jpg',
            'images/Artworks/Saitama.jpg',
            'images/Artworks/Wolf.jpg',
            'images/Artworks/YODA.jpg'
        ]
    },
    tekmakon: {
        title: 'Tekmakon',
        images: [
            'images/Tekmakon/Badge1.png',
            'images/Tekmakon/Badge2.png',
            'images/Tekmakon/Horizontal_Logo.png',
            'images/Tekmakon/Icon_Logo.png',
            'images/Tekmakon/Vertical_Logo.png'
        ]
    },
    pumpkin: {
        title: 'Pumpkin Spice',
        images: [
            'images/Pumpkin/Ad.png',
            'images/Pumpkin/Banner.png',
            'images/Pumpkin/Icon.png',
            'images/Pumpkin/LandingPage.png',
            'images/Pumpkin/Poster.png'
        ]
    }
};

// Get popup elements
const popupModal = document.getElementById('projectPopup');
const popupClose = document.querySelector('.popup-close');
const projectGallery = document.getElementById('projectGallery');
const popupTitle = document.getElementById('popupTitle');
const portfolioItems = document.querySelectorAll('[data-project]');

// Lightbox elements
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

// Store current project images and index for lightbox navigation
let currentImages = [];
let currentImageIndex = 0;

// Function to open popup and load images
function openProjectPopup(projectName) {
    const project = projectConfig[projectName];
    if (!project) return;
    
    // Store current images for lightbox
    currentImages = project.images;
    
    // Clear existing images
    projectGallery.innerHTML = '';
    
    // Update title
    popupTitle.textContent = project.title;
    
    // Load all project images
    project.images.forEach((imagePath, index) => {
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = project.title;
        img.loading = 'lazy';
        img.dataset.index = index;
        
        // Add click handler to open lightbox
        img.addEventListener('click', () => {
            openLightbox(index);
        });
        
        projectGallery.appendChild(img);
    });
    
    // Show popup
    popupModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Function to close popup
function closeProjectPopup() {
    popupModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Function to open lightbox with specific image
function openLightbox(index) {
    if (index < 0 || index >= currentImages.length) return;
    
    currentImageIndex = index;
    lightboxImage.src = currentImages[index];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Function to close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Function to show next image in lightbox
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    lightboxImage.src = currentImages[currentImageIndex];
}

// Function to show previous image in lightbox
function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    lightboxImage.src = currentImages[currentImageIndex];
}

// Event listeners for all portfolio items with data-project attribute
portfolioItems.forEach(item => {
    item.addEventListener('click', (e) => {
        // Only open if clicking on the portfolio item itself, not on nested elements
        if (e.target.closest('.portfolio-item') === item) {
            const projectName = item.getAttribute('data-project');
            openProjectPopup(projectName);
        }
    });
});

if (popupClose) {
    popupClose.addEventListener('click', closeProjectPopup);
}

// Close popup when clicking outside the content
popupModal.addEventListener('click', (e) => {
    // Only close if clicking directly on the modal background, not on content or images
    if (e.target === popupModal) {
        closeProjectPopup();
    }
});

// Lightbox event listeners
if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxPrev) {
    lightboxPrev.addEventListener('click', showPrevImage);
}

if (lightboxNext) {
    lightboxNext.addEventListener('click', showNextImage);
}

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Video Popup Functionality
const videoPopup = document.getElementById('videoPopup');
const videoPopupClose = document.querySelector('.video-popup-close');
const introVideo = document.getElementById('introVideo');
const introVideoBtn = document.getElementById('introVideoBtn');

// Function to open video popup
function openVideoPopup() {
    videoPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Function to close video popup
function closeVideoPopup() {
    videoPopup.classList.remove('active');
    document.body.style.overflow = '';
    // Pause video when popup closes
    if (introVideo) {
        introVideo.pause();
        introVideo.currentTime = 0; // Reset to beginning
    }
}

// Event listeners for video popup
if (introVideoBtn) {
    introVideoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openVideoPopup();
    });
}

if (videoPopupClose) {
    videoPopupClose.addEventListener('click', closeVideoPopup);
}

// Close video popup when clicking outside the video
if (videoPopup) {
    videoPopup.addEventListener('click', (e) => {
        if (e.target === videoPopup) {
            closeVideoPopup();
        }
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Close popup or lightbox with Escape key
    if (e.key === 'Escape') {
        if (lightbox.classList.contains('active')) {
            closeLightbox();
        } else if (videoPopup && videoPopup.classList.contains('active')) {
            closeVideoPopup();
        } else if (popupModal.classList.contains('active')) {
            closeProjectPopup();
        }
    }
    
    // Navigate lightbox with arrow keys
    if (lightbox.classList.contains('active')) {
        if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
    }
});

