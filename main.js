import * as RickAndMorty from "./js/rick-and-morty.js";

//  First question: Char Counter

// We use performance.now to create timestamps to measure execution time
const firstStart = performance.now()

// We use the methods from the module RickAndMorty to find all the data required
const counts = await RickAndMorty.getCounts()
const resources = await RickAndMorty.getResourcesNames(counts)
const lsInLocations = RickAndMorty.letterCountInResource(resources.locations, 'l')
const esInEpisodes = RickAndMorty.letterCountInResource(resources.episodes, 'e')
const csInCharacters = RickAndMorty.letterCountInResource(resources.characters, 'c')

// After finishing all the processes we calculate the time taken and format it according to the structure provided
const firstFinish = performance.now()
const firstTime = firstFinish - firstStart
const firstFormattedTime = `${Math.floor(firstTime / 1000)}s ${firstTime % 1000}ms`

// We compose the first answer according to the format provided
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

// We use performance.now to create timestamps to measure execution time
const secondStart = performance.now()

// We use this method from the module RickAndMorty to find the episodes data required
const episodes = await RickAndMorty.getEpisodesCharactersOrigins(counts.episodes)

// After finishing all the processes we calculate the time taken and format it according to the structure provided
const secondFinish = performance.now()
const secondTime = secondFinish - secondStart
const secondFormattedTime = `${Math.floor(secondTime / 1000)}s ${secondTime % 1000}ms`

// We compose the second answer according to the format provided
const episodeLocationsAnswer = {
  "exercise_name": "Episode locations",
  "time": secondFormattedTime,
  "in_time": (secondTime < 3000),
  "results": episodes
}
console.log(episodeLocationsAnswer)
