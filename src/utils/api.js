const baseUrl = 'http://localhost:3001'

const _checkResponse = (res) => {
  if (res.ok) {
    return res.json()
  }

  return Promise.reject(`Error: ${res.status}`)
}

// GET all items
const getItems = () => {
  return fetch(`${baseUrl}/items`).then(_checkResponse)
}

// POST a new item
const addItem = (item, token) => {
  return fetch(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  }).then(_checkResponse)
}

// DELETE an item by ID
const deleteItem = (itemId) => {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: 'DELETE',
  }).then(_checkResponse)
}

//PATCH user info
const updateUser = ({ name, avatar }) => {
  const token = localStorage.getItem('jwt')
  return fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(_checkResponse)
}

//PUT like
const addCardLike = (itemId, token) => {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(_checkResponse)
}

//DELETE like
const removeCardLike = (itemId, token) => {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(_checkResponse)
}

export {
  getItems,
  addItem,
  deleteItem,
  _checkResponse,
  updateUser,
  addCardLike,
  removeCardLike,
}
