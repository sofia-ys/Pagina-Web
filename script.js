
// login functionalities 
const users = [
    {username: "gamblingoverfood420", password: "poorpeople123"},
    {username: "TopGun115", password: "GIVEm3MONEY"},
    {username: "abc", password: "123"}
]

const loggedInUser = localStorage.getItem("loggedInUser")

const loginPage = document.getElementById("login-page")
if (loggedInUser){
    loginPage.style.display = "none"  // don't show login option anymore
}
else{
    loginPage.style.display = "block"
}

const accountPage = document.getElementById("account-page")
if (loggedInUser){
    accountPage.style.display = "block"  // show account option
}
else{
    accountPage.style.display = "none"
}

const loginForm = document.getElementById("login-form")

if (loginForm) {  // only attach listener if it exists
    loginForm.addEventListener("submit", (event) => {

        event.preventDefault()  // do not refresh page
        const inputUsername = document.getElementById("username").value
        const inputPassword = document.getElementById("password").value

        loginUser(inputUsername, inputPassword)

        loginForm.reset()  // clear all input fields
})}

function loginUser(inputUsername, inputPassword){
    const user = users.find(u => u.username === inputUsername)  // if it doesn't exist, user = undefined else it's the username+password object
    if (user && user.password === inputPassword){  // if the username exists AND the password matches
        console.log("Login succesful!")
        localStorage.setItem("loggedInUser", inputUsername)  // storing the fact that we're logged in now

        window.location.href = "index.html"  // go back to home page
    }
    else if (user){  // if the username exists (but no password match since we already checked for that)
        console.log("Incorrect password")
    }
    else{  // username doesn't exist (undefined is falsy)
        console.log("Account cannot be found")
    }
}

const registerOption = document.getElementById("register-option")
const registerForm = document.getElementById("register-form")

if (registerOption) {
    registerOption.addEventListener("submit", (event) => {

        event.preventDefault()  // do not refresh page

        loginForm.style.display = "none"  // hiding the login stuff when we want to register
        registerOption.style.display = "none" 
        registerForm.style.display = "block"  // now we show the register form

        registerOption.reset()  // clear all input fields
})}

if (registerForm){
    registerForm.style.display = "none"  // by default don't show this form
    registerForm.addEventListener("submit", (event) => {

        event.preventDefault()  // do not refresh page

        const registerUsername = document.getElementById("registerUsername").value
        const registerPassword = document.getElementById("registerPassword").value
        const confirmPassword = document.getElementById("confirmPassword").value
        const adult = document.getElementById("adult").checked

        registerUser(registerUsername, registerPassword, confirmPassword, adult)
        // registerForm.reset()  // clear all input fields

        loginForm.style.display = "block" 
        registerOption.style.display = "none" 
        registerForm.style.display = "none"
})}

function registerUser(registerUsername, registerPassword, confirmPassword, adult){
    if (adult){  // first check if adult
        if (registerPassword === confirmPassword){  // now check if passwords match
        console.log("Password registered")
        
        const user = {
            username: registerUsername,
            password: registerPassword
        }
        users.push(user)  // now we add the user to the database
        }
        else{
        console.log("Password does not match")
        }
    }
    else{
        console.log("You must be 18 to access this site")
    }

    console.log(users)
}

// logout functionality
const signoutForm = document.getElementById("signout-form")
if (signoutForm){
    signoutForm.addEventListener("submit", (event) => {
        console.log("User signed out")
        localStorage.removeItem("loggedInUser")  // logout
})}