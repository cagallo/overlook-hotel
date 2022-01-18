const roomsApi = fetch("http://localhost:3001/api/v1/rooms")
  .then(response => response.json())

const bookingsApi = () => {
  return fetch("http://localhost:3001/api/v1/bookings")
    .then(response => response.json())
}

const getSingleUser = (id) => {
  return fetch(`http://localhost:3001/api/v1/customers/${id}`)
    .then(response => errorReponse(response))
}

const usersApi = fetch("http://localhost:3001/api/v1/customers")
  .then(response => response.json())

const postBooking = (bookingData, id) => {
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

const errorReponse = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Login error. Please try again.');
  }
}
export {roomsApi, bookingsApi, getSingleUser, usersApi, postBooking}