const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.querySelector('#count')
const total = document.querySelector('#total')
const movieSelect = document.querySelector('#movie')
let ticketPrice = parseInt(movieSelect.value);

populateUI()



//Save selected movie index and price 
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)

}


// function to update number in Count and Total variables
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

    //Return selected seats index to be saved in an array
        const seatsIndex = [...selectedSeats].map(function (seat) {
        return [...seats].indexOf(seat);

    })
    
    // saving Seat index to local stroage 
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

}

// Get data from local storage and populate UI 
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}



//Update count and total when new movie is sleected wuthout changing seats
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +(e.target.value)
    setMovieData(e.target.selectedIndex, e.target.value)
    

    updateSelectedCount();
})



// seat click event
container.addEventListener('click', function (e) {
    if (
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
    }
    
updateSelectedCount()

})


//Intial count and total set
updateSelectedCount();