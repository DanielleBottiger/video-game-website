# Video Game Database Website

## Authors

Dani Bottiger & Alia Babinet created this website as a final project for CS257: Software Design in the Fall 2021 Trimester at Carleton College.

## Data

This is a database of video games and their scores, ratings, sales, and other information covering all games that sold over 100k copies from 1976 to January 2017. The database we used, made by Kendall Gillies,  can be found here: https://www.kaggle.com/kendallgillies/video-game-sales-and-ratings

## Status

We were able to get most we set out to do working. All the features on the website are fully implemented:

- *Home Page*: Displays the top 20 games of all time.
- *Recommendations*: Search for games of the same genre and rating depending on your input. Games with no rating will show up too because the database lacks some information.
- Rankings: Display the best games from all time or from a given year and choose how many display.
- *About*: Who made this and why? Find out there!
- *Search*: Get search results and be able to see information about just 1 game.
- *Game Info*: From a game link, look at the information of just 1 game in more detail. 
- *Comparisons*: Search two games and get their metacritic scores, sales, and more side by side to compare.

## Setup

Dani's computer is a bit funky, because of that, your config.py will need to be a bit funky as well. You'll need the addition of a specified port. Our `psycopg2.connect` in `api.py` will be looking for that port, so you'll need it.

Please create a `config.py` in the directory and format it like this:

```
database = 'video_games'
user = 'your_username'
password = 'your_password'
port = 5432
```

5432 is the default PSQL port, so it's likely this is what you'll have to use. For easiness, here is the SQL command to load the database: `psql -U my_user_name video_games < data.sql`.

The website can be started by running: `python3 app.py localhost 5000`. 