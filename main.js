import { RickAndMorty } from "./js/rick-and-morty.js";

console.log("Inside main.js");

let start = performance.now()
const challenge = new RickAndMorty();
let counts = await challenge.getCounts();
console.log(counts)
// challenge.locations = await challenge.getLocations(locationsCount)
// console.log(challenge.locations)
let finish = performance.now()
console.log(finish - start)