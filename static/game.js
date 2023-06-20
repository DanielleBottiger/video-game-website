/*
 * Dani Bottiger & Alia Babinet
 * CS 257 SOFTWARE DESIGN - Fall 2021
 *
 * Video Games Game Info Page Java Script
 */

window.onload = initialize;

function initialize() {

    homePage();
    recommendationsPage();
    rankingsPage();
    comparisonsPage();
    aboutPage();

    loadGameBasic();

    let selected_platform_left = document.getElementById('platform-selector')
    if (selected_platform_left){
        selected_platform_left.addEventListener("change", function(){ 
            loadSelectedPlatform(); 
        });
    }

}

function getBaseURL() {
    let baseURL = window.location.protocol
                    + '//' + window.location.hostname
                    + ':' + window.location.port;
    return baseURL;
}

// LINK FUNCTIONS
function homePage(){
    let url = getBaseURL() + '/';
    let link = document.getElementById('home_page');
    if (link){
        link.innerHTML = '<a href= "' + url + '">Home</a>';
    }
}

function recommendationsPage(){
    let url = getBaseURL() + '/recommendations/';
    let link = document.getElementById('recommendations_page');
    if (link){
        link.innerHTML = '<a href= "' + url + '">Recommendations</a>';
    }
}

function rankingsPage(){
    let url = getBaseURL() + '/rankings/';
    let link = document.getElementById('rankings_page');
    if (link){
        link.innerHTML = '<a href= "' + url + '">Rankings</a>';
    }
}

function comparisonsPage(){
    let url = getBaseURL() + '/comparisons/';;
    let link = document.getElementById('comparisons_page');
    if (link){
        link.innerHTML = '<a href= "' + url + '">Comparisons</a>';
    }
}

function aboutPage(){
    let url = getBaseURL() + '/about/';
    let link = document.getElementById('about_page');
    if (link){
        link.innerHTML = '<a href= "' + url + '">About</a>';
    }
}

// GAME SPECIFIC
function loadGameBasic(){
    //Load list of games that have the search term in them.
    //search orignally = ?game=<search_term>
    //so we need to do string formatting first.
    video_game = window.location.search.substring(6);
    video_game = video_game.replaceAll('+', ' ');

    video_game = video_game.split(" ");

    url = getBaseURL() + '/api/get_game/' + video_game;

    let game_data = [];
    fetch(url, {method: 'get'})

    .then((response) => response.json())

    .then(function(result){
        if (Object.keys(result).length >= 2){ //every get_game request should have the basic info and at least 1 version.

            //saving information to game_data as well so we can use it in other function calls
            game_data.push({
                'name':result[0]['name'],
                'year_of_release': result[0]['year_of_release'],
                'genre':result[0]['genre'],
                'publisher':result[0]['publisher'],
                'rating': result[0]['rating']
            });
            
            for (var i = 1; i < Object.keys(result).length; i++){
                game_data.push({
                    'platform':result[i]['platform'],
                    'na_sales': result[i]['na_sales'],
                    'eu_sales':result[i]['eu_sales'],
                    'jp_sales':result[i]['jp_sales'],
                    'other_sales': result[i]['other_sales'],
                    'global_sales': result[i]['global_sales'],
                    'critic_score': result[i]['critic_score'],
                    'critic_count': result[i]['critic_count'],
                    'user_score': result[i]['user_score'],
                    'user_count': result[i]['user_count']
                });
            }
            displayGame(game_data);
            loadGamePlatforms(game_data);

        } else {
            selectPlatforms([], div);
            loadGamePlatform(url, div);
            let game_basic_info = document.getElementById('basic-paragraph1');
            if (game_basic_info){
                game_basic_info.innerHTML = "No results found. This game does not exist in the database.";
            }
        }
    })
    .catch(function(error) {
        console.log(error);
    });
}

function displayGame(game_data){
    // displays the game info on the page

    // setting up the string
    let game_info = "";
    game_info +=  '<h1>' + game_data[0]['name'] + '</h1>' +
    '<p>Year Released: ' + game_data[0]['year_of_release'] + '</p>' +
    '<p>Genre: ' + game_data[0]['genre'] + '</p>' +
    '<p>Publisher: ' + game_data[0]['publisher'] + '</p>' +
    '<p>Rating: ' + game_data[0]['rating'] + '</p>';

    //actually displaying
    let game_basic_info = document.getElementById('basic-paragraph1');
    if (game_basic_info){
        game_basic_info.innerHTML = game_info;
    }
}

function loadGamePlatforms(game_data){
    //instead of a giant list, let's have the user pick the platform so the information is bit sized.
    let platformSelection = '<option value="' + '-' + '"> '
                            + '-'
                            + ' </option>\n';
    for (let i = 1; i < game_data.length; i++) {
        let platform = game_data[i]['platform'];
        platformSelection += '<option value="' + platform + '"> '
                            + platform
                            + ' </option>\n';
    }
    platformSelection+= "</select>";

    let platforms = document.getElementById('platform-selector');
    if (platforms) {
        platforms.innerHTML = platformSelection;
    }
}

function loadSelectedPlatform(){
    //a platform has been selected! let's actually load it now.
    video_game = window.location.search.substring(6);
    video_game = video_game.replaceAll('+', ' ');

    video_game = video_game.split(" ");

    url = getBaseURL() + '/api/get_game/' + video_game;

    fetch(url, {method: 'get'})

    .then((response) => response.json())

    .then(function(game_data){
        let platformVersion = "";
        if (Object.keys(game_data).length >= 2){
            //saving information to game_data as well so we can use it after the
            //results go away after the fetch.
            platform = document.getElementById('platform-selector').value;

            for (let i = 1; i < game_data.length; i++){
                if (game_data[i]['platform'] == platform){
                    //we don't need to save this information for later use, so let's 
                    platformVersion+= '<h2>' + game_data[i]['platform'] + ' Version </h2>' +
                    '<h3>Sales (in millions)</h3>' +
                    '<p>North America Sales: ' + game_data[i]['na_sales'] + '</p>' +
                    '<p>Europe Sales: ' + game_data[i]['eu_sales'] + '</p>' +
                    '<p>Japan Sales: ' + game_data[i]['jp_sales'] + '</p>' +
                    '<p>Other Sales: ' + game_data[i]['other_sales'] + '</p>' +
                    '<p>Global Sales: ' + game_data[i]['global_sales'] + '</p>' +
                    '<h3>Metacritic Scores</h3>' +
                    '<p>Critic Score: ' + game_data[i]['critic_score'] + '</p>' +
                    '<p>Critic Score Count: ' + game_data[i]['critic_count'] + '</p>' +
                    '<p>User Score: ' + game_data[i]['user_score'] + '</p>' +
                    '<p>User Score Count: ' + game_data[i]['user_count'] + '</p>' +
                    '<br>';
                }
            }
        } else {
            platformVersion = "";
        }

        let platformHTML = document.getElementById('platform-game-info');
        if (platformHTML) {
            platformHTML.innerHTML = platformVersion;
        }

    })
    .catch(function(error) {
        console.log(error);
    });
}
