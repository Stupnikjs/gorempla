let today = new Date()
createCalendar(mocksRemplas, today)

let plusBtn = document.querySelector("#plusBtn")
let currMonthSpan = document querySelector("#currMonth")
let currMonth = Months[today.getMonth()]
currMonthSpan.textContent = currMonth
plusBtn.addEventListener("click", (e) => {
    let old = document.querySelector("#calendarDiv")
    old.remove()
    if (today.getMonth() != 11){
    today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())

    createCalendar(mocksRemplas, today)
    } else {
        today = new Date(today.getFullYear() + 1, 0, today.getDate())
        createCalendar(mocksRemplas, today)
    }

})
