"use strict";
const button = document.querySelector("#button");
let searchField = document.querySelector("#searchField");
let searchResults = document.querySelector("#searchResults");
let searchResults2 = document.querySelector("#searchResults2");
let searchResults3 = document.querySelector("#searchResults3");
let moviePoster = document.querySelector("#movieposter");
let searchResults4 = document.querySelector("#searchResults4");
let loadingGIF = document.querySelector("#loading");
async function getMovie(searchInput) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f2e9364cb5msh4871bf96e730354p1564fajsnef80add6fcd2',
            'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
        }
    };
    const response = await fetch('https://movie-database-alternative.p.rapidapi.com/?s=' + searchInput + '&r=json&page=1', options);
    const data = await response.json();
    return data;
}
button.addEventListener('click', function (event) {
    event.preventDefault();
    loadingGIF.style.display = "block";
    getMovie(searchField.value).then((data) => {
        setTimeout(function () {
            loadingGIF.style.display = "none";
            let hits = data.totalResults;
            if (hits === undefined) {
                hits = "0";
            }
            searchResults.innerHTML = hits + " hits";
            searchResults2.innerHTML = "<b>#1 " + data.Search[0].Title + "</b><br>" + data.Search[0].Type + " from " + data.Search[0].Year;
            moviePoster.src = data.Search[0].Poster;
            searchResults4.innerHTML = `<a href="https://www.imdb.com/title/${data.Search[0].imdbID}" target="_blank">IMDB Link</a>`;
        }, 500);
    });
});
