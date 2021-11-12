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
    return JSON.stringify({
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

  resourcesNamesQuery(counts) {
    const locationsIds = Array.from({ length: counts.locations }, (_, i) => i + 1).map((id) => id.toString()).join(",")
    const episodesIds = Array.from({ length: counts.episodes }, (_, i) => i + 1).map((id) => id.toString()).join(",")
    const charactersIds = Array.from({ length: counts.characters }, (_, i) => i + 1).map((id) => id.toString()).join(",")
    
    const query = JSON.stringify({
      query: `{
        locationsByIds(ids: [${locationsIds}]) {
          name
        }
        episodesByIds(ids: [${episodesIds}]) {
          name
        }
        charactersByIds(ids: [${charactersIds}]) {
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
}
