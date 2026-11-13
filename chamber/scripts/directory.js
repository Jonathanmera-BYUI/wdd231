const membersContainer = document.querySelector("#membersContainer");

async function getMembers() {
    try {
        const response = await fetch("data/members.json");
        const members = await response.json();

        displayMembers(members);

    } catch (error) {
        console.error("Error loading members:", error);
        membersContainer.innerHTML = "<p>Unable to load members.</p>";
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank" rel="noopener noreferrer">
                Visit Website
            </a>
        `;

        membersContainer.appendChild(card);
    });
}

getMembers();

// Grid and List view buttons
const gridButton = document.querySelector("#gridView");
const listButton = document.querySelector("#listView");

gridButton.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
});

listButton.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
});

// Mobile navigation
const menuButton = document.querySelector("#menuButton");
const mainNav = document.querySelector("#mainNav");

menuButton.addEventListener("click", () => {
    mainNav.classList.toggle("open");
});