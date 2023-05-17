const gallery = document.querySelector(".gallery")
const gallery_images = document.querySelectorAll(".gallery-item")
const width =document.body.clientWidth 
// const gallery_title = document.querySelector(".gallery-title")
// const gallery_desc = document.querySelector(".gallery-description")
// const gallery_authors = document.querySelector(".gallery-authors")
// const gallery_visit = document.querySelector(".gallery-visit")
// const gallery_contents = document.querySelector(".gallery-contents")

gallery.prevscroll = 0
gallery.direction = 1
gallery.style.setProperty('--vw', `${width/100}`)

// Setup the animation loop.
function animate(time) {
	requestAnimationFrame(animate)
	TWEEN.update(time)
}
requestAnimationFrame(animate)

function gallery_anims(){
    gallery.clicked = false
    gallery.startmousepos = null
    const width =document.body.clientWidth 
    const imagesize = width/100 * 40 
    var imageno = Math.round((gallery.prevscroll+ width/100 * 70)/imagesize)
    console.log(imageno-1,gallery_images.length)
    if (imageno + gallery.direction > gallery_images.length || imageno -1 + gallery.direction < 0 ) gallery.direction = -gallery.direction 
    imageno += gallery.direction
    const coords = {x: gallery.prevscroll} // Start at (0, 0)
    
    gallery.tween = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
	.to({x: imageno*imagesize - width/100 * 70}, 1000) // Move to (300, 200) in 1 second.
	.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
	.onUpdate(() => {
		console.log(imageno)
		gallery.style.setProperty('--scroll', `${-coords.x}`)
        gallery.prevscroll = coords.x
	})
    .delay(5000)
    .onComplete(()=>{
        const image_chosen = gallery_images[imageno-1]
        gallery_title.innerText = image_chosen.dataset.title
        gallery_desc.innerText = image_chosen.dataset.description
        gallery_authors.innerText = image_chosen.dataset.authors
        gallery_visit.onclick = function(){window.open(image_chosen.dataset.link,"_blank")}
        gallery_anims()
    })
	.start() // Start the tween immediately.
}

for (var image of gallery_images){
    image.ondragstart = function(){return false}
}

const imageno = 1
const imagesize = width/100 * 40 
gallery.prevscroll = (imageno*imagesize - width/100 * 70)
console.log(gallery.prevscroll)
gallery.style.setProperty('--scroll', `${-(imageno*imagesize - width/100 * 70)}`)
const image_chosen = gallery_images[imageno-1]

gallery.onmousedown = function(mouse){
    if (this.tween) this.tween.stop()
    this.clicked = true
    this.startmousepos = mouse.x
}

document.body.onmouseup = function(mouse){
    if (!gallery.clicked) return 
    gallery.clicked = false
    gallery.prevscroll = (gallery.prevscroll+gallery.startmousepos - mouse.x)
    gallery.startmousepos = null
    const width =document.body.clientWidth 
    const imagesize = width/100 * 40 
    const imageno = Math.round((gallery.prevscroll+ width/100 * 70)/imagesize)
    if (imageno > gallery_images.length || imageno -1 < 0 ) return 
    
    const coords = {x: gallery.prevscroll} // Start at (0, 0)
    const image_chosen = gallery_images[imageno-1]

    gallery.tween = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
	.to({x: imageno*imagesize - width/100 * 70}, 1000) // Move to (300, 200) in 1 second.
	.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
	.onUpdate(() => {
		gallery.style.setProperty('--scroll', `${-coords.x}`)
        
        gallery.prevscroll = coords.x
	})
    
	.start() // Start the tween immediately.


}

gallery.onmousemove = function(mouse){
    if (!this.clicked) return
    this.style.setProperty("--scroll", `${-(this.prevscroll+this.startmousepos - mouse.x)}`)
}

window.onresize = function(){
    const width =document.body.clientWidth 

    gallery.style.setProperty('--vw', `${width/100}`)
}

gallery_anims()