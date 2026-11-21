const timestamp = document.querySelector("#timestamp");

if (timestamp) {
    timestamp.value = new Date().toISOString();
}

// Open membership modals
document.querySelectorAll("[data-modal]").forEach(button => {
    button.addEventListener("click", () => {
        const modalId = button.dataset.modal;
        const modal = document.getElementById(modalId);

        if (modal) {
            modal.showModal();
        }
    });
});

// Close membership modals
document.querySelectorAll(".closeModal").forEach(button => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});

const menuButton = document.querySelector("#menuButton");
const mainNav = document.querySelector("#mainNav");

if (menuButton && mainNav) {
    menuButton.addEventListener("click", () => {
        mainNav.classList.toggle("open");

        const isOpen = mainNav.classList.contains("open");
        menuButton.setAttribute("aria-expanded", isOpen);
    });
}