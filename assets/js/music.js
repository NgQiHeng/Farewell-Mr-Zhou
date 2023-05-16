'use strict'
let button = document.getElementById('button');

let body = document.getElementById('body');

let content = document.getElementById('content');

function play(){
    var audio = new Audio('assets/立化忆.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audio.play();
    content.style.opacity = 1;
    body.style.overflow = 'visible';
}

button.addEventListener('click', play);