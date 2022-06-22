let searchInp = document.getElementById('searchInp')
let searchForm = document.getElementById('searchForm')
let userList = document.getElementById('userList')
let videoList = document.getElementById('videoList')
let userAva = document.getElementById('homeAva')
let userTemplate = document.getElementById('userTemplate').content
let videoTemplate = document.getElementById('videoTemplate').content

let users = []
let videos = []

let user = JSON.parse(localStorage.getItem('user')) || []

if(user.avatar){
    userAva.setAttribute('src', user.avatar)
}

async function getData(name) {
    try {
        let res = await fetch(`https://youtubebackend12.herokuapp.com/${name}`)
        res = await res.json()
        return res
    } catch (error) {
        console.log(error.message);
    }
}


function renderUsers(users){
    if(!users.length) return

    userList.innerHTML = null
    users.forEach(user => {
        let template = userTemplate.cloneNode(true)

        let userLink = template.getElementById('userLink')
        let userAva = template.getElementById('userAva')
        let userName = template.getElementById('userName')

        userLink.onclick = (e) => {
            e.preventDefault()
            getUserVideos(user.userId)
        }
        userAva.setAttribute('src', user.avatar)
        userName.textContent = user.username

        userList.append(template)
    });
}


function renderVideos(videos){
    if(!videos.length){
        videoList.textContent = 'video\'s not found'
        return
    }

    videoList.innerHTML = null
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

        videoList.append(template)
    });
}

async function getUserVideos(userId){
    try {
        let res = await fetch(`https://youtubebackend12.herokuapp.com/videos/${userId}`)
        res = await res.json()
        renderVideos(res)
    } catch (error) {
        console.log(error.message);
    }
}
 
searchForm.onsubmit = async (event) => {
    event.preventDefault()
    if(!searchInp.value.trim()) return

    try {

        let res = await fetch(`https://youtubebackend12.herokuapp.com/videos?search=${searchInp.value}`)
        res = await res.json()
        console.log(res);
        renderVideos(res)

    } catch (error) {
        console.log(error.message);
    }
}


async function firstRender(){
    users = await getData('users')
    videos = await getData('videos')

    renderUsers(users)
    renderVideos(videos)
}

firstRender()

