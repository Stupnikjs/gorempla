package api

import (
	"time"

	"github.com/Stupnikjs/gorempla/repo"
)

var Months = []string{"Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"}

// var daysOfWeek = []string{"D", "L", "M", "M", "J", "V", "S"}

type CalendarElementType string

type CalendarElement struct {
	Type  CalendarElementType
	Value int
}

type MonthCalendar struct {
	Calendar []CalendarElement
	Month    string
	Remplas  []repo.Rempla
}

func (app *Application) GetCalendar(year int, month time.Month) (*MonthCalendar, error) {

	date := time.Date(year, month, 1, 0, 0, 0, 0, &time.Location{})
	first := date.Weekday()

	paddingLength := first - 1
	calendar := make([]CalendarElement, 0, 37)

	for range paddingLength {
		paddingEl := CalendarElement{
			Type:  "padding",
			Value: 0,
		}
		calendar = append(calendar, paddingEl)
	}

	for i := range GetNumberOfDayInMonth(year, month) {
		dayEl := CalendarElement{
			Type:  "day",
			Value: i + 1,
		}
		calendar = append(calendar, dayEl)
	}

	return &MonthCalendar{
		Calendar: calendar,
		Month:    Months[int(month)-1],
	}, nil

}

func GetNumberOfDayInMonth(year int, month time.Month) int {

	if month != 12 {
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
