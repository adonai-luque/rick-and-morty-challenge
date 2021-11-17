import { getCounts, getResourcesNames, letterCountInResource, getEpisodesCharactersOrigins } from "./js/rick-and-morty.js";

// We create an empty challenge answer
const challengeAnswer = []
let counts

//  First question: Char Counter
async function firstQuestion() {

  // We use performance.now to create timestamps to measure execution time
  const start = performance.now()

  // We use the methods from the module RickAndMorty to find all the data required
  counts = await getCounts()
  const resources = await getResourcesNames(counts)
  const lsInLocations = letterCountInResource(resources.locations, 'l')
  const esInEpisodes = letterCountInResource(resources.episodes, 'e')
  const csInCharacters = letterCountInResource(resources.characters, 'c')

  // After finishing all the processes we calculate the time taken and format it according to the structure provided
  const finish = performance.now()
  const time = finish - start
  const formattedTime = `${Math.floor(time / 1000)}s ${time % 1000}ms`

  // We compose the first answer according to the format provided
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

  // We insert the first answer in the challenge answer
  challengeAnswer.push(charCounterAnswer)
}
//  Second question: Episode Locations
async function secondQuestion() {

  // We use performance.now to create timestamps to measure execution time
  const start = performance.now()

  // We use this method from the module RickAndMorty to find the episodes data required
  const episodes = await getEpisodesCharactersOrigins(counts.episodes)

  // After finishing all the processes we calculate the time taken and format it according to the structure provided
  const finish = performance.now()
  const time = finish - start
  const formattedTime = `${Math.floor(time / 1000)}s ${time % 1000}ms`

  // We compose the second answer according to the format provided
  const episodeLocationsAnswer = {
    "exercise_name": "Episode locations",
    "time": formattedTime,
    "in_time": (time < 3000),
    "results": episodes
  }

  // We insert the second answer in the challenge answer
  challengeAnswer.push(episodeLocationsAnswer)
}


firstQuestion().then(() => {
  secondQuestion().then(() => {
    // We insert that result on the page for presentation
    let answer = document.getElementById("answer")
    answer.textContent = "Solución:\n\n" + JSON.stringify(challengeAnswer, undefined, 2)    
  })
})
