class Challenge {
    static all = []

    constructor(challenge) {
        this.challenge = challenge
        Challenge.all.push(this)
    }

    static diffCount() {
        let diffHash = {
            1: 0,
            2: 0,
            3: 0
        }
        this.all.forEach(item => {
            if(item.challenge.solved)
            diffHash[item.challenge.puzzle.difficulty]++
        })
        return diffHash
    }

    static clearAll() {
        this.all.length = 0
    }

    static renderUserView = () => {
        let diffCount = this.diffCount()

        let lOneDiv = document.createElement('div')
        lOneDiv.className = "level-progress"
        lOneDiv.innerText = `Level 1: ${diffCount[1]} of 10`
        levelOneBox.append(lOneDiv)
        
        let lTwoDiv = document.createElement('div')
        lTwoDiv.className = "level-progress"
        lTwoDiv.innerText = `Level 1: ${diffCount[2]} of 10`
        levelTwoBox.append(lTwoDiv)
        
        let lThreeDiv = document.createElement('div')
        lThreeDiv.className = "level-progress"
        lThreeDiv.innerText = `Level 1: ${diffCount[3]} of 10`
        levelThreeBox.append(lThreeDiv)

        let totalProg = document.createElement('div')
        totalProg.className = "total-progress"
        totalProg.innerText = `${Math.round((diffCount[1] + diffCount[2] + diffCount[3]) / 60 * 100)}% Done!`
        progressPane.append(totalProg)
    }
}

// get or set methods for updating a challenge?
// create static class that resets the default pageview when called