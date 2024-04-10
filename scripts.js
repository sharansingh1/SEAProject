/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 * 
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your 
 *    browser and make sure you can see that change. 
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 * 
 */


const FRESH_PRINCE_URL = "https://upload.wikimedia.org/wikipedia/en/3/33/Fresh_Prince_S1_DVD.jpg";
const CURB_POSTER_URL = "https://m.media-amazon.com/images/M/MV5BZDY1ZGM4OGItMWMyNS00MDAyLWE2Y2MtZTFhMTU0MGI5ZDFlXkEyXkFqcGdeQXVyMDc5ODIzMw@@._V1_FMjpg_UX1000_.jpg";
const EAST_LOS_HIGH_POSTER_URL = "https://static.wikia.nocookie.net/hulu/images/6/64/East_Los_High.jpg";

// This is an array of strings (TV show titles)
let titles = [
    "Fresh Prince of Bel Air",
    "Curb Your Enthusiasm",
    "East Los High"
];

let watchList = []; 
// Your final submission should have much more data than this, and 
// you should use more than just an array of strings to store it all.


// This function adds cards the page to display the data in the array
// Add an event listener to the search input
document.getElementById("searchInput").addEventListener("input", function(event) {
    const searchQuery = event.target.value.trim().toLowerCase();
    showCards(searchQuery); 
});

function showCards(searchQuery) {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    const templateCard = document.querySelector(".card");
    
    animeMap.forEach((animeData, title) => {
        if (!searchQuery || title.toLowerCase().includes(searchQuery)) {
            const nextCard = templateCard.cloneNode(true);
            editCardContent(nextCard, title, animeData);
            cardContainer.appendChild(nextCard);
        }
    });
}

function editCardContent(card, title, animeData) {
    card.style.display = "block";

    const cardHeader = card.querySelector("h5");
    cardHeader.textContent = title;

    const cardImage = card.querySelector("img");
    cardImage.src = animeData.imageUrl; 
    cardImage.alt = title + " Poster";
}

document.getElementById("addAnimeForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const title = document.getElementById("titleInput").value;
    const genre = document.getElementById("genreInput").value;
    const releaseYear = parseInt(document.getElementById("releaseYearInput").value);
    const rating = parseFloat(document.getElementById("ratingInput").value);
    const imageFile = document.getElementById("imageInput").files[0]; 
    const imageUrl = URL.createObjectURL(imageFile);

    animeMap.set(title, {
        title: title,
        genre: genre.split(","),
        releaseYear: releaseYear,
        rating: rating,
        imageUrl: imageUrl 
    });

    showCards();
});



document.addEventListener("DOMContentLoaded", function() {
    showCards(); 
});

function quoteAlert() {
    console.log("Button Clicked!")
    alert("I guess I can kiss heaven goodbye, because it got to be a sin to look this good!");
}

function removeLastCard() {
    animeMap.pop(); 
    showCards(); 
}

document.getElementById("genre-selection").addEventListener("change", function() {
    const selectedGenre = this.value; 
    filterAnime(selectedGenre); 
});

function filterAnime(genre) {
    const filteredAnime = new Map();
  
    animeMap.forEach((animeData, title) => {
        if (animeData.genre.includes(genre)) {
            filteredAnime.set(title, animeData);
        }
    });

    displayFilteredAnime(filteredAnime);
}

function displayFilteredAnime(filteredAnime) {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = ""; 

    filteredAnime.forEach((animeData, title) => {
        const templateCard = document.querySelector(".card").cloneNode(true);
        editCardContent(templateCard, title, animeData);
        cardContainer.appendChild(templateCard);
    });
}


function addToList(button) {
    const title = button.previousElementSibling.textContent; 
    watchList.push(title);
    displayWatchlist();
}


function displayWatchlist() {
    const watchlistContainer = document.getElementById("watchlist");
    watchlistContainer.innerHTML = ""; 

    watchList.forEach(title => {
        const listItem = document.createElement("li");
        listItem.textContent = title;
        watchlistContainer.appendChild(listItem);
    });
}

document.getElementById("addAnimeForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const title = document.getElementById("titleInput").value;
    addToList(title);
    document.getElementById("titleInput").value = "";
});
