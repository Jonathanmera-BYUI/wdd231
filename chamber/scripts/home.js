const API_KEY = "947c08a6ce41ea0aa6dea945dbd2fcc8";

// WEATHER API
const latitude = -26.9101;
const longitude = -48.6705;

async function loadWeather() {
    const currentWeather = document.querySelector("#currentWeather");
    const weatherForecast = document.querySelector("#weatherForecast");

    try {
        const currentResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
        );

       if (!currentResponse.ok) {
    const errorData = await currentResponse.json();

    throw new Error(
        `Weather API Error ${currentResponse.status}: ${errorData.message}`
    );
}

        const currentData = await currentResponse.json();

        currentWeather.innerHTML = `
            <div class="weather-card">
                <h3>${currentData.name}</h3>
                <p><strong>${Math.round(currentData.main.temp)}°C</strong></p>
                <p>${currentData.weather[0].description}</p>
                <p>Humidity: ${currentData.main.humidity}%</p>
            </div>
        `;

        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
        );

       if (!forecastResponse.ok) {
    const errorData = await forecastResponse.json();

    throw new Error(
        `Forecast API Error ${forecastResponse.status}: ${errorData.message}`
    );
}

        const forecastData = await forecastResponse.json();

        const dailyForecast = {};

        forecastData.list.forEach(item => {
            const date = item.dt_txt.split(" ")[0];

            if (!dailyForecast[date]) {
                dailyForecast[date] = item;
            }
        });

        const nextDays = Object.values(dailyForecast).slice(1, 4);

        weatherForecast.innerHTML = nextDays.map(day => `
            <div class="weather-card">
                <h4>${new Date(day.dt_txt).toLocaleDateString("en-US", {
                    weekday: "long"
                })}</h4>
                <p>${Math.round(day.main.temp)}°C</p>
                <p>${day.weather[0].description}</p>
            </div>
        `).join("");

    } catch (error) {
        console.error("Weather error:", error);
        currentWeather.innerHTML = "<p>Weather information unavailable.</p>";
        weatherForecast.innerHTML = "<p>Forecast unavailable.</p>";
    }
}

loadWeather();

// FOOTER
document.querySelector("#currentyear").textContent =
    new Date().getFullYear();

document.querySelector("#lastModified").textContent =
    document.lastModified;

// MOBILE NAVIGATION
const menuButton = document.querySelector("#menuButton");
const mainNav = document.querySelector("#mainNav");

menuButton.addEventListener("click", () => {
    mainNav.classList.toggle("open");
});

// COMPANY SPOTLIGHTS
async function loadSpotlights() {
    const container = document.querySelector("#spotlightsContainer");

    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load members JSON");
        }

        const members = await response.json();

        // Select only Gold (3) and Silver (2) members
        const qualifiedMembers = members.filter(member =>
            member.membershipLevel === 2 ||
            member.membershipLevel === 3
        );

        // Shuffle the companies randomly
        for (let i = qualifiedMembers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [qualifiedMembers[i], qualifiedMembers[j]] =
        [qualifiedMembers[j], qualifiedMembers[i]];
}

        // Randomly display 2 or 3 companies
        const amount = Math.min(
            Math.floor(Math.random() * 2) + 2,
            qualifiedMembers.length
        );

        const selectedMembers = qualifiedMembers.slice(0, amount);

        container.innerHTML = "";

        selectedMembers.forEach(member => {
            const card = document.createElement("article");
            card.classList.add("spotlight-card");

            const membership =
                member.membershipLevel === 3 ? "Gold Member" : "Silver Member";

            card.innerHTML = `
                <img src="images/${member.image}"
                     alt="${member.name} logo"
                     loading="lazy">

                <h3>${member.name}</h3>
                <p><strong>${membership}</strong></p>
                <p>${member.phone}</p>
                <a href="${member.website}"
                   target="_blank"
                   rel="noopener noreferrer">
                    Visit Website
                </a>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading company spotlights:", error);
        container.innerHTML = "<p>Unable to load company spotlights.</p>";
    }
}

loadSpotlights();
