const moviesWrapper = document.querySelector(".movies");
const searchName = document.querySelector(".searchName");
let currentMovies = [];

function searchChange(event) {
  renderMovies(event.target.value);
  searchName.innerHTML = event.target.value;
}

async function renderMovies(searchTerm) {
  if (!searchTerm || searchTerm.trim().length === 0) {
    return;
  }
  const spinner = document.querySelector(".movies__loading--spinner");
  spinner.classList.add("show");
  const response = await fetch(
    `http://www.omdbapi.com/?s=${searchTerm}&apikey=f1cf6984`
  );
  const data = await response.json();
  currentMovies = data.Search;
  callMovies(currentMovies);
  spinner.classList.remove("show");
}

function callMovies(movieList) {
  moviesWrapper.innerHTML = movieList
    .map((movie) => {
      return ` <div class="movie">
        <img src="${movie.Poster}" alt="${movie.Title}">
        <h2>${movie.Title}</h2>
        <h4>${movie.Year}</h4>
        <button class="info__btn2">Learn More</button>
    </div>
    `;
    })
    .join("");
}

function sortChange(event) {
  const sortOption = event.target.value;
  let sortedMovies = [...currentMovies];

  if (sortOption === "newest") {
    sortedMovies.sort((a, b) => b.Year - a.Year);
  } else if (sortOption === "oldest") {
    sortedMovies.sort((a, b) => a.Year - b.Year);
  }

  callMovies(sortedMovies);
}

function getSearchQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  const searchTerm = urlParams.get("query");
  if (searchTerm && searchTerm.trim().length > 0) {
    searchName.value = searchTerm;
    renderMovies(searchTerm);
  }
}

getSearchQuery();
