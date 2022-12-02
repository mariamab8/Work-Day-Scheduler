const currentDate = new Date().toDateString();
const date = document.querySelector(".date")
const container = document.querySelector(".container")
let timeBlocks = '';

let currentHour = new Date().getHours()
let v = currentDate.split(' ')


date.innerHTML = `${v[0]} ${v[1]}, ${v[2]}th`;


let times = [9, 10, 11, 12, 13, 14, 15, 16, 17]

function render() {

    for (const time of times) {
        let event = ''
        if (time > currentHour) {
            event = 'future'
        } else if (time < currentHour) {
            event = 'past'
        } else {
            event = 'present'
        }
        timeBlocks +=
            `<div class="row time-block">
        <div class="col-md-1 hour">${time} ${time >= 12 ? 'pm' : 'am'}</div> 
        <textarea class="col-md-10 description ${event} id="text" data-num=${time}></textarea>
        <button class="btn saveBtn col-md-1" data-bt=${time}><i class="fas fa-save"></i></button>
      </div>
    `
    }
}

render()

container.innerHTML = timeBlocks;

let text = document.getElementsByClassName("col-md-10");
let buttons = document.getElementsByClassName("btn saveBtn");


for (const note of text) {

    note.addEventListener('change', function (e) {

        e.target.value = e.target.value

        localStorage.setItem(e.target.dataset.num, JSON.stringify(note.value));


    })
}

// let x = localStorage.getItem('list');


for (const button of buttons) {
    // console.log(button)

    button.addEventListener('click', function (e) {


        e.target.parentElement.children[1].innerHTML = localStorage.getItem(e.target.dataset.bt)


    })

}


for (const time of times) {


    for (const note of text) {
        if (note.dataset.num == time) {

            note.innerHTML = localStorage.getItem(time)

        }

    }
}