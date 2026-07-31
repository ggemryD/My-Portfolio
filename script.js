// ============================================
// GLOBAL PROJECT DATA - Used by both modal and lightbox
// ============================================
const PROJECT_DATA = {
    "hello-app": {
        title: "AquaCare: Smart Arduino Fish Feeder",
        images: [
            "images/aq3.jpg",
            "images/aq4.jpg",
            "images/aq5.jpg",
            "images/aq6.jpg",
            "images/aq7.jpg",
            "images/aq8.jpg",
            "images/aq9.jpg",
            "images/aq10.jpg",
            "images/aq11.jpg",
            "images/aq12.jpg",
            "images/aq13.jpg",
            "images/aq14.jpeg",
            "images/aq15.jpeg",
            "images/aq16.jpeg"
        ],
        description: "An IoT-based aquarium management system that automates fish feeding, monitors water quality in real time, and performs automated water changes through a mobile application.",
        technologies: ["Flutter", "Firebase", "ESP32", "IoT"]
    },
    "todo-app": {
        title: "To-Do App",
        images: [
            "images/todo.jpg"
        ],
        description: "A simple and efficient to-do list app built with Flutter, featuring task organization and reminders.",
        technologies: ["Flutter", "Dart"]
    },
    "score-recorder": {
        title: "Score Recorder App",
        images: [
            "images/score1.jpg",
            "images/score2.jpg",
            "images/score3.jpg",
            "images/score4.jpg"
        ],
        description: "Records academic scores for quizzes, exams, and activities, with pass/fail calculation.",
        technologies: ["Flutter", "Dart", "SQLite"]
    },
    "fireguard-app": {
        title: "FireGuard App",
        images: [
            "images/fireg1.jpg",
            "images/fireg2.jpg"
        ],
        description: "",
        technologies: [""]
    },
    "fishdaddies-web": {
        title: "Fish Daddies",
        images: [
            "images/fd1.png",
            "images/fd2.png",
            "images/fd3.png",
            "images/fd4.png",
            "images/fd19.png",
            "images/fd5.png",
            "images/fd6.png",
            "images/fd7.png",
            "images/fd8.png",
            "images/fd9.png",
            "images/fd10.png",
            "images/fd11.png",
            "images/fd12.png",
            "images/fd13.png",
            "images/fd14.png",
            "images/fd15.png",
            "images/fd16.png",
            "images/fd17.png",
            "images/fd18.png"
        ],
        description: "An e-commerce platform for fish keepers, offering fish sales, care guides, and grooming tips for enthusiasts.",
        technologies: ["HTML", "CSS", "JavaScript", "PHP"]
    },
    "profiling-web": {
        title: "BSIT Student Profiling System",
        images: [
            "images/profiling9.png",
            "images/profiling1.png",
            "images/profiling2.png",
            "images/profiling3.png",
            "images/profiling4.png",
            "images/profiling5.png",
            "images/profiling6.png",
            "images/profiling7.png",
            "images/profiling8.png"
        ],
        description: "A student management system with admin-controlled enrollment forms, student profiles, and announcements.",
        technologies: ["HTML", "CSS", "JavaScript", "PHP"]
    },
    "vmgo-web": {
        title: "CTU-TC Web",
        images: [
            "images/vmgo1.png",
            "images/vmgo2.png",
            "images/vmgo3.png",
            "images/vmgo4.png",
            "images/vmgo7.png",
            "images/vmgo5.png",
            "images/vmgo6.png"
        ],
        description: "A web-based platform designed to showcase the infrastructures of Cebu Technological University - Tuburan Campus. The website provides an interactive way for users to explore images and videos of the campus facilities, along with a simple registration system.",
        technologies: ["HTML", "CSS", "JavaScript", "PHP"]
    }
};

// ============================================
// GLOBAL VARIABLES
// ============================================
let currentImageIndex = 0;
let projectImages = [];

let lightboxImages = [];
let lightboxCurrentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;
let swipeThreshold = 50;

