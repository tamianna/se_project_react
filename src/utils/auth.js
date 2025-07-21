const BASE_URL = 'http://localhost:3001'

export const register = ({ email, password, name, avatar }) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, avatar}),
    }).then((res) => (res.ok ? res.json() : Promise.reject(res)))
}

export const authorize = ({ email, password }) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(res)))
}

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => (res.ok ? res.json() : Promise.reject(res)))
}