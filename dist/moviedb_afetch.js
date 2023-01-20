"use strict";
let hostDomain = 'rapidapi.com';
let akey = 'p1564fajsnef80add6fcd';
let mNum = 0;
const button = document.querySelector("#button");
const button2 = document.querySelector("#button2");
let searchField = document.querySelector("#searchField");
let searchResults = document.querySelector("#searchResults");
let searchHits = document.querySelector("#searchHits");
let searchResults2 = document.querySelector("#searchResults2");
let searchResults3 = document.querySelector("#searchResults3");
let moviePoster = document.querySelector("#movieposter");
let searchResults4 = document.querySelector("#searchResults4");
let nextResult = document.querySelector("#nextResult");
let loadingGIF = document.querySelector("#loading");
async function getMovie(searchInput) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f2e9364cb5msh4871bf96e730354' + akey + '2',
            'X-RapidAPI-Host': 'movie-database-alternative.p.' + hostDomain + '',
        }
    };
    const response = await fetch('https://movie-database-alternative.p.rapidapi.com/?s=' + searchInput + '&r=json&page=1', options);
    const data = await response.json();
    return data;
}
const movieObject = {
    movie: []
};
function showMovie(mNum) {
    let mNum2 = mNum + 1;
    searchResults2.innerHTML = "<b>#" + mNum2 + " " + movieObject.movie[mNum].title + "</b><br>" + movieObject.movie[mNum].type + " from " + movieObject.movie[mNum].year;
    moviePoster.src = movieObject.movie[mNum].poster;
    searchResults4.innerHTML = `<a href="https://www.imdb.com/title/${movieObject.movie[mNum].imdbID}" target="_blank">IMDB Link</a>`;
}
button.addEventListener('click', function (event) {
    event.preventDefault();
    loadingGIF.style.display = "block";
    movieObject.movie = [];
    mNum = 0;
    getMovie(searchField.value).then((data) => {
        setTimeout(function () {
            loadingGIF.style.display = "none";
            let hits = data.totalResults;
            if (hits === undefined) {
                hits = "0";
            }
            if (parseInt(hits) > 10) {
                hits = "10";
            }
            let showHits = hits + " hits";
            searchHits.innerHTML = showHits;
            let newMovie;
            for (let key in data.Search) {
                newMovie = {
                    title: data.Search[key].Title,
                    type: data.Search[key].Type,
                    year: data.Search[key].Year,
                    poster: data.Search[key].Poster,
                    imdbID: data.Search[key].imdbID
                };
                movieObject.movie.push(newMovie);
            }
            showMovie(mNum);
            nextResult.style.display = "block";
        }, 1000);
    });
});
button2.addEventListener('click', function (event) {
    event.preventDefault();
    mNum = mNum + 1;
    if (mNum == movieObject.movie.length) {
        mNum = 0;
    }
    showMovie(mNum);
});
