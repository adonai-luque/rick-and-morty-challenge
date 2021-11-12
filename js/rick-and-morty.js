export class RickAndMorty {
  constructor() {
    this.locations = {}
    this.episodes = []
    this.characters = []
  }

  async getLocationsCount() {
    const countQuery = JSON.stringify({
      query: `{
        locations {
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
        body: countQuery,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  
    const json = await countResponse.json()
    return json.data.locations.info.count
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
