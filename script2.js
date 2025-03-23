document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector("nav ul");

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
});

// MODAL FUNCTIONALITY FOR PROJECT SCREENSHOTS
function openModal(projectName) {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-image");

    // Set image based on project
    const projectImages = {
        "hello-app": "images/hello-app.png",
        "todo-app": "images/todo-app.png",
        "score-recorder": "images/score-recorder.png",
        "fireguard-app": "images/fireguard.png"
    };

    modalImg.src = projectImages[projectName];
    modal.style.display = "flex";
}

// CLOSE MODAL
function closeModal() {
    document.getElementById("modal").style.display = "none";
}
