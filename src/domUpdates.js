import moment from 'moment';
moment().format();

/* QUERY SELECTORS */
const welcomeMsg = document.getElementById('welcomeMsg');
const totalSpent = document.getElementById('totalCost');

const reservationInfo = document.getElementById("reservationInfo")
const upcomingReservations = document.getElementById("upcoming");
const pastReservations = document.getElementById("past")

function populateBookings(bookings, roomsData, reservationSection) {
    console.log(bookings)
    bookings.forEach(booking => {
        const bookedRoom = roomsData.find(room => {
            return booking.roomNumber === room.number;
        });

        const bookingDate = moment(booking.date);
        const formattedDate = bookingDate.format('MMM D YYYY');

        reservationSection.innerHTML += `
        <div>
        <article class="card">
            <div class="past-date">
                <h2 class="date">${formattedDate}</h2>
                <h3 class="room-type">${bookedRoom.roomType}</h3>
            </div>
            <div class="text-area">
                <p id="typeOfBed">${bookedRoom.numBeds} ${bookedRoom.bedSize}</p>
                <p id="costPerNight">$${bookedRoom.costPerNight} per night</p>
            </div>
        </article>
        </div>
        `
    });
}

let domUpdates = {
    renderDashboard(customer, roomsData) {
        welcomeMsg.innerText = customer.greetCurrentUser();
        totalSpent.innerText = customer.calculateTotalSpent(roomsData);

        if (customer.allBookings.length === 0) {
            reservationInfo.innerHTML += "<p>Sorry, you have no past or upcoming reservations. Book now!</p>"
        }

        if (customer.upcomingBookings.length > 0) {
            populateBookings(customer.upcomingBookings, roomsData, upcomingReservations)
        } else {
            upcomingReservations.innerHTML += "<p>Sorry, you have no upcoming reservations. Book one now!</p>"
        }

        if (customer.pastBookings.length > 0) {
            populateBookings(customer.pastBookings, roomsData, pastReservations)
        } else {
            pastReservations.innerHTML += "<p>Sorry, you have no upcoming reservations. Book one now!</p>"
        }

        // room reservations
  
    },
    showModal(modal) {
        modal.style.display = "block";
    },
    closeModal(modal) {
        modal.style.display = "none";
    }
}
export default domUpdates;