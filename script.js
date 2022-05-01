'use strict';

let btnOK = document.querySelector("#btnOK")
let InpData = document.getElementById('inptData')
let contentFull = document.querySelector(".conteinerForm")
let restart = false
let InpTime = 0

btnOK.addEventListener('click', clickOk)

function clickOk() {
    if (!isNaN(InpData.value)) {
        alert('Введи время, прежде чем тыкать кнопку!!!')
    } else {
        getTimeInp(InpData.value)

    }
}

function getTimeInp(TimeStr) {
    let arr = TimeStr.split(':')
    InpTime = (arr[0] * 3600000) + (arr[1] * 60000)
    getMeTime(InpTime)
}

function getMeTime(TrebTime) {
    let time = new Date()
    let sec = time.getSeconds()
    let min = time.getMinutes()
    let hr = time.getHours()
    let NowTime = (hr * 3600000) + (min * 60000) + (sec * 1000)
    let res = TrebTime - NowTime

    if (res < 0) {
        res = (86400000 - NowTime) + TrebTime
    }

    console.log("До 00:00 осталось " + res / 1000 + " секунд")
    msToTime(res)
}

function msToTime(duration) {

    let minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24),
        seconds = parseInt((duration / 1000) % 60)

    hours = (hours < 10) ? "0" + hours : hours
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds

    let res = hours + ":" + minutes + ":" + seconds

    if (restart) {
        let RendrTimeConteiner = document.querySelector("#time");
        RendrTimeConteiner.innerHTML = res
        if (hours === "00" && minutes=== "00" && seconds=== "00") {
            // alert("Время вышло!")
            RendrTimeConteiner.nextElementSibling.remove()
            document.body.style.backgroundColor = 'red';
            return
        }
        setTimeout(reRanderTime, 1000)
    } else {
        render(res)
    }

}

function render(str) {
    while (contentFull.firstChild) {
        contentFull.removeChild(contentFull.firstChild)
    }
    restart = true
    let addNewBlock = document.createElement('div')
    addNewBlock.className = `timeFinish text`
    addNewBlock.innerHTML = `<div id="time">${str}</div>
<div class="loader">
  <span class="top"></span>
  <span class="bottom"></span>
</div>`
    contentFull.append(addNewBlock)

    reRanderTime()
}

function reRanderTime() {
    getTimeInp(InpData.value)
}

