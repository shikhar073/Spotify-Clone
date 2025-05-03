//initialize the variable
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'))

let songs = [
    {songName: "Banjaara - Ek Villan", filepath: "songs/1.mp3", coverpath: "covers/1.jpg"},
    {songName: "Bheegi Si Bhaagi Si - Raajneeti", filepath: "songs/2.mp3", coverpath: "covers/2.jpg"},
    {songName: "Galliyan - Ek Villan", filepath: "songs/3.mp3", coverpath: "covers/3.jpg"},
    {songName: "Mera Mann Kehne Laga - Nautanki Saala", filepath: "songs/4.mp3", coverpath: "covers/4.jpg"},
    {songName: "Sajde Ki Ye Hai Lakhoin - Khatta Meetha", filepath: "songs/5.mp3", coverpath: "covers/5.jpg"},
    {songName: "Shukran Allah", filepath: "songs/6.mp3", coverpath: "covers/6.jpg"},
    {songName: "Tera Ban Jaunga - Kabir Singh", filepath: "song/7.mp3", coverpath: "covers/7.jpg"},
    {songName: "Tere Hawaale", filepath: "songs/8.mp3", coverpath: "covers/8.jpg"},
    {songName: "Teri Jhuki Nazar", filepath: "songs/9.mp3", coverpath: "covers/9.jpg"},
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songName;
})
//handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-solid', 'fa-3x', 'fa-circle-play');
        masterPlay.classList.add('fa-solid', 'fa-3x', 'fa-circle-pause');
        gif.style.opacity = 1;

    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-solid', 'fa-3x', 'fa-circle-pause');
        masterPlay.classList.add('fa-solid', 'fa-3x', 'fa-circle-play');
        gif.style.opacity = 0;
    }
})
//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myprogressbar.value = progress;
})

myprogressbar.addEventListener('change',()=>{
    audioElement.currentTime = (myprogressbar.value * audioElement.duration)/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.classList.remove('fa-solid', 'fa-2x', 'fa-circle-pause');
        element.classList.add('fa-solid', 'fa-2x', 'fa-circle-play'); 
    })
}
Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        if(audioElement.paused){
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-solid', 'fa-2x', 'fa-circle-play');
            e.target.classList.add('fa-solid', 'fa-2x', 'fa-circle-pause');
            
            audioElement.src = `songs/${songIndex+1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            console.log(audioElement.play())
            masterPlay.classList.remove('fa-solid', 'fa-3x', 'fa-circle-play');
            masterPlay.classList.add('fa-solid', 'fa-3x', 'fa-circle-pause');
        }
        else{
            audioElement.pause();
            e.target.classList.remove('fa-solid', 'fa-2x', 'fa-circle-pause');
            e.target.classList.add('fa-solid', 'fa-2x', 'fa-circle-play');
            masterPlay.classList.remove('fa-solid', 'fa-3x', 'fa-circle-pause');
            masterPlay.classList.add('fa-solid', 'fa-3x', 'fa-circle-play');
        }
    
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-solid', 'fa-3x', 'fa-circle-play');
    masterPlay.classList.add('fa-solid', 'fa-3x', 'fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 9;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-solid', 'fa-3x', 'fa-circle-play');
    masterPlay.classList.add('fa-solid', 'fa-3x', 'fa-circle-pause');
})