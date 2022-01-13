import {
  expect
} from 'chai';
import Customer from '../src/classes/Customer';


describe('Customer', () => {
  let sampleCustomer;

  beforeEach(() => {
    sampleCustomer = new Customer({ "id": 1, "name": "Leatha Ullrich"});
  });

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('should be an instance of Customer', () => {
    expect(sampleCustomer).to.be.an.instanceof(Customer);
  });

  it('should store an id property', () => {
    expect(sampleCustomer).to.have.a.property('id');
  });

  it('should have an id', () => {
    expect(sampleCustomer.id).to.equal(1);
  });

  it('should store a name property', () => {
    expect(sampleCustomer).to.have.a.property('name');
  });

  it('should have a name', () => {
    expect(sampleCustomer.name).to.equal("Leatha Ullrich")
  });

})