class Challenge {
    static all = []

    constructor(challenge) {
        this.challenge = challenge
        this.solved = challenge.solved
        this.solvetime = challenge.solvetime
        this.cryptogram = challenge.cryptogram
        this.difficulty = challenge.puzzle.difficulty
        Challenge.all.push(this)
    }

    renderChallenge() {
        Viewtools.resetChildren(mainViewer)
        let headDisplay = document.createElement('div')
        headDisplay.id = 'head-display'
        
        let diffDisplay = document.createElement('span')
        diffDisplay.innerText = `Difficulty Level: ${this.difficulty}`
        diffDisplay.className = 'head-elements'
        
        let timeDisplay = document.createElement('span')
        timeDisplay.innerText = `Time: ${this.solvetime}`
        timeDisplay.className = 'head-elements'

        headDisplay.append(diffDisplay, timeDisplay)

        let cryptoArray = this.cryptogram.split(" ")
        let solveForm = document.createElement('form')
        solveForm.id = "solve-form"
        let mainCryptoDiv = document.createElement('div')
        mainCryptoDiv.id = "main-crypto-div"

        cryptoArray.forEach(word => {
            let wordSpan = document.createElement('span')
            wordSpan.className = "word-span"
            let fieldDiv = document.createElement('div')
            let labelDiv = document.createElement('div')
            let charArray = word.split('')
            charArray.forEach(char => {
                if (/[A-Z]/.test(char)) {
                    let charInput = document.createElement('input')
                    charInput.type = 'text'
                    charInput.className = 'char-input'
                    charInput.id = `${char}`
                    charInput.name = char
                    charInput.maxLength = '1'

                    charInput.addEventListener('input', (evt) => {
                        let inputLetter = evt.target.value
                        let formInputs = document.querySelectorAll(`#solve-form #${char} `)
                        formInputs.forEach(input => {input.value = inputLetter})
                    })
                    
                    let charLabel = document.createElement('label')
                    charLabel.htmlFor = `${char}`
                    charLabel.innerText = char

                    let charLabelSpan = document.createElement('span')
                    charLabelSpan.className = 'char-label'
                    charLabelSpan.append(charLabel)

                    fieldDiv.append(charInput)
                    labelDiv.append(charLabelSpan)
                } else {
                    let charSpan = document.createElement('span')
                    charSpan.innerText = char
                    charSpan.className = 'punctuation'
                    fieldDiv.append(charSpan)
                }
            })
            wordSpan.append(fieldDiv, labelDiv)
            mainCryptoDiv.append(wordSpan)
        })
        solveForm.append(mainCryptoDiv)

        let alphabetKey = document.createElement('div')
        alphabetKey.id = 'alphabet-key'

        let alphabetTable = document.createElement('table')
        let letterArray = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
        let letterRow = document.createElement('tr')
        let formRow = document.createElement('tr')
        letterArray.forEach(char => {
            let letterCell = document.createElement('td')
            let charLabel = document.createElement('label')
            charLabel.htmlFor = char
            charLabel.innerText = char
            letterCell.append(charLabel)
            letterRow.append(letterCell)

            let formCell = document.createElement('td')
            let charInput = document.createElement('input')
                charInput.type = 'text'
                charInput.className = 'key-char-input'
                charInput.id = `${char}`
                charInput.name = char
                charInput.maxLength = '1'

            charInput.addEventListener('input', (evt) => {
                let inputLetter = evt.target.value
                let formInputs = document.querySelectorAll(`#solve-form #${char} `)
                formInputs.forEach(input => {input.value = inputLetter})
            })

            formCell.append(charInput)
            formRow.append(formCell)
        })

        alphabetTable.append(letterRow, formRow)
        alphabetKey.append(alphabetTable)
        solveForm.append(alphabetKey)

        let submitDiv = document.createElement('div')
        submitDiv.id = 'challenge-submit-div'
        let submitBtn = document.createElement('input')
        submitBtn.type = 'submit'
        submitBtn.innerText = 'Check It!'
        submitBtn.className = 'my-button'
        submitDiv.append(submitBtn)

        solveForm.append(submitDiv)
        mainViewer.append(headDisplay, solveForm)
    }

// Resets Challenge.all when user logs in  
    static clearAll() {
        this.all.length = 0
    }

// Enumerates through Challenge.all (a user's challenges) to build a hash counting number of solved challenges by each difficulty level
    static diffCount() {
        let diffHash = {
            1: 0,
            2: 0,
            3: 0
        }
        this.all.forEach(challenge => {
            if(challenge.solved)
            diffHash[item.difficulty]++
        })
        return diffHash
    }

    static renderUserView = () => {
        this.renderChallengeInfo()
    }

// Handles all the challenge-related view elements (right side panes, left side middle pane populating using diffCount
    static renderChallengeInfo() {
        let diffCount = this.diffCount()
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
            levelDiv.innerText = `${diffCount[i + 1]} of 10`

            diffLevelBoxes[i].append(levelDivHead, levelDiv)
        }

        let totalProg = document.createElement('div')
        totalProg.className = "total-progress"
        totalProg.innerText = `${Math.round((diffCount[1] + diffCount[2] + diffCount[3]) / 60 * 100)}% Done!`
        progressPane.append(totalProg)

        progressPane.addEventListener('click', () => {
            Challenge.all[Challenge.all.length - 1].renderChallenge()
        })
    }
}

// get or set methods for updating a challenge?
// create static class that resets the default pageview when called