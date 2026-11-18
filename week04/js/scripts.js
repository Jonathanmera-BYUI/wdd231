const params = new URLSearchParams(window.location.search);

const first = params.get("first");
const last = params.get("last");
const phone = params.get("phone");
const email = params.get("email");
const ordinance = params.get("ordinance");
const date = params.get("date");
const templeLocation = params.get("location");

const results = document.querySelector("#results");

results.innerHTML = `
    <p><strong>First Name:</strong> ${first}</p>
    <p><strong>Last Name:</strong> ${last}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Ordinance:</strong> ${ordinance}</p>
    <p><strong>Date:</strong> ${date}</p>
    <p><strong>Location:</strong> ${templeLocation}</p>

`;