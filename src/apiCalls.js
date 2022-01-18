let roomsApi = fetch("http://localhost:3001/api/v1/rooms")
  .then(response => response.json())

let bookingsApi = () => {
  return fetch("http://localhost:3001/api/v1/bookings")
    .then(response => response.json())
}

let usersApi = fetch("http://localhost:3001/api/v1/customers")
  .then(response => response.json())

let postBooking = (bookingData, id) => {
  const booking = {
    "userID": id,
    "date": bookingData.date,
    "roomNumber": bookingData.roomNumber,
  }
  return fetch("http://localhost:3001/api/v1/bookings", {
    method: 'POST',
    body: JSON.stringify(booking),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
}
export {roomsApi, bookingsApi, usersApi, postBooking}