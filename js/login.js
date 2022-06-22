let loginForm = document.getElementById('loginForm')
let usernameInput = document.getElementById('usernameInput')
let passwordInput = document.getElementById('passwordInput')
let errorMessage = document.getElementById('errorMessage')


loginForm.onsubmit = async (event) => {
    event.preventDefault()

    try {
        let fd = new FormData()
        fd.append('username', usernameInput.value.trim())
        fd.append('password', passwordInput.value.trim())

        let  res = await fetch('https://youtubebackend12.herokuapp.com/login', {
            method: "POST",
            body: fd
        })
        res = await res.json()

        if(res.status == 200){
            localStorage.setItem('user', JSON.stringify(res.user))
            localStorage.setItem('token', JSON.stringify(res.token))
            window.location.replace('index.html')
        } else {
            errorMessage.textContent = 'wrong username or password'
        }
    } catch (error) {
        errorMessage.textContent = error.message
    }
}