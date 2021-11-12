export class RickAndMorty {
  constructor() {
    this.locations = {}
    this.episodes = []
    this.characters = []
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

  async getLocations(count) {
    let ids = "[" + Array.from({length: count}, (x, i) => i + 1).map(id => id.toString()).join(',') + "]"

    const locationsQuery = JSON.stringify({
      query: `{
        locationsByIds(ids: ${ids}) {
          id
          name
        }
      }`
    });

    const locationsResponse = await fetch(
      'https://rickandmortyapi.com/graphql',
      {
        method: 'post',
        body: locationsQuery,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const json = await locationsResponse.json()
    let locationObjects = json.data.locationsByIds.map(location => ({ [location.id]: location.name }))
    return locationObjects
  }
}
