const button = document.getElementById("button")
const recordTime = document.getElementById("record-time")
const timeContainer = document.getElementById("time-container")
const lastTime = document.getElementById('last-time')
const dropDown = document.getElementById('drop-down')
const selectBtn = document.getElementById('select-btn')
const chevronIcon = document.getElementById('chevron-icon')
const items = document.getElementsByClassName('items')
const selectedText = document.getElementById('selected-text')
const bellButton = document.getElementById('bell')


let [seconds, minutes, hours] = [0, 0, 0]

let displayTime = document.getElementById('display-time')
let timer = null

let booleanForButton = false

let value = ''

selectBtn.addEventListener('click', ()=>{
    selectDropDown()
    dropDown.classList.remove('hidden')
})

let showDropDown = false
 
const selectDropDown = ()=>{
    if(showDropDown === false){
        showDropDown = true
        chevronIcon.classList.add('rotate-180')
        dropDown.classList.add('h-[120px]')
    }else if(showDropDown === true){
        showDropDown = false
        chevronIcon.classList.remove('rotate-180')
        dropDown.classList.remove('h-[120px]')
    }
}

for(let item of items){
    item.onclick = function () {
        selectedText.innerHTML = this.textContent;
        value = selectedText.innerText
        showDropDown = false
        chevronIcon.classList.remove('rotate-180')
        dropDown.classList.add('hidden')
    }
}



button.addEventListener('click', ()=>{
    if(booleanForButton === false){
        booleanForButton = true
        button.innerText = 'stop time'
        
        startWatch()
    }else if(booleanForButton === true){
       
       
        resetOrStop()
        booleanForButton = false
        button.innerText = 'start time'
        

    }
})

let alarmTone = new Audio('./assets/alarm-ringtone.mp3')
console.log(alarmTone);


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
   if(minutes === 60){
    alarmTone.play()
    alarmTone.loop = true;
    bellButton.classList.add('rotate-animation')

   setTimeout(()=>{
      alarmTone.pause()
      bellButton.classList.remove('rotate-animation')
   }, 10000)
   }
  
}
let data = []

function startWatch(){
    if(timer !== null){
        clearInterval(timer)
       }
   timer = setInterval(stopWatch, 1000)
}

function resetOrStop(){
    data.push({
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        value: value
    })
    localStorage.setItem('data', JSON.stringify(data));
    newTodo()
}
const newTodo = () =>{
    timeContainer.innerHTML = ''
    {
        data.map(({hours, minutes, seconds, value})=>{
            let styleClass = "";
    if (hours >= 1) {
        styleClass = "bg-green-200 border-[1px] border-green-600";
    } else if (hours >= 2) {
        styleClass = "bg-yellow-200 border-[1px] border-yellow-600";
    } else if (hours >= 3) {
        styleClass = "bg-red-200 border-[1px] border-red-600";
    } else {
        styleClass = "bg-blue-200 border-[1px] border-blue-600";
    }
            return  timeContainer.innerHTML += ` <div class="w-full ${styleClass} rounded-full px-3 py-2 flex items-center justify-between mb-2" id="record-time" >
            <p class="font-bold text-gray-900"><span>${hours}</span> hour <span>${minutes}</span> min <span>${seconds}</span> sec</p>
            <p class="font-bold text-gray-900">${value}</p>
            <div class="flex flex-row-reverse items-center gap-2">
             <button onClick='removeTimer(this)'>
             <i class="fa fa-times-circle-o" aria-hidden="true"></i>  
             </button>
            </div> `
        })
    }
    lastTime.innerHTML = `${minutes} min ${seconds} sec`
    resetData()
    clearInterval(timer);
    [seconds, minutes, hours] = [0,0,0];
    displayTime.innerHTML = '00:00:00';
}

function removeTimer(e) {
    const id = e.parentElement.parentElement.id;
    const removedData = data.splice(id, 1);
    localStorage.setItem('data', JSON.stringify(data));
    resetData();
    e.parentElement.parentElement.remove();
}
let resetData = ()=>{
    minutes= ''
    seconds= ''
    hours= ''
}

(() => {
    data = JSON.parse(localStorage.getItem('data')) || [];
    newTodo()
  })();