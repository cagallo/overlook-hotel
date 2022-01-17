// import Customer from './Customer';

class User {
  constructor(customerData) {
    this.id = customerData.id;
    this.name = customerData.name;
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

export default User;
    

