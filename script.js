// *javaScript code
const button = document.getElementById("button")
const recordTime = document.getElementById("record-time")
const timeContainer = document.getElementById("time-container")

console.log(button);

let [seconds, minutes, hours] = [0, 0, 0]

let displayTime = document.getElementById('display-time')
let timer = null

let booleanForButton = false

button.addEventListener('click', ()=>{
    startWatch()
    if(booleanForButton === false){
        booleanForButton = true
        button.innerText = 'Start time'
        resetOrStop()
        
    }else if(booleanForButton === true){
       
        startWatch()

        booleanForButton = false
        button.innerText = 'Stop time'
        

    }
    console.log('working');
    console.log(booleanForButton, 'boolean');
})




function stopWatch (){
    seconds++;
    if(seconds === 60){
        seconds = 0;
        minutes++;
        if(minutes === 60){
            minutes = 0;
            hours++;
        }
    }

    let h = hours < 10 ? "0"+hours : hours
let m = minutes < 10 ? "0"+minutes : minutes
let s = seconds < 10 ? "0"+seconds : seconds 

   displayTime.innerHTML = h+':'+m+':'+s; 
}
let data = {}

console.log(data);

function startWatch(){
    if(timer !== null){
        clearInterval(timer)
       }
   timer = setInterval(stopWatch, 1000)
}

function resetOrStop(){
    data['hour']= hours
    data['minutes']= minutes
    data['seconds']= seconds 
    timeContainer.innerHTML += ` <div class="w-full bg-blue-100 rounded-full px-3 py-2 flex items-center justify-between mb-2" id="record-time" >
    <p class="font-bold text-gray-900"><span>${hours}</span> hour <span>${minutes}</span> min <span>${seconds}</span> sec</p>
    <div class="flex flex-row-reverse items-center gap-2">
     <button onClick='reomveTimer(this)'>
     <i class="fa fa-times-circle-o" aria-hidden="true"></i>  
     </button>
    </div> `
    console.log(data)
    clearInterval(timer);
    [seconds, minutes, hours] = [0,0,0];
    displayTime.innerHTML = '00:00:00'; 
}

function reomveTimer(e){
    e.parentElement.parentElement.remove()
}

const output = startWatch()
console.log(output)