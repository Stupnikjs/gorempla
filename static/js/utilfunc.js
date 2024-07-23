function getMonthDayCount(date){
    if (date.getMonth() == 11){
        let MonthDayCount = new Date(date.getFullYear() + 1, 0, 0 ).getDate() 
        return MonthDayCount
    } 
    let MonthDayCount = new Date(date.getFullYear() + 1, date.getMonth() + 1, 0).getDate()
    return MonthDayCount
}



function getDateMinusDays(date, minus){
    return new Date(date.getTime() - (minus * 24 * 60 * 60 * 1000))
}


function getWeekDay(date) {
return (date.getDay() + 6) % 7 + 1;
}

function getDayDiff(maj,min){
    console.log(maj, min)
    let milisecDif = maj.getTime() - min.getTime()
    console.log(milisecDif)
    return Math.round(milisecDif / (1000 * 60 * 60 * 24))
   }