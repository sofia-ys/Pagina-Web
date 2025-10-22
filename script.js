
// login functionalities 
const users = [
    {username: "gamblingoverfood420", password: "poorpeople123"},
    {username: "TopGun115", password: "GIVEm3MONEY"}
]

const loginForm = document.getElementById("login-form")
loginForm.addEventListener("submit", (event) => {

    event.preventDefault()  // do not refresh page
    const inputUsername = document.getElementById("username").value
    const inputPassword = document.getElementById("password").value

    loginUser(inputUsername, inputPassword)

    loginForm.reset()  // clear all input fields
})

function loginUser(inputUsername, inputPassword){
    const user = users.find(u => u.username === inputUsername)  // if it doesn't exist, user = undefined else it's the username+password object
    if (user && user.password === inputPassword){  // if the username exists AND the password matches
        console.log("Login succesful!")
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

registerForm.style.display = "none"  // by default don't show this form

registerOption.addEventListener("submit", (event) => {

    event.preventDefault()  // do not refresh page

    loginForm.style.display = "none"  // hiding the login stuff when we want to register
    registerOption.style.display = "none" 
    registerForm.style.display = "block"  // now we show the register form

    registerOption.reset()  // clear all input fields
})

registerForm.addEventListener("submit", (event) => {

    event.preventDefault()  // do not refresh page

    const registerUsername = document.getElementById("registerUsername").value
    const registerPassword = document.getElementById("registerPassword").value
    const confirmPassword = document.getElementById("confirmPassword").value

    registerUser(registerUsername, registerPassword, confirmPassword)
    registerForm.reset()  // clear all input fields
})

function registerUser(registerUsername, registerPassword, confirmPassword){
    if (registerPassword === confirmPassword){
        console.log("Password registered")
    }
    else{
        console.log("Password does not match")
    }

    const user = {
        username: registerUsername,
        password: registerPassword
    }
    users.push(user)
}