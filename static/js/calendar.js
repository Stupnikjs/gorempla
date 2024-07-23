/*
        pour que le week composant soit ajouté pour la rempla il faut 
        que la fin soit superieure ou egale a la premiere date de la semaine 
        et que le debut soit inferieure ou egale la fin de la semaine  
*/

let mocksRemplas = [
    {
        debut: "2024-07-25",
        fin: "2024-07-31"
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
    let firstOfMonth = getWeekDay(new Date(today.getFullYear(), today.getMonth(), 1))
    let lastOfMonth = getMonthDayCount(today)
    let paddingNum = firstOfMonth - 1
    let arr = buildArr(paddingNum, lastOfMonth, today)
    let div = createCalendarDiv(arr, remplas)
    calendarDiv.appendChild(div)

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
        if (i==0) { appendDayBar(div) }
        let span = createDaySpan(arr[i])
        div.appendChild(span)
        if ((i+1) % 7 == 0  && i != 0) {
            for (let j=0; j < remplas.length; j++){
                let sevenDaysAgo = new Date(arr[i].getTime() - (7 * 24 * 60 * 60 * 1000));
                if (new Date(remplas[j].fin) >= sevenDaysAgo 
                    && new Date(remplas[j].debut) <= arr[i] ) {
                    let remplaBar = createRemplaBar(remplas[j], sevenDaysAgo, arr[i])
                    div.appendChild(remplaBar)
                }           
            }
            
        }
        if (i == arr.length - 1  && i != 0){
            let dayOfWeekLastOfMonth = getWeekDay(arr[i])
            let firstDayWeek = getDateMinusDays(arr[i], dayOfWeekLastOfMonth - 1)
            for (let j=0; j < remplas.length; j++){
                if (firstDayWeek < new Date(remplas[j].fin) 
                    && new Date(remplas[j].debut) < firstDayWeek  ){
                let firstOffset = getDayDiff(firstDayWeek, new Date(remplas[j].debut))
                let lastOffset = getDayDiff(dayOfWeekLastOfMonth, new Date(remplas[j].fin))
                let offsets = [firstOffset, lastOffset]
                let remplaBar = createRemplaBar(remplas[j], offsets)
                remplaBar.style.color = colors[j]
                div.appendChild(remplaBar)
                    }
                }
        }
        }
    return div
}


function createDaySpan(date){
    let span = document.createElement("span")
    span.textContent = date.getDate()
    span.style.padding = "1rem"
    span.style.border = "1px solid black"
    return span
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









function createRemplaBar(rempla, offsets){
    console.log(offsets)
    let remplaBar = document.createElement("span")
    remplaBar.style.padding = "1rem"
    remplaBar.style.display = "grid"
    remplaBar.style.gridTemplateColumns = "repeat(7, 1fr)"
    remplaBar.style.border = "1px solid black"
    remplaBar.style.width = "100%"
    remplaBar.style.gridColumn = "7 span"
    let childRemplaBar = getChildRemplaBar(rempla, offsets)
    childRemplaBar.style.backgroundColor = "green"
    childRemplaBar.gridColumn = "7 span"
    remplaBar.appendChild(childRemplaBar)
    return remplaBar
}




function getChildRemplaBar(rempla, start, end){
    let childRemplaBar = document.createElement("div")
    let startGrid = 0
    let endGrid = 0
    console.log(start)
    console.log(rempla.debut)

    console.log(getDayDiff(new Date(rempla.fin), new Date(end)))
    // Case rempla out of week boundries
    if ( new Date(rempla.debut) <=  new Date(start) && new Date(rempla.fin) >=  new Date(end)){
        startGrid = 1
        endGrid = 7
    }
    // Case end == start 
    if ( new Date(rempla.end) ==  new Date(start)){
    }
    // Case start == 
    // Case end == start 
    if ( new Date(rempla.end) >  new Date(start) && new Date()){
    }
    childRemplaBar.style.gridColumn = `${startGrid}/ span ${endGrid}`
    // childRemplaBar.textContent = rempla.lieu
    childRemplaBar.style.padding = "1rem"
    return childRemplaBar
}


createCalendar(mocksRemplas)





/* 
Si debut < start et fin < end 
la difference end - fin == espace après childRemplaBar

*/
