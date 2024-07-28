// parse rempla from some HTML data elemenr

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

let colors = ["blue", "purple", "gray", "lightgreen" , "lightblue" ]


/*     parent function     */
function createCalendar(remplas, day){
    let container = document.getElementById("containerDiv")
    let firstOfMonth = getWeekDay(new Date(day.getFullYear(), day.getMonth(), 1))
    let lastOfMonth = getMonthDayCount(day)
    let paddingNum = firstOfMonth - 1
    let arr = buildArr(paddingNum, lastOfMonth, day, remplas)
    let div = createCalendarDiv(arr, remplas)
    container.appendChild(div)

}



/*    array builder with date remplas hashes */
function buildArr(padNum, monthdayCount, date, remplas){
    let padding = new Array(padNum).fill(new Date(0, 0, 0))
    let monthArr = new Array(monthdayCount).fill(0).map((el, index) => {return new Date(date.getFullYear(), date.getMonth(), index + 1)})
    monthArr = padding.concat(monthArr)
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

            // add check if debut is in previous month but end in this month
            if (new Date(remplas[j].debut) < monthArr[padNum] && monthArr[i] < new Date(remplas[j].fin)
        ){      
                rempObj[hash] = true
                obj[hash] = true 
                
            }
            // end of rempla already passed or padding 
            if ( (new Date(remplas[j].debut) < monthArr[padNum] && new Date(remplas[j].fin) < monthArr[monthArr.length - 1] 
          && monthArr[i] > new Date(remplas[j].fin))) 
        {      
            rempObj[hash] = false
            obj[hash] = false
            continue  
            }
            if (sameDate(monthArr[i], new Date(0,0,0))){
                rempObj[hash] = false
                obj[hash] = false
                continue
            }
            if (sameDate(new Date(remplas[j].debut), monthArr[i])){
                rempObj[hash] = true
                obj[hash] = true 
                continue
                
            }
            // last day true 
            if (sameDate(new Date(remplas[j].fin), monthArr[i])) {
                rempObj[hash] = false 
                obj[hash] = true 
                continue
            } 
            // from last iter 
            else if (!rempObj[hash]){
                obj[hash] = false
            }
            else if (rempObj[hash]){
                obj[hash] = true
            }
        }
    newArr.push(obj)
    }
  return newArr
}


/* HTML calendar element creator from array */
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




/*       week HTML element creater    */
function createWeekDiv(arr, remplas){
    let div = document.createElement("div")
    // build obj with hash matching remplas 
    let hashObj = {}
    for (obj of arr){
        let span = document.createElement("span")
        span.textContent = sameDate(obj.date, new Date(0, 0, 0)) ? "": obj.date.getDate()
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
    for (let i = 0; i < Object.entries(hashObj).length; i++){
        let rempla = remplas[i]
        let bar = barFromBoolArr(Object.entries(hashObj)[i][1], colors[i], rempla)
        div.appendChild(bar)
    }
    return div
}

/* rempla hash function can be improved  */ 
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

function barFromBoolArr(arr, color, rempla){
    console.log(rempla)
    let coord = coordinateFromBoolArr(arr)
    let div = document.createElement("div")
    div.classList.add("remplaBar")
    if (coord[0] == 0 && coord[1] == 0) return div
    div.style.gridColumn = `span ${coord[1] - coord[0] } / ${coord[1]+1}`
    div.textContent = rempla.lieu
    div.style.textAlign = "center"
    div.style.padding = "1rem"
    div.style.backgroundColor = color

    return div 

}


function coordinateFromBoolArr(boolArr){
    
    let first = -1
    let last = boolArr.length 
    curr = false 
    for (let i=0 ; i < boolArr.length; i++){
        // if false and last item where true 
        if (curr === true && !boolArr[i]){
            last = i 
            curr = false 
            continue
            
        }
        if (boolArr[i] && !curr){
            curr = true
            first = i 
        }
    }
    if (first == -1 && last == boolArr.length){
        return [0, 0]
    } else {
        return [first, last]
    }
}



/* 
* onclick + increment today and pass  *createCalendar
*/

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






