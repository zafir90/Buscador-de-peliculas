document.getElementById('searchButton').addEventListener('click', searchMovie)

let api_key = 'ead3840d0307d1b5fb0ffa20cb24042d'
let urlBase = 'https://api.themoviedb.org/3/search/movie'
let urlImg = 'https://image.tmdb.org/t/p/w200'

let resultContainer = document.getElementById('results')

// Obtener el campo de entrada de texto por su ID
let campoTexto = document.getElementById('searchInput');

campoTexto.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        // Simula hacer clic en el botón
        searchButton.click();
    }
});

function searchMovie() {
    resultContainer.innerHTML = 'Cargando...'
    let searchInput = document.getElementById('searchInput').value

    fetch(`${urlBase}?api_key=${api_key}&query=${searchInput}&lang=es`)
        .then(response => response.json())
        .then(response => displayMovies(response.results)) //results sale del json que responde en la consola
}

function displayMovies(movies) {
  
    resultContainer.innerHTML = ''

    if (movies.length === 0) {
        resultContainer.innerHTML = '<p> No se encontraron resultados para tu busqueda </p>'
        return
    }

    movies.forEach(movie => {
        let movieDiv = document.createElement('div')
        movieDiv.classList.add('movie')

        let title = document.createElement('h2')
        title.textContent = movie.title //title sale del json que responde en la consola

        let releaseDate = document.createElement('p')
        releaseDate.textContent = 'La fecha de lanzamiento fue: ' + movie.release_date //release_date sale del json que responde en la consola

        let overview = document.createElement('p')
        overview.textContent = movie.overview //overview sale del json que responde en la consola

        let posterPath = urlImg + movie.poster_path
        let poster = document.createElement('img')
        poster.src = posterPath

        let calification = document.createElement('h3')
        calification.textContent = 'Calificacion: ' + Math.floor(movie.vote_average) 

        movieDiv.appendChild(poster)
        movieDiv.appendChild(title)
        movieDiv.appendChild(releaseDate)
        movieDiv.appendChild(overview)
        movieDiv.appendChild(calification)

        resultContainer.appendChild(movieDiv)


    }) 

}