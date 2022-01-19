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

  it("should be able to have a different id and name", () => {
    expect(userTwo.id).to.equal(2);
    expect(userTwo.name).to.equal("Rocio Schuster");
  });

  it("should be able to greet current user by name", () => {
    expect(userOne.greetCurrentUser()).to.equal("Welcome, Leatha! We are dying for you to join us!");

    expect(userTwo.greetCurrentUser()).to.equal("Welcome, Rocio! We are dying for you to join us!");
  });

})


  