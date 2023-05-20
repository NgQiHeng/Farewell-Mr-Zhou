const lines = document.querySelectorAll('.line');
const table = document.querySelector('.first-timeline-table');
document.addEventListener('scroll', function(e) {
    var scrollHeight = -table.getBoundingClientRect().top+window.innerHeight/2
    for (var line of lines){
        const parent = line.parentElement
        const parentHeight = parent.getBoundingClientRect().height
        const lineTop = -line.getBoundingClientRect().top+window.innerHeight/2
        console.log(`parent: ${parent.parentElement.id} linetop: ${lineTop}`)
        // Check if the line has reached that place
        if (lineTop > 0){                             
            if (parentHeight<=lineTop){
                line.style.height = `${parentHeight}px`
            }
            else{ 
                line.style.boxShadow = '0 0 13px 3px #A6CBBE'
                line.style.height = `${lineTop}px`
            }
        }
        // Reset the line height of the dots that have not been covered
        else{
            line.style.height = '0px'
            line.style.boxShadow = 'none'
        }
    }
});