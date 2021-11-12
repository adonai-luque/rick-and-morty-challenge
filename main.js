import { RickAndMorty } from "./js/rick-and-morty.js";

console.log("Inside main.js");

let start = performance.now()
const challenge = new RickAndMorty();
let locationsCount = await challenge.getLocationsCount();
challenge.locations = await challenge.getLocations(locationsCount)
console.log(challenge.locations)
let finnish = performance.now()
console.log(finnish - start)