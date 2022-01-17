import User from './User';
import moment from 'moment';
moment().format();

class Customer extends User {
  constructor(customerData) {
    super(customerData)
    this.allBookings = [];
    this.pastBookings = [];
    this.upcomingBookings = [];
  }

  gatherCustomerBookings(bookings) {
    this.allBookings = bookings.filter(booking => booking.userID === this.id);
    return this.allBookings.sort((currentBooking, nextBooking) => {
      currentBooking.date < nextBooking.date ?
        -1 : 1;
    });
  } 

  organizeBookings(booking, currentDate) {
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
    return `Welcome, ${firstName}!`;
  }
    
  //   gatherCustomerBookings(bookings) {
  //     this.allBookings = bookings.filter(booking => booking.userID === this.id);
  //     return this.allBookings.sort((currentBooking, nextBooking) => {
  //       currentBooking.date < nextBooking.date ?
  //         -1 : 1;
  //     });
  //   } 
      
  sortBookings(bookingData, currentDate) {
    let myBookings = this.gatherCustomerBookings(bookingData);
    console.log(myBookings)
    myBookings.forEach(booking => {
      this.organizeBookings(booking, currentDate);
    })
  }

}





export default Customer;