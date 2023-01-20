
    let hostDomain = 'rapidapi.com';
    let akey = 'p1564fajsnef80add6fcd';
    let mNum = 0;
    

    // search button
    const button = document.querySelector("#button") as HTMLButtonElement;
    
    // next button
    const button2 = document.querySelector("#button2") as HTMLButtonElement;

    // searchField.value = user provided search string
    let searchField = document.querySelector("#searchField") as HTMLInputElement;
   
    // search results DIV (number of movies containing that search phrase)
    let searchResults = document.querySelector("#searchResults") as HTMLDivElement;
 
    // search hits DIV (number of movies containing that search phrase)
    let searchHits = document.querySelector("#searchHits") as HTMLDivElement;
    
     // search results DIV2 (movie Name)
     let searchResults2 = document.querySelector("#searchResults2") as HTMLDivElement;   

     // search results DIV3 (movie poster)
     let searchResults3 = document.querySelector("#searchResults3") as HTMLDivElement;   

     // search results movie poster
     let moviePoster = document.querySelector("#movieposter") as HTMLImageElement;   

     // search results DIV4 (IMDB link)
     let searchResults4 = document.querySelector("#searchResults4") as HTMLDivElement;   

     // next Result DIV
     let nextResult = document.querySelector("#nextResult") as HTMLDivElement;  

     // loading GIF
     let loadingGIF = document.querySelector("#loading") as HTMLDivElement;
   
           
   

    async function getMovie(searchInput: string) {

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'f2e9364cb5msh4871bf96e730354' + akey + '2',
                'X-RapidAPI-Host': 'movie-database-alternative.p.' + hostDomain + '',
            }
        };

        const response = await fetch('https://movie-database-alternative.p.rapidapi.com/?s=' + searchInput + '&r=json&page=1', options)
        const data = await response.json();

        return data;
     
    }


    // movieObject type interface
    interface movieObject {
        movie: Array<movieTypes>;
      }

      // movieTypes interface
      interface movieTypes {
        title: string;
        type: string;
        year: string;
        poster: string;
        imdbID: string;
      } 

    // Movie object to save movies in, using interface movieObject
    const movieObject: movieObject = {      
        movie: []
    }

    function showMovie(mNum: number):void {
        let mNum2 = mNum + 1;
       // Movie Name, Year and Type (movie, series etc)
       searchResults2.innerHTML = "<b>#" + mNum2 + " " + movieObject.movie[mNum].title + "</b><br>" + movieObject.movie[mNum].type + " from " + movieObject.movie[mNum].year;               
       // Movie Poster
       moviePoster.src = movieObject.movie[mNum].poster; 
       // IMDB Link to the Movie
       searchResults4.innerHTML = `<a href="https://www.imdb.com/title/${movieObject.movie[mNum].imdbID}" target="_blank">IMDB Link</a>`;
    }

    button.addEventListener('click', function(event) {
        event.preventDefault();

        loadingGIF.style.display = "block"; // show loadingGIF for a minimum of 1000 miliseconds (see setTimeout below)

        // Reset the movie array
        movieObject.movie = [];
        mNum = 0;

        // searchField.value = user provided search string, for example Forest Gump 
        getMovie(searchField.value).then((data: any) => {
            setTimeout(function () {          
                loadingGIF.style.display = "none"; // hide loadingGIF when finished loading  
                
                // Number of search hits (movies found)
                let hits:string = data.totalResults;
                if(hits === undefined) { hits = "0"; }
                if(parseInt(hits) > 10) { hits = "10"; }

                let showHits = hits + " hits";   
                searchHits.innerHTML = showHits;
                
                // Save the first 10 results in movieObject
                let newMovie: movieTypes;
                for (let key in data.Search) {
                        newMovie = { 
                        title: data.Search[key].Title, 
                        type: data.Search[key].Type, 
                        year: data.Search[key].Year, 
                        poster: data.Search[key].Poster, 
                        imdbID: data.Search[key].imdbID   
                    }
                    movieObject.movie.push(newMovie);
                }


            
            showMovie(mNum);

            nextResult.style.display = "block";
                

            }, 1000);
        });      

   

   
    });


    button2.addEventListener('click', function(event) {
    
        event.preventDefault();
        mNum = mNum + 1;
        if (mNum == movieObject.movie.length) { mNum = 0; }
        showMovie(mNum);

    });

    // ### BOTTEN SLASK ##################
    //console.log(data); 
   //getMovie(searchInput);
   // JSON.stringify(xxx);


    


     
   
    


