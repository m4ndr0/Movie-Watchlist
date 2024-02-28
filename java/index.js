const searchBtn = document.getElementById('search-btn')
const movieSearchField = document.getElementById('movie-search-field')
const main = document.getElementById('main')
const filmIconContainer = document.getElementById('film-icon-container')
const addedMsg = document.getElementById('added-msg')
const notFountMsg = document.getElementById('not-fount-msg')
const searchedMoviesArr = []
const addToWatchlistArray = []

// apiCall() will send a request with the title of the movie to the server,
// get back the movie data and render the movie on the container

function apiCall(){
    if (movieSearchField.value){
        fetch(`http://www.omdbapi.com/?t=${movieSearchField.value}&apikey=975414ce`)
            .then(res => res.json())
            .then(movie => {
                movieSearchField.value = ''
                if (movie.Response != 'False'){
                    filmIconContainer.style.display = 'none'
                    searchedMoviesArr.push(movie)
                    let seedHtml
                    searchedMoviesArr.forEach(item => {
                        seedHtml = `
                        <div class="response-parent-container">
                            <div class="response-obj-container">
                                <img class="movie-poster" src="${item.Poster}" alt="Poster of the movie">
                                <div class="movie-info-container">
                                    <h1>${item.Title}</h1>
                                    <div class="min-and-genre-container">
                                        <p>${item.Runtime}</p>
                                        <p>Genre: ${item.Genre}</p>
                                        <button class="add-movie-btn" id="${searchedMoviesArr.indexOf(item)}">+</button>
                                    </div>
                                    <p>${item.Plot}</p>
                                </div>
                            </div>
                        </div>
                        `
                        return seedHtml
                    }) 
                    main.innerHTML += seedHtml
                } else if (movie.Response === 'False') {
                    displayNotFountMsg()
                }
            })
    }
}


searchBtn.addEventListener('click', apiCall)

//////////////////////////////////////////////////////////////


//checkLocalStorageMovies() retrives the movies added to the watchlist from the localStorage and pushes them back
// into addToWatchlistArray (that's because every refresh will empty the array and saved data will be lost otherwise)

function checkLocalStorageMovies(){
    let retrievedObject = localStorage.getItem('movieObj')
    let retrivedArray = JSON.parse(retrievedObject)
    if (retrivedArray){
        retrivedArray.forEach(item =>{
            addToWatchlistArray.push(item)
        })
    }
}

checkLocalStorageMovies()


//This event targets the selected movie and pushes it into addToWatchlistArray
// + calls saveToLocalStorage()

main.addEventListener('click', e =>{
    if(e.target.id && e.target.id != 'film-icon-container'){
        console.log(e.target.id)
        let movieObj = searchedMoviesArr[e.target.id]
        if (!addToWatchlistArray.includes(movieObj)){
            addToWatchlistArray.push(movieObj)
            console.log('Pushed into addToWatchlistArray')
            saveToLocalStorage()
            displayAddedMsg()
        }else {
            console.log('Already into list')
        }
        
    }
})

document.getElementById('test').addEventListener('click', ()=>{localStorage.clear()})

function displayNotFountMsg(){
    notFountMsg.style.display = 'block'
    setTimeout(function(){
        notFountMsg.style.display = 'none'
    }, 2000)
}

function displayAddedMsg(){
    addedMsg.style.display = 'block'
    setTimeout(function(){
        addedMsg.style.display = 'none'
    }, 2000)
}


//Converts the array into a string and save it into the local storage

function saveToLocalStorage(){
    let string = JSON.stringify(addToWatchlistArray)
    localStorage.setItem('movieObj', string)
}
