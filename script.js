// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav');
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
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const isNavToggle = e.target.closest('#navToggle');
        const isMainNav = e.target.closest('#mainNav');
        
        if (!isNavToggle && !isMainNav && document.body.classList.contains('nav-active')) {
            document.body.classList.remove('nav-active');
        }
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
    
    // Initialize project filters
    initProjectFilters();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize contact form
    initContactForm();
});

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
            title: "U.I",
            images: [
                "images/hello1.jpg",
                "images/hello2.jpg",
                "images/hello3.jpg",
                "images/hello4.jpg",
                "images/hello5.jpg"
            ],
            description: "",
            technologies: [""]
        },
        "todo-app": {
            title: "U.I",
            images: [
                "images/todo.jpg"
            ],
            description: "",
            technologies: [""]
        },
        "score-recorder": {
            title: "U.I",
            images: [
                "images/score1.jpg",
                "images/score2.jpg",
                "images/score3.jpg",
                "images/score4.jpg"
            ],
            description: "",
            technologies: [""]
        },
        "fireguard-app": {
            title: "U.I",
            images: [
                "images/fireg1.jpg",
                "images/fireg2.jpg"
            ],
            description: "",
            technologies: [""]
        },
        "fishdaddies-web": {
            title: "U.I",
            images: [
                "images/fd1.png",
                "images/fd2.png",
                "images/fd3.png",
                "images/fd4.png",
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
            description: "",
            technologies: [""]
        },
        "profiling-web": {
            title: "U.I",
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
            description: "",
            technologies: [""]
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