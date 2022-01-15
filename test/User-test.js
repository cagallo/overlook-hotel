import {
  expect
} from 'chai';
import Customer from '../src/classes/Customer';
import User from '../src/classes/User';
import sampleUserData from '../src/data/sample-users';
import sampleBookingData from '../src/data/sample-bookings';
import sampleRoomData from '../src/data/sample-rooms';
  
  
describe('User', () => {
  let userOne, userTwo;
  
  beforeEach(() => {
    userOne = new User(sampleUserData[0]);
    userTwo = new User(sampleUserData[1]);
  });
  
  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', () => {
    expect(userOne).to.be.an.instanceOf(User);
  });

  it('should have an id property', () => {
    expect(userOne).to.have.a.property('id');
  });

  it('should store an id', () => {
    expect(userOne.id).to.equal(1);
  });

  it('should have a name property', () => {
    expect(userOne).to.have.a.property('name');
  });

  it('should store a name', () => {
    expect(userOne.name).to.equal("Leatha Ullrich")
  });

//   it("should have booking arrays", () => {
//     userTwo.gatherCustomerBookings(sampleBookingData);
//     expect(userTwo.allbookings).to.deep.equal([]);
//     expect(userTwo.pastBookings).to.deep.equal([]);
//     expect(userTwo.upcomingBookings).to.deep.equal([]);
//   });

  it("should be able to have a different id and name", () => {
    expect(userTwo.id).to.equal(2);
    expect(userTwo.name).to.equal("Rocio Schuster");
  });

  it("should be able to greet current user by name", () => {
    expect(userOne.greetCurrentUser()).to.equal("Welcome, Leatha!");

    expect(userTwo.greetCurrentUser()).to.equal("Welcome, Rocio!");
  });

  it('should be able to return user bookings', () => {
    expect(userOne.gatherCustomerBookings(sampleBookingData)).to.deep.equal([sampleBookingData[1], sampleBookingData[4]]);

    expect(userTwo.gatherCustomerBookings(sampleBookingData)).to.deep.equal([]);
  });

  it('should return total amount spend on rooms', () => {
    userOne.gatherCustomerBookings(sampleBookingData);
    expect(userOne.calculateTotalSpent(sampleRoomData)).to.equal(787.84);

    userTwo.gatherCustomerBookings(sampleBookingData);
    expect(userTwo.calculateTotalSpent(sampleRoomData)).to.equal(0);
  })

  it('should correctly sort customer bookings', function () {
    userOne.sortBookings(sampleBookingData, "2022/01/27")
    console.log(userOne.allBookings)
    expect(userOne.allBookings.length).to.equal(2);
    expect(userOne.pastBookings.length).to.equal(1);
    expect(userOne.pastBookings).to.deep.equal([sampleBookingData[1]]);
    expect(userOne.upcomingBookings.length).to.equal(1)
    expect(userOne.upcomingBookings).to.deep.equal([sampleBookingData[4]]);

    userTwo.sortBookings(sampleBookingData, "2022/01/27")
    expect(userTwo.allBookings.length).to.equal(0);
    expect(userTwo.pastBookings.length).to.equal(0);
    expect(userTwo.upcomingBookings.length).to.equal(0);
  });

});
  

