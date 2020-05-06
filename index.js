getAllUsers()
resetPageContent()

function resetPageContent() {
    resetProgressPane()
    resetNewPuzzlePane()

    let loginBtn = makeLogInBtn()
    let signUpBtn = makeSignUpBtn()

    resetChildren(navPane)
    navPane.append(loginBtn, signUpBtn)

    loginBtn.addEventListener('click', () => {
        let loginForm = createViewerForm()

        let formHeader = document.createElement('h3')
        formHeader.innerText = 'Log In'
        loginForm.prepend(formHeader)
        
        loginForm.addEventListener('submit', (evt) => {
            evt.preventDefault()
            let form = evt.target
            let username = form.username.value
            if (doesUserExist(username)) {
                loggedInUser = allUsers.filter(user => user.username === username)
            } else {

            }
        })
    })

    signUpBtn.addEventListener('click', () => {
        let signupForm = createViewerForm()

        let formHeader = document.createElement('h3')
        formHeader.innerText = 'Sign Up'

        signupForm.prepend(formHeader)

        signupForm.addEventListener('submit', (evt) => {
            evt.preventDefault()
            let form = evt.target
            let username = form.username.value
            if (doesUserExist(username)) {

            } else {

            }
        })
    })
}

function doesUserExist(name) {
    return allUsers.map(user => user.username).includes(name)
}

// Clears existing content from the main viewer and creates form that can be used for login or signup. Returns the login form so that when invoked, can set a variable equal to the form for event listeners and addn'l mods.
function createViewerForm(){
    resetChildren(mainViewer)
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

function resetChildren(element) {
    let child = element.lastElementChild
    while(child) {
        element.removeChild(child)
        child = element.lastElementChild
    }
}

// Below functions create logged out pageview
function makeLogInBtn() {
    let loginBtn = document.createElement('button')
    loginBtn.class = 'ui button'
    loginBtn.innerText = 'Log In'

    return loginBtn
}

function makeSignUpBtn() {
    let signUpBtn = document.createElement('button')
    signUpBtn.class = 'ui button'
    signUpBtn.innerText = 'Sign Up'

    return signUpBtn
}

function resetProgressPane() {
    resetChildren(progressPane)
    let quoteText = document.createElement('p')
    quoteText.innerText = "It is literature which for me opened the mysterious and decisive doors of imagination and understanding. To see the way others see. To think the way others think. And above all, to feel. - Salman Rushdie"
    
    progressPane.append(quoteText)
}

function resetNewPuzzlePane() {
    resetChildren(newPuzzlePane)
    let byHeader = document.createElement('h4')
    byHeader.innerText = "Created by"

    let byLink = document.createElement('a')
    byLink.href = "https://github.com/replacem3nts"
    byLink.innerText = "Donny Landis"
    byLink.target = "_blank"

    newPuzzlePane.append(byHeader, byLink)
}