const API_URL = "http://localhost:3000"
const POST_HEADERS = [
    ]


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

let getUserChallenges = (userId) => {
    let userChallenges = fetch(API_URL + `/users/${userId}`).then(r => r.json())
    return userChallenges
}

let makeChallenge = (difficulty, user) => {
    let promiseObj = fetch(API_URL + '/challenges', {
        POST_HEADERS,
        body: JSON.stringify({
            difficulty: difficulty,
            user: user
        })
    }).then(r => r.json())
    return promiseObj
}