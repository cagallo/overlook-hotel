import {
  expect
} from 'chai';
import Customer from '../src/classes/Customer';
import User from '../src/classes/User';
import sampleUserData from '../src/data/sample-users';
import sampleBookingData from '../src/data/sample-bookings';
import sampleRoomData from '../src/data/sample-rooms';


describe('Customer', () => {
  let customerOne, customerTwo;

  beforeEach(() => {
    customerOne = new Customer(sampleUserData[0]);
    customerTwo = new Customer(sampleUserData[1]);
  });

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('should be an instance of Customer', () => {
    expect(customerOne).to.be.an.instanceOf(Customer);
  });

  it('should be able to return customer bookings', () => {
    customerOne.gatherCustomerBookings(sampleBookingData);
    expect(customerOne.allBookings).to.deep.equal([sampleBookingData[1], sampleBookingData[4]]);

    customerTwo.gatherCustomerBookings(sampleBookingData)
    expect(customerTwo.allBookings).to.deep.equal([]);
  });

  it('should return total amount spend on rooms', () => {
    customerOne.gatherCustomerBookings(sampleBookingData);
    expect(customerOne.calculateTotalSpent(sampleRoomData)).to.equal(787.84);

    customerTwo.gatherCustomerBookings(sampleBookingData);
    expect(customerTwo.calculateTotalSpent(sampleRoomData)).to.equal(0);
  })

    
})
  



