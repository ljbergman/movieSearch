
    // search button
    const button = document.querySelector("#button") as HTMLButtonElement;
    
    // searchField.value = user provided search string
    let searchField = document.querySelector("#searchField") as HTMLInputElement;
   
    // search results DIV (number of movies containing that search phrase)
    let searchResults = document.querySelector("#searchResults") as HTMLDivElement;
 
     // search results DIV2 (movie Name)
     let searchResults2 = document.querySelector("#searchResults2") as HTMLDivElement;   

     // search results DIV3 (movie poster)
     let searchResults3 = document.querySelector("#searchResults3") as HTMLDivElement;   

     // search results movie poster
     let moviePoster = document.querySelector("#movieposter") as HTMLImageElement;   

     // search results DIV4 (IMDB link)
     let searchResults4 = document.querySelector("#searchResults4") as HTMLDivElement;   

     // loading GIF
     let loadingGIF = document.querySelector("#loading") as HTMLDivElement;
   
           
   

    async function getMovie(searchInput: string) {

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'f2e9364cb5msh4871bf96e730354p1564fajsnef80add6fcd2',
                'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
            }
        };

        const response = await fetch('https://movie-database-alternative.p.rapidapi.com/?s=' + searchInput + '&r=json&page=1', options)
        const data = await response.json();

        return data;
     
    }

    button.addEventListener('click', function(event) {
        event.preventDefault();

        loadingGIF.style.display = "block"; // show loadingGIF for a minimum of 500 miliseconds (see setTimeout below)

        // searchField.value = user provided search string, for example Forest Gump 
        getMovie(searchField.value).then((data: any) => {
            setTimeout(function () {          
                loadingGIF.style.display = "none"; // hide loadingGIF when finished loading  
                
                // Number of search hits (movies found)
                let hits:string = data.totalResults;
                if(hits === undefined) { hits = "0"; }
                searchResults.innerHTML = hits + " träffar";                
                // Movie Name, Year and Type (movie, series etc)
                searchResults2.innerHTML = "<b>#1 " + data.Search[0].Title + "</b><br>" + data.Search[0].Type + " from " + data.Search[0].Year;               
                // Movie Poster
                moviePoster.src = data.Search[0].Poster; 
                // IMDB Link to the Movie
                searchResults4.innerHTML = `<a href="https://www.imdb.com/title/${data.Search[0].imdbID}" target="_blank">IMDB Link</a>`;              
                
            }, 500);
        });      

   
    });


    // ### BOTTEN SLASK ##################
    //console.log(data); 
   //getMovie(searchInput);
   // JSON.stringify(xxx);


    


     
   
    


