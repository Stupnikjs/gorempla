/*
        pour que le week composant soit ajouté pour la rempla il faut 
        que la fin soit superieure ou egale a la premiere date de la semaine 
        et que le debut soit inferieure ou egale la fin de la semaine  
*/

let mocksRemplas = [
    {
        debut: "2024-07-01",
        fin: "2024-07-31"
    }, 
    {
        debut: "2024-07-05",
        fin: "2024-07-14"
    }, 
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

    // pass the remplas to delete on next iter in obj.remplas
    // maybe some hashing func 
    todelete = []
    newArr = []
    for (let j=0; j < monthArr.length; j++){
    let obj = {
     date : monthArr[j],
     remplas : []
   }
    
     for (let i=0, i < remplas.length; i++){
        if (todelete.length > 1) {
           obj.remplas = removeRempla(obj.rempla, todelete)
           todelete = []
         }
        if (New Date(remplas[i].debut) == monthArr[j]) {obj.remplas.push(remplas[i])}       
        if (New Date(rempla[i].fin) == monthArr[j]) { todelete.push(remplas[i])}

 }
    newArr.push(obj)

}
   
    return newArr
}

function createCalendarDiv(arr, remplas){
    
    let div = document.createElement("div")
    div.id = "calendarDiv"
    div.style.display = "grid"
    div.style.gridTemplateColumns = "repeat(7,1fr)"
    
    // iteration par semaine 
    while i < arr.length; i+= 7){
        if (i==0) { appendDayBar(div) }
        let span = createDaySpan(arr[i].date)
        div.appendChild(span)
        if (arr[i].remplas.length > 0){
           
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



function createRemplaBar(rempla, offsets, j, ok){
    
    let remplaBar = document.createElement("span")
    remplaBar.style.padding = "1rem"
    remplaBar.style.display = ok ? "grid" : "none"
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

    // Case rempla out of week boundries
    
    childRemplaBar.style.gridColumn = `span ${7 - offsets[1] - offsets[0]} / ${ 8 - offsets[1]}`  
    // childRemplaBar.textContent = rempla.lieu
    childRemplaBar.style.padding = "1rem"
    return childRemplaBar
}





func removeRempla(arr, todelete){
  let newArr = arr.map((el,i) => {
  for (let j=0; j < todelete.length; j++){
     if (remplaEquals(el, todelete[j])){return null }
  }
  return el
})
 
  newArr = arr.filter(el => el !== null)
 
  return newArr
      



}




}



}


function remplaEquals(r1,r2){
 
let c1 = r1.debut == r2.debut
let c2 = r1.fin == r2.fin
let c3 = r1.lieu == r2.lieu
let c4 = r1.logiciel == r2.logiciel
let c5 = r1.temps_trajet == r2.temps_trajet


if (c1 && c2 && c3 && c4 && c5 ) {

return true 
} 

return false 

}


createCalendar(mocksRemplas)





/* 
Si debut < start et fin < end 
la difference end - fin == espace après childRemplaBar

*/

// iteration par semaine 
