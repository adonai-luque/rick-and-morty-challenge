const { test, expect } = require('@jest/globals');
const expectExport = require('expect');
const RickAndMorty = require('../js/rick-and-morty');

test('resourcesCountsQuery returns a GraphQL query', () => {
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
  expect(RickAndMorty.resourcesCountsQuery()).toEqual(query);
})

test('resourceIds(n) returns a comma separated succesion of numbers from 1 to n', () => {
  expect(RickAndMorty.resourceIds(3)).toEqual('1,2,3')
})

test('resourcesNamesQuery returns a custom GraphQL query with ids generated from argument', () => {
  const counts = {
    locations: 2,
    episodes: 3,
    characters: 1
  }
  const query = JSON.stringify({
    query: `{
      locationsByIds(ids: [1,2]) {
        name
      }
      episodesByIds(ids: [1,2,3]) {
        name
      }
      charactersByIds(ids: [1]) {
        name
      }
    }`
  });
  expect(RickAndMorty.resourcesNamesQuery(counts)).toEqual(query);
})

test('letterCountInResource counts case insensitive ocurrences of a letter in resources names', () => {
  //This resource array contains 6 case insensitive ocurrences of the letter 'a'
  const resourceArray = [
    { name: 'Aaaxx' },
    { name: 'Axaxx' },
    { name: 'Xaxxx' }
  ]
  expect(RickAndMorty.letterCountInResource(resourceArray, 'a')).toEqual(6)
})

test('episodesCharactersOriginsQuery returns a custom GraphQL query with ids generated from argument', () => {
  const query = JSON.stringify({
    query: `{
      episodesByIds(ids: [1,2,3,4,5]) {
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
  expect(RickAndMorty.episodesCharactersOriginsQuery(5)).toEqual(query)
})

test('formatEpisode returns the same episode with a list of unique locations of origin for its characters', () => {
  const episode = {
    "name": "Pilot",
    "episode": "S01E01",
    "characters": [
      {
        "origin": {
          "name": "Earth (C-137)"
        }
      },
      {
        "origin": {
          "name": "unknown"
        }
      },
      {
        "origin": {
          "name": "Bepis 9"
        }
      },
      {
        "origin": {
          "name": "Earth (C-137)"
        }
      },
      {
        "origin": {
          "name": "Gromflom Prime"
        }
      },
      {
        "origin": {
          "name": "Earth (C-137)"
        }
      },
      {
        "origin": {
          "name": "Earth (C-137)"
        }
      },
      {
        "origin": {
          "name": "unknown"
        }
      },
      {
        "origin": {
          "name": "unknown"
        }
      },
      {
        "origin": {
          "name": "Earth (C-137)"
        }
      },
      {
        "origin": {
          "name": "Earth (C-137)"
        }
      },
      {
        "origin": {
          "name": "Earth (C-137)"
        }
      },
      {
        "origin": {
          "name": "Earth (C-137)"
        }
      },
      {
        "origin": {
          "name": "unknown"
        }
      },
      {
        "origin": {
          "name": "Earth (C-137)"
        }
      },
      {
        "origin": {
          "name": "Earth (C-137)"
        }
      },
      {
        "origin": {
          "name": "Earth (C-137)"
        }
      },
      {
        "origin": {
          "name": "Girvonesk"
        }
      },
      {
        "origin": {
          "name": "unknown"
        }
      }
    ]
  };
  const formattedEpisode = {
    "name": "Pilot",
    "episode": "S01E01",
    "locations": [
      "Earth (C-137)",
      "unknown",
      "Bepis 9",
      "Gromflom Prime",
      "Girvonesk"
    ]
  };
  expect(RickAndMorty.formatEpisode(episode)).toEqual(formattedEpisode);
})
