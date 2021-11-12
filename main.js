import { RickAndMorty } from "./js/rick-and-morty.js";

let start = performance.now()
const challenge = new RickAndMorty()
const counts = await challenge.getCounts()
const resources = await challenge.getResources(counts)
const lsInLocations = challenge.letterCountInResource(resources.locations, 'l')
const esInEpisodes = challenge.letterCountInResource(resources.episodes, 'e')
const csInCharacters = challenge.letterCountInResource(resources.characters, 'c')
let finish = performance.now()
let time = finish - start
let formattedTime = `${Math.floor(time / 1000)}s ${time % 1000}ms`
const firstAnswer = {
  "exercise_name": "Char counter",
  "time": formattedTime,
  "in_time": (time < 3000),
  "results": [
      {
          "char": "l",
          "count": lsInLocations,
          "resource": "location"
      },
      {
          "char": "e",
          "count": esInEpisodes,
          "resource": "episode"
      },
      {
          "char": "c",
          "count": csInCharacters,
          "resource": "character"
      }
  ]
}
console.log(firstAnswer)
