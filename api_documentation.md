# Video Game API Documentation

## Request: GET `/api/bestgames`

### Response

a JSON list of 20 dictionaries, each of which represents one of the top 20 games of all time, sorted by `critic_score` and then by `name`. Each dictionary in this list will contain:

* `name`: (STRING) the video game's title
* `year_of_release`: (INTEGER) the year the game was released
* `genre`: (STRING) the category of game, such as RPG or Sports
* `critic_score`: (FLOAT) the aggregate score by Metacritic staff
* `publisher`: (STRING) the publisher/developer of the game

## Request: GET `/api/search/`

### Parameters
* `video_game`: (Required, STRING) a string that is a video game title or part of one.

### Response
A JSON list of dictionaries that contains all the video games that contained the search string video_game. It contains:
* `name`: (STRING) the video game's title
* `year_of_release`: (INTEGER)

### Example(s)
    /api/search/how%20to%20train%20your%20dragon

        [{"name": "How to Train Your Dragon", "year_of_release": 2010}, 
        {"name": "How to Train Your Dragon 2", "year_of_release": 2014}]

## Request: GET `/api/get_game`

### Parameters
* `video_game` (Required, STRING): a string that returns the video game that most closely resembles the video_game text.

### Response
A JSON list of dictionaries where the first will contain information that is consistent across all versions of the game. The others will be for each version, or each platform that the game was released on. The first dictionary will contain:

* `id`: (INTEGER) the id given to the game to match it with its different versions
* `name`: (STRING) the video game's title
* `year_of_release`: (INTEGER)
* `genre`: (STRING) the year the game was released
* `publisher`: (STRING) the publisher/developer of the game
* `rating`: (STRING) the ESRB ratings

The other dictionaries for each version will contain:
* `id`: (INTEGER) the id given to the version to match it with its proper game
* `name`: (STRING) the title of its matching game
* `platform`: (STRING) the platform of this version
* `na_sales`: (FLOAT) the sales in North America (in millions)
* `eu_sales`: (FLOAT) the sales in Europe (in millions)
* `jp_sales`: (FLOAT) the sales in Japan (in millions)
* `other_sales`: (FLOAT) the sales in the rest of the world (in millions)
* `global_sales`: (FLOAT) the total worldwide sales (in millions)
* `critic_score`: (FLOAT) the aggregate score by Metacritic staff
* `critic_count`: (INTEGER) the number of critics used for critic_score
* `user_score`: (FLOAT) the score by Metacritic subscribers
* `user_count`: (INTEGER) the number of user submitted scores

### Example(s)
**Call:** `/api/get_game/bravely%20default`

**Response**:
```
[
   {
      "id":1135,
      "name":"Bravely Default: Flying Fairy",
      "year_of_release":2012,
      "genre":"Role-Playing",
      "publisher":"Nintendo",
      "rating":""
   },
   {
      "id":1408,
      "name":"Bravely Default: Flying Fairy",
      "platform":"3DS",
      "na_sales":0.5,
      "eu_sales":0.32,
      "jp_sales":0.49,
      "other_sales":0.08,
      "global_sales":1.38,
      "critic_score":85.0,
      "critic_count":49,
      "user_score":6.4,
      "user_count":241
   }
]
```

## Request: GET `/api/recommendations`

### Parameters
* `video_game` (Required): a string that returns the video game that most closely resembles the video_game text.

### Response
A JSON list of dictionaries that contains 10 games of the same genre as `video_game` and the same rating or no rating. Each dictionary contains:

* `name`: (STRING) the video game's title
* `year_of_release`: (INTEGER) the year the game was released
* `genre`: (STRING) the category of game, such as RPG or Sports
* `critic_score`: (FLOAT) the aggregate score by Metacritic staff
* `publisher`: (STRING) the publisher/developer of the game
* `rating`: (INTEGER) the ESRB ratings

### Example(s)
**Call:** `/api/recommendations/dragon%20age`

