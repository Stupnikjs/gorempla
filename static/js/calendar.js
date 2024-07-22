let mocksRemplas = [
    {
        debut: "2024-07-25",
        fin: "2024-07-28"
    },
    {
        debut: "2024-07-05",
        fin: "2024-07-11"
    },
]

let colors = ["blue", "purple"]

function createCalendar(remplas){
    let calendarDiv = document.querySelector("#calendarDiv")
    let today = new Date()
    let firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay()
    let lastOfMonth = getMonthDayCount(today)
    let paddingNum = firstOfMonth - 1
    let arr = buildArr(paddingNum, lastOfMonth, today)
    let div = createCalendarDiv(arr, remplas)
    calendarDiv.appendChild(div)

}




function getMonthDayCount(date){
    if (date.getMonth() == 11){
        let MonthDayCount = new Date(date.getFullYear() + 1, 0, 0 ).getDate() 
        return MonthDayCount
    } 
    let MonthDayCount = new Date(date.getFullYear() + 1, date.getMonth() + 1, 0).getDate()
    return MonthDayCount
}


function buildArr(padNum, monthdayCount, date){
    let padding = new Array(padNum).fill(0)
    let monthArr = new Array(monthdayCount).fill(0).map((el, index) => {return new Date(date.getFullYear(), date.getMonth(), index + 1)})

    return monthArr
}

function createCalendarDiv(arr, remplas){
    let div = document.createElement("div")
    div.style.display = "grid"
    div.style.gridTemplateColumns = "repeat(7,1fr)"
    for ( let i=0; i < arr.length; i++){
        if (i==0) {
            appendDayBar(div)
        }
        let span = document.createElement("span")
        span.textContent = arr[i].getDate()
        span.style.padding = "1rem"
        span.style.border = "1px solid black"
        div.appendChild(span)
        if ((i+1) % 7 == 0  && i != 0) {
            for (let j=0; j < remplas.length; j++){
                        let sevenDaysAgo = new Date(arr[i].getTime() - (7 * 24 * 60 * 60 * 1000));
                        if ( new Date(remplas[j].fin) > sevenDaysAgo ) {
                            let remplaBar = document.createElement("span")
                            remplaBar.style.padding = "1rem"
                            remplaBar.style.border = "1px solid black"
                            remplaBar.style.gridColumn = "7 span "
                            remplaBar.style.width = "100%"
                            remplaBar.style.backgroundColor = colors[j]
                            div.appendChild(remplaBar)
                        }
                        
            }
            
        }
        if (i == arr.length - 1  && i != 0){
            let dayOfWeekLastOfMonth = arr[i].getWeekDay()
            let firstDayWeek = getDateMinusDays(arr[i], dayOfWeekLastOfMonth - 1)
            for (let j=0; j < remplas.length; j++){
                let remplaBar = document.createElement("span")
                remplaBar.style.padding = "1rem"
                remplaBar.style.border = "1px solid black"
                remplaBar.style.gridColumn = "7 span "
                remplaBar.style.width = "100%"
                remplaBar.style.backgroundColor = colors[j]
                div.appendChild(remplaBar)
            }
        }
        
    }
    return div
}

function appendDayBar(div){
    let days = ["L", "M", "M", "J", "V", "S", "D"]

    for (let i=0; i < days.length; i++){
        let span = document.createElement("span")
        span.textContent = days[i]
        span.style.padding = "1rem"
        span.style.border = "1px solid black"
        span.style.backgroundColor = "yellow"
        div.appendChild(span)
    }


}



function getDateMinusDays(date, minus){
    return new Date(date.getTime() - (minus * 24 * 60 * 60 * 1000))
}



function getDayWeek(date) {
return date.getDay() + 6) % 7 + 1;
}


createCalendar(mocksRemplas)