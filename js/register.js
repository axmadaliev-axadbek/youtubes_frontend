let registerForm = document.getElementById('registerForm')
let usernameInput = document.getElementById('usernameInput')
let passwordInput = document.getElementById('passwordInput')
let uploadInput = document.getElementById('uploadInput')
let errorMessage = document.getElementById('errorMessage')

let token = JSON.parse(localStorage.getItem('token'))


if(token) window.location.replace('admin.html')


registerForm.onsubmit = async (event) => {
    event.preventDefault()

    try {
        let fd = new FormData()
        fd.append('username', usernameInput.value.trim())
        fd.append('password', passwordInput.value.trim())
        if(uploadInput.files[0]){
            fd.append('img', uploadInput.files[0])
        }

        let  res = await fetch('https://youtubebackend12.herokuapp.com/register', {
            method: "POST",
            body: fd
        })
        res = await res.json()

        if(res.status == 201){
            localStorage.setItem('user', JSON.stringify(res.user))
            localStorage.setItem('token', JSON.stringify(res.token))
            window.location.replace('admin.html')
        } else {
            errorMessage.textContent = 'wrong username or password'
        }
    } catch (error) {
        errorMessage.textContent = error.message
    }
}
