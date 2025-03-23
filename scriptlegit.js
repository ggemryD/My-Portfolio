// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Toggle navigation
    navToggle.addEventListener('click', function() {
        document.body.classList.toggle('nav-active');
    });
    
    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            document.body.classList.remove('nav-active');
        });
    });
    
    // Handle scroll for header styling
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Active link highlighting based on scroll position
    window.addEventListener('scroll', highlightActiveSection);
    
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-link[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('.nav-link[href*=' + sectionId + ']').classList.remove('active');
            }
        });
    }
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Update icon
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
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
});
// 

// Mobile navigation toggle functionality
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav');
    
    // Toggle menu on hamburger click
    navToggle.addEventListener("click", () => {
        document.body.classList.toggle('nav-active');
    });
    
    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            document.body.classList.remove('nav-active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const isNavToggle = e.target.closest('#navToggle');
        const isMainNav = e.target.closest('#mainNav');
        
        if (!isNavToggle && !isMainNav && document.body.classList.contains('nav-active')) {
            document.body.classList.remove('nav-active');
        }
    });
}

// Call this initialization function when the document is ready
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
});

// // Document Ready Event
document.addEventListener("DOMContentLoaded", function () {
    // Initialize navigation menu
    initNavigation();
    
    // Initialize project filters
    initProjectFilters();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize contact form
    initContactForm();
});


// Enhanced navigation functionality

// function initNavigation() {
//     const hamburger = document.querySelector(".hamburger");
//     const navMenu = document.querySelector("nav ul");
//     const navLinks = document.querySelectorAll("nav ul li a");
//     const body = document.body;
    
//     // Toggle menu on hamburger click
//     hamburger.addEventListener("click", (e) => {
//         e.stopPropagation(); // Prevent event bubbling
//         navMenu.classList.toggle("active");
//         hamburger.textContent = navMenu.classList.contains("active") ? "✕" : "☰";
        
//         // Add/remove overlay class to prevent scrolling when menu is open
//         if (navMenu.classList.contains("active")) {
//             body.classList.add("menu-open");
            
//             // Create overlay if it doesn't exist
//             if (!document.querySelector('.body-overlay')) {
//                 const overlay = document.createElement('div');
//                 overlay.className = 'body-overlay';
//                 body.appendChild(overlay);
                
//                 // Make overlay close the menu when clicked
//                 overlay.addEventListener('click', () => {
//                     navMenu.classList.remove("active");
//                     hamburger.textContent = "☰";
//                     body.classList.remove("menu-open");
//                     overlay.remove();
//                 });
//             }
//         } else {
//             body.classList.remove("menu-open");
//             const overlay = document.querySelector('.body-overlay');
//             if (overlay) overlay.remove();
//         }
//     });
    
//     // Close menu when clicking on links
//     navLinks.forEach(link => {
//         link.addEventListener("click", () => {
//             navMenu.classList.remove("active");
//             hamburger.textContent = "☰";
//             body.classList.remove("menu-open");
//             const overlay = document.querySelector('.body-overlay');
//             if (overlay) overlay.remove();
//         });
//     });
    
//     // Add active class to nav items on scroll
//     window.addEventListener("scroll", () => {
//         let current = "";
//         const sections = document.querySelectorAll("section");
        
//         sections.forEach(section => {
//             const sectionTop = section.offsetTop;
//             const sectionHeight = section.clientHeight;
            
//             if (pageYOffset >= (sectionTop - 200)) {
//                 current = section.getAttribute("id");
//             }
//         });
        
//         navLinks.forEach(link => {
//             link.classList.remove("active");
//             if (link.getAttribute("href") === `#${current}`) {
//                 link.classList.add("active");
//             }
//         });
//     });
// }

// Project filters functionality
function initProjectFilters() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");
    
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove("active"));
            
            // Add active class to clicked button
            btn.classList.add("active");
            
            // Get filter value
            const filter = btn.getAttribute("data-filter");
            
            // Filter projects
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

// Scroll animation functionality
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

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById("contactForm");
    
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const subject = document.getElementById("subject").value;
            const message = document.getElementById("message").value;
            
            // For Netlify form handling, we don't need JS form handling
            // Netlify will handle the form if properly configured with netlify attribute
            // This is just for non-Netlify environments or for additional processing:
            
            console.log("Form submitted:", { name, email, subject, message });
            
            // Show success message
            alert("Thank you for your message! I'll get back to you soon.");
            
            // No need to reset form as the page will reload after submission on Netlify
        });
    }
}

// Global variables for gallery
let currentImageIndex = 0;
let projectImages = [];

