package api

import (
	"fmt"
	"time"
)

var Months = []string{"Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"}
var daysOfWeek = []string{"D", "L", "M", "M", "J", "V", "S"}

type CalendarElementType string

type CalendarElement struct {
	Type  CalendarElementType
	Value int
}

func GetCalendar() []CalendarElement {

	today := time.Now()
	first := GetFirstDayOfMonth(today)

	paddingLength := first - 1

	calendar := make([]CalendarElement, 0, 37)

	for range paddingLength {
		paddingEl := CalendarElement{
			Type:  "padding",
			Value: 0,
		}
		calendar = append(calendar, paddingEl)
	}

	for i := range GetNumberOfDayInMonth(today.Month()) {
		dayEl := CalendarElement{
			Type:  "day",
			Value: i + 1,
		}
		calendar = append(calendar, dayEl)
	}
	fmt.Println(calendar)
	return calendar

}

func GetFirstDayOfMonth(date time.Time) int {
	year, month, _ := date.Date()
	FirstDayOfMonth := time.Date(year, month, 1, 0, 20, 0, 0, &time.Location{})
	return int(FirstDayOfMonth.Weekday())
}

func GetNumberOfDayInMonth(month time.Month) int {
	today := time.Now()
	year, month, _ := today.Date()
	if int(month) != 12 {
		monthAfter := time.Date(year, month+1, 1, 0, 0, 0, 0, &time.Location{})
		lastDayOfMonth := monthAfter.Add(time.Hour * -26)
		_, _, len := lastDayOfMonth.Date()
		return len
	} else {
		monthAfter := time.Date(year+1, 1, 1, 0, 0, 0, 0, &time.Location{})
		lastDayOfMonth := monthAfter.Add(time.Hour * -26)
		_, _, len := lastDayOfMonth.Date()
		return len
	}

}
