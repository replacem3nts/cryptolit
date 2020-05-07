class Viewtools {
    static resetChildren(element) {
        let child = element.lastElementChild
        while(child) {
            element.removeChild(child)
            child = element.lastElementChild
        }
    }

    static resetAllChildren() {
        let elements = [
            mainViewer,
            navPane, 
            progressPane, 
            newPuzzlePane, 
            levelOneBox, 
            levelTwoBox, 
            levelThreeBox]
        
        elements.forEach(element => this.resetChildren(element))
    }
}