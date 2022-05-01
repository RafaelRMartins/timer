const buttonPlay = document.querySelector('.play')
const buttonPause = document.querySelector('.pause')
const buttonMore = document.querySelector('.more')
const buttonLess = document.querySelector('.less')
const buttonForest = document.querySelector('.Forest')
const buttonRain = document.querySelector('.Rain')
const buttonCoffeeShop = document.querySelector('.CoffeeShop')
const buttonFireplace = document.querySelector('.Fireplace')
const buttonSelected = document.querySelector('.selected')
const minutesDisplay = document.querySelector('.minutes')
const secondsDisplay = document.querySelector('.seconds')
const buttonTheme = document.querySelector('.bx')

let timerTimeOut

const buttonPressAudio = new Audio("https://github.com/maykbrito/automatic-video-creator/blob/master/audios/button-press.wav?raw=true")
const kitchenTimer = new Audio("https://github.com/maykbrito/automatic-video-creator/blob/master/audios/kichen-timer.mp3?raw=true")
const forestAudio = new Audio("audio/forest.wav")
const rainAudio = new Audio("audio/rain.wav")
const coffeeShopAudio = new Audio("audio/coffeeshop.wav")
const fireplaceAudio = new Audio("audio/fireplace.wav")
forestAudio.loop = true
rainAudio.loop = true
coffeeShopAudio.loop = true
fireplaceAudio.loop = true

function theme(thema){
  if(thema == "dark"){
    document.body.style.setProperty('--secondary-color', '#fff')
    document.body.style.setProperty('--bg-color', '#323238')
  }else{
    document.body.style.setProperty('--secondary-color', '#323238')
    document.body.style.setProperty('--bg-color', '#fff')
  }
}

function removeSelectedAll(){
  buttonForest.classList.remove('selected')
  buttonRain.classList.remove('selected')
  buttonCoffeeShop.classList.remove('selected')
  buttonFireplace.classList.remove('selected')
}

function removeAudioAll(){
  forestAudio.pause()
  rainAudio.pause()
  coffeeShopAudio.pause()
  fireplaceAudio.pause()
}

function updateDisplay(newMinutes, seconds){
  newMinutes = newMinutes === undefined ? minutes : newMinutes
  seconds = seconds === undefined ? 0 : seconds
  minutesDisplay.textContent = String(newMinutes).padStart(2, "0")
  secondsDisplay.textContent = String(seconds).padStart(2, "0")
}

function resetControls(){
  document.querySelector('.play').disabled = false;
}

function countdown(){
  timerTimeOut = setTimeout(function(){
    let seconds = Number(secondsDisplay.textContent)
    let minutes = Number(minutesDisplay.textContent)
    let isFinished = minutes <= 0 && seconds <= 0
    
    updateDisplay(minutes, 0)
    
    if(isFinished){
      resetControls()
      updateDisplay(0, 0)
      kitchenTimer.play()
      return
    }
    
    if( seconds <= 0){
      seconds = 60
      --minutes
    }
    
    updateDisplay(String(minutes), String(seconds -1))
    
    countdown()
  }, 1000)
}

function more(){
  let minutes = Number(minutesDisplay.textContent)
  minutes = minutes + 5
  minutesDisplay.textContent = String(minutes).padStart(2, "0")
}

function less(){
  let minutes = Number(minutesDisplay.textContent)
  if(minutes <= 4){
    minutesDisplay.textContent = "00"
    secondsDisplay.textContent = "00"
    kitchenTimer.play()
    return
  }
  minutes = minutes - 5
  minutesDisplay.textContent = String(minutes).padStart(2, "0")
}

buttonPlay.addEventListener('click', function(){
  buttonPressAudio.play()
  document.querySelector('.play').disabled = true;
  document.querySelector('.pause').disabled = false;
  countdown()
})

buttonPause.addEventListener('click', function(){
  buttonPressAudio.play()
  clearTimeout(timerTimeOut)
  document.querySelector('.play').disabled = false;
  document.querySelector('.pause').disabled = true;
})

buttonMore.addEventListener('click', function(){
  more()
  buttonPressAudio.play()
})

buttonLess.addEventListener('click', function(){
  less()
  buttonPressAudio.play()
})

buttonForest.addEventListener('click', function(){
  if(buttonForest.className != "Forest"){
    removeSelectedAll()
    removeAudioAll()
    return
  }
  removeAudioAll()
  removeSelectedAll()
  buttonForest.classList.add('selected')
  forestAudio.play()
})

buttonRain.addEventListener('click', function(){
  if(buttonRain.className != "Rain"){
    removeSelectedAll()
    removeAudioAll()
    return
  }
  removeAudioAll()
  removeSelectedAll()
  buttonRain.classList.add('selected')
  rainAudio.play()
})

buttonCoffeeShop.addEventListener('click', function(){
  if(buttonCoffeeShop.className != "CoffeeShop"){
    removeSelectedAll()
    removeAudioAll()
    return
  }
  removeAudioAll()
  removeSelectedAll()
  buttonCoffeeShop.classList.add('selected')
  coffeeShopAudio.play()
})

buttonFireplace.addEventListener('click', function(){
  if(buttonFireplace.className != "Fireplace"){
    removeSelectedAll()
    removeAudioAll()
    return
  }
  removeAudioAll()
  removeSelectedAll()
  buttonFireplace.classList.add('selected')
  fireplaceAudio.play()
})

buttonTheme.addEventListener('click', function(){
  if(buttonTheme.className == "bx bx-moon change-theme bx-sun"){
    buttonTheme.classList.remove('bx-sun')
    theme()
    return
  }
  buttonTheme.classList.add('bx-sun')
  theme("dark")
})