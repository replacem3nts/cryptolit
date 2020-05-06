const API_URL = "http://localhost:3000"

let getAllUsers = () => {
    fetch(API_URL + '/users')
    .then(r => r.json())
    .then(userArray => userArray.forEach(user => allUsers.push(user)))
}

let getUserChallenges = (userId) => {
    let userChallenges = fetch(API_URL + `/users/${userId}`).then(r => r.json())
    return userChallenges
}

let makeChallenge = (difficulty, user) => {
    let promiseObj = fetch(API_URL + '/challenges', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            difficulty: difficulty,
            user: user
        })
    }).then(r => r.json())
    return promiseObj
}