// ============================================
// DOCUMENT READY
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const themeToggle = document.querySelector('.theme-toggle');

    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    navToggle.addEventListener('click', function() {
        document.body.classList.toggle('nav-active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            document.body.classList.remove('nav-active');
        });
    });

    document.addEventListener('click', (e) => {
        const isNavToggle = e.target.closest('#navToggle');
        const isMainNav = e.target.closest('#mainNav');
        if (!isNavToggle && !isMainNav && document.body.classList.contains('nav-active')) {
            document.body.classList.remove('nav-active');
        }
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    window.addEventListener('scroll', highlightActiveSection);

    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        let scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 60;
            const sectionId = current.getAttribute('id');
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-link[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('.nav-link[href*=' + sectionId + ']').classList.remove('active');
            }
        });
    }

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    initProjectFilters();
    initScrollAnimations();
    initContactForm();
    setupImageErrorHandling();
    setupLightboxInteractions();
});

// ============================================
// PROJECT FILTERS
// ============================================
function initProjectFilters() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(btn => btn.classList.remove("active"));
            btn.classList.add("active");
            const filter = btn.getAttribute("data-filter");
            projectCards.forEach(card => {
                if (filter === "all" || card.getAttribute("data-category") === filter) {
                    card.style.display = "block";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "scale(1)";
                    }, 50);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.8)";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 300);
                }
            });
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const elements = document.querySelectorAll(".skill-category, .project-card, .about-content, .contact-container");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate");
            }
        });
    }, { threshold: 0.1 });
    elements.forEach(element => {
        observer.observe(element);
    });
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const subject = document.getElementById("subject").value;
            const message = document.getElementById("message").value;
            console.log("Form submitted:", { name, email, subject, message });
            alert("Thank you for your message! I'll get back to you soon.");
        });
    }
}

// ============================================
// OLD PROJECT MODAL (kept for backward compatibility)
// ============================================
function openModal(projectId) {
    const modal = document.getElementById("modal");
    const modalMainImage = document.getElementById("modal-main-image");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-description");
    const modalTechList = document.getElementById("modal-tech-list");
    const thumbnailContainer = document.getElementById("image-thumbnails");

    currentImageIndex = 0;

    if (PROJECT_DATA[projectId]) {
        const project = PROJECT_DATA[projectId];
        projectImages = project.images;

        modalTitle.textContent = project.title;
        modalMainImage.src = project.images[0];
        modalMainImage.alt = `${project.title} Screenshot 1`;
        modalDesc.innerHTML = `<p>${project.description}</p>`;

        modalTechList.innerHTML = "";
        project.technologies.forEach(tech => {
            const span = document.createElement("span");
            span.textContent = tech;
            modalTechList.appendChild(span);
        });

        thumbnailContainer.innerHTML = "";
        project.images.forEach((imgSrc, index) => {
            const thumbnail = document.createElement("img");
            thumbnail.src = imgSrc;
            thumbnail.alt = `${project.title} Thumbnail ${index + 1}`;
            thumbnail.classList.add("thumbnail");
            if (index === 0) thumbnail.classList.add("active");
            thumbnail.addEventListener("click", () => {
                selectImage(index);
            });
            thumbnailContainer.appendChild(thumbnail);
        });

        modal.style.display = "flex";

        modal.addEventListener("click", function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener("keydown", function(e) {
            if (e.key === "Escape") {
                closeModal();
            }
        });
    }
}

function selectImage(index) {
    if (index >= 0 && index < projectImages.length) {
        currentImageIndex = index;
        updateGallery();
    }
}

function nextImage() {
    if (projectImages.length === 0) return;
    currentImageIndex = (currentImageIndex + 1) % projectImages.length;
    updateGallery();
}

function prevImage() {
    if (projectImages.length === 0) return;
    currentImageIndex = (currentImageIndex - 1 + projectImages.length) % projectImages.length;
    updateGallery();
}

function updateGallery() {
    const modalMainImage = document.getElementById("modal-main-image");
    const thumbnails = document.querySelectorAll(".thumbnail");
    modalMainImage.src = projectImages[currentImageIndex];
    thumbnails.forEach((thumb, index) => {
        if (index === currentImageIndex) {
            thumb.classList.add("active");
        } else {
            thumb.classList.remove("active");
        }
    });
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// ============================================
// SMOOTH SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 55;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// IMAGE ERROR HANDLING
// ============================================
function setupImageErrorHandling() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            if (!this.src.includes('placeholder')) {
                this.src = 'https://via.placeholder.com/400x300?text=Project+Image';
            }
        });
    });
}

