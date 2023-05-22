const notesGalleryItems = document.querySelectorAll(".notes-gallery>*");
const notesGallery = document.querySelector(".notes-gallery");
const details = {}
const moveStates = [true,true,true]
var windowWidth = window.innerWidth
var mobile = windowWidth<500
var colCount = mobile?2:3
var toMoveCombi = 0
var audio
var prevTime 
window.addEventListener('resize',()=>{
    windowWidth = window.innerWidth
    oldmobile = mobile
    mobile = windowWidth<500
    colCount = mobile?2:3
    if (oldmobile!=mobile){
        initItems()
    }
})
async function moveItems(){
    await sleep(200)
    console.log(mobile,colCount)
    const containerHeight = notesGallery.getBoundingClientRect().height
    const Combis = mobile?{0:[1],1:[2]}:{
        0:[1,3],
        1:[2,3],
        2:[1,2],
    }
    toMoveCombi = toMoveCombi%colCount
    const toMove = Combis[toMoveCombi]
    toMoveCombi = toMoveCombi+1
    for (var i = 1;i<colCount+1;i++){
        if (!toMove.includes(i)) continue
        if (!moveStates[i-1]) continue
        const dir = details[i]["dir"]
        const number = details[i]["number"] - dir
        console.log(i,i+number*colCount-1,i-1+number*colCount+colCount*dir)
        var height = notesGalleryItems[i+number*colCount-1].getBoundingClientRect().top-notesGalleryItems[i-1+number*colCount+colCount*dir].getBoundingClientRect().top
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
        for (var j = i-1;j<notesGalleryItems.length;j+=colCount){
            notesGalleryItems[j].style.transitionDuration = `1s`
            notesGalleryItems[j].style.transitionTimingFunction = `ease-in-out`
            notesGalleryItems[j].style.transform = `translateY(${curTranslate}px)`
        }
    }
}
function initContainer(){
    const updateStates = function(event){
        var x = event.clientX
        if (notesGalleryItems[0].getBoundingClientRect().left<x && x<notesGalleryItems[0].getBoundingClientRect().right){
            moveStates[0] = false
        }
        else{
            moveStates[0] = true
        }
        if (notesGalleryItems[1].getBoundingClientRect().left<x && x<notesGalleryItems[1].getBoundingClientRect().right){
            moveStates[1] = false
        }
        else{
            moveStates[1] = true
        }
        if (notesGalleryItems[2].getBoundingClientRect().left<x && x<notesGalleryItems[2].getBoundingClientRect().right){
            moveStates[2] = false
        }
        else{
            moveStates[2] = true
        }
    }
    notesGallery.onmouseenter = updateStates
    notesGallery.onmousemove = updateStates
    notesGallery.onmouseleave = function(event){
        moveStates[0] = true
        moveStates[1] = true
        moveStates[2] = true
    }
}
function initItems(){
    const containerHeight = notesGallery.getBoundingClientRect().height
    const containerTop = notesGallery.getBoundingClientRect().top
    const containerBottom = notesGallery.getBoundingClientRect().bottom
    console.log(colCount)
    for (var i = 1;i<colCount+1;i++){
        const number = Math.floor(Math.random()*Math.floor(notesGalleryItems.length/colCount))
        details[i] = {dir:Math.random() < 0.5 ? -1 : 1,"number":number}
        var curTranslate = 0
        var totalHeight = 0
        var totalRows = 0
        console.log(number)
        for (var j = i-1;j<notesGalleryItems.length;j+=colCount){
            var height
            if (j+colCount<notesGalleryItems.length) var height = notesGalleryItems[j].getBoundingClientRect().top-notesGalleryItems[j+colCount].getBoundingClientRect().top
            else var height = -notesGalleryItems[j].getBoundingClientRect().height
            if (Math.floor(j/colCount)<number){
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
    for (var i = 1;i<colCount+1;i++){
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
        for (var j = i-1;j<notesGalleryItems.length;j+=colCount){
            notesGalleryItems[j].style.transitionDuration = `0s`
            notesGalleryItems[j].index = j
            notesGalleryItems[j].colNum = i
            notesGalleryItems[j].style.transform = `translateY(${curTranslate}px)`
        }
        if (details[i]['number'] == 0) details[i]['dir'] = -1
    }
}

initItems()
initContainer()