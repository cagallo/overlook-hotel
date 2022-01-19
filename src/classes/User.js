// import Customer from './Customer';

class User {
  constructor(customerData) {
    this.id = customerData.id;
    this.name = customerData.name;
  }

  greetCurrentUser() {
    let firstName = this.name.split(' ')[0];
    return `Welcome, ${firstName}! We are dying for you to join us!`;
  }
    
}

export default User;
    

