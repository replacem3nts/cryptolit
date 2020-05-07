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

        let lOneDivHead = document.createElement('div')
        lOneDivHead.className = "level-progress"
        lOneDivHead.innerText = `Level 1: `
        let lOneDiv = document.createElement('div')
        lOneDiv.className = "level-progress"
        lOneDiv.innerText = `${diffCount[1]} of 10`
        levelOneBox.append(lOneDivHead, lOneDiv)
        
        let lTwoDivHead = document.createElement('div')
        lTwoDivHead.className = "level-progress"
        lTwoDivHead.innerText = `Level 2: `
        let lTwoDiv = document.createElement('div')
        lTwoDiv.className = "level-progress"
        lTwoDiv.innerText = `${diffCount[2]} of 10`
        levelTwoBox.append(lTwoDivHead, lTwoDiv)
        
        let lThreeDivHead = document.createElement('div')
        lThreeDivHead.className = "level-progress"
        lThreeDivHead.innerText = `Level 3: `
        let lThreeDiv = document.createElement('div')
        lThreeDiv.className = "level-progress"
        lThreeDiv.innerText = `${diffCount[3]} of 10`
        levelThreeBox.append(lThreeDivHead, lThreeDiv)

        let totalProg = document.createElement('div')
        totalProg.className = "total-progress"
        totalProg.innerText = `${Math.round((diffCount[1] + diffCount[2] + diffCount[3]) / 60 * 100)}% Done!`
        progressPane.append(totalProg)
    }
}

// get or set methods for updating a challenge?
// create static class that resets the default pageview when called