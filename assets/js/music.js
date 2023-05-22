'use strict'
let button = document.getElementById('button');

let body = document.getElementById('body');

let content = document.getElementById('content');

let audio = new Audio('assets/立化忆.mp3');
audio.loop = true;
audio.volume = 0.5;
var clicked = false
function oneLoop(){
    console.log("Looped")
    prevTime = null
    const repeat = ()=>{
        var currentTime = audio.currentTime
        var defaultTime = 3287.671238
        if (!prevTime){
            console.log(defaultTime)
            
            setTimeout(()=>{
                moveItems()
                // flip()
                movePolariodPictures()
                repeat()},defaultTime)
            return
        }
        
        var timeUntil = 2*defaultTime - (currentTime-prevTime)*1000 +1
        console.log(timeUntil,currentTime-prevTime,currentTime,prevTime)
        prevTime = audio.currentTime


        setTimeout(()=>{
            moveItems()
            // flip()
            movePolariodPictures()
            repeat()},timeUntil)
        
    }
    setTimeout(()=>{
        moveItems()
        // flip()
        movePolariodPictures()
        repeat()},710)
}
function play(){
    if (clicked == false){
        
        audio.play();
        clicked = true
        document.body.onclick = null;
        body.style.opacity = 1
        content.classList.add('show')
        body.style.overflow = 'visible'
        body.style.overflowX = 'hidden'
        oneLoop()
        audio.addEventListener('ended',oneLoop)
    }
}

button.addEventListener('click', play);
document.body.onclick = play;