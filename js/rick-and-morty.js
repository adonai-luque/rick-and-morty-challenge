// This function makes a request to the GraphQL API with a custom query
async function apiResponse(query) {
  const response = await fetch("https://rickandmortyapi.com/graphql", {
    method: "post",
    body: query,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

// This function returns a custom GraphQL query with ids generated from the argument containing the counts of the resources
function resourcesNamesQuery(resourceInPlural, page) {
  const query = JSON.stringify({
    query: `{
      ${resourceInPlural}(page: ${page}) {
        info {
          next
        }
        results {
          name
        }
      }      
    }`
  });
  return query
}

// This function returns all the names of the resources in the API
async function getResourcesNames(resourceInPlural) {
  let page = 1
  let resourcesNames = []
  while (page !== null) {
    const response = await apiResponse(resourcesNamesQuery(resourceInPlural, page));
    const json = await response.json();
    resourcesNames = [...resourcesNames, ...json.data[resourceInPlural].results]
    page = json.data[resourceInPlural].info.next
  }
  return resourcesNames;
}

// This function counts case insensitive ocurrences of a letter in the names of the resources passed in resourceArray
function letterCountInResource(resourceArray, letter) {
  const pattern = new RegExp(letter, "gi");
  const count = resourceArray.reduce((acum, resource) => {
    const letterCount = (resource.name.match(pattern) || []).length;
    return acum + letterCount;
  }, 0);
  return count;
}

// This function returns a custom GraphQL query with ids generated from the argument containing the counts of the resources
function episodesCharactersOriginsQuery(page) {
  const query = JSON.stringify({
    query: `{
      episodes(page: ${page}) {
        info {
          next
        }
        results {
          name
          episode
          characters {
            origin {
              name
            }
        }
        }
      }      
    }`
  });
  return query;
}

// This function returns the same episode with a list of unique locations of origin for its characters
function formatEpisode(episode) {
  const locations = episode.characters.map((character => character.origin.name))
  const uniqLocations = [...new Set(locations)];
  const formattedEpisode = {
    name: episode.name,
    episode: episode.episode,
    locations: uniqLocations
  }
  return formattedEpisode
}

// This function returns all the episodes with name, episode code and a list of unique locations of origin for its characters
async function getEpisodesCharactersOrigins() {
  let page = 1
  let episodes = []
  while (page !== null) {
    const response = await apiResponse(episodesCharactersOriginsQuery(page));
    const json = await response.json();
    episodes = [...episodes, ...json.data.episodes.results]
    page = json.data.episodes.info.next
  }
  const episodesCharactersOrigins = episodes.map(episode => formatEpisode(episode))
  return episodesCharactersOrigins;
}

//  // This is a workaround for the error: "Uncaught ReferenceError: module is not defined" that appears in the browser
// if (typeof module == 'undefined') { var module = {} }

//  // We export the all functions to be tested by JEST
// module.exports = {
//   resourcesCountsQuery,
//   resourceIds,
//   resourcesNamesQuery,
//   letterCountInResource,
//   episodesCharactersOriginsQuery,
//   formatEpisode,
// }
