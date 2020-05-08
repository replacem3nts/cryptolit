class Challenge {
    static solved = []
    static unsolved = []
    static diffCount = {
        1: 0,
        2: 0,
        3: 0
    }

    constructor(challenge) {
        this.challenge = challenge
        this.id = challenge.id
        this.solved = challenge.solved
        this.solvetime = challenge.solvetime
        this.cryptogram = challenge.cryptogram
        this.difficulty = challenge.puzzle.difficulty
        this.solved === true ? Challenge.solved.push(this) : Challenge.unsolved.push(this)
        if (this.solved === true) {Challenge.diffCount[this.difficulty]++}
    }

// Below are the helper methods to create the various parts of the crypogram puzzle rendered in the main viewer

    // This renders the elements at the top of page including the puzzle difficulty and solvetime  
    renderHeadElements() {
        this.headDisplay = document.createElement('div')
        this.headDisplay.id = 'head-display'
        
        this.diffDisplay = document.createElement('span')
        this.diffDisplay.innerText = `Difficulty Level: ${this.difficulty}`
        this.diffDisplay.className = 'head-elements'
        
        // this.timeDisplay = document.createElement('span')
        // this.timeDisplay.innerText = `Time: ${this.solvetime}`
        // this.timeDisplay.className = 'head-elements'
        
        this.headDisplay.append(this.diffDisplay)
        return this.headDisplay
    }
    
    // This renders the alphabet table at the bottom of page and draws on the 'handleInputToAll' to ensure that all matching form letters are filled with the same letter as input to the alphabet table
    renderAlphabetKey() {
        this.alphabetKey = document.createElement('div')
        this.alphabetKey.id = 'alphabet-key'
        
        this.alphabetTable = document.createElement('table')
        this.letterArray = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
        this.letterRow = document.createElement('tr')
        this.formRow = document.createElement('tr')
        this.letterArray.forEach(char => {
            this.letterCell = document.createElement('td')
            this.charLabel = this.createCharLabel(char)
            
            this.letterCell.append(this.charLabel)
            this.letterRow.append(this.letterCell)
            
            this.formCell = document.createElement('td')
            this.charInput = this.createCharInput(char)
            this.charInput.className = 'key-char-input'
            
            this.charInput.addEventListener('input', this.handleInputToAll)
            
            this.formCell.append(this.charInput)
            this.formRow.append(this.formCell)
        })
        
        this.alphabetTable.append(this.letterRow, this.formRow)
        this.alphabetKey.append(this.alphabetTable)
        return this.alphabetKey
    }

    // The three functions that follow are used in both the alphabetKeyDiv as well as the mainForm. All three are invoked to create the input, label and event listeners for the individual characters of the cryptogram.
    createCharInput(char) {
        this.charInput = document.createElement('input')
        this.charInput.type = 'text'
        this.charInput.id = `${char}`
        this.charInput.name = char
        this.charInput.maxLength = '1'
        return this.charInput
    }

    createCharLabel(char) {
        this.charLabel = document.createElement('label')
        this.charLabel.htmlFor = char
        this.charLabel.innerText = char
        return this.charLabel
    }

    handleInputToAll = (evt) => {
        this.inputLetter = evt.target.value
        this.letterForm = evt.target.name
        this.formInputs = document.querySelectorAll(`#solve-form #${this.letterForm}`)
        this.formInputs.forEach(input => {input.value = this.inputLetter})
    }

    // This renders the main cryptogram puzzle on screen. It starts by splitting the cryptogram to an array of words, then for each word, it creates a span ('wordSpan') which holds two (2) divs inside of it. When the function splits the word to an array of chars and iterates through them (line 99-100) it creates a form input for the letter and adds it to the 'fieldDiv', it also creates a label for the letter and adds it to the 'labelDiv.' The code is structured this way so that a flexbox can be applied to the 'mainCryptoDiv' and since the words (field and label both) are grouped, they will wrap without cutting words into two pieces. 
    renderMainForm() {
        this.cryptoArray = this.cryptogram.split(" ")
        this.mainCryptoDiv = document.createElement('div')
        this.mainCryptoDiv.id = "main-crypto-div"

        this.cryptoArray.forEach(word => {
            this.wordSpan = document.createElement('span')
            this.wordSpan.className = "word-span"

            this.fieldDiv = document.createElement('div')
            this.labelDiv = document.createElement('div')

            this.charArray = word.split('')
            this.charArray.forEach(char => {
                if (/[A-Z]/.test(char)) {
                    this.charInput = this.createCharInput(char)
                    this.charInput.className = 'char-input'

                    this.charInput.addEventListener('input', this.handleInputToAll)
                    
                    this.charLabel = this.createCharLabel(char)

                    this.charLabelSpan = document.createElement('span')
                    this.charLabelSpan.className = 'char-label'
                    this.charLabelSpan.append(this.charLabel)
                    
                    this.fieldDiv.append(this.charInput)
                    this.labelDiv.append(this.charLabelSpan)
                } else {
                    this.charSpan = document.createElement('span')
                    this.charSpan.innerText = char
                    this.charSpan.className = 'punctuation'
                    this.fieldDiv.append(this.charSpan)
                }
            })
            this.wordSpan.append(this.fieldDiv, this.labelDiv)
            this.mainCryptoDiv.append(this.wordSpan)
        })
        return this.mainCryptoDiv
    }

    renderChallengeSubmit() {
        this.submitDiv = document.createElement('div')
        this.submitDiv.id = 'challenge-submit-div'

        this.submitBtn = document.createElement('input')
        this.submitBtn.type = 'submit'
        this.submitBtn.value = 'Check It!'
        this.submitBtn.className = 'my-button'
        this.submitDiv.append(this.submitBtn)
        return this.submitDiv
    }

    renderChallenge() {
        Viewtools.resetChildren(mainViewer)        
        this.solveForm = document.createElement('form')
        this.solveForm.id = "solve-form"
        
        this.mainCryptoDiv = this.renderMainForm()
        this.alphabetKeyDiv = this.renderAlphabetKey()
        this.submitDiv = this.renderChallengeSubmit()
        
        this.solveForm.append(this.mainCryptoDiv, this.alphabetKeyDiv, this.submitDiv)
        
        this.headDisplay = this.renderHeadElements()
        mainViewer.append(this.headDisplay, this.solveForm)

        this.solveForm.addEventListener('submit', this.submitSolution)
    }

    submitSolution = (evt) => {
        evt.preventDefault()
        this.allInputFields = this.mainCryptoDiv.querySelectorAll('.char-input')
        this.inputArray = []
        this.allInputFields.forEach(input => this.inputArray.push(input.value))
        this.uniqueStr = [...new Set(this.inputArray)].join('').toUpperCase()
        trySolution(this.id, this.solvetime, this.uniqueStr).then(response => {
            if (!response.message) {
                User.loggedIn.updateChallenge(response)
                getChallengeAnswer(response.id).then(answer => Viewtools.displaySolution(answer))
            } else {
                console.log(response.message)
            }
        })
    }

// Resets Challenge.all when user logs in  
    static clearAll() {
        this.solved.length = 0
        this.unsolved.length = 0
        this.diffCount = {
            1: 0,
            2: 0,
            3: 0
        }
    }

// Enumerates through Challenge.all (a user's challenges) to build a hash counting number of solved challenges by each difficulty level

    static renderUserView = () => {
        this.renderChallengeStatusRight()
        this.renderNavPane()
        this.renderProgressPane()
        this.createNewChallenge()
    }

// Handles all the challenge-related view elements (right side panes, left side middle pane populating using diffCount
    static renderChallengeStatusRight() {
        let diffLevelBoxes = [
            levelOneBox,
            levelTwoBox,
            levelThreeBox
        ]

        for (let i = 0; i < diffLevelBoxes.length; i++) {
            let levelDivHead = document.createElement('div')
            levelDivHead.className = 'level-progress'
            levelDivHead.innerText = `Level ${i + 1}: `
            
            let levelDiv = document.createElement('div')
            levelDiv.className = 'level-progress'
            levelDiv.innerText = `${this.diffCount[i + 1]} of 10`

            diffLevelBoxes[i].append(levelDivHead, levelDiv)
        }
    }

    static renderNavPane() {
        this.helloMsg = document.createElement('h3')
        this.helloMsg.innerText = `Hi, ${User.loggedIn.username}!`
    
        this.logoutBtn = document.createElement('button')
        this.logoutBtn.className = 'my-button'
        this.logoutBtn.innerText = 'Log Out'

        this.logoutBtn.addEventListener('click', (evt) => {location.reload(true)})
    
        navPane.append(this.helloMsg, this.logoutBtn)
    }

    static renderProgressPane() {
        this.userProg = document.createElement('div')
        this.totalSolved = this.diffCount[1] + this.diffCount[2] + this.diffCount[3]
        this.solvedPercent = Math.round(this.totalSolved/60*100)

        this.totalProg = document.createElement('h3')
        this.totalProg.className = "total-progress"
        this.totalProg.innerText = `${this.solvedPercent}% Done!`
        this.userProg.append(this.totalProg)
        progressPane.append(this.userProg)

        if(this.unsolved.length > 0) {
            this.unsolvedElement = document.createElement('button')
            this.unsolvedElement.className = 'my-button'
            this.unsolvedElement.innerText = 'Keep Solving an Open Cryptogram!'
    
            this.unsolvedElement.addEventListener('click', (evt) => {
                evt.preventDefault()
                
                this.random = this.unsolved[Math.floor(Math.random()*this.unsolved.length)]
                this.random.renderChallenge()
            })
            progressPane.append(this.unsolvedElement)
        } else {
            this.unsolvedElement = document.createElement('h3')
            this.unsolvedElement.className = 'my-button'
            this.unsolvedElement.innerText = 'You Have no Unsolved Cryptograms!'
            progressPane.append(this.unsolvedElement)
        }
    }

    static createNewChallenge() {
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
            makeChallenge(this.difficulty, User.loggedIn.id).then(challenge => {
                User.loggedIn.addNewToLoggedIn(challenge)
                Challenge.getLastUnsolved().renderChallenge()
            })
        })
    }
    static getLastUnsolved() {
        return Challenge.unsolved[Challenge.unsolved.length - 1]
    }
}

// get or set methods for updating a challenge?
// create static class that resets the default pageview when