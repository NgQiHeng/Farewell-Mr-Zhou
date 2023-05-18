const notesGalleryItems = document.querySelectorAll(".notes-gallery-item");
const notesGallery = document.querySelector(".notes-gallery");
const details = {}
var toMoveCombi = 0
// How to generate random number either -1 or 1
// 
var audio
var prevTime 
async function moveItems(){
    
    const containerHeight = notesGallery.getBoundingClientRect().height
    const Combis = {
        0:[1,3],
        1:[2,3],
        2:[1,2],
    }
    const toMove = Combis[toMoveCombi]
    toMoveCombi = (toMoveCombi+1)%3
    for (var i = 1;i<4;i++){
        if (!toMove.includes(i)) continue
        const dir = details[i]["dir"]
        const number = details[i]["number"] - dir
        var height = notesGalleryItems[i+number*3-1].getBoundingClientRect().top-notesGalleryItems[i-1+number*3+3*dir].getBoundingClientRect().top
        height = Math.abs(height)
        var curTranslate = details[i]["translateAmt"] + dir * height
        const totalHeight = details[i]["totalHeight"]
        const lastChildBottom = totalHeight+curTranslate
        if (lastChildBottom<containerHeight) {
            curTranslate-=lastChildBottom-containerHeight
            details[i]["dir"] = 1
            details[i]['number'] = details[i]['totalRows']-1
        }
        if (curTranslate>=0){
            curTranslate = 0
            details[i]["dir"] = -1
            details[i]['number'] = 0
        }
        details[i]["translateAmt"] = curTranslate
        for (var j = i-1;j<notesGalleryItems.length;j+=3){
            notesGalleryItems[j].style.transition = `transform 1s ease-in-out`
            notesGalleryItems[j].style.transform = `translateY(${curTranslate}px)`
        }
    }
}
function initItems(){
    const containerHeight = notesGallery.getBoundingClientRect().height
    const containerTop = notesGallery.getBoundingClientRect().top
    const containerBottom = notesGallery.getBoundingClientRect().bottom
    for (var i = 1;i<4;i++){
        const number = Math.floor(Math.random()*Math.floor(notesGalleryItems.length/3))
        details[i] = {dir:Math.random() < 0.5 ? -1 : 1,"number":number}
        var curTranslate = 0
        var totalHeight = 0
        var totalRows = 0
        console.log(number)
        for (var j = i-1;j<notesGalleryItems.length;j+=3){
            var height
            if (j+3<notesGalleryItems.length) var height = notesGalleryItems[j].getBoundingClientRect().top-notesGalleryItems[j+3].getBoundingClientRect().top
            else var height = -notesGalleryItems[j].getBoundingClientRect().height
            if (Math.floor(j/3)<number){
                curTranslate += height
            }
            totalHeight += height
            totalRows+=1
            console.log(totalHeight)
            details[i]["lastChild"] = [notesGalleryItems[j],j]
            if (!details[i]["firstChild"]) details[i]["firstChild"] = notesGalleryItems[j]
            
        }
        details[i]["translateAmt"] = curTranslate
        details[i]["totalHeight"] = Math.abs(totalHeight)
        details[i]["totalRows"] = totalRows

    }
    for (var i = 1;i<4;i++){
        details[i]["dir"] = Math.random() < 0.5 ? -1 : 1
        const lastChild = details[i]["lastChild"][0]
        var curTranslate = details[i]["translateAmt"]
        const totalHeight = details[i]["totalHeight"]
        const lastChildBottom = totalHeight+curTranslate
        console.log("Height",totalHeight,"Dif",lastChildBottom,"curTranslate",curTranslate)
        if (lastChildBottom<containerHeight) {curTranslate-=lastChildBottom-containerHeight
            details[i]['number'] = details[i]['totalRows']-1
            console.log(details[i]['totalRows'])
            details[i]["dir"] = 1}
        details[i]["translateAmt"] = curTranslate
        for (var j = i-1;j<notesGalleryItems.length;j+=3){
            notesGalleryItems[j].style.transform = `translateY(${curTranslate}px)`
        }
        if (details[i]['number'] == 0) details[i]['dir'] = -1
    }
}

initItems()

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
                repeat()},defaultTime)
            return
        }
        
        var timeUntil = 2*defaultTime - (currentTime-prevTime)*1000 +1
        console.log(timeUntil,currentTime-prevTime,currentTime,prevTime)
        prevTime = audio.currentTime


        setTimeout(()=>{
            moveItems()
            repeat()},timeUntil)
        
    }
    setTimeout(()=>{
        moveItems()
        repeat()},810)

}

document.body.onclick = play;