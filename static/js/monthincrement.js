const  Months = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre","Octobre", "Novembre", "Decembre"]


let mocksRemplas = [
    {
        debut: "2024-07-01",
        fin: "2024-07-31", 
        lieu : "la rochelle",
        logiciel : "maxvignt",
        temps_trajet : 20,
    }, 
    {
        debut: "2024-07-05",
        fin: "2024-07-14",
        lieu : "marly gaumont",
        logiciel : "maximed",
        temps_trajet : 20,
    }, 
    {
        debut: "2024-07-22",
        fin: "2024-07-30",
        lieu : "bordeaux",
        logiciel : "medilogic",
        temps_trajet : 120,
    }, 
    {
        debut: "2024-07-22",
        fin: "2024-09-22",
        lieu : "bordeaux",
        logiciel : "medilogic",
        temps_trajet : 120,
    }, 
]




let today = new Date()
createCalendar(mocksRemplas, today)

let plusBtn = document.querySelector("#plusBtn")
let currMonthSpan = document.querySelector("#currMonth")
let currYear = today.getFullYear()
let currMonth = Months[today.getMonth()]
currMonthSpan.textContent = currMonth + " " + currYear
plusBtn.addEventListener("click", (e) => {
    let old = document.querySelector("#calendarDiv")
    old.remove()
    if (today.getMonth() != 11){
    today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())
    let currMonthSpan = document.querySelector("#currMonth")
    let currYear = today.getFullYear()
    let currMonth = Months[today.getMonth()]
    currMonthSpan.textContent = currMonth + " " + currYear
    createCalendar(mocksRemplas, today)
    } else {
        today = new Date(today.getFullYear() + 1, 0, today.getDate())
        let currMonthSpan = document.querySelector("#currMonth")
        let currYear = today.getFullYear()
        let currMonth = Months[today.getMonth()]
        currMonthSpan.textContent = currMonth + " " + currYear
        createCalendar(mocksRemplas, today)
    }

})

