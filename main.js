import { RickAndMorty } from "./js/rick-and-morty.js";

console.log("Inside main.js");

const start = performance.now()
const challenge = new RickAndMorty();
const counts = await challenge.getCounts();
const resources = await challenge.getResources(counts)
const lsInLocations = challenge.letterCountInResource(resources.locations, "l")
console.log(lsInLocations)
const finish = performance.now()
console.log(finish - start)