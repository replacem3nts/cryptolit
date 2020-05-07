class Challenge {
    static all = []

    constructor(challenge) {
        this.challenge = challenge
        Challenge.all.push(this)
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
        this.all.forEach(item => {
            if(item.challenge.solved)
            diffHash[item.challenge.puzzle.difficulty]++
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
    }
}

// get or set methods for updating a challenge?
// create static class that resets the default pageview when called