const roomsApi = () => {
  return fetch("http://localhost:3001/api/v1/rooms")
    .then(response => errorReponse(response))
}

const bookingsApi = () => {
  return fetch("http://localhost:3001/api/v1/bookings")
    .then(response => errorReponse(response))
}

const getSingleUser = (id) => {
  return fetch(`http://localhost:3001/api/v1/customers/${id}`)
    .then(response => errorReponse(response))
}

const usersApi = () => {
  return fetch("http://localhost:3001/api/v1/customers")
    .then(response => errorReponse(response))
} 

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
  }).then(response => errorReponse(response))
}

const errorReponse = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('There was an error. Please try again.');
  }
}
export {roomsApi, bookingsApi, getSingleUser, usersApi, postBooking}