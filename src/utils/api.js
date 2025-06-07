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
const addItem = (item) => {
  return fetch(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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

export default { getItems, addItem, deleteItem }
