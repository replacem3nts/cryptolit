class Viewtools {

    static logoutPageRender() {
        this.resetAllChildren()
        this.defaultPageRender()
    }

    static defaultPageRender() {
        this.defaultProgressPane()
        this.defaultNewPuzzlePane()
        let loginBtn = this.makeLogInBtn()
        let signUpBtn = this.makeSignUpBtn()
    
        navPane.append(loginBtn, signUpBtn)
    
        loginBtn.addEventListener('click', () => {
            let loginForm = this.createViewerForm()
    
            let formHeader = document.createElement('h3')
            formHeader.innerText = 'Log In'
            loginForm.prepend(formHeader)
            
            loginForm.addEventListener('submit', (evt) => {
                evt.preventDefault()
                let form = evt.target
                let username = form.username.value
                if (this.doesUserExist(username)) {
                     new User(allUsers.filter(user => user.username === username)[0])
                } else {
                    let errorMsg = this.userError(`We couldn't find a user with that username!`)
                    loginForm.append(errorMsg)
                    form.username.value = ""
                }
            })
        })
    
        signUpBtn.addEventListener('click', () => {
            let signupForm = this.createViewerForm()
    
            let formHeader = document.createElement('h3')
            formHeader.innerText = 'Sign Up'
    
            signupForm.prepend(formHeader)
    
            signupForm.addEventListener('submit', (evt) => {
                evt.preventDefault()
                let form = evt.target
                let username = form.username.value
                if (this.doesUserExist(username)) {
                    let errorMsg = this.userError(`Sorry, that username's taken!`)
                    signupForm.append(errorMsg)
                    form.username.value = ""
                } else {
    
                }
            })
        })
    }

// Helper methods for the form event listeners
    
    static doesUserExist(name) {
        return allUsers.map(user => user.username).includes(name)
    }

    static userError(msg) {
        let errorMsg = document.createElement('p')
        errorMsg.innerText = `${msg}`
        errorMsg.style.color = 'red'
        return errorMsg
    }

// Element reset methods to be called on login or logout

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

// Clears existing content from the main viewer and creates form that can be used for login or signup. Returns the login form so that when invoked, can set a variable equal to the form for event listeners and addn'l mods.
    static createViewerForm(){
        this.resetChildren(mainViewer)
        let loginForm = document.createElement('form')
        let usernameInput = document.createElement('input')
        usernameInput.type = 'text'
        usernameInput.name = 'username'

        let formInstructions = document.createElement('label')
        formInstructions.for = 'username'
        formInstructions.innerText = 'Enter your username: '

        let submitButton = document.createElement('input')
        submitButton.type = 'submit'

        
        loginForm.append(formInstructions, usernameInput, submitButton)
        mainViewer.append(loginForm)

        return loginForm
    }

// Below functions create logged out pageview
    static makeLogInBtn() {
        let loginBtn = document.createElement('button')
        loginBtn.className = 'my-button'
        loginBtn.innerText = 'Log In'

        return loginBtn
    }

    static makeSignUpBtn() {
        let signUpBtn = document.createElement('button')
        signUpBtn.className = 'my-button'
        signUpBtn.innerText = 'Sign Up'

        return signUpBtn
    }

    static defaultProgressPane() {
        let quoteText = document.createElement('p')
        quoteText.innerText = "It is literature which for me opened the mysterious and decisive doors of imagination and understanding. To see the way others see. To think the way others think. And above all, to feel."
        let quoteAuthor = document.createElement('p')
        quoteAuthor.innerText = "- Salman Rushdie"
        
        progressPane.append(quoteText, quoteAuthor)
    }

    static defaultNewPuzzlePane() {
        let byHeader = document.createElement('h4')
        byHeader.innerText = "Created by"

        let byLink = document.createElement('a')
        byLink.href = "https://github.com/replacem3nts"
        byLink.innerText = "Donny Landis"
        byLink.target = "_blank"

        newPuzzlePane.append(byHeader, byLink)
    }
}