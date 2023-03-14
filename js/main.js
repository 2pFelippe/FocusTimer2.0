const soundButtons = document.querySelectorAll('.sounds button')
const forestAudio = new Audio('./audios/Floresta.wav')
const rainAudio = new Audio("./audios/Chuva.wav")
const coffeeAudio = new Audio("./audios/Cafeteria.wav")
const fireplaceAudio = new Audio("./audios/Lareira.wav")
const playButton = document.querySelector('.play')
const stopButton = document.querySelector('.stop')
const addButton = document.querySelector('.add')
const removeButton = document.querySelector('.remove')
const minutesDisplay = document.querySelector('.minutes')
const secondsDisplay = document.querySelector('.seconds')
forestAudio.loop = true
rainAudio.loop = true
fireplaceAudio.loop = true
coffeeAudio.loop = true


//seletor dos botões de áudio
for(let i = 0; i < soundButtons.length; i++){
  soundButtons[i].addEventListener('click', function (){
    for(let j = 0; j < soundButtons.length; j++){
      soundButtons[j].classList.remove('active')
    }
    this.classList.toggle('active')
    if(i == 0){
      forestAudio.play()
      rainAudio.pause()
      coffeeAudio.pause()
      fireplaceAudio.pause()
    }else if(i ==1){
      rainAudio.play()
      forestAudio.pause()
      coffeeAudio.pause()
      fireplaceAudio.pause()
    }else if(i ==2){
      coffeeAudio.play()
      rainAudio.pause()
      forestAudio.pause()
      fireplaceAudio.pause()
    }else if(i==3){
      fireplaceAudio.play()
      rainAudio.pause()
      coffeeAudio.pause()
      forestAudio.pause()
    }
  })
}

//timer
playButton.addEventListener('click', countdown)
stopButton.addEventListener('click', reset)
addButton.addEventListener('click', addMinutes)
removeButton.addEventListener('click', removeMinutes)


let timerTimeOut
let minutes = Number(minutesDisplay.textContent)
let seconds = Number(secondsDisplay.textContent)

function updateDisplay(newMinutes, seconds) {
  newMinutes = newMinutes === undefined ? minutes : newMinutes
  seconds = seconds === undefined ? 0 : seconds
  minutesDisplay.textContent = String(newMinutes).padStart(2, "0")
  secondsDisplay.textContent = String(seconds).padStart(2, "0")
}

function reset() {
  updateDisplay(minutes, 0)
  clearTimeout(timerTimeOut)
  timeLeft = undefined
}

function countdown(){
  timerTimeOut = setTimeout(function() {
    let seconds =  Number(secondsDisplay.textContent)
    let minutes = Number(minutesDisplay.textContent)
    let isFinished = minutes <= 0 && seconds == 0

    updateDisplay(minutes, 0)

    if (isFinished) {
      reset()   
      updateDisplay()
      return
    }

    if( seconds <= 0 ) {
      seconds = 60
      --minutes
    }

    updateDisplay(minutes, String(seconds - 1))

    countdown()

  }, 1000)
}


function hold(){
  clearTimeout(timerTimeOut)
}

function addMinutes(){
  minutes += 5
  updateDisplay()
}

function removeMinutes(){
  if(minutes >=5){
    minutes -= 5
    updateDisplay(minutes, seconds)
  }else if(minutes < 5){
    updateDisplay(0,0)
  }}
  
