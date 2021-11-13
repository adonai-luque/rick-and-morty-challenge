import * as RickAndMorty from "./js/rick-and-morty.js";

//  First question: Char Counter

const firstStart = performance.now()
const counts = await RickAndMorty.getCounts()
const resources = await RickAndMorty.getResourcesNames(counts)
const lsInLocations = RickAndMorty.letterCountInResource(resources.locations, 'l')
const esInEpisodes = RickAndMorty.letterCountInResource(resources.episodes, 'e')
const csInCharacters = RickAndMorty.letterCountInResource(resources.characters, 'c')
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
const episodes = await RickAndMorty.getEpisodesCharactersOrigins(counts.episodes)
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
