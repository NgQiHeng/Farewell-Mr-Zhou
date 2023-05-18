'use strict'
let button = document.getElementById('button');

let body = document.getElementById('body');

let content = document.getElementById('content');

function play(){
    audio = new Audio('assets/立化忆.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audio.play();
    document.body.onclick = null;
    const repeat = ()=>{
        var currentTime = audio.currentTime
        var defaultTime = 3287.671238
        if (!prevTime){
            console.log(defaultTime)
            prevTime = currentTime
            setTimeout(()=>{
                moveItems()
                flip()
                repeat()},defaultTime)
            return
        }
        
        var timeUntil = 2*defaultTime - (currentTime-prevTime)*1000 +1
        console.log(timeUntil,currentTime-prevTime,currentTime,prevTime)
        prevTime = audio.currentTime


        setTimeout(()=>{
            moveItems()
            flip()
            repeat()},timeUntil)
        
    }
    setTimeout(()=>{
        moveItems()
        flip()
        repeat()},710)

}

button.addEventListener('click', play);
document.body.onclick = play;