// Modal functionality for project screenshots
function openModal(projectId) {
    const modal = document.getElementById("modal");
    const modalMainImage = document.getElementById("modal-main-image");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-description");
    const modalTechList = document.getElementById("modal-tech-list");
    const thumbnailContainer = document.getElementById("image-thumbnails");
    
    // Reset image index
    currentImageIndex = 0;
    
    // Project data with multiple images
    const projectData = {
        "hello-app": {
            title: "Hello App",
            images: [
                "images/profile.jpg",
                "images/profile.jpg",
                "images/profile.jpg"
            ],
            // description: "A simple yet interactive hello world application that demonstrates fundamental Flutter UI concepts including layouts, state management, and user interaction. The app features multiple screens showcasing different UI components and navigation patterns.",
            // technologies: ["Flutter", "Dart", "Material Design"]
            description: "",
            technologies: [""]
        },
        "todo-app": {
            title: "To-Do App",
            images: [
                "images/placeholder-project.jpg",
                "images/placeholder-project.jpg",
                "images/placeholder-project.jpg",
                "images/placeholder-project.jpg"
            ],
            description: "A feature-rich to-do list application with local storage, task categories, reminders, and due dates. Implements CRUD operations and data persistence. Users can create, organize, and prioritize tasks with an intuitive interface.",
            technologies: ["Flutter", "SQLite", "Provider State Management"]
        },
        "score-recorder": {
            title: "Score Recorder App",
            images: [
                "images/placeholder-project.jpg",
                "images/placeholder-project.jpg",
                "images/placeholder-project.jpg"
            ],
            description: "An academic score tracking application that records and analyzes performance in quizzes, exams, and activities. Calculates pass/fail status based on configurable thresholds. Includes detailed statistics and performance trends over time.",
            technologies: ["Flutter", "Firebase", "Cloud Firestore", "Charts"]
        },
        "fireguard-app": {
            title: "FireGuard App",
            images: [
                "images/placeholder-project.jpg",
                "images/placeholder-project.jpg",
                "images/placeholder-project.jpg"
            ],
            description: "A secure authentication implementation using Firebase. Features email/password login, social authentication, password recovery, and user profile management. Includes role-based access control and secure session management.",
            technologies: ["Flutter", "Firebase Authentication", "Cloud Storage"]
        }
    };
    
    // Set modal content if project exists
    if (projectData[projectId]) {
        const project = projectData[projectId];
        
        // Store images for gallery navigation
        projectImages = project.images;
        
        modalTitle.textContent = project.title;
        modalMainImage.src = project.images[0];
        modalMainImage.alt = `${project.title} Screenshot 1`;
        modalDesc.innerHTML = `<p>${project.description}</p>`;
        
        // Clear and add technologies
        modalTechList.innerHTML = "";
        project.technologies.forEach(tech => {
            const span = document.createElement("span");
            span.textContent = tech;
            modalTechList.appendChild(span);
        });
        
        // Clear and add thumbnails
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
        
        // Show modal
        modal.style.display = "flex";
        
        // Close modal when clicking outside
        modal.addEventListener("click", function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Close on escape key
        document.addEventListener("keydown", function(e) {
            if (e.key === "Escape") {
                closeModal();
            }
        });
    }
}

// Select image in gallery
function selectImage(index) {
    if (index >= 0 && index < projectImages.length) {
        currentImageIndex = index;
        updateGallery();
    }
}

// Navigate to next image
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % projectImages.length;
    updateGallery();
}

// Navigate to previous image
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + projectImages.length) % projectImages.length;
    updateGallery();
}

// Update gallery display
function updateGallery() {
    const modalMainImage = document.getElementById("modal-main-image");
    const thumbnails = document.querySelectorAll(".thumbnail");
    
    modalMainImage.src = projectImages[currentImageIndex];
    
    // Update active thumbnail
    thumbnails.forEach((thumb, index) => {
        if (index === currentImageIndex) {
            thumb.classList.add("active");
        } else {
            thumb.classList.remove("active");
        }
    });
}

// Close modal function
function closeModal() {
    document.getElementById("modal").style.display = "none";
    
    // Remove keyboard event listener when modal closes
    document.removeEventListener("keydown", function(e) {
        if (e.key === "Escape") {
            closeModal();
        }
    });
}

// Close modal function
// function closeModal() {
//     document.getElementById("modal").style.display = "none";
// }

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add this function to your script.js file
function setupImageErrorHandling() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Replace with a default placeholder when image fails to load
            if (!this.src.includes('placeholder')) {
                this.src = 'https://via.placeholder.com/400x300?text=Project+Image';
            }
        });
    });
}

// Call this function when document is ready
document.addEventListener('DOMContentLoaded', function() {
    setupImageErrorHandling();
});