**Response:**
```
[
   {
      "name":"Pokemon FireRed/Pokemon LeafGreen",
      "year_of_release":2004,
      "genre":"Role-Playing",
      "critic_score":98.0,
      "publisher":"Nintendo",
      "rating":""
   },
   {
      "name":"Mass Effect 2",
      "year_of_release":2010,
      "genre":"Role-Playing",
      "critic_score":96.0,
      "publisher":"Electronic Arts",
      "rating":"M"
   },
   {
      "name":"Ogre Battle 64: Person of Lordly Caliber",
      "year_of_release":1999,
      "genre":"Role-Playing",
      "critic_score":96.0,
      "publisher":"Nintendo",
      "rating":""
   },
   {
      "name":"The Elder Scrolls V: Skyrim",
      "year_of_release":2011,
      "genre":"Role-Playing",
      "critic_score":96.0,
      "publisher":"Bethesda Softworks",
      "rating":"M"
   },
   {
      "name":"Pokemon Ruby/Pokemon Sapphire",
      "year_of_release":2002,
      "genre":"Role-Playing",
      "critic_score":95.0,
      "publisher":"Nintendo",
      "rating":""
   },
   {
      "name":"Pokemon X/Pokemon Y",
      "year_of_release":2013,
      "genre":"Role-Playing",
      "critic_score":95.0,
      "publisher":"Nintendo",
      "rating":""
   },
   {
      "name":"Arc the Lad",
      "year_of_release":1995,
      "genre":"Role-Playing",
      "critic_score":94.0,
      "publisher":"Sony Computer Entertainment",
      "rating":""
   },
   {
      "name":"Diablo",
      "year_of_release":1996,
      "genre":"Role-Playing",
      "critic_score":94.0,
      "publisher":"Activision",
      "rating":"M"
   },
   {
      "name":"Legend of Mana",
      "year_of_release":1999,
      "genre":"Role-Playing",
      "critic_score":94.0,
      "publisher":"SquareSoft",
      "rating":""
   },
   {
      "name":"Pokemon Omega Ruby/Pokemon Alpha Sapphire",
      "year_of_release":2014,
      "genre":"Role-Playing",
      "critic_score":94.0,
      "publisher":"Nintendo",
      "rating":""
   }
]
```

## Request: GET `/api/years`

Response: a list of distinct years that games were released in the database. It technically contains:

* `year_of_release`: (INTEGER) the year the game was released

## Request: GET `/api/rankings/`
    
### Parameters
* `limit`: (Required, INTEGER) controls how many video games to put in the ranking
* `year`: (Optional, INTEGER) restrains the rankings to games released only in a certain year

### Response
A JSON list of dictionaries that ranks the top <limit> games from <year> or of all time. Each dictionary contains:

* `name`: (STRING) the video game's title
* `year_of_release`: (INTEGER) the year the game was released
* `genre`: (STRING) the category of game, such as RPG or Sports
* `critic_score`: (FLOAT) the aggregate score by Metacritic staff
* `publisher`: (STRING) the publisher/developer of the game.

### Example(s)
**Call:** `/api/rankings/10?year=2011`

**Response:**
```
[
   {
      "name":"Batman: Arkham City",
      "year_of_release":2011,
      "genre":"Action",
      "critic_score":96.0,
      "publisher":"Warner Bros. Interactive Entertainment"
   },
   {
      "name":"FIFA 12",
      "year_of_release":2011,
      "genre":"Sports",
      "critic_score":96.0,
      "publisher":"Electronic Arts"
   },
   {
      "name":"The Elder Scrolls V: Skyrim",
      "year_of_release":2011,
      "genre":"Role-Playing",
      "critic_score":96.0,
      "publisher":"Bethesda Softworks"
   },
   {
      "name":"The Smurfs",
      "year_of_release":2011,
      "genre":"Action",
      "critic_score":96.0,
      "publisher":"Ubisoft"
   },
   {
      "name":"Portal 2",
      "year_of_release":2011,
      "genre":"Shooter",
      "critic_score":95.0,
      "publisher":"Valve Software"
   },
   {
      "name":"Dragon Ball Kai: Ultimate Butouden",
      "year_of_release":2011,
      "genre":"Fighting",
      "critic_score":94.0,
      "publisher":"Namco Bandai Games"
   },
   {
      "name":"Nintendogs + cats",
      "year_of_release":2011,
      "genre":"Simulation",
      "critic_score":94.0,
      "publisher":"Nintendo"
   },
   {
      "name":"The Legend of Zelda: Skyward Sword",
      "year_of_release":2011,
      "genre":"Action",
      "critic_score":93.0,
      "publisher":"Nintendo"
   },
   {
      "name":"Chainz Galaxy",
      "year_of_release":2011,
      "genre":"Puzzle",
      "critic_score":92.0,
      "publisher":"Avanquest"
   },
   {
      "name":"Rayman Origins",
      "year_of_release":2011,
      "genre":"Platform",
      "critic_score":92.0,
      "publisher":"Ubisoft"
   }
]
```