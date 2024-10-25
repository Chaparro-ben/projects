// https://www.omdbapi.com/?s=thor&page=&apikey=4053be5e
// https://www.omdbapi.com/?i=tt3896198&apikey=4053be5e
const movieList = document.querySelector(".movie-list")
const movieSearchBox = document.getElementById("movie-search-box")
const searchResultsList = document.getElementById("search-results-list");

async function main(searchTerm) {
    const movieURL = `https://www.omdbapi.com/?s=${searchTerm}&page=&apikey=4053be5e`
    const movieResponse = await fetch(`${movieURL}`)
    const moviesData = await movieResponse.json()
    movieList.innerHTML = 
    moviesData.Search.map(movies => displayMovie(movies)).join("")

}

function displayMovie(movies) {
    searchResultsList.innerHTML = `<h2 class="search__title">Search Results: for "${movieSearchBox.value}"</h2>`
    return `
        <div class="movie">
          <div class="movie-card">
              <img src="${movies.Poster}" alt="">
              <h3 class="movie-title">${movies.Title}</h3>
              <div class="movie-description">
                  <p class="movie-year">${movies.Year}</p>
                  <p class="movie-series">${movies.Type}</p>
              </div>
          </div>
      </div>`
    
    
}

function findMovies() {
    let searchTerm = movieSearchBox.value.trim();
    if (searchTerm.length > 0) {
        movieList.classList.remove("hide-movie-list")
        main(searchTerm)
    }
    else {
        movieList.classList.add("hide-movie-list")
    }
}

// function filterMovies(event) {
//   console.log(event.target.value)
// }


