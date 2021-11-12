import { RickAndMorty } from "./js/rick-and-morty.js";

//  First question: Char Counter

let start = performance.now()
const challenge = new RickAndMorty()
const counts = await challenge.getCounts()
const resources = await challenge.getResourcesNames(counts)
const lsInLocations = challenge.letterCountInResource(resources.locations, 'l')
const esInEpisodes = challenge.letterCountInResource(resources.episodes, 'e')
const csInCharacters = challenge.letterCountInResource(resources.characters, 'c')
let finish = performance.now()
let time = finish - start
let formattedTime = `${Math.floor(time / 1000)}s ${time % 1000}ms`
const charCounterAnswer = {
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
console.log(charCounterAnswer)

//  Second question: Episode Locations

start = performance.now()
const episodes = await challenge.getEpisodesCharactersOrigins(counts)
finish = performance.now()
time = finish - start
formattedTime = `${Math.floor(time / 1000)}s ${time % 1000}ms`
const episodeLocationsAnswer = {
  "exercise_name": "Episode locations",
  "time": formattedTime,
  "in_time": (time < 3000),
  "results": episodes
}
console.log(episodeLocationsAnswer)