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
    }`,
  });
  return query;
}

export async function getCounts() {
  const response = await apiResponse(resourcesCountsQuery());
  const json = await response.json();
  const counts = {
    locations: json.data.locations.info.count,
    episodes: json.data.episodes.info.count,
    characters: json.data.characters.info.count,
  };
  return counts;
}

function resourceIds(resourceCount) {
  const idsToString = Array.from({ length: resourceCount }, (_, i) => i + 1).map((id) => id.toString()).join(",")
  return idsToString
}

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
    }`,
  });
  return query
}

export async function getResourcesNames(counts) {
  const response = await apiResponse(resourcesNamesQuery(counts));
  const json = await response.json();
  let resourcesNames = {
    locations: json.data.locationsByIds,
    episodes: json.data.episodesByIds,
    characters: json.data.charactersByIds,
  };
  return resourcesNames;
}

export function letterCountInResource(resourceArray, letter) {
  const pattern = new RegExp(letter, "gi");
  const count = resourceArray.reduce((acum, resource) => {
    const letterCount = (resource.name.match(pattern) || []).length;
    return acum + letterCount;
  }, 0);
  return count;
}

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
    }`,
  });
  return query;
}

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

export async function getEpisodesCharactersOrigins(counts) {
  const response = await apiResponse(episodesCharactersOriginsQuery(counts));
  const json = await response.json();
  const episodesByIds = json.data.episodesByIds;
  const episodesCharactersOrigins = episodesByIds.map(episode => formatEpisode(episode))
  return episodesCharactersOrigins;
  }
