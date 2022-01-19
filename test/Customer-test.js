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
    customerOne.getBookings(sampleBookingData, '2022/01/27');
    expect(customerOne.allBookings).to.deep.equal([sampleBookingData[1], sampleBookingData[4]]);

    customerTwo.getBookings(sampleBookingData, '2022/01/24')
    expect(customerTwo.allBookings).to.deep.equal([]);
  });

  it('should return total amount spend on rooms', () => {
    customerOne.getBookings(sampleBookingData, '2022/01/27');
    expect(customerOne.calculateTotalSpent(sampleRoomData)).to.equal(787.84);

    customerTwo.getBookings(sampleBookingData, '2022/01/27');
    expect(customerTwo.calculateTotalSpent(sampleRoomData)).to.equal(0);
  })

  it('should be able to populate customer bookings', () => {
    customerOne.populateAllBookings(sampleBookingData);
    expect(customerOne.allBookings.length).to.equal(2);

    customerTwo.populateAllBookings(sampleBookingData)
    expect(customerTwo.allBookings.length).to.equal(0);
  })

  it('should correctly sort customer bookings', () => {
    customerOne.getBookings(sampleBookingData, '2022/01/27');
    customerOne.sortBookingsByDate(customerOne.allBookings);
    expect(customerOne.allBookings.length).to.equal(2);
    expect(customerOne.allBookings).to.deep.equal([sampleBookingData[1], sampleBookingData[4]])
  
    customerTwo.getBookings(sampleBookingData, '2022/01/27');
    customerTwo.sortBookingsByDate(customerTwo.allBookings)
    expect(customerTwo.allBookings.length).to.equal(0);
    expect(customerTwo.allBookings).to.deep.equal([]);
  })

  it('should correctly group customer bookings', function () {
    customerOne.getBookings(sampleBookingData, '2022/01/27');
    customerOne.groupBookings(sampleBookingData, "2022/01/27");
    expect(customerOne.pastBookings.length).to.equal(1);
    expect(customerOne.pastBookings).to.deep.equal([sampleBookingData[1]]);
    expect(customerOne.upcomingBookings.length).to.equal(1)
    expect(customerOne.upcomingBookings).to.deep.equal([sampleBookingData[4]]);

    customerTwo.getBookings(sampleBookingData, '2022/01/27');
    customerTwo.groupBookings(sampleBookingData, "2022/01/27")
    expect(customerTwo.allBookings.length).to.equal(0);
    expect(customerTwo.pastBookings.length).to.equal(0);
    expect(customerTwo.upcomingBookings.length).to.equal(0);
  });
  
})