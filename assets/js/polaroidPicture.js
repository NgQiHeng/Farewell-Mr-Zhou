const polaroidPictures = document.querySelectorAll('.polaroid-picture');
var prevTime
var currentMove = 0;

function movePolariodPictures() {
    console.log(polaroidPictures)
    for (var [i,picture] of Object.entries(polaroidPictures)) {
        if (i%2!=currentMove) continue;
        console.log(picture)
        picture.style.transition = 'transform 1s ease-in-out';
        picture.style.transform = 'rotate(' + (picture.prevDir*(Math.random() * 10 + 5)) + 'deg)';
        picture.prevDir *= -1;
    }
    currentMove = (currentMove+1)%2;
}
function initPolariodPictures() {
    for (var picture of polaroidPictures) {
        picture.prevDir = Math.random() > 0.5 ? 1 : -1;
    }
}
initPolariodPictures()
