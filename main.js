import { RickAndMorty } from "./js/rick-and-morty.js";

//  First question: Char Counter

const firstStart = performance.now()
const challenge = new RickAndMorty()
const counts = await challenge.getCounts()
const resources = await challenge.getResourcesNames(counts)
const lsInLocations = challenge.letterCountInResource(resources.locations, 'l')
const esInEpisodes = challenge.letterCountInResource(resources.episodes, 'e')
const csInCharacters = challenge.letterCountInResource(resources.characters, 'c')
const firstFinish = performance.now()
const firstTime = firstFinish - firstStart
const firstFormattedTime = `${Math.floor(firstTime / 1000)}s ${firstTime % 1000}ms`
const charCounterAnswer = {
  "exercise_name": "Char counter",
  "time": firstFormattedTime,
  "in_time": (firstTime < 3000),
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

const secondStart = performance.now()
const episodes = await challenge.getEpisodesCharactersOrigins(counts.episodes)
const secondFinish = performance.now()
const secondTime = secondFinish - secondStart
const secondFormattedTime = `${Math.floor(secondTime / 1000)}s ${secondTime % 1000}ms`
const episodeLocationsAnswer = {
  "exercise_name": "Episode locations",
  "time": secondFormattedTime,
  "in_time": (secondTime < 3000),
  "results": episodes
}
console.log(episodeLocationsAnswer)