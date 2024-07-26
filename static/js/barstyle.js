
function createDaySpans(arr){
    let div = createElement("div")
    for (let i=0; i < arr.length; i++){
    let span = document.createElement("span")
    span.textContent = date.getDate()
    span.style.padding = "1rem"
    span.style.border = "1px solid black"
    div.appendChild(span)
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



function createRemplaBar(rempla){
    
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


