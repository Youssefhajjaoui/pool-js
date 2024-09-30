// Constants
const secondsInEarthYear = 31557600;

const planetOrbitalPeriods = {
    earth: 1.0,
    mercury: 0.2408467,
    venus: 0.61519726,
    mars: 1.8808158,
    jupiter: 11.862615,
    saturn: 29.447498,
    uranus: 84.016846,
    neptune: 164.79132
};

const convertSecondsToEarthYears = (ageInSeconds) => {
    return ageInSeconds / secondsInEarthYear;
};

const convertToPlanetYears = (earthYears, planet) => {
    const orbitalPeriod = planetOrbitalPeriods[planet.toLowerCase()];
    return earthYears / orbitalPeriod;
};

const convertToDogYears = (planetYears) => {
    return planetYears * 7; 
};

// Main 
const dogYears = (planet, ageInSeconds) => {
    const earthYears = convertSecondsToEarthYears(ageInSeconds);
    const planetYears = convertToPlanetYears(earthYears, planet);
    const dogYearsAge = convertToDogYears(planetYears);
    
    return dogYearsAge.toFixed(2); // Round to 2 decimal places
};

console.log(dogYears("earth", 1000000000)); // Example for Earth
console.log(dogYears("mars", 1000000000)); // Example for Mars
console.log(dogYears("invalidPlanet", 1000000000)); // Should throw an error
