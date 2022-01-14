import {
  expect
} from 'chai';
import Room from '../src/classes/Room';
    
    
describe('Room', () => {
  let sampleRoom;
    
  beforeEach(() => {
    const roomData = {
      "number": 1,
      "roomType": "residential suite",
      "bidet": true,
      "bedSize": "queen",
      "numBeds": 1,
      "costPerNight": 358.4
    };
  
    sampleRoom = new Room(roomData);
  });
    
  it('should be a function', () => {
    expect(Room).to.be.a('function');
  });
    
  it('should be an instance of Room', () => {
    expect(sampleRoom).to.be.an.instanceOf(Room);
  });
    
  it('should have a number property', () => {
    expect(sampleRoom).to.have.a.property('number');
  });
      
  it('should store a room number', () => {
    expect(sampleRoom.number).to.equal(1);
  });

  it('should have a room type property', () => {
    expect(sampleRoom).to.have.a.property('roomType');
  });
      
  it('should store a room type', () => {
    expect(sampleRoom.roomType).to.equal("residential suite");
  });

  it('should have a bidet property', () => {
    expect(sampleRoom).to.have.a.property('bidet');
  });
      
  it('should store a bidet option', () => {
    expect(sampleRoom.bidet).to.be.true;
  });

  it('should have a bed size property', () => {
    expect(sampleRoom).to.have.a.property('bedSize');
  });
      
  it('should store a bed size', () => {
    expect(sampleRoom.bedSize).to.equal("queen");
  });

  it('should have a number of beds property', () => {
    expect(sampleRoom).to.have.a.property('numBeds');
  });
      
  it('should store the number of beds in the room', () => {
    expect(sampleRoom.numBeds).to.equal(1);
  });

  it('should have a cost per night property', () => {
    expect(sampleRoom).to.have.a.property('costPerNight');
  });
      
  it('should store a room cost per night', () => {
    expect(sampleRoom.costPerNight).to.equal(358.4);
  });

})

