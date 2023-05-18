const cards = document.querySelectorAll('.card');
var currentFlip = 0;
var prevTime
async function sleep(time){
    return new Promise(resolve => setTimeout(resolve, time));
}
async function flip(){
    await sleep(200)
    for (var [i,card] of Object.entries(cards)){
        if (i%2!=currentFlip) continue;
        var style = getComputedStyle(card);
        var currentFlipAmt = style.getPropertyValue('--rotateAmt');
        console.log(currentFlipAmt)
        card.style.setProperty('--rotateAmt',parseInt(currentFlipAmt)+180);
        for (var frontBack of card.querySelectorAll('.front,.back')){
            if (getComputedStyle(frontBack).opacity==0) frontBack.style.opacity = 1;
            else frontBack.style.opacity = 0;
        }
    }
    currentFlip = (currentFlip+1)%2;
}
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
                flip()
                repeat()},defaultTime)
            return
        }
        
        var timeUntil = 2*defaultTime - (currentTime-prevTime)*1000 +1
        console.log(timeUntil,currentTime-prevTime,currentTime,prevTime)
        prevTime = audio.currentTime


        setTimeout(()=>{
            flip()
            repeat()},timeUntil)
        
    }
    setTimeout(()=>{
        flip()
        repeat()},810)

}
document.body.onclick = play;