// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import sampleUserData from './data/sample-users';
import Customer from '../src/classes/Customer';
import domUpdates from '../src/domUpdates'

import {
    roomsApi,
    bookingsApi,
    usersApi,
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
// const photoContainerArea = document.getElementById('photoContainer')
// const userDashboardView = document.querySelector('.user-dashboard')
const modal = document.getElementById("myModal");
const loginModal = document.getElementById('loginModal')
const span = document.getElementsByClassName("close")[0];
const spanLogin = document.getElementById("loginClose");


// Event Listeners

dashboardButton.addEventListener('click', () => {
    domUpdates.renderDashboard(currentUser, roomsData);   
    domUpdates.showModal(modal);       
})
loginButton.addEventListener('click', () => {
    domUpdates.showModal(loginModal);
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

Promise.all([roomsApi, bookingsApi, usersApi])
    .then(data => {
        [roomsData, bookingsData, usersData] = 
    [data[0].rooms, data[1].bookings, data[2].customers];
        let userIndex = getRandomIndex(usersData);

        currentUser = new Customer(usersData[userIndex]);
        currentUser.getBookings(bookingsData, new Date())
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

// Helper Functions

function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

const toggleShow = (elements) => {
    elements.forEach(element => {
        if (element.classList.contains('hidden')) {
            console.log('hidddeeeennn')
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    });
}


  

  