class User {
    static loggedIn

    constructor(user) {
        this.user = user
        this.id = user.id
        this.username = user.username
        this.challenges = user.challenges
        User.loggedIn = this
        this.createUserView()
        
    }

    createUserView() {
        this.handleChallenges()
        this.challenges.length > 0 ? Viewtools.returningUserWelcomeMessage() : Viewtools.newUserWelcomeMessage()
    }
    
    handleChallenges() {
        Challenge.clearAll()
        Viewtools.resetAllChildren()
        this.challenges.forEach((challenge) => {
            new Challenge(challenge)
        })
        Challenge.renderUserView()
    }
    
    addNewToLoggedIn(challenge) {
        this.challenges = [...this.challenges, challenge]
        this.handleChallenges()
    }    

    updateChallenge(challenge) {
        this.chIndex = this.challenges.findIndex(ch => ch.id === challenge.id)
        this.challenges.splice(this.chIndex, 1, challenge)
        this.handleChallenges()
    }
}