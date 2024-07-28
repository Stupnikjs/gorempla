
function createDaySpans(arr){
    let div = createElement("div")
    for (let i=0; i < arr.length; i++){
    let span = document.createElement("span")
    span.textContent = date.getDate()
    span.classList.add("daySpan")
    div.appendChild(span)
    }
    return div
}



function appendDayBar(div){
    let days = ["L", "M", "M", "J", "V", "S", "D"]

    for (let i=0; i < days.length; i++){
        let span = document.createElement("span")
        span.textContent = days[i]
        span.classList.add("dayBar")
        span.style.padding = ".5rem"
        span.style.textAlign = "center"
        span.style.border = "1px solid black"
        span.style.backgroundColor = "lightgray"
        div.appendChild(span)
    }
}







function getChildRemplaBar(rempla, offsets){
    let childRemplaBar = document.createElement("div")

    // Case rempla out of week boundries
    
    childRemplaBar.style.gridColumn = `span ${7 - offsets[1] - offsets[0]} / ${ 8 - offsets[1]}`  
    // childRemplaBar.textContent = rempla.lieu
    childRemplaBar.style.padding = "1rem"
    return childRemplaBar
}



