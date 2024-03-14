// Write your helper functions here!

require('cross-fetch/polyfill');

// This function updates the mission destination information on the webpage
 function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">
    `;
 }

// This function validates user input, checking if it's empty or not a number
 function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    } else if (isNaN(Number(testInput))) {
        return "Not a Number";
    } else {
        return "Is a Number";
    }
 }
 
// This function handles form submission for launch checklist
 function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus = document.getElementById("launchStatus");

    // Validate input fields
    if (
        validateInput(pilot) === "Empty" ||
        validateInput(copilot) === "Empty" ||
        validateInput(fuelLevel.toString()) === "Empty" || 
        validateInput(cargoLevel.toString()) === "Empty" 
    ) {
        alert("All fields are required!");
    } else if (
        validateInput(fuelLevel.toString()) === "Not a Number" || 
        validateInput(cargoLevel.toString()) === "Not a Number" 
    ) {
        alert("Fuel level and Cargo mass must be numbers!");

    // Update pilot and copilot status
    } else {
        pilotStatus.textContent = `Pilot ${pilot} is ready for launch`;
        copilotStatus.textContent = `Co-pilot ${copilot} is ready for launch`;

        // Checks fuel level
        if (fuelLevel < 10000) {
            list.style.visibility = "visible";
            launchStatus.textContent = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "red";
            fuelStatus.textContent = "Fuel level too low for launch";
        } else {
            fuelStatus.textContent = "Fuel level high enough for launch";
        }

        // Checks cargo level
        if (cargoLevel > 10000) {
            list.style.visibility = "visible";
            launchStatus.textContent = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "red";
            cargoStatus.textContent = "Cargo mass too heavy for launch";
        } else {
            cargoStatus.textContent = "Cargo mass low enough for launch";
        }

        // Check if both fuel and cargo levels are within limits
        if (fuelLevel >= 10000 && cargoLevel <= 10000) {
            list.style.visibility = "visible";
            launchStatus.textContent = "Shuttle is Ready for Launch";
            launchStatus.style.color = "green";
        }
    }
 }

// This function fetches data about planets from a remote source
 async function myFetch() {
    const url = 'https://handlers.education.launchcode.org/static/planets.json';
    
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
 }

// This function randomly selects a planet from the provided list of planets
 function pickPlanet(planets) {
    const randomIndex = Math.floor(Math.random() * planets.length);
    return planets[randomIndex];
 }
 
 module.exports.addDestinationInfo = addDestinationInfo;
 module.exports.validateInput = validateInput;
 module.exports.formSubmission = formSubmission;
 module.exports.pickPlanet = pickPlanet; 
 module.exports.myFetch = myFetch;