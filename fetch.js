const API_URL = "http://localhost:3000"

let getAllUsers = () => {
    fetch(API_URL + '/users')
    .then(r => r.json())
    .then(userArray => userArray.forEach(user => allUsers.push(user)))
}

let createUser = (username) => {
    let newUser = fetch(API_URL + `/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({username: username})
    }).then(r => r.json())
    return newUser
}

let makeChallenge = (difficulty, user_id) => {
    let newChallenge = fetch(API_URL + '/challenges', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            difficulty: difficulty,
            user_id: user_id
        })
    }).then(r => r.json())
    return newChallenge
}