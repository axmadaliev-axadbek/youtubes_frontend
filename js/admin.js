let videoForm = document.getElementById('videoForm')
let videoInput = document.getElementById('videoInput')
let uploadInput = document.getElementById('uploadInput')
let errorMessage = document.getElementById('errorMessage')
let videosList = document.getElementById('videosList')
let logoutBtn = document.getElementById('logoutBtn')
let videoTemplate = document.getElementById('videoTemplate').content


let userId = JSON.parse(localStorage.getItem('user')).userId

videoForm.onsubmit = async (event) => {
    event.preventDefault()

    try {
        let token = JSON.parse(localStorage.getItem('token'))
        let fd = new FormData()
        fd.append('title', videoInput.value.trim())
        fd.append('file', uploadInput.files[0])
        fd.append('userId', userId)

        let  res = await fetch('https://youtubebackend12.herokuapp.com/video', {
            method: "POST",
            body: fd,
            headers: {
                token: token
            }
        })
        res = await res.json()

        if(res.status == 201){
            window.location.replace('index.html')
        } else {
            errorMessage.textContent = 'wrong username or password'
        }
    } catch (error) {
        errorMessage.textContent = error.message
    }
}

logoutBtn.onclick = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    window.location.replace('register.html')
}



async function getUserVideos(){
    try {
        let res = await fetch(`https://youtubebackend12.herokuapp.com/videos/${userId}`)
        res = await res.json()
        renderVideos(res)
    } catch (error) {
        console.log(error.message);
    }
}



function renderVideos(videos){
    if(!videos.length){
        videosList.textContent = 'video\'s not found'
        return
    }

    videosList.innerHTML = null
    videos.forEach(video => {
        let template = videoTemplate.cloneNode(true)

        let videoControl = template.getElementById('videoControl')
        let userImg = template.getElementById('userImg')
        let userName = template.getElementById('userName')
        let videoTitle = template.getElementById('videoTitle')
        let videoTime = template.getElementById('videoTime')
        let videoDownload = template.getElementById('videoDownload')
        let videoSize = template.getElementById('videoSize')

        videoControl.setAttribute('src', video.file.view)
        userImg.setAttribute('src', video.user.avatar)
        userName.textContent = video.user.username
        videoTitle.textContent = video.title
        videoTime.textContent = video.date
        videoDownload.setAttribute('href', video.file.download)
        videoSize.textContent = (video.size / (1024 * 1024)).toFixed(1) + " MB"

        videosList.append(template)
    });
}

getUserVideos()