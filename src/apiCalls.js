let roomsApi = fetch("http://localhost:3001/api/v1/rooms")
  .then(response => response.json())

let bookingsApi = fetch("http://localhost:3001/api/v1/bookings")
  .then(response => response.json())

let usersApi = fetch("http://localhost:3001/api/v1/customers")
  .then(response => response.json())


export {roomsApi, bookingsApi, usersApi}