const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0,0,0,0];
var interval;
var timeRunning = false;
// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) 
{
    if (time <= 9)
    {
      time = "0" + time; 
    }
  return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100)-(timer[0]*60));
    timer[2] = Math.floor(timer[3]-(timer[1]*100) -(timer[0]*6000));

}

// Match the text entered with the provided text on the page:
function spellcheck(){
    let textEntered = testArea.value;
    console.log(textEntered);  
    let originTextMatch = originText.substring(0,textEntered.length);
    if(textEntered === originText) 
    {
        testWrapper.style.borderColor = "#00ff00"; 
        clearInterval(interval);
    }
    else
    {
     if (textEntered === originTextMatch){
        testWrapper.style.borderColor = "#0066CC"; 
     }
     else {
        testWrapper.style.borderColor = "#FF5E13"; 
     }
    }
}

// Start the timer:
function start(){
    let textEnteredLength = testArea.value.length;
    if (textEnteredLength === 0 && !timeRunning) {
       timeRunning = true; 
        interval = setInterval(runTimer , 10);
    
    }
    console.log(textEnteredLength);  
}

// Reset everything:
function reset() {
clearInterval(interval);
interval = null;
timer= [0,0,0,0];
timeRunning = false;

testArea.value = "";
theTimer.innerHTML = "00:00:00";
testWrapper.style.borderColor = "grey";
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress",start,"false");
testArea.addEventListener("keyup",spellcheck,"false");
resetButton.addEventListener("click",reset,"false");