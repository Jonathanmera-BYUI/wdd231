

const courses = [
    {
        code: "CSE 110",
        name: "Introduction to Programming",
        credits: 2,
        type: "CSE",
        completed: true,
        description: "Introduction to programming concepts and problem solving.",
        certificate: "Programming",
        technology: "Python"
    },
    {
        code: "WDD 130",
        name: "Web Fundamentals",
        credits: 2,
        type: "WDD",
        completed: true,
        description: "Introduction to HTML, CSS, and web development.",
        certificate: "Web and Computer Programming",
        technology: "HTML, CSS"
    },
    {
        code: "CSE 111",
        name: "Programming with Functions",
        credits: 2,
        type: "CSE",
        completed: true,
        description: "Learn programming using functions and data structures.",
        certificate: "Programming",
        technology: "Python"
    },
    {
        code: "CSE 210",
        name: "Programming with Classes",
        credits: 2,
        type: "CSE",
        completed: true,
        description: "Learn object-oriented programming and classes.",
        certificate: "Programming",
        technology: "C#"
    },
    {
        code: "WDD 131",
        name: "Dynamic Web Fundamentals",
        credits: 2,
        type: "WDD",
        completed: true,
        description: "Build dynamic websites using JavaScript and web technologies.",
        certificate: "Web and Computer Programming",
        technology: "HTML, CSS, JavaScript"
    },
    {
        code: "WDD 231",
        name: "Web Frontend Development I",
        credits: 2,
        type: "WDD",
        completed: false,
        description: "Develop responsive websites using modern frontend techniques.",
        certificate: "Web and Computer Programming",
        technology: "HTML, CSS, JavaScript"
    }
];

const courseList = document.querySelector("#courseList");
const totalCredits = document.querySelector("#totalCredits");
const filterButtons = document.querySelectorAll("[data-filter]");
const courseModal = document.querySelector("#course-details");
const closeModal = document.querySelector("#closeModal");

function displayCourses(courseArray) {
    courseList.innerHTML = "";

    const credits = courseArray.reduce((total, course) => {
        return total + course.credits;
    }, 0);

    courseArray.forEach(course => {
        const card = document.createElement("button");
        card.type = "button";
        card.classList.add("course-card");

        card.innerHTML = `
            <strong>${course.code}</strong>
            <p>${course.name}</p>
            <span>${course.credits} Credits</span>
        `;

        if (course.completed) {
            card.classList.add("completed");
        }

       card.addEventListener("click", () => {
    document.querySelector("#courseTitle").textContent = course.name;
    document.querySelector("#courseSubject").textContent = course.code;
    document.querySelector("#courseCredits").textContent = course.credits;
    document.querySelector("#courseDescription").textContent = course.description;
    document.querySelector("#courseCertificate").textContent = course.certificate;
    document.querySelector("#courseTechnology").textContent = course.technology;

    courseModal.showModal();
});

        courseList.appendChild(card);
    });

    totalCredits.textContent =
        `The total credits for the courses listed above is ${credits}`;
}

closeModal.addEventListener("click", () => {
    courseModal.close();
});

courseModal.addEventListener("click", (event) => {
    if (event.target === courseModal) {
        courseModal.close();
    }
});

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

if (menuButton && mainNav) {
    menuButton.addEventListener("click", () => {
        mainNav.classList.toggle("open");

        const isOpen = mainNav.classList.contains("open");
        menuButton.setAttribute("aria-expanded", isOpen);
    });
}