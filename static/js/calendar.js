/*
        pour que le week composant soit ajouté pour la rempla il faut 
        que la fin soit superieure ou egale a la premiere date de la semaine 
        et que le debut soit inferieure ou egale la fin de la semaine  
*/

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
]

let colors = ["blue", "purple", "gray"]

function createCalendar(remplas){
    let container = document.getElementById("containerDiv")
    let today = new Date()
    let firstOfMonth = getWeekDay(new Date(today.getFullYear(), today.getMonth(), 1))
    let lastOfMonth = getMonthDayCount(today)
    let paddingNum = firstOfMonth - 1
    let arr = buildArr(paddingNum, lastOfMonth, today, remplas)
    let div = createCalendarDiv(arr, remplas)
    container.appendChild(div)

}




function buildArr(padNum, monthdayCount, date, remplas){
    let padding = new Array(padNum).fill(0)
    let monthArr = new Array(monthdayCount).fill(0).map((el, index) => {return new Date(date.getFullYear(), date.getMonth(), index + 1)})

    // pass the remplas to delete on next iter in obj.remplas
    // maybe some hashing func 
    
    newArr = []
    let rempObj = {}

    for (let i=0; i < monthArr.length; i++){ 
        let obj = {
            date : monthArr[i]
        }  
        for (let j=0; j < remplas.length; j++){
            let hash = remplaHash(remplas[j])
            if (sameDate(new Date(remplas[j].debut), monthArr[i])){
                rempObj[hash] = true
                obj[hash] = true 
                
            }
            if (sameDate(new Date(remplas[j].fin), monthArr[i])) {
                rempObj[hash] = false 
                obj[hash] = true 
                continue
            } 
            else if (!rempObj[hash]){
                obj[hash] = false
            }
            else if (rempObj[hash]){
                obj[hash] = true
            }
        }
    newArr.push(obj)
    }
    console.log(newArr)
  return newArr
}

function createCalendarDiv(arr, remplas){
    
    let div = document.createElement("div")
    div.id = "calendarDiv"
    div.style.display = "grid"
    div.style.gridTemplateColumns = "repeat(7,1fr)"
    let newArr = []
    // iteration par semaine 
    n = 7
    appendDayBar(div)
    for (let i= 0; i < arr.length; i+= n){
        let subArr = arr.slice(i, i+n)
        if (arr.length < i+n ){
            n = arr.length - i
        }
        newArr.push(subArr)
    }
    for (let j= 0; j < newArr.length; j++){
        weekDiv = createWeekDiv(newArr[j], remplas)
        div.appendChild(weekDiv)
    } 
    div.style.minHeight = "90vh"
    return div
  }



function createWeekDiv(arr, remplas){
    let div = document.createElement("div")
    let remplasArr = remplas.map(el => { return {
        rempla: el,
        id: remplaHash(el)
    }})
    let hashObj = {}
    for (obj of arr){
        let span = document.createElement("span")
        span.textContent = obj.date.getDate()
        span.style.padding = "1rem"
        span.style.border = "1px solid black"
        span.style.backgroundColor = "yellow"
        for (hash of  Object.keys(obj)){
            if (hash != "date"){
                if (!Object.keys(hashObj).includes(hash)){
                    hashObj[hash] = [obj[hash]]
                } else {
                    hashObj[hash].push(obj[hash])
                }
            }
            
        }
        div.appendChild(span)

    }

    div.style.display = "grid"
    div.style.gridTemplateColumns = "repeat(7, 1fr)"
    div.style.gridColumn = " 1 / -1"
    for (arr of Object.entries(hashObj)){
    
        let bar = barFromBoolArr(arr)
        div.appendChild(bar)
    }
    return div
}


function remplaHash(rempla){
    
    let debut = rempla.debut.split("").map(e => {return e.charCodeAt()})
    let fin = rempla.fin.split("").map(e => {return e.charCodeAt()})
    let lieu = rempla.lieu.split("").map(e => {return e.charCodeAt()})
    let logiciel = rempla.lieu.split("").map(e => {return e.charCodeAt()})

    let add = debut.reduce((curr, prev) => curr + ( 100 * prev )) + fin.reduce((curr, prev) => curr + prev) + lieu.reduce((curr, prev) => ( 10000 * curr + 1000 * prev )) + logiciel.reduce((curr, prev) => curr + prev)
 
    return add % 100000
}



function removeRempla(arr, todelete){
    let newArr = arr.map((el,i) => {
    for (let j=0; j < todelete.length; j++){
        if (remplaEquals(el, todelete[j])){return null }
    }
    return el
    })
  newArr = arr.filter(el => el !== null)
  return newArr
    
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


function sameDate(d1, d2){
    let d = d1.getDate() == d2.getDate()
    let m = d1.getMonth() == d2.getMonth()
    let y = d1.getFullYear() == d2.getFullYear()

    if (d && m && y) return true 
    else return false 
}



createCalendar(mocksRemplas)





/* 
Si debut < start et fin < end 
la difference end - fin == espace après childRemplaBar

*/

// iteration par semaine 
