const params = new URLSearchParams(window.location.search);

const fields = [
    ["First Name", "firstName"],
    ["Last Name", "lastName"],
    ["Email", "email"],
    ["Phone", "phone"],
    ["Organization", "business"],
    ["Membership", "membership"],
    ["Application Date", "timestamp"]
];

const details = document.querySelector("#applicationDetails");

fields.forEach(([label, name]) => {
    const value = params.get(name);

    if (value) {
        const paragraph = document.createElement("p");
        paragraph.innerHTML = `<strong>${label}:</strong> ${value}`;
        details.appendChild(paragraph);
    }
});