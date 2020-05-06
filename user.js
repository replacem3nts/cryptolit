class User {
    static loggedIn = []
    constructor(user) {
        this.user = user
        User.loggedIn.push(this)
        this.handleChallenges()
    }

    handleChallenges() {
        getUserChallenges(this.user.id).then((user) => {
            user.challenges.forEach((challenge) => {
                new Challenge(challenge)})
        })
    }
}