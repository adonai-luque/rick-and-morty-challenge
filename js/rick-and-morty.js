export class RickAndMorty {
  constructor() {
    this.locations = []
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
    
    // const locationNamesQuery = JSON.stringify({
    //   query: `{
    //     locations {
    //       results {
    //         name
    //       }
    //     }
    //   }`
    // });
    
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

    // let ids = "[" + Array.from({length: count}, (x, i) => i + 1).map(id => id.toString()).join(',') + "]"
    
  }
}
