const lines = document.querySelectorAll('.line');
const table = document.querySelector('.first-timeline-table');
document.addEventListener('scroll', function(e) {
    var scrollHeight = -table.getBoundingClientRect().top+window.innerHeight/2
    for (var line of lines){
        const parent = line.parentElement
        const parentHeight = parent.getBoundingClientRect().height
        const lineTop = -line.getBoundingClientRect().top+window.innerHeight/2
        if (lineTop > 0){
            if (parentHeight<=lineTop){
                console.log("Ran")
                line.style.height = `${parentHeight}px`
            }
            else{
                line.style.height = `${lineTop}px`
                break
            }
        }
        else{
            break
        }
    }
});