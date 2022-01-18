import User from './User';
import moment from 'moment';
moment().format();

class Customer extends User {
  constructor(customerData) {
    super(customerData)
    this.allBookings = [];
    this.pastBookings = [];
    this.upcomingBookings = [];
    this.availableRooms = [];
  }

  getBookings(bookingData, currentDate) {
    let myBookings = this.populateAllBookings(bookingData);
    this.pastBookings = [];
    this.upcomingBookings = [];
    myBookings.forEach(booking => {
      this.groupBookings(booking, currentDate);
    });

    this.pastBookings = this.sortBookingsByDate(this.pastBookings);
    this.upcomingBookings = this.sortBookingsByDate(this.upcomingBookings);
  }

  sortBookingsByDate(bookings) {
    return bookings.sort((currentBooking, nextBooking) => {
      return moment(new Date(currentBooking.date)).unix() < moment(new Date(nextBooking.date)).unix() ? -1 : 1;
    });
  } 
  
  populateAllBookings(bookings) {
    this.allBookings = bookings.filter(booking => booking.userID === this.id);
    return this.sortBookingsByDate(this.allBookings)
  } 

  groupBookings(booking, currentDate) {
    let dateToCompare = moment(new Date(currentDate)).format("YYYY/MM/DD");
    if (moment(new Date(dateToCompare)).isAfter(moment(new Date(booking.date)), "day")) {
      this.pastBookings.push(booking);
    } 
    if (moment(new Date(dateToCompare)).isBefore(moment(new Date(booking.date)), "day")) {
      this.upcomingBookings.push(booking);
    }
    if (dateToCompare === booking.date) {
      this.upcomingBookings.push(booking);
    } 
  }

  calculateTotalSpent(roomData) {
    const totalCost = roomData.reduce((acc, room) => {
      this.allBookings.forEach(booking => {
        if (room.number === booking.roomNumber) {
          acc += room.costPerNight;
        }
      })
      return acc;
    }, 0)
    return Number(totalCost.toFixed(2));
  }

  greetCurrentUser() {
    let firstName = this.name.split(' ')[0];
    return `Welcome, ${firstName}. We are dying for you to join us!`;
  }

  setAvailableRooms(availableRooms) {
    this.availableRooms = availableRooms;
  }

  getAvailableRooms() {
    return this.availableRooms;
  }

}

export default Customer;