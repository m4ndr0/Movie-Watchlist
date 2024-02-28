const mainMyWatchlist = document.getElementById('main-my-watchlist')
const emptyLocalStorage = document.getElementById('empty-local-storage')
const nothingHere = document.getElementById('nothing-here')
const retrievedObject = localStorage.getItem('movieObj')
const retrivedArray = JSON.parse(retrievedObject)

console.log(`Movies in the array:`, retrivedArray)



function renderHtml(){
    if (retrivedArray){
        nothingHere.style.display = 'none'
        emptyLocalStorage.style.display = 'inline'
        retrivedArray.forEach(item =>{
            mainMyWatchlist.innerHTML += `
            <div class="response-parent-container">
                <div class="response-obj-container">
                    <img class="movie-poster" src="${item.Poster}" alt="Poster of the movie">
                    <div class="movie-info-container">
                        <h1>${item.Title}</h1>
                        <div class="min-and-genre-container">
                            <p>${item.Runtime}</p>
                            <p>Genre: ${item.Genre}</p>
                            <button class="remove-movie-btn" id="${retrivedArray.indexOf(item)}">-</button>
                        </div>
                        <p>${item.Plot}</p>
                    </div>
                </div>
            </div>
            `
        })
    }
}
    
renderHtml()

//This eventListener will clear the local storage and render the main container

document.getElementById('empty-local-storage').addEventListener('click', ()=>{
    localStorage.clear()
    nothingHere.style.display = 'block'
    emptyLocalStorage.style.display = 'none'
    mainMyWatchlist.innerHTML = `
    <div class="nothing-here" id="nothing-here">
        <span class="material-symbols-outlined">
            note_stack_add
        </span>
        <h3>Add movies to your list...</h3>
    </div>
    `
})

//This eventListener will target the selected movie button 
//in order to remove the related movie from the list

mainMyWatchlist.addEventListener('click', e=>{
    if (e.target.id){
        if (retrivedArray.length > 1){
            console.log(`${e.target.id} will be removed from the array`)
            retrivedArray.splice(e.target.id, 1)
            console.log(retrivedArray)
            localStorage.clear()
            saveToLocalStorage()
            mainMyWatchlist.innerHTML = ``
            renderHtml()
            } else {
                retrivedArray.splice(e.target.id, 1)
                localStorage.clear()
                nothingHere.style.display = 'block'
                emptyLocalStorage.style.display = 'none'
                mainMyWatchlist.innerHTML = `
                <div class="nothing-here" id="nothing-here">
                    <span class="material-symbols-outlined">
                        note_stack_add
                    </span>
                    <h3>Add movies to your list...</h3>
                </div>
                `
                console.log('Nothing in the array')
            }
        
    }
})


function saveToLocalStorage(){
    let string = JSON.stringify(retrivedArray)
    localStorage.setItem('movieObj', string)
}