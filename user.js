class User {
    static loggedIn = []

    constructor(user) {
        this.user = user
        User.loggedIn.push(this)
        this.handleChallenges()
        
    }

    handleChallenges() {
        getUserChallenges(this.user.id).then((user) => {
            Challenge.clearAll()
            user.challenges.forEach((challenge) => {
                new Challenge(challenge)})
            Viewtools.resetAllChildren()
            Challenge.renderUserView()
        })
    }
}

// consider using helper method to create basic elements and append them to the DOM
// getter/setter for user from loggedIn 