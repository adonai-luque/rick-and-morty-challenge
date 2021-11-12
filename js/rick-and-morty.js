export class RickAndMorty {
  constructor() {
    this.resources = {}
  }

  async getCounts() {
    const countsQuery = JSON.stringify({
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
        
    const countResponse = await fetch(
      'https://rickandmortyapi.com/graphql',
      {
        method: 'post',
        body: countsQuery,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  
    const json = await countResponse.json()
    const counts = {
      locations: json.data.locations.info.count,
      episodes: json.data.episodes.info.count,
      characters: json.data.characters.info.count
    }
    return counts
  }

  async getResources(counts) {
    const locationsIds = "[" + Array.from({length: counts.locations}, (x, i) => i + 1).map(id => id.toString()).join(',') + "]"
    const episodesIds = "[" + Array.from({length: counts.episodes}, (x, i) => i + 1).map(id => id.toString()).join(',') + "]"
    const charactersIds = "[" + Array.from({length: counts.characters}, (x, i) => i + 1).map(id => id.toString()).join(',') + "]"

    const resourcesQuery = JSON.stringify({
      query: `{
        locationsByIds(ids: ${locationsIds}) {
          id
          name
        }
        episodesByIds(ids: ${episodesIds}) {
          id
          name
        }
        charactersByIds(ids: ${charactersIds}) {
          id
          name
        }
      }`
    });

    const locationsResponse = await fetch(
      'https://rickandmortyapi.com/graphql',
      {
        method: 'post',
        body: resourcesQuery,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const json = await locationsResponse.json()
    let resources = {
      locations: json.data.locationsByIds,
      episodes: json.data.episodesByIds,
      characters: json.data.charactersByIds
    }
    // json.data.locationsByIds.map(location => ({ [location.id]: location.name }))
    return resources
  }

  letterCountInResource(resourceArray, letter) {
    const pattern = new RegExp(letter, 'gi')
    return resourceArray.reduce((acum, resource) => {
      const letterCount = (resource.name.match(pattern) || []).length
      return acum + letterCount
    }, 0)
  }
}
