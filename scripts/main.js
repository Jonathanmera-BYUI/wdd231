
const courses = [
    { code: "CSE 110", name: "Introduction to Programming", credits: 2, type: "CSE", completed: true },
    { code: "WDD 130", name: "Web Fundamentals", credits: 2, type: "WDD", completed: true },
    { code: "CSE 111", name: "Programming with Functions", credits: 2, type: "CSE", completed: true },
    { code: "CSE 210", name: "Programming with Classes", credits: 2, type: "CSE", completed: true },
    { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 2, type: "WDD", completed: true },
    { code: "WDD 231", name: "Web Frontend Development I", credits: 2, type: "WDD", completed: false }
];

const courseList = document.querySelector("#courseList");
const totalCredits = document.querySelector("#totalCredits");
const filterButtons = document.querySelectorAll("[data-filter]");

function displayCourses(courseArray) {
    courseList.innerHTML = "";

    const credits = courseArray.reduce((total, course) => {
        return total + course.credits;
    }, 0);

    courseArray.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course-card");

        card.innerHTML = `
            <strong>${course.code}</strong>
            <p>${course.name}</p>
            <span>${course.credits} Credits</span>
        `;

        if (course.completed) {
            card.classList.add("completed");
        }

        courseList.appendChild(card);
    });

    totalCredits.textContent =
        `The total credits for the courses listed above is ${credits}`;
}

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        const filteredCourses = filter === "all"
            ? courses
            : courses.filter(course => course.type === filter);

        displayCourses(filteredCourses);
    });
});

displayCourses(courses);

document.querySelector("#lastModified").textContent = document.lastModified;
document.querySelector("#currentyear").textContent = new Date().getFullYear();

const menuButton = document.querySelector("#menuButton");
const mainNav = document.querySelector("#mainNav");

menuButton.addEventListener("click", () => {
    mainNav.classList.toggle("open");

    const isOpen = mainNav.classList.contains("open");

    menuButton.setAttribute("aria-expanded", isOpen);
});