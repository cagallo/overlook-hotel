import moment from 'moment';
moment().format();

/* QUERY SELECTORS */
const loginButton = document.getElementById('loginButton')
const loginModal = document.getElementById('loginModal')
const loginMessage = document.getElementById('loginMessage')
const dashboardButton = document.getElementById('userDashboardButton');
const welcomeMsg = document.getElementById('welcomeMsg');
const totalSpent = document.getElementById('totalCost');


const reservationInfo = document.getElementById("reservationInfo")
const upcomingReservations = document.getElementById("upcoming");
const pastReservations = document.getElementById("past")

const availableRoomsSection = document.getElementById("availableRooms")
const searchDate = document.getElementById("bookingDate");
const searchRoomType = document.getElementById("roomType");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

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
    console.log(customer)
    welcomeMsg.innerText = customer.greetCurrentUser();
    totalSpent.innerText = customer.calculateTotalSpent(roomsData);

    if (customer.allBookings.length === 0) {
      reservationInfo.innerHTML += `<p class="reservation-msg">Sorry, you have no past or upcoming reservations. Book now!</p>`;
    }

    if (customer.upcomingBookings.length > 0) {
      populateBookings(customer.upcomingBookings, roomsData, upcomingReservations)
    } else {
      upcomingReservations.innerHTML += `<p class="reservation-msg">Sorry, you have no upcoming reservations. Book one now!</p>`;
    }

    if (customer.pastBookings.length > 0) {
      populateBookings(customer.pastBookings, roomsData, pastReservations)
    } else {
      pastReservations.innerHTML += `<p class="reservation-msg">Sorry, you have no upcoming reservations. Book one now!</p>`;
    }
  },
  renderAvailableRooms(searchCriteria, currentUser) {
		
    availableRoomsSection.innerHTML = '';
    console.log(moment(new Date(searchCriteria.date)).unix())
    console.log(searchCriteria.date)
    console.log(moment(new Date()).unix())
    const formattedDate = moment(new Date()).format("YYYY-MM-DD");
    if (moment(new Date(searchCriteria.date)).unix() < moment(new Date(formattedDate)).unix()) {
      availableRoomsSection.innerHTML = `
				<p>Please select today or a date in the future
				</p>
				`;
    } else if (currentUser.availableRooms.length < 1) {
      availableRoomsSection.innerHTML = `
			<p>Sorry ${currentUser.name}, 
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
								<button value="${room.id}" id="bookRoomButton" class="book-room-button booking-buttons">Book Room</button>
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

    return {date, type}
  },
  clearSearchCriteria() {
    searchDate.value = '';
    searchRoomType.selectedIndex = "0";
  },
  getLoginInfo() {
    let username = usernameInput.value
    let password = passwordInput.value
    console.log(username)
    console.log(password)
    return { username, password }
  },
  displaySuccessfulLogin() {
    setTimeout(() => {
      console.log("should print after 2 secs")
      dashboardButton.classList.remove('hidden');
      loginButton.innerText = 'Log Out';
      domUpdates.closeModal(loginModal);
      loginMessage.innerText = "";
      usernameInput.value = "";
      passwordInput.value = "";
    }, 2000);
    loginMessage.innerText = "You have successful logged in!";
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

export default domUpdates;