import {
  expect
} from 'chai';
import Booking from '../src/classes/Booking';
import sampleBookingData from '../src/data/sample-bookings';

  
  
describe('Booking', () => {
  let sampleBooking;
  
  beforeEach(() => {
    sampleBooking = new Booking(sampleBookingData[0]);
  });
  
  it('should be a function', () => {
    expect(Booking).to.be.a('function');
  });
  
  it('should be an instance of Booking', () => {
    expect(sampleBooking).to.be.an.instanceOf(Booking);
  });
  
  it('should have an id property', () => {
    expect(sampleBooking).to.have.a.property('id');
  });
    
  it('should store a booking id', () => {
    expect(sampleBooking.id).to.equal("5fwrgu4i7k55hl6sz");
  });
    
  it('should have a userID property', () => {
    expect(sampleBooking).to.have.a.property('userID');
  });
    
  it('should store a userID', () => {
    expect(sampleBooking.userID).to.equal(9)
  });

  it('should have a date property', () => {
    expect(sampleBooking).to.have.a.property('date');
  });
    
  it('should store a booking date', () => {
    expect(sampleBooking.date).to.equal("2022/04/22")
  });
  
  it('should have a room number property', () => {
    expect(sampleBooking).to.have.a.property('userID');
  });
    
  it('should store a room number', () => {
    expect(sampleBooking.roomNumber).to.equal(5);
  });

  it('should have a room service charges property', () => {
    expect(sampleBooking).to.have.a.property('roomServiceCharges');
  });
    
  it('should store a room number', () => {
    expect(sampleBooking.roomServiceCharges).to.deep.equal([]);
  });
    
})


