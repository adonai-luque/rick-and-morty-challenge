export class RickAndMorty {
  constructor() {
    this.resources = {};
  }

  async apiResponse(query) {
    const response = await fetch("https://rickandmortyapi.com/graphql", {
      method: "post",
      body: query,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  }

  resourcesCountsQuery() {
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

  async getCounts() {
    const response = await this.apiResponse(this.resourcesCountsQuery());
    const json = await response.json();
    const counts = {
      locations: json.data.locations.info.count,
      episodes: json.data.episodes.info.count,
      characters: json.data.characters.info.count,
    };
    return counts;
  }

  resourceIds(resourceCount) {
    const idsToString = Array.from({ length: resourceCount }, (_, i) => i + 1).map((id) => id.toString()).join(",")
    return idsToString
  }

  resourcesNamesQuery(counts) {
    // const locationsIds = Array.from({ length: counts.locations }, (_, i) => i + 1).map((id) => id.toString()).join(",")
    // const episodesIds = Array.from({ length: counts.episodes }, (_, i) => i + 1).map((id) => id.toString()).join(",")
    // const charactersIds = Array.from({ length: counts.characters }, (_, i) => i + 1).map((id) => id.toString()).join(",")
    
    const query = JSON.stringify({
      query: `{
        locationsByIds(ids: [${this.resourceIds(counts.locations)}]) {
          name
        }
        episodesByIds(ids: [${this.resourceIds(counts.episodes)}]) {
          name
        }
        charactersByIds(ids: [${this.resourceIds(counts.characters)}]) {
          name
        }
      }`,
    });
    return query
  }
  
  async getResourcesNames(counts) {
    const response = await this.apiResponse(this.resourcesNamesQuery(counts));
    const json = await response.json();
    let resourcesNames = {
      locations: json.data.locationsByIds,
      episodes: json.data.episodesByIds,
      characters: json.data.charactersByIds,
    };
    return resourcesNames;
  }

  letterCountInResource(resourceArray, letter) {
    const pattern = new RegExp(letter, "gi");
    const count = resourceArray.reduce((acum, resource) => {
      const letterCount = (resource.name.match(pattern) || []).length;
      return acum + letterCount;
    }, 0);
    return count;
  }

  episodesCharactersOriginsQuery(counts) {
    const query = JSON.stringify({
      query: `{
        episodesByIds(ids: [${this.resourceIds(counts.episodes)}]) {
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

  async getEpisodesCharactersOrigins(counts) {
    const response = await this.apiResponse(this.episodesCharactersOriginsQuery(counts));
    const json = await response.json();
    let episodesCharactersOrigins = json.data.episodesByIds
    return episodesCharactersOrigins;
  }
}
