var data
const cards = document.querySelectorAll('.timeline-container');
var currentFlip = 0;
var prevTime
// Read a JSON file and assign it to data


async function readJSONFile(filePath) {
    return new Promise((resolve, reject) => {
      fetch(filePath)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch JSON file');
          }
          return response.json();
        })
        .then(response => {
            data = response
            console.log(data)
            resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

async function sleep(time){
    return new Promise(resolve => setTimeout(resolve, time));
}
function loadCard(side,id){
    const img = side.querySelector('img');
    const desc = side.querySelector('p');
    console.log(side.parentNode.curNum)
    img.src = data[id][side.parentNode.curNum].img;
    desc.innerText = data[id][side.parentNode.curNum].desc;
    side.parentNode.curNum = (side.parentNode.curNum+1)%data[id].length;
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
        if (currentFlipAmt%360==180){
            var toUpdate = card.querySelector('.back')
            loadCard(toUpdate,i)
        }
        else{
            var toUpdate = card.querySelector('.front')
            loadCard(toUpdate,i)
        }
    }
    currentFlip = (currentFlip+1)%2;
}
async function initFlip(){
    await readJSONFile('assets/js/timelineData.json')
    for (var [i,card] of Object.entries(cards)){
        if (data[i].length == 1) card.curNum = 0;
        else card.curNum = 1;
        var toUpdate = card.querySelector('.back')
        loadCard(toUpdate,i)
    }
}
initFlip()

