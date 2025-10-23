// login functionalities 
const users = JSON.parse(localStorage.getItem("users")) || [
    {username: "gamblingoverfood420", password: "poorpeople123", balance: -133},
    {username: "TopGun115", password: "GIVEm3MONEY", balance: 82},
    {username: "abc", password: "123", balance: 100}
]  // if the local storage is empty we use our default accounts

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
const loginError = document.getElementById("login-error")

if (loginForm) {  // only attach listener if it exists
    loginForm.addEventListener("click", () => {
        loginError.style.display = "none"
    })
    loginForm.addEventListener("submit", (event) => {

        event.preventDefault()  // do not refresh page

        const inputUsername = document.getElementById("username").value
        const inputPassword = document.getElementById("password").value
        
        loginUser(inputUsername, inputPassword)
        loginForm.reset()  // clear all input fields
})}

function loginUser(inputUsername, inputPassword){
    loginError.textContent = ""  // clearing previous message
    loginError.style.display = "block"

    const user = users.find(u => u.username === inputUsername)  // if it doesn't exist, user = undefined else it's the username+password object
    if (user && user.password === inputPassword){  // if the username exists AND the password matches
        console.log("Login succesful!")
        localStorage.setItem("loggedInUser", inputUsername)  // storing the fact that we're logged in now

        window.location.href = "index.html"  // go back to home page
    }
    else if (user){  // if the username exists (but no password match since we already checked for that)
        console.log("Incorrect password")
        loginError.textContent = "Incorrect password"
    }
    else{  // username doesn't exist (undefined is falsy)
        console.log("Account not found")
        loginError.textContent = "Account not found"
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
    registerForm.addEventListener("click", () => {
        registerError.style.display = "none"
    })
    registerForm.addEventListener("submit", (event) => {

        event.preventDefault()  // do not refresh page

        const registerUsername = document.getElementById("registerUsername").value
        const registerPassword = document.getElementById("registerPassword").value
        const confirmPassword = document.getElementById("confirmPassword").value
        const adult = document.getElementById("adult").checked

        registerUser(registerUsername, registerPassword, confirmPassword, adult)
        // registerForm.reset()  // clear all input fields
})}

const registerError = document.getElementById("register-error")

function registerUser(registerUsername, registerPassword, confirmPassword, adult){
    registerError.textContent = ""  // clearing previous message
    registerError.style.display = "block"

    if (adult){  // first check if adult
        if (registerPassword === confirmPassword){  // now check if passwords match
        console.log("Password registered")
        
        const user = {
            username: registerUsername,
            password: registerPassword,
            balance: 0
        }
        users.push(user)  // now we add the user to the database

        localStorage.setItem("users", JSON.stringify(users))  // saving it locally

        loginForm.style.display = "block" 
        registerOption.style.display = "none" 
        registerForm.style.display = "none"

        }
        else{
        console.log("Password does not match")
        registerError.textContent = "Password does not match"
        }
    }
    else{
        console.log("You must be 18 to access this site")
        registerError.textContent = "You must be 18 to access this site"
    }

    console.log(users)
}

// logout functionality
const signoutForm = document.getElementById("signout-form")
if (signoutForm){
    signoutForm.addEventListener("submit", (event) => {
        event.preventDefault()  // do not refresh page
        console.log("User signed out")
        localStorage.removeItem("loggedInUser")  // logout
        window.location.href = "index.html"  // go back to home page
})}

// wallet functionalities
const balanceNumber = document.getElementById("balance-number")
const activeUser = users.find(u => u.username === loggedInUser)
balanceNumber.textContent = activeUser.balance

const amountFunctions = document.getElementById("amount-functions")
const withdrawHeader = document.getElementById("withdraw-header")
const depositHeader = document.getElementById("deposit-header")
const withdrawBtn = document.getElementById("withdraw-button")
const depositBtn = document.getElementById("deposit-button")
const walletForm = document.getElementById("wallet-form")

if (walletForm) {  // only attach listener if it exists
    amountFunctions.style.display = "none"
    
    withdrawBtn.addEventListener("click", (event) => {
        event.preventDefault()  // do not refresh page
        walletAction = "withdraw"  // to keep track later
        depositHeader.style.display = "none"
        amountFunctions.style.display = "block"
        withdrawHeader.style.display = "block"
    })

    depositBtn.addEventListener("click", (event) => {
        event.preventDefault()  // do not refresh page
        walletAction = "deposit"
        withdrawHeader.style.display = "none"
        amountFunctions.style.display = "block"
        depositHeader.style.display = "block"
    })

    walletForm.addEventListener("submit", (event) => {
        event.preventDefault()  // do not refresh page
        const amount = document.getElementById("amount").value
        if (walletAction === "deposit"){
            activeUser.balance += Number(amount)
        }
        else if (walletAction === "withdraw"){
            activeUser.balance -= Number(amount)
        }

        balanceNumber.textContent = activeUser.balance  // updating balance value
        localStorage.setItem("users", JSON.stringify(users))

        walletForm.reset()  // clear all input fields
        amountFunctions.style.display = "none"
    })
}