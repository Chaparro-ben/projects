// https://www.omdbapi.com/?s=thor&page=&apikey=4053be5e
// https://www.omdbapi.com/?i=tt3896198&apikey=4053be5e
const movieSearchBox = document.getElementById("movie-search-box");
const searchList = document.getElementById("search-list");
const movieList = document.getElementById("movie-list");
const searchResultsList = document.getElementById("search-results-list");

async function main(searchTerm) {
  const movieURL = `https://www.omdbapi.com/?s=${searchTerm}&page=&apikey=4053be5e`;
  const movieResponse = await fetch(`${movieURL}`);
  const movieData = await movieResponse.json();
  if (movieData.Response == "True") displayMovieList(movieData.Search);
}

function findMovies() {
  let searchTerm = movieSearchBox.value.trim();
  if (searchTerm.length > 0) {
    movieList.classList.remove("hide-movie-list");
    main(searchTerm);
  } else {
    movieList.classList.add("hide-movie-list");
  }
}

function displayMovieList(movies) {
  searchResultsList.innerHTML = `
    <h2 class="search__title">
      Search Results: for "${movieSearchBox.value}"
    </h2>`;
  movieList.innerHTML = "";
  for (let i = 0; i < movies.length; i++) {
    let movieListTerm = document.createElement("div");
    movieListTerm.dataset.id = movies[i].imdbID;
    movieListTerm.classList.add("movie-list");
    if (movies[i].Poster != "N/A") moviePoster = movies[i].Poster;
    else moviePoster = "image_not_found.png";

    movieListTerm.innerHTML = `
      
      <div class="movie">
          <div class="movie-card">
              <img src="${moviePoster}" alt="">
              <h3 class="movie-title">${movies[i].Title}</h3>
              <div class="movie-description">
                  <p class="movie-year">${movies[i].Year}</p>
                  <p class="movie-series">${movies[i].Type}</p>
              </div>
          </div>
      </div>`;
    movieList.appendChild(movieListTerm);
  }
}

function filterMovies(event) {
  displayMovieList(event.target.value);
}
