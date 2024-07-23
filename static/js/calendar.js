/*
        pour que le week composant soit ajouté pour la rempla il faut 
        que la fin soit superieure ou egale a la premiere date de la semaine 
        et que le debut soit inferieure ou egale la fin de la semaine  
*/

let mocksRemplas = [
    {
        debut: "2024-07-01",
        fin: "2024-07-07"
    }
]

let colors = ["blue", "purple", "gray"]

function createCalendar(remplas){
    let container = document.getElementById("containerDiv")
    let today = new Date()
    let firstOfMonth = getWeekDay(new Date(today.getFullYear(), today.getMonth(), 1))
    let lastOfMonth = getMonthDayCount(today)
    let paddingNum = firstOfMonth - 1
    let arr = buildArr(paddingNum, lastOfMonth, today)
    let div = createCalendarDiv(arr, remplas)
    container.appendChild(div)

}




function buildArr(padNum, monthdayCount, date){
    let padding = new Array(padNum).fill(0)
    let monthArr = new Array(monthdayCount).fill(0).map((el, index) => {return new Date(date.getFullYear(), date.getMonth(), index + 1)})

    return monthArr
}

function createCalendarDiv(arr, remplas){
    
    let div = document.createElement("div")
    div.id = "calendarDiv"
    div.style.display = "grid"
    div.style.gridTemplateColumns = "repeat(7,1fr)"
    for ( let i=0; i < arr.length; i++){
        if (i==0) { appendDayBar(div) }
        let span = createDaySpan(arr[i])
        div.appendChild(span)
        if ((i+1) % 7 == 0  && i != 0) { endOfWeekRemplaRender(arr[i], remplas, div)}
        if (i == arr.length - 1  && i != 0){ endOfMonthRemplaRender(arr[i], remplas, div)}
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



function createRemplaBar(rempla, offsets, j){
    let remplaBar = document.createElement("span")
    remplaBar.style.padding = "1rem"
    remplaBar.style.display = "grid"
    remplaBar.style.gridTemplateColumns = "repeat(7, 1fr)"
    remplaBar.style.border = "1px solid black"
    remplaBar.style.width = "100%"
    remplaBar.style.gridColumn = "7 span"
    let childRemplaBar = getChildRemplaBar(rempla, offsets)
    childRemplaBar.style.backgroundColor = colors[j]
    remplaBar.appendChild(childRemplaBar)
    return remplaBar
}




function getChildRemplaBar(rempla, offsets){
    let childRemplaBar = document.createElement("div")

    console.log("remlpa debut", rempla.debut)
    // Case rempla out of week boundries
    
    childRemplaBar.style.gridColumn = `span ${7 - offsets[1] - offsets[0]} / ${ 8 - offsets[1]}`  
    // childRemplaBar.textContent = rempla.lieu
    childRemplaBar.style.padding = "1rem"
    return childRemplaBar
}



function endOfWeekRemplaRender(currDate, remplas, div){
    
    for (let j=0; j < remplas.length; j++){
        let sixDaysAgo = new Date(currDate.getTime() - (6 * 24 * 60 * 60 * 1000));
        console.log(sixDaysAgo, currDate)
        console.log(getDayDiff(currDate, new Date(remplas[j].fin)))
        let offsets = []
        if (new Date(remplas[j].debut) <= sixDaysAgo){
            offsets[0] = 0
        } else {
            offsets[0] = getDayDiff(new Date(remplas[j].debut) , sixDaysAgo)
        }
        if (new Date(remplas[j].fin) >= currDate){
            offsets[1] = 0
        } else {
            offsets[1] = getDayDiff(currDate, new Date(remplas[j].fin))
        }
        console.log(offsets)
        let remplaBar = createRemplaBar(remplas[j], offsets, j)
        div.appendChild(remplaBar)
        }           
    }

function endOfMonthRemplaRender(currDate, remplas, div){
        
        let dayOfWeekLastOfMonth = getWeekDay(currDate)
            let firstDayWeek = getDateMinusDays(currDate, dayOfWeekLastOfMonth - 1)
            for (let j=0; j < remplas.length; j++){
                if (firstDayWeek < new Date(remplas[j].fin) 
                    && new Date(remplas[j].debut) < firstDayWeek  ){
                let firstOffset = getDayDiff(firstDayWeek, new Date(remplas[j].debut))
                let lastOffset = getDayDiff(new Date(remplas[j].fin), currDate)
                let offsets = [firstOffset, lastOffset]
                let remplaBar = createRemplaBar(remplas[j], offsets, j)
                div.appendChild(remplaBar)
                    }
                }
}

createCalendar(mocksRemplas)





/* 
Si debut < start et fin < end 
la difference end - fin == espace après childRemplaBar

*/