// ============================================
// DEDICATED FULLSCREEN IMAGE VIEWER (Gallery App Style)
// ============================================

function setupLightboxInteractions() {
    document.addEventListener('keydown', handleLightboxKeydown);
    setupLightboxSwipe();
    setupLightboxBackgroundClose();
}

function openLightbox(projectId, startIndex) {
    if (!PROJECT_DATA[projectId]) {
        console.error("Project not found:", projectId);
        return;
    }

    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const lightboxProjectTitle = document.getElementById('lightbox-project-title');
    const lightboxThumbnails = document.getElementById('lightbox-thumbnails');
    const navHint = document.getElementById('lightbox-navigation-hint');

    const project = PROJECT_DATA[projectId];
    lightboxImages = [...project.images];
    lightboxCurrentIndex = (typeof startIndex === 'number' && startIndex >= 0 && startIndex < lightboxImages.length)
        ? startIndex
        : 0;

    lightboxProjectTitle.textContent = project.title;
    lightboxImage.src = lightboxImages[lightboxCurrentIndex];
    lightboxImage.alt = `${project.title} - Screenshot ${lightboxCurrentIndex + 1}`;
    lightboxCounter.textContent = `${lightboxCurrentIndex + 1} / ${lightboxImages.length}`;

    lightboxThumbnails.innerHTML = '';
    lightboxImages.forEach((imgSrc, index) => {
        const thumb = document.createElement('img');
        thumb.src = imgSrc;
        thumb.alt = `${project.title} Thumbnail ${index + 1}`;
        thumb.classList.add('lightbox-thumbnail');
        if (index === lightboxCurrentIndex) thumb.classList.add('active');
        thumb.addEventListener('click', () => selectLightboxImage(index));
        lightboxThumbnails.appendChild(thumb);
    });

    document.documentElement.classList.add('lightbox-open');
    document.body.classList.add('lightbox-open');
    lightbox.classList.add('active');

    if (navHint) {
        navHint.style.opacity = '1';
        setTimeout(() => {
            navHint.style.transition = 'opacity 1s ease';
            navHint.style.opacity = '0.3';
        }, 5000);
    }

    setTimeout(() => {
        scrollLightboxThumbnailIntoView();
    }, 100);
}

