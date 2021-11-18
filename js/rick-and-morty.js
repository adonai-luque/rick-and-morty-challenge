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

// This function returns a GraphQL query that only queries the API for the counts of each resource
function resourcesCountsQuery() {
  const query = JSON.stringify({
    query: `{
      locations {
        info {
          count
        }
      }
      episodes {
        info {
          count
        }
      }
      characters {
        info {
          count
        }
      }
    }`
  });
  return query;
}

// This function returns the counts of each resource in the API
async function getCounts() {
  const response = await apiResponse(resourcesCountsQuery());
  const json = await response.json();
  const counts = {
    locations: json.data.locations.info.count,
    episodes: json.data.episodes.info.count,
    characters: json.data.characters.info.count,
  };
  return counts;
}

// This function returns a comma separated succesion of numbers from 1 to the resourceCount
function resourceIds(resourceCount) {
  const idsToString = Array.from({ length: resourceCount }, (_, i) => i + 1).map((id) => id.toString()).join(",")
  return idsToString
}

// This function returns a custom GraphQL query with ids generated from the argument containing the counts of the resources
function resourcesNamesQuery(counts) {
  const query = JSON.stringify({
    query: `{
      locationsByIds(ids: [${resourceIds(counts.locations)}]) {
        name
      }
      episodesByIds(ids: [${resourceIds(counts.episodes)}]) {
        name
      }
      charactersByIds(ids: [${resourceIds(counts.characters)}]) {
        name
      }
    }`
  });
  return query
}

// This function returns all the names of the resources in the API
async function getResourcesNames(counts) {
  const response = await apiResponse(resourcesNamesQuery(counts));
  const json = await response.json();
  let resourcesNames = {
    locations: json.data.locationsByIds,
    episodes: json.data.episodesByIds,
    characters: json.data.charactersByIds,
  };
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
function episodesCharactersOriginsQuery(episodesCount) {
  const query = JSON.stringify({
    query: `{
      episodesByIds(ids: [${resourceIds(episodesCount)}]) {
        name
        episode
        characters {
          origin {
            name
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
async function getEpisodesCharactersOrigins(counts) {
  const response = await apiResponse(episodesCharactersOriginsQuery(counts));
  const json = await response.json();
  const episodesByIds = json.data.episodesByIds;
  const episodesCharactersOrigins = episodesByIds.map(episode => formatEpisode(episode))
  return episodesCharactersOrigins;
}

// This is a workaround for the error: "Uncaught ReferenceError: module is not defined" that appears in the browser
if (typeof module == 'undefined') { var module = {} }

// We export the all functions to be tested by JEST
module.exports = {
  resourcesCountsQuery,
  resourceIds,
  resourcesNamesQuery,
  letterCountInResource,
  episodesCharactersOriginsQuery,
  formatEpisode,
}
