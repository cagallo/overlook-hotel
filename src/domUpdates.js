import moment from 'moment';
moment().format();
import {
  bookingsApi,
  postBooking
} from './apiCalls';
import {currentUser, roomsData, usersData, bookingsData, verifyCustomerLogin, getAvailableRooms, getBookingData} from './scripts';


/* QUERY SELECTORS */

const loginButton = document.getElementById('loginButton');
const dashboardButton = document.getElementById('userDashboardButton');
const loginModal = document.getElementById('loginModal')
const loginMessage = document.getElementById('loginMessage')
const welcomeMsg = document.getElementById('welcomeMsg');
const totalSpent = document.getElementById('totalCost');
const searchRoomsButton = document.getElementById('findRoomButton');
const clearSearchButton = document.getElementById('clearSearchButton');
const loginSubmitButton = document.getElementById('submitLoginButton');
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const spanLogin = document.getElementById("loginClose");
const reservationInfo = document.getElementById("reservationInfo")
const upcomingReservations = document.getElementById("upcoming");
const pastReservations = document.getElementById("past")
const availableRoomsSection = document.getElementById("availableRooms")
const searchDate = document.getElementById("bookingDate");
const searchRoomType = document.getElementById("roomType");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

/* FUNCTIONS */

function populateBookings(bookings, roomsData, reservationSection) {
  reservationSection.innerHTML = '';
	
  bookings.forEach(booking => {
    const bookedRoom = roomsData.find(room => {
      return booking.roomNumber === room.number;
    });

    const bookingDate = moment(new Date(booking.date));
    const formattedDate = bookingDate.format('MMM D YYYY');

    reservationSection.innerHTML += `
        <div>
        <article class="booking-card" id=${booking.id}>
            <div class="past-date">
                <h2 class="date">${formattedDate}</h2>
                <h3 class="room-type">${bookedRoom.roomType}</h3>
            </div>
            <div class="booking-info">
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
      reservationInfo.innerHTML += `<p class="reservation-msg">Sorry, you have no past or upcoming reservations. Book now!</p>`;
    }

    if (customer.upcomingBookings.length > 0) {
      populateBookings(customer.upcomingBookings, roomsData, upcomingReservations)
    } else {
      upcomingReservations.innerHTML += `<p class="reservation-msg">Sorry, you have no upcoming reservations. Book now!</p>`;
    }

    if (customer.pastBookings.length > 0) {
      populateBookings(customer.pastBookings, roomsData, pastReservations)
    } else {
      pastReservations.innerHTML += `<p class="reservation-msg">Sorry, you have no upcoming reservations. Book now!</p>`;
    }
  },

  renderAvailableRooms(searchCriteria, currentUser) {
    availableRoomsSection.innerHTML = '';
    const formattedDate = moment(new Date()).format('YYYY-MM-DD');
    if (moment(new Date(searchCriteria.date)).unix() < moment(new Date(formattedDate)).unix()) {
      availableRoomsSection.innerHTML = `
				<p class="reservation-error">
        Please select today or a date in the future
				</p>
				`;
    } else if (currentUser.availableRooms.length < 1) {
      availableRoomsSection.innerHTML = `
			<p class="reservation-error">Sorry ${currentUser.name}, 
			no rooms were found for date: ${searchCriteria.date}
			for selected type: ${searchCriteria.type} 
			Please adjust selection and try again.
			</p>
			`;
    }
    currentUser.availableRooms.forEach(room => {
      availableRoomsSection.innerHTML += `
        <div class="room-card" id="${room.number}">
					<div class="image-cost-type">
            <div class="img-container">
                <img 
								src="${room.imageURL}"
								class="room-thumbnail" 
								alt="${room.alt}"
								>
								<div class="book-room-container">
								<button value="${room.id}" id="bookRoomButton" class="book-room-button booking-buttons" aria-label="book room button">Book Room</button>
								</div>
            </div>
						 		<div class="type-price">
                <h4 class="room-type">Room Type: ${room.roomType}</h4>
								<h4 class="room-cost">Price Per Night: $${room.costPerNight}</h4>
								<div>
					</div>
					<div class="room-info">
								<ul class="room-bed-info">
									<li>Beds: ${room.numBeds} </li>
									<li>Size: ${room.bedSize} </li>
									<li>Bidet: ${room.bidet ? "Yes" : "No"}</li>
								</ul>
            </div>
            </div>
          `;
    });
  },

  getSearchCriteria() {
    const date = searchDate.value;
    const type = searchRoomType.value;

    return {date, type};
  },
  
  clearSearchCriteria() {
    searchDate.value = '';
    searchRoomType.selectedIndex = "0";
    availableRoomsSection.innerHTML = '';
  },

  clearRoomSearch() {
    setTimeout(() => {
      domUpdates.clearSearchCriteria();
    }, 2000);
  },

  getLoginInfo() {
    let username = usernameInput.value;
    let password = passwordInput.value;
    return { username, password };
  },

  displaySuccessfulLogin() {
    setTimeout(() => {
      dashboardButton.classList.remove('hidden');
      loginButton.innerText = 'Log Out';
      domUpdates.closeModal(loginModal);
      loginMessage.innerText = '';
      usernameInput.value = '';
      passwordInput.value = '';
    }, 2000);
    loginMessage.innerText = 'You have successfully logged in!';
  },

  displayUnsuccessfulLogin() {
    loginMessage.innerText = "Password Invalid. Please try again."
  },

  showModal(modal) {
    modal.classList.add("showModal")
    modal.classList.remove("hideModal")
  },

  closeModal(modal) {
    modal.classList.add("hideModal")
    modal.classList.remove("showModal")
  },

  showBookingStatus(roomInfoDiv, info) {
    roomInfoDiv.innerHTML += `<p>${info.message}</p>`
  }
}


/* EVENT LISTENERS */

dashboardButton.addEventListener('click', () => {
  domUpdates.renderDashboard(currentUser, roomsData);   
  domUpdates.showModal(modal);       
})

searchRoomsButton.addEventListener('click', () => {
  const searchCriteria = domUpdates.getSearchCriteria();
  const availableRooms = getAvailableRooms(searchCriteria);
  currentUser.setAvailableRooms(availableRooms);
  domUpdates.renderAvailableRooms(searchCriteria, currentUser);

  // Adding Event listeners to each card rendered from the rooms search

  const bookings = document.querySelectorAll(".room-card");
  bookings.forEach(booking => {
    const button = booking.querySelector(".book-room-button");
    const roomInfo = booking.querySelector(".room-info")
    button.addEventListener('click', function (event) {
      const bookingData = getBookingData(event.target.value);
      postBooking(bookingData, currentUser.id)
        .then((message) => {
          domUpdates.showBookingStatus(roomInfo, message);
          bookingsApi().then(data => {
            currentUser.getBookings(data.bookings, new Date())
            domUpdates.renderDashboard(currentUser, roomsData)
          });
        })
        .then(domUpdates.clearRoomSearch())
        .catch(err => domUpdates.showBookingStatus(roomInfo, err));
    })
  })
})

clearSearchButton.addEventListener('click', () => {
  domUpdates.clearSearchCriteria();
})

loginSubmitButton.addEventListener('click', () => {
  const loginData = domUpdates.getLoginInfo();
  verifyCustomerLogin(loginData);
})

span.addEventListener('click', () => {
  domUpdates.closeModal(modal);
})

spanLogin.addEventListener('click', () => {
  domUpdates.closeModal(loginModal);
})

window.addEventListener('click', (event) => {
  if (event.target === modal || event.target === loginModal) {
    domUpdates.closeModal(event.target);
  }
});

export default domUpdates;