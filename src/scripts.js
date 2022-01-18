// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import sampleUserData from './data/sample-users';
import Customer from '../src/classes/Customer';
import domUpdates from '../src/domUpdates'

import {
  roomsApi,
  bookingsApi,
  getSingleUser,
  usersApi,
  postBooking
} from './apiCalls';

import moment from 'moment';
moment().format();

import './images/background-red.png';
import './images/overlook-hotel-main2.png';
import './images/the-grady-twins.png';

console.log('This is the JavaScript entry file - your code begins here.');

// Global Variables
let currentUser;

let roomsData, bookingsData, usersData;

// Query Selectors 
const dashboardButton = document.getElementById('userDashboardButton');
const loginButton = document.getElementById('loginButton')
const searchRoomsButton = document.getElementById('findRoomButton')
const clearSearchButton = document.getElementById('clearSearchButton')
const loginSubmitButton = document.getElementById('submitLoginButton');

// const photoContainerArea = document.getElementById('photoContainer')
// const userDashboardView = document.querySelector('.user-dashboard')
const modal = document.getElementById("myModal");
const loginModal = document.getElementById('loginModal')
const span = document.getElementsByClassName("close")[0];
const spanLogin = document.getElementById("loginClose");
const availableRoomsSection = document.getElementById("availableRooms")

// Event Listeners

dashboardButton.addEventListener('click', () => {
  console.log('rendering dashboard...')
  console.log(currentUser)
  domUpdates.renderDashboard(currentUser, roomsData);   
  domUpdates.showModal(modal);       
})
loginButton.addEventListener('click', () => {
  if (!currentUser) {
    domUpdates.showModal(loginModal);
  } else {
    currentUser = null;
    loginButton.innerText = "Customer Login";
    dashboardButton.classList.add('hidden');
  }
})
searchRoomsButton.addEventListener('click', () => {
  const searchCriteria = domUpdates.getSearchCriteria();
  const availableRooms = getAvailableRooms(searchCriteria);
  currentUser.setAvailableRooms(availableRooms);
  domUpdates.renderAvailableRooms(searchCriteria, currentUser);

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
        .catch(err => domUpdates.showBookingStatus(roomInfo, err))
    })
  })
})
clearSearchButton.addEventListener('click', () => {
  domUpdates.clearSearchCriteria();
})
loginSubmitButton.addEventListener('click', () => {
  console.log('login clicked')
  const loginData = domUpdates.getLoginInfo();
  console.log(loginData)
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

// Functions

// function getUsersData(currentUser) {
//   fetch("http://localhost:3001/api/v1/customers")
// }

// function getBookingsData() {
//   fetch("http://localhost:3001/api/v1/bookings")
//     .then(response => response.json())
//     .then(data => data.filter())
// }

Promise.all([roomsApi, bookingsApi(), usersApi])
  .then(data => {
	
    [roomsData, bookingsData, usersData] = 
    [data[0].rooms, data[1].bookings, data[2].customers];
    console.log('test')
    // let userIndex = getRandomIndex(usersData);

    // currentUser = new Customer(usersData[userIndex]);
    // currentUser.getBookings(bookingsData, new Date())
  })
  .catch(error => console.log(error));

// function getLoginUser() {
//     /** will be called from click event when login button is clicked
//      * get username and password from respective form elements
//      * extract id from username
//      * make api call to get specific user by id
//      * use response to instantiate new Customer
//      */
// }
function getBookingData(id) {
  return bookingsData.find(booking => {
    return booking.id === id;
  })
}

function getAvailableRooms({ date, type }) {
  console.log(date)
  console.log(moment(new Date(date)).unix())
  const formattedDate = moment(new Date()).format("YYYY-MM-DD");
  console.log(moment(new Date(formattedDate)).unix())
  if (moment(new Date(date)).unix() < moment(new Date(formattedDate)).unix()) {
    return [];
  }

  const matchingRooms = bookingsData.filter(booking => {
    
    date = date.replace(/-/g, '/')
    if (booking.date !== date) {
      return false;
    }
		
    const matchingRoom = roomsData.find(room => {
      return booking.roomNumber === room.number;
    });
    
    type = type.replace('-', ' ');
    if (!matchingRoom || 
			currentUser.id === booking.userID ||
			type !== 'all rooms' && 
			type !== matchingRoom.roomType) {
      return false;
    }

    // populate booking object with data for the matching room
    for (const key in matchingRoom) { 
      booking[key] = matchingRoom[key];
    }
    booking.imageURL = './images/the-grady-twins.png'
    booking.alt = 'test alt';
		
    return booking;
  });

  return matchingRooms;
}

function verifyCustomerLogin({username, password}) {
  console.log('running')
  console.log(username)
  let customerId = username.substring(8);
  console.log(customerId);
  let parsedId = Number(customerId);
  console.log(parsedId);
  if ((username.length === 10) && (0 < parsedId && parsedId < 51) && (password === 'overlook2021')) {
    console.log("here")
    getSingleUser(parsedId)
      .then(data => {
        currentUser = new Customer(data)
        currentUser.getBookings(bookingsData, new Date())
      })
      .then(domUpdates.displaySuccessfulLogin())
      .catch(error => console.log(error));
  }
}

// Helper Functions
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

const toggleShow = (elements) => {
  elements.forEach(element => {
    if (element.classList.contains('hidden')) {
      element.classList.remove('hidden');
    } else {
      element.classList.add('hidden');
    }
  });
}


