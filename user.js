class User {
    static loggedIn

    constructor(user) {
        this.user = user
        this.id = user.id
        this.challenges = user.challenges
        User.loggedIn = this
        this.createUserView()
        
    }

    createUserView() {
        User.handleChallenges()
        this.createNewChallenge()
    }

    updateChallenge(challenge) {
        this.chIndex = this.challenges.findIndex(ch => ch.id === challenge.id)
        this.challenges = [...this.challenges.splice(this.chIndex, 1), challenge]
        this.createUserView()
    }
    
    static handleChallenges() {
        Challenge.clearAll()
        Viewtools.resetAllChildren()
        this.loggedIn.challenges.forEach((challenge) => {
                new Challenge(challenge)
            })
        Challenge.all[Challenge.all.length - 1].renderChallenge()
        Challenge.renderUserView()
    }
        
    createNewChallenge() {
        this.difficulties = [1, 2, 3]

        this.newChallengeForm = document.createElement('form')
        this.diffSelect = document.createElement('select')
        this.diffSelect.className = 'my-button'
        
        for (let i = 0; i < this.difficulties.length; i++) {
            this.diffOption = document.createElement('option')
            this.diffOption.innerText = this.difficulties[i] 
            this.diffOption.value = this.difficulties[i]
            this.diffSelect.append(this.diffOption)
        }
        
        
        this.diffSelectLabel = document.createElement('label')
        this.diffSelectLabel.innerText = `Select Difficulty: `
        
        this.submitDiv = document.createElement('div')
        this.newChallengeSubmit = document.createElement('input')
        this.newChallengeSubmit.type = 'submit'
        this.newChallengeSubmit.value = 'Get a New Puzzle!'
        this.newChallengeSubmit.className = 'my-button'
        this.submitDiv.append(this.newChallengeSubmit)
        
        this.newChallengeForm.append(this.diffSelectLabel, this.diffSelect, this.submitDiv)
        newPuzzlePane.append(this.newChallengeForm)

        this.newChallengeForm.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this.form = evt.target
            this.difficulty = this.form[0].value
            makeChallenge(this.difficulty, this.id).then(challenge => {
                this.addNewToLoggedIn(challenge)
                User.handleChallenges()
            })
            
            
        })
    }
    addNewToLoggedIn(challenge) {
        this.challenges = [...this.challenges, challenge]
    }

    



}

// consider using helper method to create basic elements and append them to the DOM
// getter/setter for user from loggedIn 