class User {
    static loggedIn

    constructor(user) {
        this.user = user
        User.loggedIn = this.user
        this.createUserView()
        
    }

    createUserView() {
        Challenge.clearAll()
        Viewtools.resetAllChildren()
        this.handleChallenges()
        this.createNewChallenge()
        Challenge.renderUserView()

    }

    handleChallenges() {
        getUserChallenges(this.user.id).then((user) => {
            user.challenges.forEach((challenge) => {
                new Challenge(challenge)})
        })
    }
        
    createNewChallenge() {
        let difficulties = [1, 2, 3]

        let newChallengeForm = document.createElement('form')
        let diffSelect = document.createElement('select')
        diffSelect.className = 'my-button'
        
        for (let i = 0; i < difficulties.length; i++) {
            let diffOption = document.createElement('option')
            diffOption.innerText = difficulties[i] 
            diffOption.value = difficulties[i]
            diffSelect.append(diffOption)
        }
        
        
        let diffSelectLabel = document.createElement('label')
        diffSelectLabel.innerText = `Select Difficulty: `
        
        let submitDiv = document.createElement('div')
        let newChallengeSubmit = document.createElement('input')
        newChallengeSubmit.type = 'submit'
        newChallengeSubmit.value = 'Get a New Puzzle!'
        newChallengeSubmit.className = 'my-button'
        submitDiv.append(newChallengeSubmit)
        
        newChallengeForm.append(diffSelectLabel, diffSelect, submitDiv)
        newPuzzlePane.append(newChallengeForm)

        newChallengeForm.addEventListener('submit', (evt) => {
            evt.preventDefault()
            let form = evt.target
            let difficulty = form[0].value
            let user_id = User.loggedIn.id
            makeChallenge(difficulty, user_id).then(challenge => console.log(challenge))
            
        })
    }



}

// consider using helper method to create basic elements and append them to the DOM
// getter/setter for user from loggedIn 