function toggleZoomHint() {
    const navHint = document.getElementById('lightbox-navigation-hint');
    if (navHint) {
        navHint.style.opacity = navHint.style.opacity === '0' ? '0.5' : '0';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.documentElement.classList.remove('lightbox-open');
    document.body.classList.remove('lightbox-open');
    lightboxImages = [];
    lightboxCurrentIndex = 0;
}

function selectLightboxImage(index) {
    if (index >= 0 && index < lightboxImages.length) {
        lightboxCurrentIndex = index;
        updateLightboxDisplay();
    }
}

function lightboxNextImage() {
    if (lightboxImages.length === 0) return;
    lightboxCurrentIndex = (lightboxCurrentIndex + 1) % lightboxImages.length;
    updateLightboxDisplay();
}

function lightboxPrevImage() {
    if (lightboxImages.length === 0) return;
    lightboxCurrentIndex = (lightboxCurrentIndex - 1 + lightboxImages.length) % lightboxImages.length;
    updateLightboxDisplay();
}

function updateLightboxDisplay() {
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const lightboxProjectTitle = document.getElementById('lightbox-project-title');
    const thumbnails = document.querySelectorAll('.lightbox-thumbnail');

    lightboxImage.style.transition = 'transform 0.15s ease, opacity 0.15s ease';
    lightboxImage.style.opacity = '0.5';
    lightboxImage.style.transform = 'scale(0.96)';

    setTimeout(() => {
        lightboxImage.src = lightboxImages[lightboxCurrentIndex];
        const project = findProjectByImages(lightboxImages);
        if (project) {
            lightboxImage.alt = `${project.title} - Screenshot ${lightboxCurrentIndex + 1}`;
        }
        lightboxImage.style.opacity = '1';
        lightboxImage.style.transform = 'scale(1)';
    }, 100);

    lightboxCounter.textContent = `${lightboxCurrentIndex + 1} / ${lightboxImages.length}`;

    thumbnails.forEach((thumb, index) => {
        if (index === lightboxCurrentIndex) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });

    scrollLightboxThumbnailIntoView();
}

function findProjectByImages(imagesArr) {
    for (const key in PROJECT_DATA) {
        if (PROJECT_DATA[key].images.length === imagesArr.length &&
            PROJECT_DATA[key].images.every((img, i) => img === imagesArr[i])) {
            return PROJECT_DATA[key];
        }
    }
    return null;
}

function scrollLightboxThumbnailIntoView() {
    const thumbnails = document.querySelectorAll('.lightbox-thumbnail');
    if (thumbnails[lightboxCurrentIndex]) {
        thumbnails[lightboxCurrentIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }
}

function handleLightboxKeydown(e) {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox.classList.contains('active')) return;

    switch (e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            lightboxPrevImage();
            break;
        case 'ArrowRight':
            lightboxNextImage();
            break;
    }
}

function setupLightboxSwipe() {
    const lightboxContent = document.getElementById('lightbox-content');
    const lightboxImage = document.getElementById('lightbox-image');

    if (!lightboxContent) return;

    lightboxContent.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
        if (lightboxImage) {
            lightboxImage.classList.add('swiping');
            lightboxImage.style.transition = 'none';
        }
    }, { passive: true });

    lightboxContent.addEventListener('touchmove', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipeMove(lightboxImage);
    }, { passive: true });

    lightboxContent.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipeEnd(lightboxImage);
    }, { passive: true });
}

function handleSwipeMove(lightboxImage) {
    if (!lightboxImage) return;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (absX > absY && absX > 10) {
        lightboxImage.style.transform = `translateX(${deltaX * 0.35}px) scale(0.98)`;
    } else if (absY > absX && absY > 10) {
        const opacity = Math.max(0.3, 1 - (deltaY * 0.3 / window.innerHeight));
        lightboxImage.style.transform = `translateY(${deltaY * 0.3}px) scale(${1 - (absY * 0.0003)})`;
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.style.backgroundColor = `rgba(0, 0, 0, ${Math.max(0.5, 1 - (absY / window.innerHeight))})`;
        }
    }
}

function handleSwipeEnd(lightboxImage) {
    if (!lightboxImage) return;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    lightboxImage.classList.remove('swiping');
    lightboxImage.style.transition = 'all 0.3s ease';
    lightboxImage.style.transform = '';
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.backgroundColor = '';
    }

    if (absX > absY) {
        if (absX > swipeThreshold) {
            if (deltaX > 0) {
                lightboxPrevImage();
            } else {
                lightboxNextImage();
            }
        }
    } else if (absY > swipeThreshold) {
        if (deltaY > 120) {
            closeLightbox();
        }
    } else if (absX < 8 && absY < 8) {
        const target = document.elementFromPoint(touchStartX, touchStartY);
        if (target === lightboxImage || target === document.querySelector('.lightbox-image-wrapper')) {
            lightboxNextImage();
        }
    }

    touchStartX = 0;
    touchEndX = 0;
    touchStartY = 0;
    touchEndY = 0;
}

function setupLightboxBackgroundClose() {
    const lightbox = document.getElementById('lightbox');
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-main')) {
            closeLightbox();
        }
    });
}
