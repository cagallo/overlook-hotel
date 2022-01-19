/* IMPORTS */

import './css/base.scss';
import Customer from '../src/classes/Customer';
import domUpdates from '../src/domUpdates';

import {
  roomsApi,
  bookingsApi,
  getSingleUser,
  usersApi,
} from './apiCalls';

import moment from 'moment';
moment().format();

import './images/background-red.png';
import './images/overlook-hotel-main2.png';
import './images/the-grady-twins.png';
import './images/residential-suite.png';
import './images/suite.png';
import './images/single-room.jpg';
import './images/juniorsuite.jpg';

/* GLOBAL VARIABLES */

let currentUser;
let roomsData, bookingsData, usersData;

/* QUERY SELECTORS */

const dashboardButton = document.getElementById('userDashboardButton');
const loginModal = document.getElementById('loginModal');
const loginButton = document.getElementById('loginButton');

/* FUNCTIONS */

Promise.all([roomsApi(), bookingsApi(), usersApi()])
  .then(data => {
    [roomsData, bookingsData, usersData] = [data[0].rooms, data[1].bookings, data[2].customers];
  })
  .catch(error => console.log(error));


function getBookingData(id) {
  return bookingsData.find(booking => {
    return booking.id === id;
  });
}

function getAvailableRooms({ date, type }) {
  const formattedDate = moment(new Date()).format('YYYY-MM-DD');
  if (moment(new Date(date)).unix() < moment(new Date(formattedDate)).unix()) {
    return [];
  }
  const matchingRooms = bookingsData.filter(booking => {
    date = date.replace(/-/g, '/')
    if (booking.date !== date) {
      return false;
    }

    const matchingRoom = roomsData.find(room => booking.roomNumber === room.number);

    type = type.replace('-', ' ');
    if (!matchingRoom || 
			currentUser.id === booking.userID ||
			type !== 'all rooms' && 
			type !== matchingRoom.roomType) {
      return false;
    }

    for (const key in matchingRoom) { 
      booking[key] = matchingRoom[key];
    }

    switch (matchingRoom.roomType) {
    case 'residential suite':
      booking.imageURL = './images/residential-suite.png';
      booking.alt = 'bed in residential suite';
      break;
    case 'suite':
      booking.imageURL = './images/suite.png';
      booking.alt = 'bed in suite';
      break;
    case 'junior suite':
      booking.imageURL = './images/juniorsuite.jpg';
      booking.alt = 'bed in junior suite';
      break;
    case 'single room':
      booking.imageURL = './images/single-room.jpg';
      booking.alt = 'bed in single room';
      break;
    }
		
    return booking;
  });

  return matchingRooms;
}

function verifyCustomerLogin({username, password}) {
  let customerId = username.substring(8);
  let parsedId = Number(customerId);
  if ((username.length === 10) && (0 < parsedId && parsedId < 51) && (password === 'overlook2021')) {
    getSingleUser(parsedId)
      .then(data => {
        currentUser = new Customer(data)
        currentUser.getBookings(bookingsData, new Date())
      })
      .then(domUpdates.displaySuccessfulLogin())
      .catch(error => console.log(error));
  }
}


/* EVENT LISTENERS */

loginButton.addEventListener('click', () => {
  if (!currentUser) {
    domUpdates.showModal(loginModal);
  } else {
    currentUser = null;
    loginButton.innerText = "Customer Login";
    dashboardButton.classList.add('hidden');
  }
})





export {currentUser, roomsData, usersData, bookingsData, verifyCustomerLogin, getAvailableRooms, getBookingData}