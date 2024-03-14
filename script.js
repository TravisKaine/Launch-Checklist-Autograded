// Write your JavaScript code here!

window.addEventListener("load", function() {

    // Gets the launch form element
    const form = document.getElementById("launchForm");
    
    // Adds an event listener to the form submission and gets input values for pilot, copilot, fuel level, and cargo mass
    form.addEventListener("submit", function(event) {
        let pilotNameInput = document.querySelector("input[name = pilotName]");
        let copilotNameInput = document.querySelector("input[name = copilotName]");
        let fuelLevelInput = document.querySelector("input[name = fuelLevel]");
        let cargoMassInput = document.querySelector("input[name = cargoMass]");
        let list = faultyItems;

        // Submit the form data for launch checklist
        formSubmission(document, list, pilotNameInput.value, copilotNameInput.value, fuelLevelInput.value, cargoMassInput.value);

        event.preventDefault();
    });

    // This function initializes the mission by fetching planet data and updating the mission destination information
    async function initializeMission() {
        try {
            let listedPlanetsResponse = await myFetch();
            let selectedPlanet = pickPlanet(listedPlanetsResponse);
            addDestinationInfo(document, selectedPlanet.name, selectedPlanet.diameter, selectedPlanet.star, selectedPlanet.distance, selectedPlanet.moons, selectedPlanet.image);
        } catch (error) {
            console.error("Error initializing mission:", error);
        }
    }

    initializeMission();
});