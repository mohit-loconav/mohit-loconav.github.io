let sequenceMade=[];
let sequenceUser=[];

const audio = [
  new Audio("./sounds/green.mp3"), 
  new Audio("./sounds/blue.mp3"), 
  new Audio("./sounds/red.mp3"), 
  new Audio("./sounds/yellow.mp3"), 
  new Audio("./sounds/wrong.mp3")
];

let levelCounter= 0; 
let level=0;

const title = document.querySelector('#level-title');
const green = document.querySelector('#green');
const blue = document.querySelector('#blue');
const red = document.querySelector('#red');
const yellow = document.querySelector('#yellow');

// enter to start the game
document.addEventListener("keydown", (event) => {
  if (event.keyCode === 13 && !sequenceMade.length){
    nextSequence();
  }
});

// play with a,s,z,x
document.addEventListener("keydown", handleBtn);


//This generates a random number and pushes it to the sequenceMade.
function nextSequence() {
 var randomNumber = Math.floor(Math.random()*4);
 sequenceMade.push(randomNumber); 
 showSequence(sequenceMade[sequenceMade.length - 1]);
 changeLevel();
 sequenceUser=[];
};

//This displays the color and sound of each option
function showSequence(element) {
  
  switch (element){
  case 0:
    audio[0].play();
    green.classList.add("dissapear");
    setTimeout(function(){
      green.classList.remove("dissapear");
    },250)
    break;
  case 1:
    audio[2].play();
    red.classList.add("dissapear");
    setTimeout(function () {
      red.classList.remove("dissapear");
    }, 250)
    break;
  case 2:
    audio[3].play();
    yellow.classList.add("dissapear");
    setTimeout(function () {
    yellow.classList.remove("dissapear");
    }, 250)
    break;
  case 3:
    audio[1].play();
    blue.classList.add("dissapear");
    setTimeout(function () {
      blue.classList.remove("dissapear");
    }, 250)
    break;
  }
 };

function changeLevel() {
  levelCounter++;
  title.textContent = `Level: ${levelCounter}`;
};

//This converts the clicks into numbers and pushes it to a new array.
document.querySelectorAll('.btn').forEach(el => {
  console.log(el)
  el.addEventListener('click', handleBtn);
});

function handleBtn(event) {
  
  let btn;
  let keyMap = {
    'a': 'green',
    's': 'red',
    'z': 'yellow',
    'x': 'blue'
  }

  if(event instanceof KeyboardEvent) {
    btn = keyMap[event.key];
  } else {
    btn = event.target.id;
  }

  switch(btn){
    case "green":
    sequenceUser.push(0);
    showSequence(0);
    break;

    case "red":
    sequenceUser.push(1);
    showSequence(1);
    break;
    
    case "yellow":
    sequenceUser.push(2);
    showSequence(2);
    break;
    
    case "blue":
    sequenceUser.push(3);
    showSequence(3);
    break;
  }
  checkSequence(sequenceUser.length-1);
} 

   
//This checks if the sequences is correct so far
function checkSequence(indexOfArray) { 

  if(sequenceUser[indexOfArray] === sequenceMade[indexOfArray]){
   
  if(sequenceMade.length === sequenceUser.length) {
     setTimeout(function () {
    nextSequence();
     }, 1000);
  }
  } else {
  launchError();
  }
}

// Game Over
function launchError(){
document.body.style.backgroundColor = "red";
title.textContent = "Game Over";
  setTimeout(function () {
  title.textContent = "Press Enter Key to start";
  document.body.style.backgroundColor = "#011F3F";
  }, 1500)
audio[4].play();
levelCounter=0;
sequenceMade = [];
}


// let promise = fetch(url, {
//   method: "GET", // POST, PUT, DELETE, etc.
//   headers: {
//     // the content type header value is usually auto-set
//     // depending on the request body
//     "Content-Type": "text/plain;charset=UTF-8"
//   },
//   body: undefined, // string, FormData, Blob, BufferSource, or URLSearchParams
//   referrer: "about:client", // or "" to send no Referer header,
//   // or an url from the current origin
//   referrerPolicy: "no-referrer-when-downgrade", // no-referrer, origin, same-origin...
//   mode: "cors", // same-origin, no-cors
//   credentials: "same-origin", // omit, include
//   cache: "default", // no-store, reload, no-cache, force-cache, or only-if-cached
//   redirect: "follow", // manual, error
//   integrity: "", // a hash, like "sha256-abcdef1234567890"
//   keepalive: false, // true
//   signal: undefined, // AbortController to abort request
//   window: window // null
// });