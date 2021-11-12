import { RickAndMorty } from "./js/rick-and-morty.js";

console.log("Inside main.js");

const challenge = new RickAndMorty();
let locationsCountResponse = await challenge.getLocationsCount();
console.log(locationsCountResponse)
